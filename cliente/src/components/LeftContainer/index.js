import {useState,useEffect} from 'react';
import {Container} from '../Container';
import styled from 'styled-components';
import {Subtitulo} from '../Subtitulo';
import { getHabitos } from '../../servicos/habitos';
import { postDiario } from '../../servicos/diario';
const diasDaSemana = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
const data = new Date();
const dia = diasDaSemana[data.getDay()];
const hoje = data.getDate();
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth();

const TextoLaranja = styled.span`
color: #F46530;
`;

const Texto = styled.p`
font-size: 16px;
text-align: center;
padding: ${props => props.espacamento || '0'};
transition: .2s;
`;

const HabitoBox = styled.div`
  display: flex;
  padding-bottom: 15px;
  &:hover{
  color: #128FE2;
}
cursor: default;
`;

const BoxSelecao = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #D4EDF4;
  margin-right: 8px;

`;

const InputCheckbox = styled.input`
  width: 30px;
  height: 30px;
  transition: .2s;
  cursor: pointer;
`;

const InputSubmit = styled.input`
width: 160px;
text-align: center;
background-color: #F46530;
display: block;
margin: 0 auto;
outline: none;
border: 0;
padding: 20px 30px;
cursor: pointer;
color: white;
border-radius: 15px;
`;

const InfoCard = styled.div`
position: fixed;
top: 10px;
right: 10px;
width:250px;
height: 80px;
background-color: green;
border-radius: 15px;
padding: 15px;
color: white;
transition: .5s ease-in;
opacity: ${props=> props.isAnimated ? 1 : 0};`;



function LeftContainer(){

const [habitos,setHabitos] = useState([]);
const [isAnimated, setAnimated] = useState(false);
const [habitosDiario,setHabitosDiario] = useState([]);
const [infoDiario,setInfoDiario] = useState({dia : hoje,mes: mesAtual+1,ano: anoAtual,habitosRealizados : []})


useEffect(()=>{fetchHabitos()},[])
useEffect(()=>{postDiario(infoDiario);},[infoDiario]);
useEffect(() => {
  let timer;

  if (isAnimated) {
    timer = setTimeout(() => {
      setAnimated(false);
    }, 3000);
  }

  return () => {
    clearTimeout(timer);
  };
}, [isAnimated]);

async function fetchHabitos(){
  const habitosAPI = await getHabitos();
  setHabitos(habitosAPI);
}

function handleInsert(e){
  e.preventDefault();
 setInfoDiario({...infoDiario,habitosRealizados:habitosDiario});


}
const handleAnimation = () => {
  setAnimated(true);
  console.log(isAnimated);
  setTimeout(()=>{
  setAnimated(false);
},3000);
}


function handleChange(e){
  const habitoNome = String(e.target.value);
  if(e.target.checked){
    setHabitosDiario([...habitosDiario,habitoNome]);
  }else{
    const habitosDiarioFiltrado = habitosDiario.filter((habito)=>habito !== habitoNome);
    setHabitosDiario(habitosDiarioFiltrado);
  }
}

return(
    <Container direcao="column" largura="30%">
        <Subtitulo alinhamento="center">Hoje é <br/><TextoLaranja>{dia}</TextoLaranja></Subtitulo>
        <Texto espacamento="15px 0"> Lista de hábitos:</Texto>
        <form method="post" onSubmit={(e)=>{handleInsert(e);handleAnimation()}}>
        {
          
            habitos.map(habito =>(
                <HabitoBox>
                    <BoxSelecao><InputCheckbox onChange={e => handleChange(e)} value={habito.nome} name={habito.nome} type="checkbox"/></BoxSelecao>
                    <Texto>{habito.nome}</Texto>
                </HabitoBox>
            ))   
        }
        <InputSubmit type="submit" value="Salvar"/>
        </form>
      <InfoCard isAnimated={isAnimated}>
        <p>Registro diário salvo com sucesso!</p>
      </InfoCard>

    </Container>
)

}

export default LeftContainer;