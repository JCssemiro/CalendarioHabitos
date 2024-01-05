import {Container} from '../Container';
import {Subtitulo} from '../Subtitulo';
import styled from 'styled-components';
import {useState,useEffect} from 'react';
import { getDiario } from '../../servicos/diario';
const data = new Date();
console.log(data);
const Hoje = data.getDate();
const ano = data.getFullYear();
const mes = data.getMonth();
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  text-align: center;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
  background-color: ${props => props.cor || "#2A2E30"};
  border-radius: 20px;
  border: 3px solid white;
  width: 75px;
  height: 100px;
  color: white;
  text-align:right;
  vertical-align: top;
  cursor: pointer;
  transition: .2s;
  &:hover{
    background-color: #128FE2;
  }
`;


const diasNoMes = new Date(ano, mes + 1, 0).getDate();
const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];


  let semana = [];


function MiddleContainer(){

  const [diarios,setDiarios] = useState([]);
  const [semanas,setSemanas] = useState([]);

  async function fetchDiarios(){
    const diariosAPI = await getDiario();
    setDiarios(diariosAPI);
  }

    useEffect(()=>fetchDiarios,[]);
    useEffect(()=>{
      const diasDoCalendario = [];

      function geraCalendario(){ 
      let semana = [];

      for (let i = 0; i < primeiroDiaDaSemana; i++) {
        semana.push(<td key={`empty-${i}`} />);
      }

      for (let dia = 1; dia <= diasNoMes; dia++) {
        let diaParaInserir = <Td key={dia}>{dia}</Td>;
        let habitosTracker = diarios.find(
          (habito) =>
            habito.dia === dia && habito.mes === mes + 1 && habito.ano === ano
        );

        if (dia === Hoje) {
          diaParaInserir = <Td key={dia} cor="#F46530">{dia}</Td>;
        } else if (habitosTracker) {
          let proporcao = habitosTracker.habitosRealizados.length * 25;
          if (proporcao === 0) {
            diaParaInserir = <Td key={dia}>{dia}</Td>;
          } else if (proporcao <= 50) {
            diaParaInserir = <Td key={dia} cor="#48ACF0">{dia}</Td>;
          } else if (proporcao <= 100) {
            diaParaInserir = <Td key={dia} cor="#128FE2">{dia}</Td>;
          } else if (proporcao < 150) {
            diaParaInserir = <Td key={dia} cor="#0C5F97">{dia}</Td>;
          } else {
            diaParaInserir = <Td key={dia} cor="#E80740">{dia}</Td>;
          }
        }
        semana.push(diaParaInserir);

        if (semana.length === 7) {
          diasDoCalendario.push(<tr key={`row-${dia}`}>{semana}</tr>);
          semana = [];
        }
      }

      if (semana.length > 0) {
        diasDoCalendario.push(<tr key={`row-${diasNoMes + 1}`}>{semana}</tr>);
      }

      setSemanas(diasDoCalendario);
    }
        
        if (semana.length > 0) {
          semanas.push(<tr>{semana}</tr>);
        }
        setSemanas([...diasDoCalendario]);
      

      if(diarios.length > 0){
        geraCalendario(diarios);
      }
    },[diarios]);
    //useCallback(()=>geraCalendario(diarios),[diarios]);

    return(
        <Container direcao="row" largura="70%">
           <Table>
        <thead>
          <tr>
            {diasDaSemana.map(dia => (
              <Th><Subtitulo alinhamento="center">{dia}</Subtitulo></Th>
            ))}
          </tr>
        </thead>
        <tbody>{semanas}</tbody>
      </Table>
        </Container>
    )
}

export default MiddleContainer;