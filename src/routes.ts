export {};

const ExemplaresController = require('./controllers/ExemplaresController');
const DiscentesController = require('./controllers/DiscentesController');
const express = require('express');
const router = express.Router();

router.post('/exemplares/create', ExemplaresController.create);
router.put('/exemplares/repor/:id', ExemplaresController.repor);
router.get('/exemplares/:id', ExemplaresController.show);

router.post('/discentes/create', DiscentesController.create);
router.get('/discentes', DiscentesController.index);


router.get('/exemplares', ExemplaresController.index);

router.post('/discentes/auth', DiscentesController.login);
router.post('/discentes/reservar', DiscentesController.reservarExemplar);
router.get('/discentes/reservas/:id', DiscentesController.mostrarReservas);
router.get('/discentes/:id', DiscentesController.show);

module.exports = router;