import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./style.css";

const API_URL = "https://696b7b27624d7ddccaa15948.mockapi.io/api/products";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Tela de loading
root.render(
    <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
    </div>
);

// Busca produtos e renderiza
fetch(API_URL)
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
    })
    .then((products) => {
        root.render(
            <React.StrictMode>
                {/* CartProvider envolve toda a aplicação */}
                {/* Assim, qualquer componente pode usar useCart() */}
                <CartProvider>
                    <App products={products} />
                </CartProvider>
            </React.StrictMode>
        );
    })
    .catch((error) => {
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
