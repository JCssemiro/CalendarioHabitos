import styled from 'styled-components';

export const Container = styled.div`
    display: ${props => props.display || "flex"};
    justify-content: ${props => props.espacamento || "initial"};
    flex-direction: ${props => props.direcao || "row"};
    width: ${props => props.largura || "auto"};
    flex-wrap: wrap;
`