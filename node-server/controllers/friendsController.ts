import { Request, Response, NextFunction } from "express";
import { ErrorObject } from "../index";
import db from "../db";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;
interface User {
  username: string
}

const friendsController = {
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { searchTerm } = req.body;

    const query = `
    SELECT username
    FROM users
    WHERE username ILIKE $1;
  `;

    const values = [`%${searchTerm}%`];

    try {
      const result = await db.query(query, values);
      const usernameArray = result.rows.map((userObj: User) => userObj.username); // Access the 'username' property

      res.locals.searchResults = usernameArray; // Store the array of usernames in 'searchResults'
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the friendsController.search middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem searching for friends`,
        },
      };
      next(errorObj);
    }
  },
  getFriends: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = res.locals;

    const query = `
      SELECT friend.id, friend.username
      FROM friends
      JOIN users AS user ON friends.friend_id = user.id
      WHERE friends.user_id = (SELECT id FROM users WHERE username = $1);
    `;

    const values = [username];

    try {
      const result = await db.query(query, values);
      res.locals.friends = result.rows;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the friendsController.getAllFriends middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem getting friends.`,
        },
      };
      next(errorObj);
    }
  },

  addFriend: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = res.locals;
    const { friend } = req.body;

    const query = `
    INSERT INTO friends (user_id, friend_id)
    SELECT u1.id AS user_id, u2.id AS friend_id
    FROM users AS u1, users AS u2
    WHERE u1.username = $1
      AND u2.username = $2;
    
        `;
    const values = [username, friend];

    try {
      const result = await db.query(query, values);
      res.locals.addResult = result.rows;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the friendsController.addFriend middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem adding friends`,
        },
      };
      next(errorObj);
    }
  },
};

export default friendsController;
