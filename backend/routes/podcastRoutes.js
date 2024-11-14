import express from "express";

import { createPodcast, deletePodcast, getPodcast, updatePodcast } from "../controllers/podcastController.js";

const router = express.Router();

router.get("/", getPodcast);
router.post("/", createPodcast);
router.put("/:id", updatePodcast);
router.delete("/:id", deletePodcast);

export default router;