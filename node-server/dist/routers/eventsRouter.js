"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const authController_1 = __importDefault(require("../controllers/authController"));
const eventsController_1 = __importDefault(require("../controllers/eventsController"));
// import authController from "../controllers/authController"
const router = express_1.default.Router();
const db = db_1.default;
router.post("/post-event", authController_1.default.checkCookie, eventsController_1.default.postEvent, (req, res) => {
    res.json("success");
});
router.delete("/delete-event", authController_1.default.checkCookie, eventsController_1.default.deleteEvent, (req, res) => {
    return res.json("SUCCESS");
});
router.get("/get-events", authController_1.default.checkCookie, eventsController_1.default.getEvents, (req, res) => {
    res.json(res.locals.events);
});
router.post("/get-friend-group-events", authController_1.default.checkCookie, eventsController_1.default.getFriendGroupEvents, (req, res) => {
    res.json(res.locals.friendGroupEvents);
});
router.post("/get-friend-events", authController_1.default.checkCookie, eventsController_1.default.getFriendEvents, (req, res) => {
    res.json(res.locals.friendEvents);
});
exports.default = router;
