import React from "react";
import { Route, Routes } from "react-router-dom";
import AllMessages from "./pages/AllMessages.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<AllMessages />} />
		</Routes>
	);
}

export default App;
