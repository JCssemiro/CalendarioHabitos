const {getTodosHabitos, insertHabito, excluirHabito} = require("../servicos/habitos");

async function getHabitos(req,res){
    try{
        const listaHabitos = await getTodosHabitos();
        res.status(200);
        res.send(listaHabitos);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

async function postHabitos(req,res){
    try{
        const habitoNovo = req.body;
        if(req.body.nome){
            insertHabito(habitoNovo);
            res.status(200);
            res.send("Hábito inserido com sucesso!");
        }else{
            res.status(422);
            res.send("Algum campo não foi preenchido!");
        }
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

async function deleteHabitos(req,res){
    try{
        const idHabito = req.params.id;
        if(await excluirHabito(idHabito)){
        res.status(200);
        res.send("Hábito excluido com sucesso!");
        }else{
            throw error;
        }
    }catch(error){
        res.status(500);
        res.send("Não foi encontrado nenhum hábito com este id!");
    }
}

module.exports = {
    getHabitos,
    postHabitos,
    deleteHabitos
}