const mongoose = require('mongoose');
const Veiculos = mongoose.model('Veiculos');

module.exports = {
    
    async criarProprietario(req, res){

    },

    /**
     * Método para listar todos os veículos cadastrados
     * @param {*} req 
     * @param {*} res 
     */
    async listarTodosVeiculos(req, res){
        try {
            const veiculo = await Veiculos.find();
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para criar veículos
     * @param {*} req 
     * @param {*} res 
     */
    async cadastroVeiculos(req, res){
        let regex = /^[a-zA-Z]{3}[0-9]{4}$/;
        try {
            if(!regex.test(req.body.placa)){
                return res.json({
                    erro: 'Placa Inválida, a placa não atende ao padrão.'
                });
            }
            else{
                const veiculos = await Veiculos.create(req.body);
                return res.status(200).json(veiculos);
            }
        } catch (error) {
            return res.status(400).json(error);
        }  
    },

    /**
     * Método para consultar veículo por placa
     * @param {*} req 
     * @param {*} res 
     */
    async consultarVeiculoPlaca(req, res){
        try {
            const veiculo = await Veiculos.find(
                { 
                    placa: req.params.placa 
                });
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para editar veículo por placa
     * @param {*} req 
     * @param {*} res 
     */
    async editarVeiculosPlaca(req, res){
        try {
            const veiculo = await Veiculos.findOneAndUpdate({ 
                placa: req.params.placa 
            }, 
            req.body, 
            { 
                new: true 
            });
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para deletar veículo pela placa
     * @param {*} req 
     * @param {*} res 
     */
    async deletarVeiculoPlaca(req, res){
        try {
            await Veiculos.findOneAndDelete(
                { 
                    placa: req.params.placa 
                });
            return res.status(200).json({
                sucesso: "Veículo Deletado com sucesso!"
            });
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para filtro pela marca
     * @param {*} req 
     * @param {*} res 
     */
    async filtrosMarca(req, res){
        try {
            const veiculo = await Veiculos.find(
                { 
                    marca: req.params.marca 
                });
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para filtro com cor
     * @param {*} req 
     * @param {*} res 
     */
    async filtroCor(req, res){
        try {
            const veiculo = await Veiculos.find(
                { 
                    cor: req.params.cor 
                });
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },


    /**
     * Método para adicionar revisões no veículo
     * @param {*} req 
     * @param {*} res 
     */
    async adicionarRevisao(req, res){
        try {
            const veiculo = await Veiculos.update(
                {
                    placa: req.params.placa
                },
                { 
                    $push: { revisoes: { 'data_revisao': req.body.data_revisao, 'valor': req.body.valor }}
                }, 
                { 
                    new: true 
                });
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
        
    },

    /**
     * Método para consultar o total do valor pela placa
     * @param {*} req 
     * @param {*} res 
     */
    async consultarTotalPlaca(req, res){
        try {
            const veiculo = await Veiculos.aggregate([
                { $match: {"placa": req.params.placa }},
                { $project : {
                    _id : "$revisoes", total : { $sum : "$revisoes.valor" } 
                }}
            ]);
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    /**
     * Método para consultar o total do valor pela marca
     * @param {*} req 
     * @param {*} res 
     */
    async consultarTotalMarca(req, res){
        try {
            const veiculo = await Veiculos.aggregate([
                { $match: { "marca": req.params.marca }},
                { $project : {
                    _id : "$revisoes", total : { $sum : "$revisoes.valor" } 
                }}
            ]);
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(400).json(error);
        }
        
    }
}