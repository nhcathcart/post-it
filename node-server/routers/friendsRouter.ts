import express from "express";
import pool from '../db'
import authController from "../controllers/authController"
import friendsController from "../controllers/friendsController";
const router = express.Router();
const db = pool
router.post("/search", authController.checkCookie, friendsController.search, (req, res) => {
    return res.json(res.locals.searchResults);
})
router.post("/add-friend", authController.checkCookie, friendsController.addFriend, (req, res) => {
    return res.json("SUCCESS")
})
router.get("/get-friends", authController.checkCookie, friendsController.getFriends, (req, res) => {
    return res.json(res.locals.friends)
})


export default router