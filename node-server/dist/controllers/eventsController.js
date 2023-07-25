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
const eventsController = {
    postEvent: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { title, start, end, allDay, resource } = req.body;
        const query = `
          WITH user_info AS (
            SELECT id AS user_id
            FROM users
            WHERE username = $1
          )
          INSERT INTO events (user_id, title, start_date, end_date, all_day, resource)
          SELECT user_id, $2, $3, $4, $5, $6
          FROM user_info;
        `;
        const values = [username, title, start, end, allDay, resource];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.event = result.rows[0];
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the postEvent middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem posting the event`,
                },
            };
            next(errorObj);
        }
    }),
    getEvents: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const query = `
          WITH user_info AS (
            SELECT id AS user_id
            FROM users
            WHERE username = $1
          )
          SELECT
            title,
            start_date AS start,
            end_date AS end,
            all_day,
            resource
          FROM events
          WHERE user_id = (SELECT user_id FROM user_info);
        `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.events = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getEventsByUsername middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem retrieving events`,
                },
            };
            next(errorObj);
        }
    }),
    getFriendGroupEvents: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { friendGroup } = req.body;
        const query = `
      WITH user_info AS (
        SELECT id
        FROM users
        WHERE username = $1
      ), group_users AS (
        SELECT DISTINCT group_members.user_id
        FROM group_members
        JOIN friend_groups ON group_members.group_id = friend_groups.id
        WHERE friend_groups.group_name = $2 AND friend_groups.owner_id = (SELECT id FROM user_info)
      )
      SELECT
        users.username,
        events.title,
        events.start_date AS start,
        events.end_date AS end,
        events.all_day,
        events.resource
      FROM events
      JOIN users ON events.user_id = users.id
      WHERE events.user_id = (SELECT id FROM user_info)
      UNION
      SELECT
        users.username,
        events.title,
        events.start_date AS start,
        events.end_date AS end,
        events.all_day,
        events.resource
      FROM events
      JOIN users ON events.user_id = users.id
      WHERE events.user_id IN (SELECT user_id FROM group_users);
    `;
        const values = [username, friendGroup];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.friendGroupEvents = result.rows;
            console.log(result.rows);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getEventsByUsername middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem retrieving events`,
                },
            };
            next(errorObj);
        }
    }),
};
exports.default = eventsController;
