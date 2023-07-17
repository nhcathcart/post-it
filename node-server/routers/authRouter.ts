import express from "express";
import pool from '../db'
import authController from "../controllers/authController"
const router = express.Router();
const db = pool
router.post("/create-user", authController.createUser, authController.setCookie, (req, res) => {
    return res.json({ username: res.locals.username });
})
router.post("/login", authController.getUser, authController.checkPassword, authController.setCookie, (req, res) => {
    return res.json({username: res.locals.username})
})
router.post("/check-auth", authController.checkCookie, (req, res) => {
    return res.send("Authenticated!")
})
router.post("/logout", (req, res) => {
    return res.send("this is the logout")
})

export default router