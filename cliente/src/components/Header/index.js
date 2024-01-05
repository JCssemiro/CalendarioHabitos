import styled from 'styled-components';
import {Titulo} from '../Titulo';
import {Link} from 'react-router-dom';

function convertToSlug(texto){
    const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return texto.toString().toLowerCase().trim()
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[\s\W-]+/g, '-')
}

const OpcoesHeader = ["Calendário","Hábitos","Metas","Relatórios"];
const HeaderContainer = styled.header`
padding-top: 15px;
display: flex;
width: 100vw;
height: 80px;
justify-content: flex-start;
align-items: center;
margin-bottom: 10px
`;


const TextoLaranja = styled.span`
color: #F46530;
`;

const HeaderLista = styled.ul`
display: flex;
justify-content: center;
width: 60%;
`;

const HeaderListaItem = styled.li`
list-style-type: none;
padding: 0 60px;
`;
const TituloBox = styled.div`
width:20%;
`;

const TextoOpcao = styled(Link)`
font-size: 24px;
color: black;
text-align: center;
font-weight: lighter;
cursor:pointer;
transition: .2s;
&:hover{
color: #128FE2;
}
text-decoration: none;
`;

function Header(){
return(
    <HeaderContainer>
        <TituloBox>
        <Titulo>Olá, <TextoLaranja>Usuário</TextoLaranja>!</Titulo>
        </TituloBox>
        <HeaderLista>

                {OpcoesHeader.map((opcoes,index) =>(
                    <HeaderListaItem>
                    
                    <TextoOpcao to={index === 0 ? "/" : convertToSlug(opcoes)}>{opcoes}</TextoOpcao>
                        </HeaderListaItem>
                    ))}

           </HeaderLista>
        </HeaderContainer>
    )
}

export default Header;