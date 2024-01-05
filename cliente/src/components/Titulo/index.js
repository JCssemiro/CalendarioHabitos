import styled from 'styled-components';

export const Titulo = styled.h1`
    font-size: ${props => props.tamanhoFonte || "32px"};
    font-weight: ${props => props.pesoFonte || "normal"};
    color: ${props=> props.cor || "black"};
    margin-bottom: 30px;
    text-align: ${props => props.alinhamento || "center"};
`;