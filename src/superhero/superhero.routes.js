import { Router } from "express";
import { superHero, getSuperhero } from "./superhero.controller.js";

const router = Router();

router.get("/:uid", superHero )
router.get("/", getSuperhero )



export default router;