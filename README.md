# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 2 - Navbar (useState + useEffect + Eventos)
🎯 Objetivos desta etapa

  - Entender o que é estado (state) no React
  - Aprender a usar o hook useState
  - Aprender a usar o hook useEffect
  - Trabalhar com eventos (onClick)
  - Criar um menu mobile funcional

---

### O que é Estado (State)?

Imagine um interruptor de luz. Ele tem dois estados: ligado ou desligado. Quando você aperta o interruptor, o estado muda e a luz responde.

No React, estado é exatamente isso: um dado que pode mudar ao longo do tempo. Quando o estado muda, o React automaticamente atualiza a tela para refletir a mudança.

### Exemplos de estado em uma loja virtual:

  - Menu mobile está aberto ou fechado?
  - Quantos itens tem no carrinho?
  - Qual slide do banner está ativo?
  - O usuário está logado ou não?

## Criando a Navbar

### Criar a branch da Etapa 2

```
git switch -c etapa-2-navbar-useState-useEffect
```

### Passo 1: Criar o arquivo Navbar.jsx

Crie o arquivo src/components/layout/Navbar.jsx:

```jsx
// Importamos os hooks do React
import { useState, useEffect } from "react";

// Componente Navbar
// Responsável pela barra de navegação do site
export default function Navbar() {
    // ========== ESTADO ==========
    // useState retorna um array com 2 elementos:
    // 1. menuOpen = o valor atual do estado (true ou false)
    // 2. setMenuOpen = função para atualizar o estado
    // useState(false) = o menu começa FECHADO
    const [menuOpen, setMenuOpen] = useState(false);

    // ========== FUNÇÕES ==========
    // Função para alternar o menu (abrir/fechar)
    const toggleMenu = () => {
        // Se menuOpen é true, vira false
        // Se menuOpen é false, vira true
        setMenuOpen(!menuOpen);
    };

    // Função para fechar o menu
    // Usada quando clica em um link ou no overlay
    const closeMenu = () => {
        setMenuOpen(false);
    };

    // ========== EFEITO ==========
    // useEffect executa código quando menuOpen muda
    useEffect(() => {
        // Quando o menu abre, bloqueamos o scroll da página
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup: quando o componente sair da tela,
        // garantimos que o scroll volta ao normal
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]); // Array de dependências: executa quando menuOpen mudar

    // ========== RENDERIZAÇÃO ==========
    return (
        <nav className="navbar-elegance">
            <div className="navbar-container">
                {/* Botão do Menu Mobile (hamburguer) */}
                {/* A classe "open" é adicionada quando menuOpen é true */}
                <button
                    className={`navbar-menu-toggle ${menuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Logo */}
                <a href="/" className="navbar-logo">
                    ELEGANCE
                </a>

                {/* Menu de Navegação */}
                {/* A classe "open" é adicionada quando menuOpen é true */}
                <div className={`navbar-menu-wrapper ${menuOpen ? "open" : ""}`}>
                    <ul className="navbar-menu">
                        <li><a href="/" onClick={closeMenu}>Início</a></li>
                        <li><a href="/novidades" onClick={closeMenu}>Novidades</a></li>
                        <li><a href="/vestidos" onClick={closeMenu}>Vestidos</a></li>
                        <li><a href="/blusas" onClick={closeMenu}>Blusas</a></li>
                        <li><a href="/calcas" onClick={closeMenu}>Calças</a></li>
                        <li><a href="/acessorios" onClick={closeMenu}>Acessórios</a></li>
                    </ul>
                </div>

                {/* Overlay - fundo escuro quando menu está aberto */}
                {/* Só aparece quando menuOpen é true */}
                {/* Ao clicar, fecha o menu */}
                {menuOpen && (
                    <div className="navbar-overlay" onClick={closeMenu}></div>
                )}

                {/* Ícones do lado direito */}
                <div className="navbar-icons">
                    <button className="navbar-icon-btn cart-btn" aria-label="Sacola">
                        <i className="bx bx-shopping-bag"></i>
                    </button>
                    <button className="navbar-icon-btn" aria-label="Minha conta">
                        <i className="bx bx-user"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}
```

### Passo 2: Atualizar o App.jsx

Substitua o conteúdo do arquivo src/App.jsx:

```jsx
// Importamos o componente Navbar
import Navbar from "./components/layout/Navbar";

function App() {
    return (
        <div>
            {/* Navbar no topo */}
            <Navbar />
            
            {/* Conteúdo temporário */}
            <main style={{ padding: "100px 20px" }}>
                <h1>Elegance Shop</h1>
                <p>Em construção...</p>
                <p>Teste o menu mobile redimensionando a janela!</p>
            </main>
        </div>
    );
}

export default App;
```

### 🎯 Exercícios para Fixação

  1. Adicione um console.log: Dentro do toggleMenu, adicione console.log("Menu:", !menuOpen) e observe o console do navegador ao clicar.

  2. Novo estado: Crie um estado para controlar se o ícone do usuário foi clicado. Exiba um alert quando clicar.

  3. Contador de cliques: Crie um estado que conta quantas vezes o menu foi aberto.

### Enviar para o GitHub

```
git add .
git commit -m "Etapa 2: Navbar com useState e useEffect"
git push origin etapa-2-navbar-useState-useEffect
```
