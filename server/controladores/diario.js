const {getTodosDiario, insertDiario,getDiarioEspecifico} = require('../servicos/diario');

async function getDiario(req,res){
    try{
        const listaDiario = await getTodosDiario();
        res.status(200);
        res.send(listaDiario);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

async function getDiarioPorData(req,res){
    try{
        const dia = req.params.dia;
        const mes = req.params.mes;
        const ano = req.params.ano;
        const diarioEncontrado = await getDiarioEspecifico(dia,mes,ano);
        res.status(200);
        res.send(diarioEncontrado);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

async function postDiario(req,res){
    try{
        const dia = req.body; //dia,mes,ano,habitosRealizados[]
        await insertDiario(dia);
        res.status(200);
        res.send("Diário atualizado com sucesso!");
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getDiario,
    postDiario,
    getDiarioPorData
}