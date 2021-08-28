export {};

const ExemplaresController = require('./controllers/ExemplaresController');
const express = require('express');
const router = express.Router();

router.post('/exemplares/create', ExemplaresController.create);
router.get('/exemplares', ExemplaresController.index);
router.get('/exemplares/:id', ExemplaresController.show);

module.exports = router;