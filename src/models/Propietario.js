const mongoose = require('mongoose');

//Declaração da Schema para a lista de revisões
const ProprietarioSchema = new mongoose.Schema({
    nome: String,
    cpf: String
});

mongoose.model("Veiculos", ProprietarioSchema);