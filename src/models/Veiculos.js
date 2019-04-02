const mongoose = require('mongoose');

//Declaração da Schema para a lista de revisões
const RevisoesSchema = new mongoose.Schema({
    data_revisao: String,
    valor: Number
});

//Declaração da Schema para cadastro de veículos
const VeiculosSchema = new mongoose.Schema({
    placa: {
        type: String,
        require: true,
        unique: true
    },
    marca: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    cor: {
        type: String,
        require: true
    },
    ano_fabricacao: {
        type: Date,
        require: true,
    },
    data_cadastro: {
        type: Date,
        default: Date.now
    },
    revisoes: [RevisoesSchema],
    proprietario: ProprietarioSchema
});

//Declaração do Schema para o proprietário do veículo
const ProprietarioSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
});

//Exportando o model para ser acessado por toda a aplicação
mongoose.model("Veiculos", VeiculosSchema);