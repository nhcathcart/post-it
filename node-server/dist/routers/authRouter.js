"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
const db = db_1.default;
router.post("/create-user", authController_1.default.createUser, authController_1.default.setCookie, (req, res) => {
    return res.json({ username: res.locals.username });
});
router.post("/login", authController_1.default.getUser, authController_1.default.checkPassword, authController_1.default.setCookie, (req, res) => {
    return res.json({ username: res.locals.username });
});
router.post("/check-auth", authController_1.default.checkCookie, (req, res) => {
    return res.json({ username: res.locals.username });
});
router.post("/logout", authController_1.default.invalidateCookie, (req, res) => {
    return res.json("successful logout");
});
exports.default = router;
