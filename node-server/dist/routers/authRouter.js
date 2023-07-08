"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
const db = db_1.default;
router.post("/create-user", (req, res) => {
    res.send("this is the create-user route");
});
router.post("/login", (req, res) => {
    res.send("this is the login");
});
router.post("/logout", (req, res) => {
    res.send("this is the logout");
});
exports.default = router;
