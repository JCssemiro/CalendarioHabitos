import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './rotas/Home';
import Header from './components/Header';
import HabitosPage from './rotas/HabitosPage';
import MetasPage from './rotas/MetasPage';
import RelatoriosPage from './rotas/RelatoriosPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{margin: 0;
padding: 0;
box-sizing: border-box;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}`;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path={"/"} element={<Home/>} />
        <Route path="/habitos" element={<HabitosPage/>} />
        <Route path={"/metas"} element={<MetasPage/>} />
        <Route path={"/relatorios"} element={<RelatoriosPage/>} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);