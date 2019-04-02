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
        const veiculo = await Veiculos.find();
        return res.json(veiculo);
    },

    /**
     * Método para criar veículos
     * @param {*} req 
     * @param {*} res 
     */
    async cadastroVeiculos(req, res){
        let regex = /^[a-zA-Z]{3}[0-9]{4}$/;
        if(!regex.test(req.body.placa)){
            return res.json({
                erro: 'Placa Inválida, a placa não atende ao padrão.'
            });
        }
        else{
            const veiculos = await Veiculos.create(req.body);
            return res.json(veiculos);
        }
    },

    /**
     * Método para consultar veículo por placa
     * @param {*} req 
     * @param {*} res 
     */
    async consultarVeiculoPlaca(req, res){
        const veiculo = await Veiculos.find(
            { 
                placa: req.params.placa 
            });
        return res.json(veiculo);
    },

    /**
     * Método para editar veículo por placa
     * @param {*} req 
     * @param {*} res 
     */
    async editarVeiculosPlaca(req, res){
        const veiculo = await Veiculos.findOneAndUpdate({ 
                placa: req.params.placa 
            }, 
            req.body, 
            { 
                new: true 
            });
        return res.json(veiculo);
    },

    /**
     * Método para deletar veículo pela placa
     * @param {*} req 
     * @param {*} res 
     */
    async deletarVeiculoPlaca(req, res){
        await Veiculos.findOneAndDelete(
            { 
                placa: req.params.placa 
            });
        return res.json({
            sucesso: "Veículo Deletado com sucesso!"
        });
    },

    /**
     * Método para filtro pela marca
     * @param {*} req 
     * @param {*} res 
     */
    async filtrosMarca(req, res){
        const veiculo = await Veiculos.find(
            { 
                marca: req.params.marca 
            });
        return res.json(veiculo);
    },

    /**
     * Método para filtro com cor
     * @param {*} req 
     * @param {*} res 
     */
    async filtroCor(req, res){
        const veiculo = await Veiculos.find(
            { 
                cor: req.params.cor 
            });
        return res.json(veiculo);
    },


    /**
     * Método para adicionar revisões no veículo
     * @param {*} req 
     * @param {*} res 
     */
    async adicionarRevisao(req, res){
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
        return res.json(veiculo);
    },

    /**
     * Método para consultar o total do valor pela placa
     * @param {*} req 
     * @param {*} res 
     */
    async consultarTotalPlaca(req, res){
        const veiculo = await Veiculos.aggregate([
            { $match: {"placa": req.params.placa }},
            { $project : {
                _id : "$revisoes", total : { $sum : "$revisoes.valor" } 
            }}
        ]);
        return res.json(veiculo);
    },

    /**
     * Método para consultar o total do valor pela marca
     * @param {*} req 
     * @param {*} res 
     */
    async consultarTotalMarca(req, res){
        const veiculo = await Veiculos.aggregate([
            { $match: { "marca": req.params.marca }},
            { $project : {
                _id : "$revisoes", total : { $sum : "$revisoes.valor" } 
            }}
        ]);
        return res.json(veiculo);
    }
}