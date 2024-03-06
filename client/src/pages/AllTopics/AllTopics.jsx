import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopicModal from "../../components/TopicModal/TopicModal.jsx";
import "./AllTopics.css";

function AllMessages() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

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
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<div
				onClick={() => {
					setShowModal(true);
				}}
			>
				Add Topic
			</div>
			{data.map((topic) => (
				<div key={topic._id}>
					<h2
						onClick={() => {
							navigate(`/${topic._id}`);
						}}
					>
						{topic.title}
					</h2>
					<p>{topic.description}</p>
				</div>
			))}
			{showModal && <TopicModal />}
		</div>
	);
}

export default AllMessages;
