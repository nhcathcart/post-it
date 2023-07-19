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
    //should probably get like the most recent 20? and then do an infinite scroll thing. Needs some research.
    res.json("success");
});
router.get("/get-events", authController_1.default.checkCookie, eventsController_1.default.getEvents, (req, res) => {
    res.json(res.locals.events);
});
exports.default = router;
