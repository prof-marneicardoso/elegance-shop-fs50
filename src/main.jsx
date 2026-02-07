// Ponto de entrada da aplicação React
// Este arquivo conecta o React ao HTML

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// Cria a raiz do React no elemento com id="root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o componente App
// StrictMode ajuda a identificar problemas durante o desenvolvimento
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
