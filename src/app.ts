import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());