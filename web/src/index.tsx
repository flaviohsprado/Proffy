import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Injeta uma estrutura dentro de um elemento HTML
//Ex: Hello World! > div='root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
