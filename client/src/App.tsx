import { FormEvent, useState } from 'react';
import { Spinner } from './components/Spinner';

type FormProps = {
	prompt: string;
	size: string;
};

function App() {
	const [prompt, setPrompt] = useState('');
	const [size, setSize] = useState('1');
	const [output, setOutput] = useState('');
	const sizeOpts = ['Pequeño', 'Mediano', 'Grande'];
	const [isLoading, setisLoading] = useState(false);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		try {
			setisLoading(true);

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

			if (!response.ok) {
				setisLoading(false);
				throw new Error('That image could not be generated');
			}

			const data = await response.json();

			setOutput(data.data);

			setisLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="App">
			<main>
				<section className="showcase">
					<form id="image-form" onSubmit={handleSubmit}>
						<h1>GeneratAI</h1>
						<h2>Genera imágenes solo con una oración.</h2>
						<div className="form-control">
							<input
								type="text"
								id="prompt"
								placeholder="Ej: Un auto rojo"
								required
								onChange={e => setPrompt(e.target.value)}
							/>
						</div>

						<div className="form-control">
							<select required name="size" id="size" onChange={e => setSize(e.target.value)}>
								{sizeOpts.map((option, i) => (
									<option value={i + 1} key={i}>
										{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
									</option>
								))}
							</select>
						</div>

						<button type="submit" className="btn">
							Generar
						</button>
					</form>
				</section>

				<section className="image">
					<div className="image-container">
						<h2 className="msg"></h2>
						<img src={output} alt={output === '' ? '' : prompt} id="image" />
					</div>
					{isLoading && <Spinner />}
				</section>
			</main>
		</div>
	);
}

export default App;
