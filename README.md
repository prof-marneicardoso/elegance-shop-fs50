# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 4 - Layout (children + Composição)

🎯 Objetivos desta etapa

- Entender o conceito de children no React
- Aprender o padrão de composição de componentes
- Criar um componente Layout reutilizável
- Estruturar as sections da página inicial

---

### O que é Children?

Imagine uma caixa de presente. A caixa é sempre a mesma, mas o presente dentro pode ser qualquer coisa: um livro, um brinquedo, uma roupa.

No React, children funciona assim. É uma prop especial que representa "o que está dentro" do componente.

```jsx
<Caixa>
    <Presente />
</Caixa>
```

O componente Caixa recebe Presente como children. A Caixa não precisa saber o que é o Presente - ela só precisa renderizá-lo no lugar certo.

Código do componente Caixa:

```jsx
function Caixa({ children }) {
    return <div className="caixa-bonita">{children}</div>;
}
```

Usando o componente:

```jsx
<Caixa>
    <p>Qualquer coisa aqui dentro!</p>
    <button>Até botões!</button>
</Caixa>
```

## Criando o Footer

### Criar a branch da Etapa 4

```
git switch -c etapa-4-layout-children-sections
```

### Passo 1: Criar o arquivo Layout.jsx

Crie o arquivo src/components/layout/Layout.jsx:

```jsx
// Importamos os componentes que fazem parte do Layout
import Navbar from "./Navbar";
import Footer from "./Footer";

// Componente Layout
// Recebe "children" como prop - tudo que estiver entre <Layout> e </Layout>
// Esse padrão é chamado de COMPOSIÇÃO
export default function Layout({ children }) {
    return (
        <div className="layout-elegance">
            {/* Navbar sempre aparece no topo */}
            <Navbar />

            {/* 
                O children é o conteúdo específico de cada página
                Pode ser a Home, a página de Produtos, o Carrinho, etc.
                O Layout não precisa saber o que é - só renderiza!
            */}
            <main className="main-elegance">{children}</main>

            {/* Footer sempre aparece no rodapé */}
            <Footer />
        </div>
    );
}
```

### Passo 2: Atualizar o App.jsx

Substitua o conteúdo do arquivo src/App.jsx:

```jsx
// Importamos os componentes
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
    return (
        <div>
            {/* Navbar no topo */}
            <Navbar />

            {/* Conteúdo temporário */}
            <main className="main-elegance">
                <div className="container" style={{ padding: "60px 20px" }}>
                    <h1>Elegance Shop</h1>
                    <p>Em construção...</p>
                    <p>Role para baixo para ver o Footer!</p>

                    {/* Espaço para simular conteúdo */}
                    <div style={{ height: "50vh" }}></div>
                </div>
            </main>

            {/* Footer no rodapé */}
            <Footer />
        </div>
    );
}

export default App;
```

### Passo 2: Criar o componente HeroBanner

Agora vamos criar as sections da página inicial. Começando pelo banner principal.

Crie o arquivo src/components/home/HeroBanner.jsx:

```jsx
// Importamos os hooks necessários
import { useState, useEffect, useCallback } from "react";

// Componente HeroBanner
// Um carrossel de imagens para o topo da página
// Props:
//   - slides: array com os dados de cada slide
//   - autoplayInterval: tempo entre trocas automáticas (em ms)
export default function HeroBanner({ slides = [], autoplayInterval = 5000 }) {
    // ========== ESTADO ==========
    // Qual slide está ativo (começa no primeiro: índice 0)
    const [currentSlide, setCurrentSlide] = useState(0);

    // Se está no meio de uma animação (evita cliques rápidos)
    const [isAnimating, setIsAnimating] = useState(false);

    // ========== SLIDES PADRÃO ==========
    // Se não receber slides via props, usa esses
    const defaultSlides = [
        {
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop",
            title: "Nova Coleção Verão",
            subtitle: "Descubra as tendências da estação com até 40% OFF",
            buttonText: "Comprar Agora",
        },
        {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop",
            title: "Elegância em Cada Detalhe",
            subtitle: "Peças exclusivas para mulheres que fazem a diferença",
            buttonText: "Ver Coleção",
        },
        {
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop",
            title: "Estilo Atemporal",
            subtitle: "Clássicos que nunca saem de moda",
            buttonText: "Explorar",
        },
    ];

    // Usa os slides recebidos ou os padrão
    const activeSlides = slides.length > 0 ? slides : defaultSlides;

    // ========== FUNÇÕES ==========
    // useCallback memoriza a função para evitar recriações desnecessárias
    // Isso é importante quando a função é usada em useEffect

    // Ir para um slide específico
    const goToSlide = useCallback(
        (index) => {
            // Se está animando, ignora o clique
            if (isAnimating) return;

            setIsAnimating(true);
            setCurrentSlide(index);

            // Libera para nova animação após 500ms
            setTimeout(() => setIsAnimating(false), 500);
        },
        [isAnimating],
    );

    // Ir para o próximo slide
    const goToNext = useCallback(() => {
        // Se está no último, volta para o primeiro
        const next = (currentSlide + 1) % activeSlides.length;
        goToSlide(next);
    }, [currentSlide, activeSlides.length, goToSlide]);

    // Ir para o slide anterior
    const goToPrev = useCallback(() => {
        // Se está no primeiro, vai para o último
        const prev =
            (currentSlide - 1 + activeSlides.length) % activeSlides.length;
        goToSlide(prev);
    }, [currentSlide, activeSlides.length, goToSlide]);

    // ========== EFEITO: AUTOPLAY ==========
    // Troca de slide automaticamente a cada X segundos
    useEffect(() => {
        // Se só tem 1 slide, não precisa de autoplay
        if (activeSlides.length <= 1) return;

        // Cria um intervalo que executa goToNext
        const interval = setInterval(() => {
            goToNext();
        }, autoplayInterval);

        // Cleanup: limpa o intervalo quando o componente sai da tela
        // ou quando as dependências mudam
        return () => clearInterval(interval);
    }, [activeSlides.length, autoplayInterval, goToNext]);

    // ========== RENDERIZAÇÃO ==========
    return (
        <section className="hero-banner">
            {/* Container dos slides */}
            <div className="hero-slides">
                {activeSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? "active" : ""}`}
                    >
                        {/* Imagem de fundo */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="hero-slide-image"
                        />

                        {/* Overlay escuro para melhorar leitura do texto */}
                        <div className="hero-slide-overlay"></div>

                        {/* Conteúdo do slide */}
                        <div className="hero-slide-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <button className="btn btn-white">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navegação (só aparece se tiver mais de 1 slide) */}
            {activeSlides.length > 1 && (
                <>
                    {/* Setas de navegação */}
                    <button
                        className="hero-nav prev"
                        onClick={goToPrev}
                        aria-label="Anterior"
                    >
                        <i className="bx bx-chevron-left"></i>
                    </button>
                    <button
                        className="hero-nav next"
                        onClick={goToNext}
                        aria-label="Próximo"
                    >
                        <i className="bx bx-chevron-right"></i>
                    </button>

                    {/* Indicadores (bolinhas) */}
                    <div className="hero-indicators">
                        {activeSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`hero-indicator ${index === currentSlide ? "active" : ""}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
```

### Passo 3: Criar o componente PromoBanner

Crie o arquivo src/components/home/PromoBanner.jsx:

```jsx
// Componente PromoBanner
// Um banner promocional simples com imagem e texto
// Props:
//   - image: URL da imagem de fundo
//   - title: título do banner
//   - subtitle: texto secundário
//   - buttonText: texto do botão
export default function PromoBanner({ image, title, subtitle, buttonText }) {
    return (
        <section
            className="promo-banner"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Overlay para escurecer a imagem */}
            <div className="promo-banner-overlay"></div>

            {/* Conteúdo */}
            <div className="promo-banner-content">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <button className="btn btn-white">{buttonText}</button>
            </div>
        </section>
    );
}
```

### Passo 4: Atualizar o App.jsx

Substitua o conteúdo do arquivo src/App.jsx:

```jsx
// Importamos o Layout e os componentes da Home
import Layout from "./components/layout/Layout";
import HeroBanner from "./components/home/HeroBanner";
import PromoBanner from "./components/home/PromoBanner";

function App() {
    // Dados dos slides do HeroBanner
    // Poderíamos deixar o HeroBanner usar os slides padrão,
    // mas passando via props temos mais controle
    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop",
            title: "Nova Coleção Verão",
            subtitle: "Descubra as tendências da estação com até 40% OFF",
            buttonText: "Comprar Agora",
        },
        {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop",
            title: "Elegância em Cada Detalhe",
            subtitle: "Peças exclusivas para mulheres que fazem a diferença",
            buttonText: "Ver Coleção",
        },
        {
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop",
            title: "Estilo Atemporal",
            subtitle: "Clássicos que nunca saem de moda",
            buttonText: "Explorar",
        },
    ];

    return (
        // Layout envolve todo o conteúdo usando CHILDREN
        // Tudo entre <Layout> e </Layout> vira o children
        <Layout>
            {/* HeroBanner - Carrossel principal */}
            <HeroBanner slides={heroSlides} />

            {/* Seção de produtos virá aqui na próxima etapa */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Novidades</h2>
                        <p className="section-subtitle">As últimas peças que acabaram de chegar</p>
                    </div>
                    <p style={{ textAlign: "center", color: "#666" }}>
                        Os produtos serão carregados na próxima etapa...
                    </p>
                </div>
            </section>

            {/* PromoBanner - Banner promocional */}
            <PromoBanner
                image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
                title="Outlet com até 50% OFF"
                subtitle="Peças selecionadas com preços imperdíveis"
                buttonText="Ver Ofertas"
            />

            {/* Outra seção de produtos virá aqui */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Mais Vendidos</h2>
                        <p className="section-subtitle">Os queridinhos das nossas clientes</p>
                    </div>
                    <p style={{ textAlign: "center", color: "#666" }}>
                        Os produtos serão carregados na próxima etapa...
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default App;
```

### 🎯 Exercícios para Fixação

1. Adicione um slide: Adicione um quarto slide ao array heroSlides com uma nova imagem do Unsplash.

2. Altere o intervalo: Mude o autoplayInterval do HeroBanner para 3000 (3 segundos).

3. Crie outro PromoBanner: Adicione um segundo PromoBanner após a seção "Mais Vendidos" com uma promoção diferente.

4. Experimente o children: Crie um componente simples chamado Card que recebe children e renderiza dentro de uma div estilizada.

### Enviar para o GitHub

```
git add .
git commit -m "Etapa 4: Layout com children e sections"
git push origin etapa-4-layout-children-sections
```
