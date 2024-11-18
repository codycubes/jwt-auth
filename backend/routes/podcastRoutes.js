import express from 'express';
import { createPodcast, deletePodcast, getPodcast, updatePodcast } from '../controllers/podcastController.js';

const router = express.Router();

router.get('/', getPodcast);
router.post('/', createPodcast); // Ensure createPodcast is correctly imported and used
router.put('/:id', updatePodcast);
router.delete('/:id', deletePodcast);

export default router;
