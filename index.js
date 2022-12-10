require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');

app
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use('/openai', require(`./server/routes/OA`));

app.get('/', function (req, res) {
	res.render(path.resolve(__dirname, './client/dist/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.listen(port, () => console.log(`server started on http://localhost:${port}`));
