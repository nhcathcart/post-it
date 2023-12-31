"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.default.Pool({
    connectionString: process.env.POSTGRES_URI,
});
pool.connect()
    .then(() => {
    console.log('Connected to PostgreSQL database');
})
    .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
});
exports.default = pool;
