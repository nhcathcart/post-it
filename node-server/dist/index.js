"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
app.get('/', (req, res) => {
    res.send('Hello from the server.');
});
app.get('/anotherOne', (req, res) => {
    res.send('Another ONe');
});
app.listen(port, () => {
    console.log('server listening on port 8000');
});
