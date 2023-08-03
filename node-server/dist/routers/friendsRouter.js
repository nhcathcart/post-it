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
router.post("/search-all", authController_1.default.checkCookie, friendsController_1.default.searchAll, (req, res) => {
    return res.json(res.locals.searchResultsAll);
});
router.post("/add-friend", authController_1.default.checkCookie, friendsController_1.default.addFriend, (req, res) => {
    return res.json("SUCCESS");
});
router.get("/get-friends", authController_1.default.checkCookie, friendsController_1.default.getFriends, (req, res) => {
    return res.json(res.locals.friends);
});
router.get("/get-pending-friends", authController_1.default.checkCookie, friendsController_1.default.getPendingFriends, (req, res) => {
    return res.json(res.locals.pendingFriends);
});
router.get("/get-sent-friend-requests", authController_1.default.checkCookie, friendsController_1.default.getSentFriendRequests, (req, res) => {
    return res.json(res.locals.sentFriendRequests);
});
router.post("/accept-friend-request", authController_1.default.checkCookie, friendsController_1.default.acceptFriendRequest, (req, res) => {
    return res.json("SUCCESS");
});
router.post("/reject-friend-request", authController_1.default.checkCookie, friendsController_1.default.rejectFriendRequest, (req, res) => {
    return res.json("SUCCESS");
});
router.post("/add-friend-group", authController_1.default.checkCookie, friendsController_1.default.createFriendGroup, (req, res) => {
    return res.json("SUCCESS");
});
router.post("/add-friend-to-group", authController_1.default.checkCookie, (req, res) => {
    return res.json("SUCCESS");
});
router.delete("/remove-friend-from-group", authController_1.default.checkCookie, friendsController_1.default.removeFriendFromGroup, (req, res) => {
    return res.json("SUCCESS");
});
router.delete("/delete-friend-group", authController_1.default.checkCookie, friendsController_1.default.deleteFriendGroup, (req, res) => {
    return res.json("SUCCESS");
});
router.get("/get-friend-groups", authController_1.default.checkCookie, friendsController_1.default.getFriendGroups, (req, res) => {
    return res.json(res.locals.friendGroups);
});
router.get("/get-pins", authController_1.default.checkCookie, friendsController_1.default.getPins, (req, res) => {
    return res.json(res.locals.pins);
    ;
});
router.post("/add-pin", authController_1.default.checkCookie, friendsController_1.default.addPin, (req, res) => {
    return res.json("SUCCESS");
    ;
});
router.post("/remove-pin", authController_1.default.checkCookie, friendsController_1.default.removePin, (req, res) => {
    return res.json("SUCCESS");
    ;
});
exports.default = router;
