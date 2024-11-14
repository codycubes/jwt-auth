import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        host: {
			type: String,
			required: true,
		},
        description: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Podcast = mongoose.model("Podcast", podcastSchema);

export default Podcast;