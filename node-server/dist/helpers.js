"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFriendEventObj = void 0;
function makeFriendEventObj(events) {
    const output = {};
    for (let i = 0; i < events.length; i++) {
        const username = events[i].username;
        if (username in output) {
            output[username].push(events[i]);
        }
        else {
            output[username] = [events[i]];
        }
    }
    return output;
}
exports.makeFriendEventObj = makeFriendEventObj;
