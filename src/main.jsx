import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// URL da MockAPI onde os produtos estão cadastrados
// Esta é a mesma API que vocês usaram com Thunder Client / Postman
const API_URL = "https://696b7b27624d7ddccaa15948.mockapi.io/api/products";

// Cria a raiz do React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Primeiro, renderiza uma tela de loading
root.render(
    <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
    </div>
);

// Busca os produtos da API
fetch(API_URL)
    .then((response) => {
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        // Converte para JSON
        return response.json();
    })
    .then((products) => {
        // Sucesso! Renderiza o App com os produtos
        console.log("Produtos carregados:", products);

        root.render(
            <React.StrictMode>
                <App products={products} />
            </React.StrictMode>
        );
    })
    .catch((error) => {
        // Erro! Mostra mensagem e botão para tentar novamente
        console.error("Erro:", error);

        root.render(
            <div className="error-screen">
                <h2>Ops! Algo deu errado</h2>
                <p>Não foi possível carregar os produtos.</p>
                <button onClick={() => window.location.reload()}>
                    Tentar novamente
                </button>
            </div>
        );
    });
