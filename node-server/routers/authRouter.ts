import express from "express";
import pool from '../db'
const router = express.Router();
const db = pool
router.post("/create-user", (req, res) => {
    res.send("this is the create-user route")
})
router.post("/login", (req, res) => {
    res.send("this is the login")
})
router.post("/logout", (req, res) => {
    res.send("this is the logout")
})

export default router