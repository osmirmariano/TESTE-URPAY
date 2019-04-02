const express = require('express');
const routes = express.Router();

const VeiculosController = require('./controllers/VeiculosControllers');

routes.get('/veiculos', VeiculosController.listarTodosVeiculos);//Rota para listar todos os veículos
routes.post('/veiculos', VeiculosController.cadastroVeiculos); //Rota para cadastrar veículos
routes.get('/veiculos/:placa', VeiculosController.consultarVeiculoPlaca); //Rota para consultar veículo pela placa
routes.put('/veiculos/:placa', VeiculosController.editarVeiculosPlaca); //Rota para editar Veículo pela placa
routes.delete("/veiculos/:placa", VeiculosController.deletarVeiculoPlaca); //Rota para deletar Veículo pela placa

routes.post('/veiculos/revisao/:placa', VeiculosController.adicionarRevisao); //Rota para adicionar revisão no veículo
routes.get('/veiculos/revisao-placa/:placa', VeiculosController.consultarTotalPlaca); //Rota para consultar o valor total pela placa
routes.get('/veiculos/revisao-marca/:marca', VeiculosController.consultarTotalMarca) //Rota para consultar o valor total pela marca

routes.get('/veiculos/filtro-marca/:marca', VeiculosController.filtrosMarca); //Rota para consultar pela marca
routes.get('/veiculos/filtro-cor/:cor', VeiculosController.filtroCor); //Rota para consultar pela marca

module.exports = routes;