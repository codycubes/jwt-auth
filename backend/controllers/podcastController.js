import mongoose from "mongoose";
import Podcast from "../models/podcastmodel.js";

export const getPodcast = async (req, res) => {
	try {
		const podcasts = await Podcast.find({});
		res.status(200).json({ success: true, data: podcasts });
	} catch (error) {
		console.log("error in fetching podcasts:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createPodcast = async (req, res) => {
	const podcast = req.body; 

	if (!podcast.name || 
        !podcast.host || 
        !podcast.description || 
        !podcast.genre || 
        !podcast.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newPodcast = new Podcast(podcast);

	try {
		await newPodcast.save();
		res.status(201).json({ success: true, data: newPodcast });
	} catch (error) {
		console.error("Error in Create podcast:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updatePodcast = async (req, res) => {
	const { id } = req.params;

	const podcast = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Podcast Id" });
	}

	try {
		const updatedPodcast = await Podcast.findByIdAndUpdate(id, podcast, { new: true });
		res.status(200).json({ success: true, data: updatedPodcast });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deletePodcast = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Podcast Id" });
	}

	try {
		await Podcast.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Podcast deleted" });
	} catch (error) {
		console.log("error in deleting podcast:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};