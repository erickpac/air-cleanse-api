import { Application, Router } from "express";
import { router as ServerStatusRouter } from "@/components/server-status/network";
import { router as PropertiesRouter } from "@/components/properties/network";

type Route = [string, Router];
const routes: Route[] = [
  ["server-status", ServerStatusRouter],
  ["properties", PropertiesRouter],
];

const setRoutes = (app: Application) => {
  const router = Router();

  app.use("/api/v1", router);

  routes.forEach(([path, route]) => {
    router.use(`/${path}`, route);
  });
};

export default setRoutes;
