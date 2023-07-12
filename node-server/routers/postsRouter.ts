import express from "express";
import pool from '../db'
// import authController from "../controllers/authController"
const router = express.Router();
const db = pool
router.get("/recent-posts", (req, res) => {
    //should probably get like the most recent 20? and then do an infinite scroll thing. Needs some research.
    res.send("this is the recent-posts route")
})
router.get("/posts-by-user/:username", (req, res) => {
    res.send("this is the posts-by-user route")
})
router.get("/posts-by-likes", (req, res) => {
    res.send("this is the posts-by-likes route")
})

export default router