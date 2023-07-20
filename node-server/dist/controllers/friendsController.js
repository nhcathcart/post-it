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
const db_1 = __importDefault(require("../db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.JWT_PRIVATE_KEY;
const friendsController = {
    search: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { searchTerm } = req.body;
        const query = `
    SELECT username
    FROM users
    WHERE username ILIKE $1;
  `;
        const values = [`%${searchTerm}%`];
        try {
            const result = yield db_1.default.query(query, values);
            const usernameArray = result.rows.map((userObj) => userObj.username); // Access the 'username' property
            res.locals.searchResults = usernameArray; // Store the array of usernames in 'searchResults'
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the friendsController.search middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem searching for friends`,
                },
            };
            next(errorObj);
        }
    }),
    getFriends: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const query = `
      SELECT friend.id, friend.username
      FROM friends
      JOIN users AS user ON friends.friend_id = user.id
      WHERE friends.user_id = (SELECT id FROM users WHERE username = $1);
    `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.friends = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the friendsController.getAllFriends middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting friends.`,
                },
            };
            next(errorObj);
        }
    }),
    addFriend: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const result = yield db_1.default.query(query, values);
            res.locals.addResult = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the friendsController.addFriend middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem adding friends`,
                },
            };
            next(errorObj);
        }
    }),
};
exports.default = friendsController;
