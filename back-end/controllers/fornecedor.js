const Fornecedor = require('../models/fornecedor')
const controller = {}//objeto

controller.novo = async (req, res) => {
    try {
        await Fornecedor.create(req.body)
        // HTTP Status 201: Created
        res.sendStatus(201)
    }
    catch (erro) {
        console.log(erro)
        // HTTP 500: Internal Sever Error
        res.status(500).send(erro)
    }
}

// Este método para retornar os fornecedores;
controller.listar = async (req, res) => {
    
    if (Object.keys(req.query).length>0) {//se houver query string
        
    } else {// sem query string

        try {
            //find(), sem parâmetros, retorna todos
            const lista = await Fornecedor.find();
            res.send(lista); //HTTP 200  impicito;
        } catch (erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    }
}
// esse é para encontrar
controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Fornecedor.findById(id)
        if (obj) {//obj foi encontrado
            res.send(obj)//HTTP 200 implícito
        } else {
            //HTTP 404: not found
            res.status(404).end();
        }
    } catch (erro) {
        console.log(erro);
        res.status(500).send(erro);
    }
}
// atulizar
controller.atualizar = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Fornecedor.findByIdAndUpdate(id, req.body);
        if (obj) {//obj encontrado e atulizado
            //HTTP 204: no content
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}
controller.excluir = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Fornecedor.findOneAndDelete(id)
        if (obj) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }
    catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

async function busca(req, res){
    let criterio = {}

    const atrib = Object.keys(req.query)[0]
    const valor = Object.values(req.query)[0]

    //option: 'i' case insentive
    criterio[atrib] = {$regex: valor, $options: 'i'}

    console.log('critério')
    console.log(criterio)

    try{
        const lista = await Fornecedor.find(criterio)
        res.send(lista)
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}
   

module.exports = controller