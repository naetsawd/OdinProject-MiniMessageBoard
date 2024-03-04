import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, uri } from "./config.js";
import topicsRoute from "./routes/topicsRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/topics", topicsRoute);

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});

mongoose
	.connect(uri)
	.then(() => {
		console.log("MongoDB connection established");
	})
	.catch((error) => {
		console.log(error.message);
	});
