import { Request, Response, NextFunction } from "express";
import { ErrorObject } from "../index";
import db from "../db";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;

const eventsController = {
  postEvent: async (req: Request, res: Response, next: NextFunction) => {
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
      const result = await db.query(query, values);
      console.log(result);
      res.locals.event = result.rows[0];
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the postEvent middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem posting the event`,
        },
      };
      next(errorObj);
    }
  },
  getEvents: async (req: Request, res: Response, next: NextFunction) => {
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
      const result = await db.query(query, values);
      res.locals.events = result.rows;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the getEventsByUsername middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem retrieving events`,
        },
      };
      next(errorObj);
    }
  },
};

export default eventsController;
