import { Application, Router } from "express";
import { router as PropertiesRouter } from "@/components/properties/network";
import { router as CleanersRouter } from "@/components/cleaners/network";
import { router as CleaningSchedulesRouter } from "@/components/cleaningschedules/network";
import { router as AuthRouter } from "@/components/auth/network";
import { router as TasksRouter } from "@/components/tasks/network";
import { notFound } from "@/middlewares/not-found";
import { errorHandler } from "@/middlewares/error-handler";
import { auth } from "@/middlewares/auth";

type Route = [string, Router];
const privateRoutes: Route[] = [
  ["properties", PropertiesRouter],
  ["cleaners", CleanersRouter],
  ["schedules", CleaningSchedulesRouter],
  ["tasks", TasksRouter],
];

const publicRoutes: Route[] = [["auth", AuthRouter]];

export const setRoutes = (app: Application) => {
  const router = Router();

  app.use("/api/v1", router);
  app.use(notFound);
  app.use(errorHandler);

  privateRoutes.forEach(([path, route]) => {
    router.use(`/${path}`, auth, route);
  });

  publicRoutes.forEach(([path, route]) => {
    router.use(`/${path}`, route);
  });
};
