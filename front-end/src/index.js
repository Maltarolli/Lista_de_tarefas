import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa o BrowserRouter para gerenciar as rotas
import App from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Seleciona o elemento root no DOM
root.render(
  <React.StrictMode> 
    {/* Envolvendo o componente principal com o BrowserRouter para habilitar o roteamento */}
    <BrowserRouter>
      <App /> {/* Renderiza o componente principal da aplicação */}
    </BrowserRouter>
  </React.StrictMode>
);
