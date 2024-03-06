import express from "express";
import { Topic } from "../models/topicModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { title, description } = req.body;
		const newTopic = new Topic({
			title,
			description,
			messages: [],
		});
		const savedTopic = await newTopic.save();
		res.status(201).json(savedTopic);
	} catch (error) {
		console.error("Error creating new topic:", error);
		res.status(500).json({ error: "Unable to create new topic" });
	}
});

router.post("/:topicId/messages", async (req, res) => {
	try {
		const topicId = req.params.topicId;
		const newMessage = req.body;

		const topic = await Topic.findById(topicId);

		if (!topic) {
			return res.status(404).json({ error: "Topic not found" });
		}

		topic.messages.push(newMessage);

		await topic.save();

		return res.status(200).json(topic);
	} catch (error) {
		console.error("Error adding message:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const topics = await Topic.find();
		res.status(200).json(topics);
	} catch (error) {
		console.error("Error fetching topics:", error);
		res.status(500).json({ error: "Unable to fetch topics" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const topic = await Topic.findById(req.params.id);
		if (!topic) {
			return res.status(404).json({ error: "Topic not found" });
		}
		res.status(200).json(topic);
	} catch (error) {
		console.error("Error fetching topic:", error);
		res.status(500).json({ error: "Unable to fetch topic" });
	}
});

export default router;
