import React, { useState, useEffect } from "react";

function AllMessages() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:3000/messages");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Data from API:</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export default AllMessages;
