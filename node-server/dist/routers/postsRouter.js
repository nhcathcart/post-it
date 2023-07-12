"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
// import authController from "../controllers/authController"
const router = express_1.default.Router();
const db = db_1.default;
router.get("/recent-posts", (req, res) => {
    //should probably get like the most recent 20? and then do an infinite scroll thing. Needs some research.
    res.send("this is the recent-posts route");
});
router.get("/posts-by-user/:username", (req, res) => {
    res.send("this is the posts-by-user route");
});
router.get("/posts-by-likes", (req, res) => {
    res.send("this is the posts-by-likes route");
});
exports.default = router;
