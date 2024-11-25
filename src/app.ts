import express, { Application } from "express";
import cors from "cors";
import setRoutes from "./router";
import * as middleware from "./middlewares";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(middleware.notFound);
app.use(middleware.errorHandler);

setRoutes(app);

export default app;
