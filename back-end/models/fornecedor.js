const mongoose = require('mongoose');
const esquema = mongoose.Schema({
    razao_social: {
        type: String,
        required: true
    },
    nome_fantasia: {
        type: String
    },
    cnpj: {
        type: String,
        required: true
    },
    incricao_estadual: {
        type: String
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

})

/*
    Parâmetro de método mongoose. model()
    1º -> nome do modelo 
    2º _> Estrutura ( esquema ) do modelo
    3º -> Nome da coleção (collection) em que os objetos
          criados  a partir do modelo serão amrazaenados no mongoDB
*/
module.exports = mongoose.model('Fornecedor', esquema, 'fornecedores');