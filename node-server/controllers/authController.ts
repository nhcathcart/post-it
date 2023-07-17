import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { ErrorObject } from "../index";
import db from "../db";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;

const authController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const query = `
    INSERT INTO users (username, password, token)
    VALUES ($1, $2, NULL);
  `;
    const values = [username, passwordHash];
    try {
      const result = await db.query(query, values);
      return next();
    } catch (err) {
      console.log(err);
      const errorObj: ErrorObject = {
        log: "There was an error in the createUser middleware",
        status: 500,
        message: {
          err: "There was a problem adding the user",
        },
      };
      next(errorObj);
    }
  },
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const query = `
    SELECT *
    FROM users
    WHERE username = $<1>;
    `;
    const values = [username];
    try {
      const result = await db.query(query, values);
      console.log(result.rows);
      res.locals.userInfo = result.rows;
      return next();
    } catch (err) {
      const errorObj: ErrorObject = {
        log: "There was an error in the addUser middleware",
        status: 500,
        message: {
          err: "There was a problem adding the user",
        },
      };
      next(errorObj);
    }
  },
  checkPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { passwordHash } = res.locals.userInfo;
    const { password } = req.body;

    try {
      const result = await bcrypt.compare(password, passwordHash);
      if (result) return next();
      else throw "incorrect password";
    } catch (err) {
      const errorObj: ErrorObject = {
        log: "There was an error in the loginUser middleware",
        status: 500,
        message: {
          err:
            err === "incorrect password"
              ? "incorrect username or password"
              : "There was a problem loggin in the user",
        },
      };
      return next(errorObj);
    }
  },
  setCookie: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const cookieName = "token";
    const cookieValue = jwt.sign({ username: username }, secretKey as Secret, {
      expiresIn: "1h",
    });
    const options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: false, // CHANGE FOR PRODUCTION
    };
    res.cookie(cookieName, cookieValue, options);

    try {
      //update the record to set the cookie
      return next();
    } catch (err) {
      const errorObj: ErrorObject = {
        log: "There was an error in the setCookie middleware",
        status: 500,
        message: {
          err: "There was a problem",
        },
      };
      return next(errorObj);
    }
  },
  checkCookie: async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const token = req.cookies.token;
      if (!token) throw "not authorized"
      jwt.verify(token, secretKey as Secret, (err:any, user:any) => {
        if (err) throw "not authorized"
        res.locals.username = user.username;
        next();
      });
    } catch (err) {
      const errorObj: ErrorObject = {
        log: "There was an error in the checkAuth middleware",
        status: 500,
        message: {
          err:
            err === "not authorized" ? "not authorized" : "There was a problem",
        },
      };
      return next(errorObj);
    }
  },
  invalidateCookie: async (req: Request, res: Response, next: NextFunction) => {
    const cookieName = "token";
    const { username } = req.body;
    const query = `
    UPDATE users
    SET token = NULL
    WHERE username = ${username};
    `;
    try {
      db.query(query);
      res.clearCookie(cookieName);
      return next();
    } catch (err) {
      const errorObj: ErrorObject = {
        log: "There was an error in the invaliate middleware",
        status: 500,
        message: {
          err: "There was a problem",
        },
      };
      return next(errorObj);
    }
  },
};

export default authController;
