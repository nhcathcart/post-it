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
    res.send("this is the create-user route");
});
router.post("/login", authController_1.default.getUser, authController_1.default.checkPassword, authController_1.default.setCookie, (req, res) => {
    res.send("this is the login");
});
router.post("/check-auth", authController_1.default.checkCookie, (req, res) => {
    res.send("Authenticated!");
});
router.post("/logout", (req, res) => {
    res.send("this is the logout");
});
exports.default = router;
