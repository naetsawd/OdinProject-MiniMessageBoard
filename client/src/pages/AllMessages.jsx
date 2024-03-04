import React, { useState, useEffect } from "react";
import axios from "axios";

function AllMessages() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
					<h2>{topic.title}</h2>
					<p>{topic.description}</p>
					<ul>
						{topic.messages.map((message) => (
							<li key={message._id}>
								<strong>{message.author}: </strong> {message.message}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default AllMessages;
