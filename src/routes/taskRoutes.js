const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/tasks', TaskController.listar);
router.post('/tasks', TaskController.criar);
router.get('/tasks/categoria/:categoria', TaskController.buscar_cat);
router.get('/tasks/periodo', TaskController.buscar_criacao);
router.get('/tasks/:id', TaskController.buscar_id);
router.put('/tasks/:id', TaskController.atualizar);
router.delete('/tasks/:id', TaskController.excluir);


module.exports = router;