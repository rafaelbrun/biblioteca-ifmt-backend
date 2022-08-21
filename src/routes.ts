export {};
import express from 'express';

const AuthController = require('./controllers/AuthController');
const DiscentesController = require('./controllers/DiscentesController');
const ExemplaresController = require('./controllers/ExemplaresController');

const router = express.Router();

router.post('/auth/login', AuthController.login);

router.post('/exemplares/create', ExemplaresController.create);
router.put('/exemplares/repor/:id', ExemplaresController.repor);
router.get('/exemplares/:id', ExemplaresController.show);
router.post('/exemplares/multi', ExemplaresController.getMultipleIds);
router.get('/exemplares', ExemplaresController.index);

router.post('/discentes/create', DiscentesController.create);
router.post('/discentes/reservar', DiscentesController.reservarExemplar);
router.post('/discentes/interesse', DiscentesController.criarInteresse);
router.post(
  '/discentes/interesse/remover',
  DiscentesController.removerInteresse,
);
router.get('/discentes', DiscentesController.index);
router.get('/discentes/reservas/:id', DiscentesController.mostrarReservas);
router.get('/discentes/:id', DiscentesController.show);

module.exports = router;
