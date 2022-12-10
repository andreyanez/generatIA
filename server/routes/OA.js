const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/OA');

router.post('/image/generate', generateImage);

module.exports = router;
