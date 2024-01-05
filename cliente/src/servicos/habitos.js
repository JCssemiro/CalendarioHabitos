import axios from 'axios';

const habitosAPI = axios.create({baseURL: "http://localhost:3001/api/habitos"});

async function getHabitos(){
    try{
        const response = await habitosAPI.get('/');
        return response.data;        
    }catch(error){
        console.log(error);
    }
}

async function removeHabito(habitoID){
    try{
        await habitosAPI.delete(`/${habitoID}`);
    }catch(error){
        console.log(error);
    }
}

async function adicionarHabito(habitoNovo){
    try{
        await habitosAPI.post( "http://localhost:3001/api/habitos",habitoNovo);
    }catch(error){
        console.log(error);
    }
}

export{
    getHabitos,
    removeHabito,
    adicionarHabito
}