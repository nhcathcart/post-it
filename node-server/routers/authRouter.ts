import express from "express";
import pool from '../db'
import authController from "../controllers/authController"
const router = express.Router();
const db = pool
router.post("/create-user", authController.createUser, authController.setCookie, (req, res) => {
    res.send("this is the create-user route")
})
router.post("/login", authController.getUser, authController.checkPassword, authController.setCookie, (req, res) => {
    res.send("this is the login")
})
router.post("/check-auth", authController.checkCookie, (req, res) => {
    res.send("Authenticated!")
})
router.post("/logout", (req, res) => {
    res.send("this is the logout")
})

export default router