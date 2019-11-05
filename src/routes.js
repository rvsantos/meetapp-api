import { Router } from "express";

const routes = new Router();

routes.get("/", (res, req) => res.send({ ok: true }));

export default routes;
