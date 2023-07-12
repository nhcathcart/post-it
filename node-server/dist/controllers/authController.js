"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../db"));
const authController = {
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const query = `
    INSERT INTO users (username, password, token)
    VALUES ($1, $2, NULL);
  `;
        const values = [username, passwordHash];
        try {
            const result = yield db_1.default.query(query, values);
            return next();
        }
        catch (err) {
            console.log(err);
            const errorObj = {
                log: "There was an error in the createUser middleware",
                status: 500,
                message: {
                    err: "There was a problem adding the user",
                },
            };
            next(errorObj);
        }
    }),
    getUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.body;
        const query = `
    SELECT *
    FROM users
    WHERE username = $<1>;
    `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            console.log(result.rows);
            res.locals.userInfo = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: "There was an error in the addUser middleware",
                status: 500,
                message: {
                    err: "There was a problem adding the user",
                },
            };
            next(errorObj);
        }
    }),
    checkPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { passwordHash } = res.locals.userInfo;
        const { password } = req.body;
        try {
            const result = yield bcrypt_1.default.compare(password, passwordHash);
            if (result)
                return next();
            else
                throw "incorrect password";
        }
        catch (err) {
            const errorObj = {
                log: "There was an error in the loginUser middleware",
                status: 500,
                message: {
                    err: err === "incorrect password"
                        ? "incorrect username or password"
                        : "There was a problem loggin in the user",
                },
            };
            return next(errorObj);
        }
    }),
    setCookie: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const cookieName = "token";
        const cookieValue = (0, uuid_1.v4)();
        const options = {
            maxAge: 1000 * 60 * 15,
            httpOnly: false, // CHANGE FOR PRODUCTION
        };
        res.cookie(cookieName, cookieValue, options);
        const { username } = req.body;
        try {
            //update the record to set the cookie
            return next();
        }
        catch (err) {
            const errorObj = {
                log: "There was an error in the setCookie middleware",
                status: 500,
                message: {
                    err: "There was a problem",
                },
            };
            return next(errorObj);
        }
    }),
    checkCookie: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = res.locals.userInfo;
        try {
            if (token != req.cookies.token || token === "NULL")
                throw "not authorized";
            else
                return next();
        }
        catch (err) {
            const errorObj = {
                log: "There was an error in the checkAuth middleware",
                status: 500,
                message: {
                    err: err === "not authorized" ? "not authorized" : "There was a problem",
                },
            };
            return next(errorObj);
        }
    }),
    invalidateCookie: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const cookieName = "token";
        const { username } = req.body;
        const query = `
    UPDATE users
    SET token = NULL
    WHERE username = ${username};
    `;
        try {
            db_1.default.query(query);
            res.clearCookie(cookieName);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: "There was an error in the invaliate middleware",
                status: 500,
                message: {
                    err: "There was a problem",
                },
            };
            return next(errorObj);
        }
    }),
};
exports.default = authController;
