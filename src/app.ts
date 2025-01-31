import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { setRoutes } from "@/router";

export const app: Application = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

setRoutes(app);
