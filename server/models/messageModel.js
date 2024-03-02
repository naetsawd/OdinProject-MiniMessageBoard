import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
	name: { type: String, required: true },
	message: { type: String, required: true },
	date: { type: String, requred: true },
});

export const Message = mongoose.model("Message", messageSchema);
