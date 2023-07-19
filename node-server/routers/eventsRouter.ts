import express from "express";
import pool from '../db'
import authController from "../controllers/authController"
import eventsController from "../controllers/eventsController"
// import authController from "../controllers/authController"
const router = express.Router();
const db = pool
router.post("/post-event", authController.checkCookie, eventsController.postEvent, (req, res) => {
    //should probably get like the most recent 20? and then do an infinite scroll thing. Needs some research.
    res.json("success")
})
router.get("/get-events", authController.checkCookie, eventsController.getEvents, (req, res) => {
    res.json(res.locals.events)
})


export default router