"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const eventsRouter_1 = __importDefault(require("./routers/eventsRouter"));
const app = (0, express_1.default)();
const port = 8001;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRouter_1.default);
app.use("/api/events", eventsRouter_1.default);
app.get('/', (req, res) => {
    res.send('Hello from the server.');
});
app.use((err, req, res, next) => {
    const defautErr = {
        log: "Express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
    };
    const errorObj = Object.assign({}, defautErr);
    errorObj.message.err = err.message.err;
    errorObj.log = err.log;
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
