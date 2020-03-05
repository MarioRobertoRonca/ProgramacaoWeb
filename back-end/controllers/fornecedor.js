const Fornecedor  = require('../models/fornecedor')
const controller = {}//objeto

controller.novo = async (req, res)=>{
    try {
       await Fornecedor.create(req.body)
        // HTTP Status 201: Created
        res.sendStatus(201)
    }
    catch(erro){
        console.log(erro)
        // HTTP 500: Internal Sever Error
        res.status(500).send(erro)
    }
}

module.exports = controller