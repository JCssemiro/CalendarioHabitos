const { ObjectId } = require("mongodb");
const mongo = require("./mongodb");

const database = mongo.client.db('projetoAgendaDeHabitos');
const diario = database.collection('diario');

async function getTodosDiario(){
    const resultado = await diario.find().toArray();
    return resultado;
}

async function getDiarioEspecifico(diaBuscado,mesBuscado,anoBuscado){

    const resultado = await diario.findOne({dia: Number(diaBuscado), mes: Number(mesBuscado),ano: Number(anoBuscado)});
    return resultado;
}

async function insertDiario(infoHoje){
    if(await getDiarioEspecifico(infoHoje.dia,infoHoje.mes,infoHoje.ano)){
        await diario.deleteOne({dia : infoHoje.dia,mes:infoHoje.mes,ano:infoHoje.ano});
    }
        await diario.insertOne(infoHoje);

}


module.exports = {
    getTodosDiario,
    insertDiario,
    getDiarioEspecifico 
}