import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AllTopics.css"

function AllMessages() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:3000/topics")
			.then((res) => {
				setData(res.data);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div className="loading-spinner"></div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			{data.map((topic) => (
				<div key={topic._id}>
					<h2 onClick={() => {navigate(`/${topic._id}`)}}>{topic.title}</h2>
					<p>{topic.description}</p>
				</div>
			))}
		</div>
	);
}

export default AllMessages;
