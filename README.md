# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 1 - Setup + Estrutura Base
🎯 Objetivos desta etapa

  - Criar o projeto React com Vite
  - Entender a estrutura de pastas
  - Configurar arquivos iniciais
  - Adicionar o CSS completo

---

### O que é React?

Imagine que você está construindo uma casa com LEGO. Cada pecinha é um componente. Você pode criar peças reutilizáveis (uma janela, uma porta) e combiná-las para formar a casa completa.

### React funciona assim!

Em vez de criar uma página HTML gigante, você divide tudo em componentes pequenos e independentes. Um componente pode ser um botão, um card de produto, um menu de navegação, ou até a página inteira.

### Por que usar React?

  - Reutilização: Crie um componente uma vez, use em vários lugares
  - Organização: Código dividido em arquivos pequenos e focados
  - Eficiência: React atualiza apenas o que mudou na tela, não a página toda
  - Comunidade: Milhões de desenvolvedores, muitas bibliotecas prontas

### O que é Vite?

Vite (pronuncia-se "vít", significa "rápido" em francês) é uma ferramenta que:

  - Cria a estrutura inicial do projeto React
  - Roda um servidor de desenvolvimento super rápido
  - Compila o código para produção

Antigamente usávamos Create React App (CRA), mas o Vite é muito mais rápido!

### O que é JSX?

JSX é uma extensão do JavaScript que permite escrever HTML dentro do código JS.

Sem JSX (JavaScript puro):

```
const elemento = React.createElement('h1', null, 'Olá, Mundo!');
```

Com JSX (muito mais fácil!):

```
const elemento = <h1>Olá, Mundo!</h1>;
```

O navegador não entende JSX diretamente. O Vite converte para JavaScript puro antes de rodar.

### Regras importantes do JSX:

  1. Todo componente deve retornar um único elemento pai
  2. Use className em vez de class (class é palavra reservada em JS)
  3. Feche todas as tags, inclusive as que não precisam em HTML (como img e input)
  4. Use chaves { } para inserir JavaScript dentro do JSX

---

## Sobre o Projeto

O **Elegance Shop** é uma loja virtual fictícia desenvolvida para fins educacionais. Durante este tutorial, você aprenderá os conceitos fundamentais do React de forma prática e progressiva.

### O que você vai aprender:

- ✅ Setup + Estrutura base do React
- ✅ Componentização e reutilização de código
- ✅ Props e Children
- ✅ Hooks: useState, useEffect, useContext
- ✅ Eventos, useCallback e map
- ✅ Fetch e Consumo de APIs
- ✅ Gerenciamento de estado global
- ✅ Context, localStorage, Toast
- ✅ Build e deploy

### Tecnologias utilizadas:

- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool rápido e moderno
- **CSS3** - Estilização (sem frameworks)
- **MockAPI** - API para simular Back-End e Banco
- **Context API** - Gerenciamento de estado global

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **VS Code** (ou outro editor) - [Download](https://code.visualstudio.com/)
- **Git** - [Download](https://git-scm.com/)

### Verificar instalação:

```bash
node --version   # Deve mostrar v18.x.x ou superior
npm --version    # Deve mostrar 9.x.x ou superior
git --version    # Deve mostrar git version 2.x.x
```

## 🚀 Instalação

1. Criar o projeto com Vite

```bash
# Criar projeto
npm create vite@latest elegance-shop -- --template react

# Entrar na pasta
cd elegance-shop

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

2. Acessar no navegador

Abra http://localhost:5173

3. Estrutura inicial criada pelo Vite

```
elegance-shop/
├── node_modules/      (dependências - não mexemos aqui)
├── public/            (arquivos públicos, como favicon)
├── src/               (nosso código fica aqui!)
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx       (ponto de entrada)
├── index.html         (HTML principal)
├── package.json       (configurações e dependências)
└── vite.config.js     (configurações do Vite)
```

### Criar a branch da Etapa 1

```
git init
git switch -c etapa-1-setup-estrutura-base
```

### Configurar o index.html

Substitua todo o conteúdo do arquivo index.html (na raiz do projeto) por:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Elegance Shop</title>
    
    <!-- BoxIcons - Biblioteca de ícones -->
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    
    <!-- Google Fonts - Fonte Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Criar o arquivo de utilitários

Crie o arquivo src/utils/format.js:

```js
// Função para formatar valores em Real brasileiro
// Exemplo: formatCurrency(189.90) retorna "R$ 189,90"

export function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}
```

### Criar o main.jsx básico

Substitua o conteúdo do arquivo src/main.jsx por:

```jsx
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
```

### Criar o App.jsx básico

Substitua o conteúdo do arquivo src/App.jsx por:

```jsx
// Componente principal da aplicação
// Por enquanto, apenas uma estrutura básica para testar

function App() {
  return (
    <div>
      <h1>Elegance Shop</h1>
      <p>Em construção...</p>
    </div>
  );
}

export default App;
```

### Adicionar o CSS completo

Crie o arquivo src/style.css e cole:

```css
/* ========================================
   ELEGANCE SHOP - CSS COMPLETO
   ======================================== */

/* ----------------------------------------
   RESET & BASE
   ---------------------------------------- */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
}

ul,
ol {
    list-style: none;
}

button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
}

input,
textarea,
select {
    font-family: inherit;
    font-size: inherit;
}

/* ----------------------------------------
   CSS VARIABLES
   ---------------------------------------- */
:root {
    /* Cores Principais */
    --color-primary: #b8956a;
    --color-primary-dark: #a07d55;
    --color-primary-light: #d4b896;

    /* Cores Neutras */
    --color-black: #1a1a1a;
    --color-dark: #333333;
    --color-gray: #666666;
    --color-gray-light: #999999;
    --color-gray-lighter: #e5e5e5;
    --color-white: #ffffff;
    --color-off-white: #f8f8f8;
    --color-bg: #fafafa;

    /* Cores de Estado */
    --color-success: #4caf50;
    --color-error: #f44336;
    --color-warning: #ff9800;
    --color-info: #2196f3;

    /* Tipografia */
    --font-primary: 'Poppins', sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
    --font-size-4xl: 2.5rem;

    /* Espaçamentos */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;

    /* Bordas */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-full: 50%;

    /* Sombras */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.12);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.15);

    /* Transições */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;

    /* Layout */
    --container-max: 1400px;
    --navbar-height: 70px;
}

/* ----------------------------------------
   LAYOUT
   ---------------------------------------- */
.layout-elegance {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-elegance {
    flex: 1;
}

.container {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

.section {
    padding: var(--spacing-3xl) 0;
}

.section-header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
}

.section-title {
    font-size: var(--font-size-3xl);
    font-weight: 600;
    color: var(--color-black);
    margin-bottom: var(--spacing-sm);
}

.section-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-gray);
}

/* ----------------------------------------
   LOADING & ERROR SCREENS
   ---------------------------------------- */
.loading-screen,
.error-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    background: var(--color-bg);
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--color-gray-lighter);
    border-top-color: var(--color-primary);
    border-radius: var(--border-radius-full);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-screen p {
    color: var(--color-gray);
    font-size: var(--font-size-lg);
}

.error-screen h2 {
    color: var(--color-error);
}

.error-screen p {
    font-size: var(--font-size-lg);
    color: var(--color-dark);
}

.error-screen button {
    padding: var(--spacing-sm) var(--spacing-xl);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    transition: background var(--transition-base);
}

.error-screen button:hover {
    background: var(--color-primary-dark);
}

/* ----------------------------------------
   TYPOGRAPHY
   ---------------------------------------- */
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-black);
}

h1 {
    font-size: var(--font-size-4xl);
}

h2 {
    font-size: var(--font-size-3xl);
}

h3 {
    font-size: var(--font-size-2xl);
}

h4 {
    font-size: var(--font-size-xl);
}

h5 {
    font-size: var(--font-size-lg);
}

h6 {
    font-size: var(--font-size-base);
}

p {
    color: var(--color-gray);
    margin-bottom: var(--spacing-md);
}

/* ----------------------------------------
   BUTTONS
   ---------------------------------------- */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-sm);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-base);
    cursor: pointer;
}

.btn-primary {
    background: var(--color-black);
    color: var(--color-white);
    border: 2px solid var(--color-black);
}

.btn-primary:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
}

.btn-outline {
    background: transparent;
    color: var(--color-black);
    border: 2px solid var(--color-black);
}

.btn-outline:hover {
    background: var(--color-black);
    color: var(--color-white);
}

.btn-white {
    background: var(--color-white);
    color: var(--color-black);
    border: 2px solid var(--color-white);
}

.btn-white:hover {
    background: transparent;
    color: var(--color-white);
}

.btn-full {
    width: 100%;
}

.btn-sm {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-xs);
}

.btn-lg {
    padding: var(--spacing-lg) var(--spacing-2xl);
    font-size: var(--font-size-base);
}

/* ----------------------------------------
   NAVBAR
   ---------------------------------------- */
.navbar-elegance {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: var(--navbar-height);
    background: var(--color-white);
    border-bottom: 1px solid var(--color-gray-lighter);
    z-index: 1000;
}

.navbar-container {
    max-width: var(--container-max);
    height: 100%;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-logo {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    letter-spacing: 4px;
    color: var(--color-primary);
    transition: color var(--transition-base);
}

.navbar-logo:hover {
    color: var(--color-black);
}

.navbar-menu-wrapper {
    display: flex;
    align-items: center;
}

.navbar-menu {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
}

.navbar-menu a {
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--color-dark);
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color var(--transition-base);
}

.navbar-menu a:hover {
    color: var(--color-primary);
}

.navbar-icons {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.navbar-icon-btn {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark);
    transition: color var(--transition-base);
}

.navbar-icon-btn i {
    font-size: 26px;
}

.navbar-icon-btn:hover {
    color: var(--color-primary);
}

.cart-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: var(--color-primary);
    color: var(--color-white);
    font-size: 11px;
    font-weight: 600;
    border-radius: var(--border-radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Navbar Mobile Toggle */
.navbar-menu-toggle {
    display: none;
    width: 30px;
    height: 24px;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 1001;
}

.navbar-menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-black);
    transition: all var(--transition-base);
    transform-origin: center;
}

.navbar-menu-toggle.open span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
}

.navbar-menu-toggle.open span:nth-child(2) {
    opacity: 0;
}

.navbar-menu-toggle.open span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, -8px);
}

.navbar-overlay {
    display: none;
}

/* ----------------------------------------
   HERO BANNER
   ---------------------------------------- */
.hero-banner {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
}

.hero-slides {
    position: relative;
    width: 100%;
    height: 100%;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-slow), visibility var(--transition-slow);
}

.hero-slide.active {
    opacity: 1;
    visibility: visible;
}

.hero-slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-slide.active .hero-slide-image {
    animation: heroZoom 8s ease-out forwards;
}

@keyframes heroZoom {
    from {
        transform: scale(1.1);
    }

    to {
        transform: scale(1);
    }
}

.hero-slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.1) 100%);
}

.hero-slide-content {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    max-width: 600px;
    color: var(--color-white);
}

.hero-slide-content h1 {
    font-size: var(--font-size-4xl);
    font-weight: 600;
    color: var(--color-white);
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
}

.hero-slide-content p {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--spacing-xl);
}

/* Hero Navigation */
.hero-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: var(--color-white);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 10;
}

.hero-nav i {
    font-size: 28px;
}

.hero-nav:hover {
    background: var(--color-white);
    color: var(--color-black);
}

.hero-nav.prev {
    left: var(--spacing-xl);
}

.hero-nav.next {
    right: var(--spacing-xl);
}

/* Hero Indicators */
.hero-indicators {
    position: absolute;
    bottom: var(--spacing-xl);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--spacing-sm);
    z-index: 10;
}

.hero-indicator {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    border-radius: var(--border-radius-full);
    cursor: pointer;
    transition: all var(--transition-base);
}

.hero-indicator.active,
.hero-indicator:hover {
    background: var(--color-white);
    transform: scale(1.2);
}

/* ----------------------------------------
   PRODUCT CAROUSEL
   ---------------------------------------- */
.product-carousel {
    position: relative;
    padding: 0 60px;
}

.product-carousel-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
}

.carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: var(--color-white);
    border: 1px solid var(--color-gray-lighter);
    color: var(--color-dark);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 10;
    box-shadow: var(--shadow-md);
}

.carousel-nav i {
    font-size: 24px;
}

.carousel-nav:hover {
    background: var(--color-black);
    color: var(--color-white);
    border-color: var(--color-black);
}

.carousel-nav.prev {
    left: 0;
}

.carousel-nav.next {
    right: 0;
}

/* ----------------------------------------
   PRODUCT CARD
   ---------------------------------------- */
.product-card {
    position: relative;
    background: var(--color-white);
    cursor: pointer;
    transition: all var(--transition-base);
}

.product-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
}

.product-card-image {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: var(--color-bg);
}

.product-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
}

.product-card:hover .product-card-image img {
    transform: scale(1.05);
}

/* Product Tags */
.product-tags {
    position: absolute;
    top: var(--spacing-md);
    left: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    z-index: 2;
}

.tag {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.tag-new {
    background: var(--color-black);
    color: var(--color-white);
}

.tag-discount {
    background: var(--color-error);
    color: var(--color-white);
}

/* Product Card Overlay */
.product-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--spacing-md);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    opacity: 0;
    transform: translateY(100%);
    transition: all var(--transition-base);
}

.product-card:hover .product-card-overlay {
    opacity: 1;
    transform: translateY(0);
}

.product-action-btn {
    width: 44px;
    height: 44px;
    background: var(--color-white);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
}

.product-action-btn i {
    font-size: 20px;
    color: var(--color-dark);
}

.product-action-btn:hover {
    background: var(--color-primary);
}

.product-action-btn:hover i {
    color: var(--color-white);
}

/* Product Card Info */
.product-card-info {
    padding: var(--spacing-md);
    text-align: center;
}

.product-tag {
    display: block;
    font-size: var(--font-size-xs);
    color: var(--color-gray-light);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--spacing-xs);
}

.product-name {
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--color-dark);
    margin-bottom: var(--spacing-sm);
}

.product-price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
}

.price-old {
    font-size: var(--font-size-sm);
    color: var(--color-gray-light);
    text-decoration: line-through;
}

.price-current {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-primary);
}

/* ----------------------------------------
   PRODUCT GRID
   ---------------------------------------- */
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
}

.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--spacing-3xl);
    color: var(--color-gray);
}

/* ----------------------------------------
   PROMO BANNER
   ---------------------------------------- */
.promo-banner {
    position: relative;
    min-height: 400px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.promo-banner-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.promo-banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.promo-banner-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    padding: var(--spacing-2xl);
    color: var(--color-white);
}

.promo-banner-content h2 {
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    margin-bottom: var(--spacing-md);
}

.promo-banner-content p {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--spacing-xl);
}

/* ----------------------------------------
   PRODUCT MODAL
   ---------------------------------------- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    padding: var(--spacing-md);
}

.modal-overlay.open {
    opacity: 1;
    visibility: visible;
}

.modal-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    background: var(--color-white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    transform: scale(0.9);
    transition: transform var(--transition-base);
}

.modal-overlay.open .modal-container {
    transform: scale(1);
}

.modal-close {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 40px;
    height: 40px;
    background: var(--color-white);
    border: 1px solid var(--color-gray-lighter);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all var(--transition-base);
}

.modal-close i {
    font-size: 24px;
}

.modal-close:hover {
    background: var(--color-black);
    border-color: var(--color-black);
    color: var(--color-white);
}

.modal-image {
    position: relative;
    background: var(--color-bg);
    min-height: 400px;
}

.modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-image .product-tags {
    top: var(--spacing-lg);
    left: var(--spacing-lg);
}

.modal-content {
    padding: var(--spacing-2xl);
    overflow-y: auto;
}

.modal-tag {
    display: inline-block;
    font-size: var(--font-size-xs);
    color: var(--color-gray);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--spacing-sm);
}

.modal-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
}

.modal-price {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.modal-price .price-old {
    font-size: var(--font-size-lg);
}

.modal-price .price-current {
    font-size: var(--font-size-2xl);
}

.modal-description {
    color: var(--color-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
}

.modal-options {
    margin-bottom: var(--spacing-xl);
}

.modal-options h4 {
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--spacing-md);
}

.size-options,
.color-options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
}

.size-btn {
    min-width: 44px;
    height: 44px;
    padding: 0 var(--spacing-md);
    border: 1px solid var(--color-gray-lighter);
    background: var(--color-white);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-base);
}

.size-btn:hover,
.size-btn.active {
    border-color: var(--color-black);
    background: var(--color-black);
    color: var(--color-white);
}

.color-btn {
    min-width: 60px;
    height: 36px;
    padding: 0 var(--spacing-sm);
    border: 2px solid var(--color-gray-lighter);
    background: var(--color-white);
    font-size: var(--font-size-xs);
    cursor: pointer;
    transition: all var(--transition-base);
}

.color-btn:hover,
.color-btn.active {
    border-color: var(--color-black);
}

.modal-actions {
    display: flex;
    gap: var(--spacing-md);
}

.modal-actions .btn {
    flex: 1;
}

.btn-favorite {
    flex: 0 0 auto !important;
    width: 50px;
    padding: 0;
}

.btn-favorite i {
    font-size: 20px;
}

/* ----------------------------------------
   TOAST NOTIFICATION
   ---------------------------------------- */
.toast {
    position: fixed;
    bottom: var(--spacing-xl);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--spacing-md) var(--spacing-2xl);
    background: var(--color-black);
    color: var(--color-white);
    font-size: var(--font-size-sm);
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    animation: toastSlide 0.3s ease;
    text-align: center;
    max-width: 90%;
    white-space: nowrap;
}

@keyframes toastSlide {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

.toast.success {
    background: var(--color-success);
}

.toast.error {
    background: var(--color-error);
}

.toast.info {
    background: var(--color-info);
}

/* ----------------------------------------
   CART DRAWER
   ---------------------------------------- */
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1999;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
}

.cart-overlay.open {
    opacity: 1;
    visibility: visible;
}

.cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 500px;
    height: 100%;
    background: var(--color-white);
    z-index: 2000;
    transform: translateX(100%);
    transition: transform var(--transition-base);
    display: flex;
    flex-direction: column;
}

.cart-drawer.open {
    transform: translateX(0);
}

/* Cart Header - Fixo */
.cart-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--color-gray-lighter);
}

.cart-header h2 {
    font-size: var(--font-size-xl);
    font-weight: 600;
}

.cart-close {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark);
    transition: color var(--transition-base);
}

.cart-close i {
    font-size: 28px;
}

.cart-close:hover {
    color: var(--color-primary);
}

/* Cart Body - Com Scroll */
.cart-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);
}

/* Cart Empty */
.cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--color-gray);
}

.cart-empty-icon {
    font-size: 80px;
    color: var(--color-gray-lighter);
    margin-bottom: var(--spacing-lg);
}

.cart-empty p {
    font-size: var(--font-size-lg);
    color: var(--color-dark);
    margin-bottom: var(--spacing-xs);
}

.cart-empty span {
    font-size: var(--font-size-sm);
    color: var(--color-gray);
}

/* Cart Items */
.cart-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.cart-item {
    display: flex;
    gap: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-gray-lighter);
}

.cart-item-image {
    width: 80px;
    height: 100px;
    flex-shrink: 0;
    background: var(--color-bg);
    overflow: hidden;
}

.cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cart-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.cart-item-name {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-dark);
    margin-bottom: var(--spacing-xs);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cart-item-price {
    font-size: var(--font-size-sm);
    color: var(--color-gray);
    margin-bottom: var(--spacing-sm);
}

.cart-item-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-top: auto;
    flex-wrap: wrap;
}

.quantity-control {
    display: flex;
    align-items: center;
    border: 1px solid var(--color-gray-lighter);
}

.quantity-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark);
    transition: all var(--transition-base);
}

.quantity-btn:hover {
    background: var(--color-bg);
}

.quantity-btn i {
    font-size: 16px;
}

.quantity-value {
    width: 36px;
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.cart-item-total {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-primary);
}

.cart-item-remove {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray);
    transition: color var(--transition-base);
    margin-left: auto;
}

.cart-item-remove i {
    font-size: 18px;
}

.cart-item-remove:hover {
    color: var(--color-error);
}

/* Cart Totals */
.cart-totals {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-gray-lighter);
}

.cart-totals-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-base);
    color: var(--color-gray);
}

.cart-totals-row.total {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-gray-lighter);
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-dark);
}

.free-shipping {
    color: var(--color-success);
    font-weight: 500;
}

/* Cart Actions */
.cart-actions {
    margin-top: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

/* ----------------------------------------
   FOOTER
   ---------------------------------------- */
.footer-elegance {
    background: var(--color-black);
    color: var(--color-white);
    padding-top: var(--spacing-3xl);
}

/* Footer Top - Logo */
.footer-top {
    margin-bottom: var(--spacing-2xl);
}

.footer-logo {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    letter-spacing: 6px;
    color: var(--color-white);
    transition: color var(--transition-base);
}

.footer-logo:hover {
    color: var(--color-primary);
}

/* Newsletter */
.footer-newsletter {
    text-align: center;
    padding-bottom: var(--spacing-3xl);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: var(--spacing-2xl);
}

.footer-newsletter h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-white);
    margin-bottom: var(--spacing-sm);
}

.footer-newsletter p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: var(--spacing-lg);
}

.newsletter-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    gap: var(--spacing-sm);
}

.newsletter-form input {
    flex: 1;
    padding: var(--spacing-md) var(--spacing-lg);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: var(--color-white);
    font-size: var(--font-size-base);
    min-width: 0;
}

.newsletter-form input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.newsletter-form input:focus {
    outline: none;
    border-color: var(--color-primary);
}

.newsletter-form button {
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background var(--transition-base);
    white-space: nowrap;
}

.newsletter-form button:hover {
    background: var(--color-primary-dark);
}

/* Footer Content */
.footer-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2xl);
    padding-bottom: var(--spacing-3xl);
}

.footer-column h4 {
    font-size: var(--font-size-base);
    color: var(--color-white);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--spacing-lg);
}

.footer-column ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.footer-column a {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font-size-sm);
    transition: color var(--transition-base);
}

.footer-column a:hover {
    color: var(--color-primary);
}

/* Footer Contact */
.footer-contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-md);
}

.footer-contact-item i {
    font-size: 18px;
    color: var(--color-primary);
    margin-top: 2px;
    flex-shrink: 0;
}

/* Footer Social - Ícones maiores com hover corrigido */
.footer-social {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
}

.footer-social a {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    transition: all var(--transition-base);
}

.footer-social a i {
    font-size: 26px;
}

.footer-social a:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-black);
}

/* Footer Bottom */
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--spacing-lg) 0;
}

.footer-bottom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-md);
}

.footer-bottom p {
    color: rgba(255, 255, 255, 0.5);
    font-size: var(--font-size-sm);
    margin: 0;
}

.footer-payments {
    display: flex;
    gap: var(--spacing-sm);
}

.footer-payments i {
    font-size: 28px;
    color: rgba(255, 255, 255, 0.5);
}

/* ----------------------------------------
   RESPONSIVE - TABLET (1024px)
   ---------------------------------------- */
@media (max-width: 1024px) {
    :root {
        --font-size-4xl: 2rem;
        --font-size-3xl: 1.75rem;
    }

    .hero-banner {
        height: 500px;
    }

    .hero-slide-content {
        left: 5%;
        right: 5%;
        max-width: none;
    }

    .product-carousel {
        padding: 0 50px;
    }

    .product-carousel-container,
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }

    .modal-container {
        grid-template-columns: 1fr;
        max-width: 600px;
    }

    .modal-image {
        max-height: 350px;
    }
}

/* ----------------------------------------
   RESPONSIVE - MOBILE (768px)
   ---------------------------------------- */
@media (max-width: 768px) {
    :root {
        --navbar-height: 60px;
        --font-size-4xl: 1.75rem;
        --font-size-3xl: 1.5rem;
        --font-size-2xl: 1.25rem;
    }

    .container {
        padding: 0 var(--spacing-md);
    }

    .section {
        padding: var(--spacing-2xl) 0;
    }

    /* Navbar Mobile */
    .navbar-menu-toggle {
        display: flex;
    }

    .navbar-menu-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100%;
        background: var(--color-white);
        padding: calc(var(--navbar-height) + var(--spacing-xl)) var(--spacing-lg) var(--spacing-lg);
        transform: translateX(-100%);
        transition: transform var(--transition-base);
        z-index: 999;
        box-shadow: var(--shadow-xl);
        overflow-y: auto;
    }

    .navbar-menu-wrapper.open {
        transform: translateX(0);
    }

    .navbar-menu {
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
    }

    .navbar-menu li {
        width: 100%;
    }

    .navbar-menu a {
        display: block;
        font-size: var(--font-size-base);
        padding: var(--spacing-md) 0;
        border-bottom: 1px solid var(--color-gray-lighter);
    }

    .navbar-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 998;
    }

    .navbar-logo {
        font-size: var(--font-size-xl);
        letter-spacing: 3px;
    }

    /* Hero Mobile */
    .hero-banner {
        height: 450px;
    }

    .hero-slide-content {
        left: var(--spacing-md);
        right: var(--spacing-md);
    }

    .hero-slide-content h1 {
        font-size: var(--font-size-2xl);
    }

    .hero-slide-content p {
        font-size: var(--font-size-base);
        margin-bottom: var(--spacing-lg);
    }

    .hero-nav {
        width: 40px;
        height: 40px;
    }

    .hero-nav i {
        font-size: 22px;
    }

    .hero-nav.prev {
        left: var(--spacing-sm);
    }

    .hero-nav.next {
        right: var(--spacing-sm);
    }

    /* Product Grid Mobile */
    .product-carousel {
        padding: 0;
    }

    .product-carousel-container,
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
    }

    .carousel-nav {
        display: none;
    }

    .product-card-info {
        padding: var(--spacing-sm);
    }

    .product-name {
        font-size: var(--font-size-sm);
    }

    .price-current {
        font-size: var(--font-size-base);
    }

    /* Cart Mobile */
    .cart-drawer {
        max-width: 100%;
    }

    .cart-header {
        padding: var(--spacing-md);
    }

    .cart-body {
        padding: var(--spacing-md);
    }

    /* Footer Mobile */
    .footer-top {
        text-align: center;
    }

    .footer-logo {
        font-size: var(--font-size-2xl);
    }

    .footer-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
        text-align: center;
    }

    .footer-column h4 {
        margin-bottom: var(--spacing-md);
    }

    .footer-contact-item {
        justify-content: center;
    }

    .footer-social {
        justify-content: center;
    }

    .newsletter-form {
        flex-direction: column;
    }

    .newsletter-form button {
        width: 100%;
    }

    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }

    /* Modal Mobile */
    .modal-overlay {
        padding: var(--spacing-sm);
    }

    .modal-container {
        max-height: 95vh;
    }

    .modal-image {
        max-height: 280px;
    }

    .modal-content {
        padding: var(--spacing-lg);
    }

    .modal-title {
        font-size: var(--font-size-xl);
    }

    .modal-actions {
        flex-direction: column;
    }

    .modal-actions .btn {
        width: 100%;
    }

    .btn-favorite {
        width: 100% !important;
    }

    /* Toast Mobile */
    .toast {
        left: var(--spacing-md);
        right: var(--spacing-md);
        transform: none;
        white-space: normal;
    }

    @keyframes toastSlide {
        from {
            transform: translateY(100%);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
}

/* ----------------------------------------
   RESPONSIVE - SMALL MOBILE (480px)
   ---------------------------------------- */
@media (max-width: 480px) {
    :root {
        --font-size-4xl: 1.5rem;
        --font-size-3xl: 1.25rem;
        --font-size-2xl: 1.125rem;
    }

    .hero-banner {
        height: 400px;
    }

    .hero-slide-content h1 {
        font-size: var(--font-size-xl);
    }

    .hero-slide-content p {
        font-size: var(--font-size-sm);
    }

    .btn {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: var(--font-size-xs);
    }

    .section-title {
        font-size: var(--font-size-xl);
    }

    .section-subtitle {
        font-size: var(--font-size-base);
    }

    /* Cards em coluna única - maiores */
    .product-carousel-container,
    .product-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
    }

    .product-card {
        max-width: 100%;
    }

    .product-card-image {
        aspect-ratio: 4 / 5;
    }

    .product-card-info {
        padding: var(--spacing-md);
    }

    .product-name {
        font-size: var(--font-size-base);
    }

    .price-current {
        font-size: var(--font-size-lg);
    }

    .promo-banner {
        min-height: 300px;
    }

    .promo-banner-content {
        padding: var(--spacing-lg);
    }

    .promo-banner-content h2 {
        font-size: var(--font-size-xl);
    }

    .promo-banner-content p {
        font-size: var(--font-size-sm);
    }

    .footer-social a {
        width: 44px;
        height: 44px;
    }

    .footer-social a i {
        font-size: 22px;
    }

    .cart-item {
        flex-direction: column;
    }

    .cart-item-image {
        width: 100%;
        height: 180px;
    }

    .cart-item-name {
        font-size: var(--font-size-base);
        white-space: normal;
    }

    .cart-item-actions {
        justify-content: space-between;
    }
}
```

### Enviar para o GitHub

```
git add .
git commit -m "Etapa 1: Setup + Estrutura base"
git push origin etapa-1-setup-estrutura-base
```
