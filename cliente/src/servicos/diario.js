import axios from 'axios';
const DiarioAPI = axios.create({baseURL:"http://localhost:3001/api/diario"});

async function getDiario(){
    try{
        const response = await DiarioAPI.get('/');
        return response.data;
    }catch(error){
        console.log(error);
    }
}

async function postDiario(diarioNovo){
    try{
        await DiarioAPI.post("http://localhost:3001/api/diario",diarioNovo);
    }catch(error){
        console.log(error);
    }
}

export{
    getDiario,
    postDiario
}