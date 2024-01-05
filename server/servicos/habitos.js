const { ObjectId } = require("mongodb");
const mongo = require("./mongodb");

const database = mongo.client.db("projetoAgendaDeHabitos");
const habitos = database.collection("habitos");
async function getTodosHabitos(){

    const resultado = await habitos.find().toArray();
    return resultado;
}

async function insertHabito(habitoNovo){
    await habitos.insertOne(habitoNovo);
}

async function excluirHabito(habitoId){;
    const id = new ObjectId(habitoId);
    if(await habitos.findOneAndDelete({_id: id}))
        return 1;
    else
        return 0;
}

module.exports = {
    getTodosHabitos,
    insertHabito,
    excluirHabito
}