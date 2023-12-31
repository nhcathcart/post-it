import express from "express";
import pool from "../db";
import authController from "../controllers/authController";
import friendsController from "../controllers/friendsController";
const router = express.Router();
const db = pool;
router.post(
  "/search",
  authController.checkCookie,
  friendsController.search,
  (req, res) => {
    return res.json(res.locals.searchResults);
  }
);
router.post(
  "/search-all",
  authController.checkCookie,
  friendsController.searchAll,
  (req, res) => {
    return res.json(res.locals.searchResultsAll);
  }
);
router.post(
  "/add-friend",
  authController.checkCookie,
  friendsController.addFriend,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.get(
  "/get-friends",
  authController.checkCookie,
  friendsController.getFriends,
  (req, res) => {
    return res.json(res.locals.friends);
  }
);
router.get(
  "/get-pending-friends",
  authController.checkCookie,
  friendsController.getPendingFriends,
  (req, res) => {
    return res.json(res.locals.pendingFriends);
  }
);
router.get(
  "/get-sent-friend-requests",
  authController.checkCookie,
  friendsController.getSentFriendRequests,
  (req, res) => {
    return res.json(res.locals.sentFriendRequests);
  }
);
router.post(
  "/accept-friend-request",
  authController.checkCookie,
  friendsController.acceptFriendRequest,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.post(
  "/reject-friend-request",
  authController.checkCookie,
  friendsController.rejectFriendRequest,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.post(
  "/add-friend-group",
  authController.checkCookie,
  friendsController.createFriendGroup,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.post("/add-friend-to-group", authController.checkCookie, (req, res) => {
  return res.json("SUCCESS");
});
router.delete(
  "/remove-friend-from-group",
  authController.checkCookie,
  friendsController.removeFriendFromGroup,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.delete(
  "/delete-friend-group",
  authController.checkCookie,
  friendsController.deleteFriendGroup,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.get(
  "/get-friend-groups",
  authController.checkCookie,
  friendsController.getFriendGroups,
  (req, res) => {
    return res.json(res.locals.friendGroups);
  }
);
router.get(
  "/get-pins",
  authController.checkCookie,
  friendsController.getPins,
  (req, res) => {
    return res.json(res.locals.pins);;
  }
);
router.post(
  "/add-pin",
  authController.checkCookie,
  friendsController.addPin,
  (req, res) => {
    return res.json("SUCCESS");;
  }
);
router.post(
  "/remove-pin",
  authController.checkCookie,
  friendsController.removePin,
  (req, res) => {
    return res.json("SUCCESS");;
  }
);

export default router;
