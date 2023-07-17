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
    return res.json({ username: res.locals.username });
})
router.post("/logout", authController.invalidateCookie, (req, res) => {
    return res.json("successful logout")
})

export default router