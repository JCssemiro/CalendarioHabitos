import {useState,useEffect} from 'react';
import { getHabitos, removeHabito,adicionarHabito } from '../servicos/habitos';
import { AppContainer } from '../components/AppContainer';
import { Container } from '../components/Container';
import {Titulo} from '../components/Titulo';
import styled from 'styled-components';

const HabitoBox = styled.div`
    width: 48%;
    background-color: #f5f5f5;
    padding: 15px;
    margin-bottom: 8px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Texto = styled.p`
font-size: 16px;
transition: .2s;

`;

const BotaoExcluir = styled.button`
cursor: pointer;
padding: 10px;
background-color: #F46530;
outline: none;
border: none;
border-radius: 8px;
color: white;
font-weight: bold;
transition: .2s;
&:hover{
    background-color: white;
    color: #F46530;
}
`;

const InputText = styled.input`
min-width: 300px;
width: 50%;
text-align: center;
height: 44px;
border-radius: 8px;
margin-bottom: 30px;
line-height: 44px;
font-size: 20px;
outline: none;
border: 2px solid #F46530;
`;

const InputSubmit = styled.input`
min-width: 200px;
width: 30%;
padding: 15px 10px;
border-radius: 8px;
cursor: pointer;
background-color: #F46530;
color: white;
border: none;
font-weight: bold;
height: 60px;
font-size: 20px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

function HabitosPage(){

    const [habitoNovo,setHabitoNovo] = useState({nome: ''});

    const [habitos,setHabitos] = useState([]);
    useEffect(()=>{fetchHabitos()},[]);

    async function fetchHabitos(){
        const habitosAPI = await getHabitos();
        setHabitos(habitosAPI);
    }

    async function handleExcluir(e){
        const id = e.target.value;
        await removeHabito(id);
        await fetchHabitos();
    }

    async function handleInsert(e){
        adicionarHabito(habitoNovo);
        await fetchHabitos();
    }

    function handleChange(e){
        const value = e.target.value;
        setHabitoNovo({...habitoNovo,[e.target.name] : value});
    }

    return(
        <AppContainer>
            <Container largura="50%" espacamento="space-between"> 
                {
                    habitos.map(habito=>(
                        <HabitoBox >
                            <Texto>{habito.nome}</Texto>
                            <BotaoExcluir onClick={(e)=>handleExcluir(e)} name="excluirHabitoButton" value={habito._id}>Excluir</BotaoExcluir>
                        </HabitoBox>
                    ))
                }  
            </Container>
            <Container direcao="column" largura="50%">
                <Titulo cor="#F46530">Adicionar Hábito</Titulo>
                <Form onSubmit={(e)=>{handleInsert(e)}}>
                    <InputText type="text" name="nome" onChange={handleChange} placeholder="Novo hábito"/>
                    <InputSubmit type="submit"/>
                </Form>
            </Container>
        </AppContainer>
    )
}

export default HabitosPage;