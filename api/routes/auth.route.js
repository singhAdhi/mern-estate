import express from "express";
import { auth, signin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", auth);
router.post("/signin", signin);

export default router;
