export {};

const ExemplaresController = require('./controllers/ExemplaresController');
const express = require('express');
const router = express.Router();

router.post('/exemplares/create', ExemplaresController.create);

module.exports = router;