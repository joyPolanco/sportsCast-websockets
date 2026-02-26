import { Router } from "express";
import { matches } from "../db/schema.js";
import { getMatches, handleCreateMatch } from "../controllers/matches.controller.js";

export const matchRouter = Router();

matchRouter.get("/", getMatches);
matchRouter.post("/", handleCreateMatch )

