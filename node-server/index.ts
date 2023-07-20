import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import eventsRouter from "./routers/eventsRouter";
import friendsRouter from "./routers/friendsRouter";

const app = express();
const port = 8001;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/friends", friendsRouter);
app.get("/", (req, res) => {
  res.send("Hello from the server."); //This will serve the front-end dist files.
});

export interface ErrorObject {
  log: string;
  status: number;
  message: { err: string };
}
app.use((err: ErrorObject, req: Request, res: Response, next: NextFunction) => {
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
