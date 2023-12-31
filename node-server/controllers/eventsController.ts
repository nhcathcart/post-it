import { Request, Response, NextFunction } from "express";
import { ErrorObject } from "../index";
import { makeFriendEventObj } from "../helpers"
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
  deleteEvent: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = res.locals;
    const { eventId } = req.body;

    const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
    DELETE FROM events
    WHERE user_id = (SELECT user_id FROM user_info) AND id = $2;
  `;
   
    const values = [username, eventId];

    try {
      await db.query(query, values);
      
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the deleteFriendGroup middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem deleting that friend group`,
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
            id,
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
  getFriendGroupEvents: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      const result = await db.query(query, values);
      res.locals.friendGroupEvents = result.rows;
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
  getFriendEvents: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = res.locals;
  
    const query = `
      WITH user_info AS (
        SELECT id
        FROM users
        WHERE username = $1
      ), friend_ids AS (
        SELECT friend_id
        FROM friends
        WHERE user_id = (SELECT id FROM user_info)
      ), friends_events AS (
        SELECT
          user_id,
          title,
          start_date AS start,
          end_date AS end,
          all_day,
          resource
        FROM events
        WHERE events.user_id IN (SELECT friend_id FROM friend_ids)
      )
      SELECT
        users.username,
        events.title,
        events.start,
        events.end,
        events.all_day,
        events.resource
      FROM friends_events AS events
      JOIN users ON events.user_id = users.id;
    `;
  
    try {
      const result = await db.query(query, [username]);
      res.locals.friendEvents = makeFriendEventObj(result.rows);
      console.log(makeFriendEventObj(result.rows))
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
