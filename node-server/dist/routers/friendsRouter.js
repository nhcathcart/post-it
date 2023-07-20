"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const authController_1 = __importDefault(require("../controllers/authController"));
const friendsController_1 = __importDefault(require("../controllers/friendsController"));
const router = express_1.default.Router();
const db = db_1.default;
router.post("/search", authController_1.default.checkCookie, friendsController_1.default.search, (req, res) => {
    return res.json(res.locals.searchResults);
});
router.post("/add-friend", authController_1.default.checkCookie, friendsController_1.default.addFriend, (req, res) => {
    return res.json("SUCCESS");
});
router.get("/get-friends", authController_1.default.checkCookie, friendsController_1.default.getFriends, (req, res) => {
    return res.json(res.locals.friends);
});
exports.default = router;
