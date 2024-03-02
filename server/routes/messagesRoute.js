import express from "express";
import { Message } from "../models/messageModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		if (!req.body.name || !req.body.message) {
			return res.status(400).send({ message: "Enter all required fields" });
		}

		const newMessage = {
			name: req.body.name,
			message: req.body.message,
			date: new Date(),
		};

		const message = await Message.create(newMessage);

		return res.status(201).send(message);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const messages = await Message.find({});

		return res.status(200).send({ count: messages.length, messages: messages });
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

export default router;
