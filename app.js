const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

//Iniciando o App
const app = express();
app.use(express.json());
//Criando a conexão com o banco de dados
mongoose.connect(
    "mongodb://localhost/urpay-teste",
    { useNewUrlParser: true }
);

//Acessando aos arquivos de models
requireDir('./src/models');

//Acessando as rotas
app.use("/api", require("./src/routes"));

//Escutando na porta 8000
app.listen(8000);