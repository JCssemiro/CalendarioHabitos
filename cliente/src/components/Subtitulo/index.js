import styled from 'styled-components';

export const Subtitulo = styled.h2`
    font-size: 24px;
    color: ${props => props.cor || "black"};
    text-align: ${props => props.alinhamento || "left"};
    font-weight: lighter;

`;