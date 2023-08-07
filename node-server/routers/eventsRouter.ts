import express from "express";
import pool from "../db";
import authController from "../controllers/authController";
import eventsController from "../controllers/eventsController";
// import authController from "../controllers/authController"
const router = express.Router();
const db = pool;
router.post(
  "/post-event",
  authController.checkCookie,
  eventsController.postEvent,
  (req, res) => {
    res.json("success");
  }
);
router.delete(
  "/delete-event",
  authController.checkCookie,
  eventsController.deleteEvent,
  (req, res) => {
    return res.json("SUCCESS");
  }
);
router.get(
  "/get-events",
  authController.checkCookie,
  eventsController.getEvents,
  (req, res) => {
    res.json(res.locals.events);
  }
);
router.post(
  "/get-friend-group-events",
  authController.checkCookie,
  eventsController.getFriendGroupEvents,
  (req, res) => {
    res.json(res.locals.friendGroupEvents);
  }
);
router.post(
    "/get-friend-events",
    authController.checkCookie,
    eventsController.getFriendEvents,
    (req, res) => {
      res.json(res.locals.friendEvents);
    }
  );

export default router;
