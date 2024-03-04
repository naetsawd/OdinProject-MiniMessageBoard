import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: () => {
			return new Date().toISOString().slice(0, 16).replace("T", " ");
		},
	},
});

const topicSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: () => {
			return new Date().toISOString().slice(0, 16).replace("T", " ");
		},
	},
	messages: {
		type: [messageSchema],
		required: false,
	},
});

export const Topic = mongoose.model("Topic", topicSchema);
