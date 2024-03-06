import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Topic() {
	const { id } = useParams();
	const [topic, setTopic] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:3000/topics/${id}`)
			.then((res) => {
				setTopic(res.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h2>{topic.title}</h2>
			<p>{topic.description}</p>
			<p>{topic.createdAt}</p>
			<ul>
				{topic.messages?.map((message) => (
					<li key={message._id}>
						<strong>{message.author}: </strong> 
                        {message.createdAt}
						<br />
						{message.message}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Topic;
