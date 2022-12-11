import axios from 'axios';

export const generateImage = async (prompt: string, size: string): Promise<any> => {
	try {
		const response = await fetch('http://localhost:8080/openai/image/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt,
				size,
			}),
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};
