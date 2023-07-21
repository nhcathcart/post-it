import { Request, Response, NextFunction } from "express";
import { ErrorObject } from "../index";
import db from "../db";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_PRIVATE_KEY;
interface User {
  username: string;
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
      const usernameArray = result.rows.map(
        (userObj: User) => userObj.username
      ); // Access the 'username' property

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
    JOIN users AS friend ON friends.friend_id = friend.id
    WHERE friends.user_id = (SELECT id FROM users WHERE username = $1);
  `;

    const values = [username];

    try {
      const result = await db.query(query, values);
      const friendUsernames = result.rows.map((row) => row.username);
      res.locals.friends = friendUsernames;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the friendsController.getFriends middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem getting friends.`,
        },
      };
      next(errorObj);
    }
  },
  getPendingFriends: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = res.locals;
    const query = `
      SELECT sender.username AS sender_username
      FROM friend_requests AS fr
      JOIN users AS sender ON fr.sender_id = sender.id
      JOIN users AS receiver ON fr.receiver_id = receiver.id
      WHERE receiver.username = $1;
    `;

    const values = [username];

    try {
      const result = await db.query(query, values);
      const pendingFriends = result.rows.map((row) => row.sender_username);
      res.locals.pendingFriends = pendingFriends;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem getting pending friend requests.`,
        },
      };
      next(errorObj);
    }
  },

  addFriend: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = res.locals;
    const { friend } = req.body;

    const query = `
      INSERT INTO friend_requests (sender_id, receiver_id)
      SELECT u1.id AS sender_id, u2.id AS receiver_id
      FROM users AS u1, users AS u2
      WHERE u1.username = $1
        AND u2.username = $2;
    `;
    const values = [username, friend];

    try {
      await db.query(query, values);
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the addFriend middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem adding friends`,
        },
      };
      next(errorObj);
    }
  },
  acceptFriendRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = res.locals;
    const { friend } = req.body;

    try {
      const insertQuery = `
        WITH inserted AS (
          INSERT INTO friends (user_id, friend_id)
          SELECT u1.id AS user_id, u2.id AS friend_id
          FROM users AS u1, users AS u2
          WHERE u1.username = $1
            AND u2.username = $2
          RETURNING user_id, friend_id
        )
        INSERT INTO friends (user_id, friend_id)
        SELECT friend_id AS user_id, user_id AS friend_id
        FROM inserted;
      `;
      const values = [username, friend];
      await db.query(insertQuery, values);

      const deleteQuery = `
        DELETE FROM friend_requests
        WHERE sender_id = (SELECT id FROM users WHERE username = $1)
          AND receiver_id = (SELECT id FROM users WHERE username = $2);
      `;
      const deleteValues = [friend, username];
      await db.query(deleteQuery, deleteValues);

      res.locals.acceptedFriend = friend;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the acceptFriendRequest middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem accepting the friend request.`,
        },
      };
      next(errorObj);
    }
  },

  rejectFriendRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = res.locals;
    const { friend } = req.body;

    try {
      const deleteQuery = `
        DELETE FROM friend_requests
        WHERE sender_id = (SELECT id FROM users WHERE username = $1)
          AND receiver_id = (SELECT id FROM users WHERE username = $2);
      `;
      const deleteValues = [friend, username];
      await db.query(deleteQuery, deleteValues);

      res.locals.rejectedFriend = friend;
      return next();
    } catch (err) {
      const errorObj = {
        log: `There was an error in the rejectFriendRequest middleware: ${err}`,
        status: 500,
        message: {
          err: `There was a problem rejecting the friend request.`,
        },
      };
      next(errorObj);
    }
  },
};

export default friendsController;
