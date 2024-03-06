import React from "react";
import { Route, Routes } from "react-router-dom";
import AllTopics from "./pages/AllTopics.jsx";
import Topic from "./pages/Topic.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<AllTopics />} />
			<Route path="/:id" element={<Topic />} />
		</Routes>
	);
}

export default App;
