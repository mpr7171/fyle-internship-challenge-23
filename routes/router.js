import express from "express";

import { getUserData, getUserDemo } from "../controller/controller.js";
const route = express.Router();

/**
 * @description for demo route
 * @method GET /api/demo/:username
 */
route.get("/api/demo/:username", getUserDemo);

/**
 * @description for getting user data
 * @method GET /api/:username
 */
route.get("/api/:username", getUserData);

export default route;
