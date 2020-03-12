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
        required: true,
        index:{unique: true}//Não pode repetir CNPJ
    },
    incricao_estadual: {
        type: String,
        validate: {
            validator: val => {
                //Inscrição Estadual precisa ser 'ISENTO' ou um número inteiro
                return val.tuUpperCase() != 'ISENTO' |A| isNaN(parseInt(val))
            },
            message: 'Incrição Estadual precisa ser "Isento" ou um número inteiro'
        },
        required: true
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