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
        const { username } = res.locals;
        const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
    SELECT u.username
    FROM users u
    WHERE u.username ILIKE $2
      AND u.id != (SELECT user_id FROM user_info)
      AND NOT EXISTS (
        SELECT 1
        FROM friend_requests fr
        WHERE (fr.sender_id = u.id AND fr.receiver_id = (SELECT user_id FROM user_info))
           OR (fr.receiver_id = u.id AND fr.sender_id = (SELECT user_id FROM user_info))
      )
      AND NOT EXISTS (
        SELECT 1
        FROM friends
        WHERE (friends.user_id = (SELECT user_id FROM user_info) AND friends.friend_id = u.id)
      );     
  `;
        const values = [username, `%${searchTerm}%`];
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
    searchAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { searchTerm } = req.body;
        const { username } = res.locals;
        const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
    SELECT u.username
    FROM users u
    WHERE u.username ILIKE $2
    AND u.id != (SELECT user_id FROM user_info)
  `;
        const values = [username, `%${searchTerm}%`];
        try {
            const result = yield db_1.default.query(query, values);
            const usernameArray = result.rows.map((userObj) => userObj.username); // Access the 'username' property
            res.locals.searchResultsAll = usernameArray; // Store the array of usernames in 'searchResults'
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
    JOIN users AS friend ON friends.friend_id = friend.id
    WHERE friends.user_id = (SELECT id FROM users WHERE username = $1);
  `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            const friendUsernames = result.rows.map((row) => row.username);
            res.locals.friends = friendUsernames;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the friendsController.getFriends middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting friends.`,
                },
            };
            next(errorObj);
        }
    }),
    getPendingFriends: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const result = yield db_1.default.query(query, values);
            const pendingFriends = result.rows.map((row) => row.sender_username);
            res.locals.pendingFriends = pendingFriends;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting pending friend requests.`,
                },
            };
            next(errorObj);
        }
    }),
    getSentFriendRequests: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const query = `
    SELECT users.username
    FROM users
    JOIN friend_requests ON users.id = friend_requests.receiver_id
    JOIN users AS sender ON friend_requests.sender_id = sender.id
    WHERE sender.username = $1;
    `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            console.log(result.rows);
            const sentFriendRequests = result.rows.map((row) => row.username);
            res.locals.sentFriendRequests = sentFriendRequests;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting pending friend requests.`,
                },
            };
            next(errorObj);
        }
    }),
    addFriend: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield db_1.default.query(query, values);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the addFriend middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem adding friends`,
                },
            };
            next(errorObj);
        }
    }),
    acceptFriendRequest: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield db_1.default.query(insertQuery, values);
            const deleteQuery = `
        DELETE FROM friend_requests
        WHERE sender_id = (SELECT id FROM users WHERE username = $1)
          AND receiver_id = (SELECT id FROM users WHERE username = $2);
      `;
            const deleteValues = [friend, username];
            yield db_1.default.query(deleteQuery, deleteValues);
            res.locals.acceptedFriend = friend;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the acceptFriendRequest middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem accepting the friend request.`,
                },
            };
            next(errorObj);
        }
    }),
    rejectFriendRequest: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { friend } = req.body;
        try {
            const deleteQuery = `
        DELETE FROM friend_requests
        WHERE sender_id = (SELECT id FROM users WHERE username = $1)
          AND receiver_id = (SELECT id FROM users WHERE username = $2);
      `;
            const deleteValues = [friend, username];
            yield db_1.default.query(deleteQuery, deleteValues);
            res.locals.rejectedFriend = friend;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the rejectFriendRequest middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem rejecting the friend request.`,
                },
            };
            next(errorObj);
        }
    }),
    createFriendGroup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { name, friends } = req.body;
        const queryWithFriends = `
    WITH user_info AS (
      SELECT id AS owner_id
      FROM users
      WHERE username = $1
    ),
    new_group AS (
      INSERT INTO friend_groups (group_name, owner_id)
      SELECT $2, owner_id FROM user_info
      RETURNING friend_groups.id -- Specify the table for "id" column
    )
    INSERT INTO group_members (group_id, user_id)
    SELECT new_group.id, users.id 
    FROM new_group, users
    WHERE users.username = ANY($3::text[])
  `;
        const noFriendsQuery = `
      WITH user_info AS (
        SELECT id AS owner_id
        FROM users
        WHERE username = $1
      )
      INSERT INTO friend_groups (group_name, owner_id)
      SELECT $2, owner_id
      FROM user_info;
    `;
        const valuesWithFriends = [username, name, friends];
        const noFriendsValues = [username, name];
        try {
            if (friends.length > 0) {
                yield db_1.default.query(queryWithFriends, valuesWithFriends);
                res.locals.success = "SUCCESS";
                return next();
            }
            else {
                yield db_1.default.query(noFriendsQuery, noFriendsValues);
                res.locals.success = "SUCCESS";
                return next();
            }
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the createFriendGroup middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem creating that friend group.`,
                },
            };
            next(errorObj);
        }
    }),
    getFriendGroups: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const query = `
      WITH user_info AS (
        SELECT id AS owner_id
        FROM users
        WHERE username = $1
      )
      SELECT friend_groups.group_name, array_agg(users.username) AS friends
      FROM friend_groups
      LEFT JOIN group_members ON friend_groups.id = group_members.group_id
      LEFT JOIN users ON group_members.user_id = users.id
      WHERE friend_groups.owner_id = (SELECT owner_id FROM user_info)
      GROUP BY friend_groups.group_name;
    `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            console.log(result.rows);
            const friendGroupsList = result.rows.map((row) => {
                if (row.friends[0])
                    return { name: row.group_name, friends: row.friends };
                else
                    return { name: row.group_name, friends: [] };
            });
            res.locals.friendGroups = friendGroupsList;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getFriendGroups middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting friend groups.`,
                },
            };
            next(errorObj);
        }
    }),
    removeFriendFromGroup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { name, friendToRemove } = req.body;
        const query = `
      DELETE FROM group_members
      WHERE group_id = (SELECT id FROM friend_groups WHERE group_name = $2 AND owner_id = (SELECT id FROM users WHERE username = $1))
      AND user_id = (SELECT id FROM users WHERE username = $3);
    `;
        const values = [username, name, friendToRemove];
        try {
            yield db_1.default.query(query, values);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the removeFriendFromGroup middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem removing the friend from the group`,
                },
            };
            next(errorObj);
        }
    }),
    deleteFriendGroup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { groupName } = req.body;
        const query1 = `
    DELETE FROM group_members
    WHERE group_id = (SELECT id FROM friend_groups WHERE group_name = $2 AND owner_id = (SELECT id FROM users WHERE username = $1));
  `;
        const query2 = `
   DELETE FROM friend_groups
    WHERE group_name = $2 AND owner_id = (SELECT id FROM users WHERE username = $1);
   `;
        const values = [username, groupName];
        try {
            yield db_1.default.query(query1, values);
            yield db_1.default.query(query2, values);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the deleteFriendGroup middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem deleting that friend group`,
                },
            };
            next(errorObj);
        }
    }),
    getPins: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
      SELECT friend_or_group_name
      FROM pins
      WHERE owner_id = (SELECT id FROM users WHERE username = $1)
    `;
        const values = [username];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.pins = result.rows.map((item) => item.friend_or_group_name);
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting pending friend requests.`,
                },
            };
            next(errorObj);
        }
    }),
    addPin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { pinToInsert } = req.body;
        console.log("HERE");
        const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
    INSERT INTO pins (owner_id, friend_or_group_name)
    SELECT user_id, $2
    FROM user_info;
    `;
        const values = [username, pinToInsert];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.pins = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting pending friend requests.`,
                },
            };
            next(errorObj);
        }
    }),
    removePin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = res.locals;
        const { pinToRemove } = req.body;
        const query = `
    WITH user_info AS (
      SELECT id AS user_id
      FROM users
      WHERE username = $1
    )
    DELETE FROM pins
    WHERE owner_id = (SELECT user_id FROM user_info) AND friend_or_group_name = $2;
    `;
        const values = [username, pinToRemove];
        try {
            const result = yield db_1.default.query(query, values);
            res.locals.pins = result.rows;
            return next();
        }
        catch (err) {
            const errorObj = {
                log: `There was an error in the getPendingFriendRequests middleware: ${err}`,
                status: 500,
                message: {
                    err: `There was a problem getting pending friend requests.`,
                },
            };
            next(errorObj);
        }
    }),
};
exports.default = friendsController;
