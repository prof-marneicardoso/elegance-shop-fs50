# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 5 - Cards e API (fetch + useEffect + map)

🎯 Objetivos desta etapa

- Entender como buscar dados de uma API externa
- Usar useEffect para carregar dados ao iniciar
- Usar map() para renderizar listas
- Criar o componente ProductCard com props
- Criar o componente ProductCarousel
- Tratar estados de loading e erro

---

### O que é uma API?

API (Application Programming Interface) é uma forma de dois sistemas conversarem. Pense assim:

  - Você (garçom) vai até a cozinha (API) e faz um pedido
  - A cozinha prepara e devolve o prato (dados)
  - Você entrega ao cliente (exibe na tela)

No nosso caso:

  - O React faz uma requisição para a MockAPI
  - A MockAPI retorna os produtos em formato JSON
  - O React exibe os produtos na tela

JSON (JavaScript Object Notation) é o formato mais comum para troca de dados:

```json
[
    {
        "id": 1,
        "name": "Vestido Floral",
        "price": 189.90,
        "image": "https://..."
    },
    {
        "id": 2,
        "name": "Blusa de Seda",
        "price": 129.90,
        "image": "https://..."
    }
]
```

### Fetch API

O fetch é uma função nativa do JavaScript para fazer requisições HTTP.

Sintaxe básica:

```js
fetch("https://api.exemplo.com/dados")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Erro:", error);
    });
```

## Criando os Componentes

### Criar a branch da Etapa 5

```
git switch -c etapa-5-cards-api-useEffect-map
```

### Passo 1: Criar o ProductCard

Crie o arquivo src/components/shop/ProductCard.jsx:

```jsx
// Importamos a função de formatação de moeda
import { formatCurrency } from "../../utils/format";

// Componente ProductCard
// Exibe um card de produto com imagem, nome, preço e tags
// Props:
//   - product: objeto com os dados do produto
//   - onOpenModal: função chamada ao clicar no card (opcional, para próxima etapa)
export default function ProductCard({ product, onOpenModal }) {
    // Função chamada ao clicar no card
    const handleClick = () => {
        // Se recebeu a função onOpenModal, chama ela
        if (onOpenModal) {
            onOpenModal(product);
        }
    };

    return (
        <div className="product-card" onClick={handleClick}>
            {/* Imagem do produto */}
            <div className="product-card-image">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                />

                {/* Tags: Novo e/ou Desconto */}
                <div className="product-tags">
                    {/* Só mostra a tag "Novo" se isNew for true */}
                    {product.isNew && (
                        <span className="tag tag-new">Novo</span>
                    )}
                    
                    {/* Só mostra a tag de desconto se discount existir */}
                    {product.discount && (
                        <span className="tag tag-discount">-{product.discount}%</span>
                    )}
                </div>

                {/* Overlay com botões de ação (aparecem no hover) */}
                <div className="product-card-overlay">
                    <button 
                        className="product-action-btn" 
                        aria-label="Adicionar à sacola"
                        onClick={(e) => {
                            // Impede que o clique propague para o card
                            e.stopPropagation();
                            // Funcionalidade será implementada na etapa do carrinho
                            console.log("Adicionar ao carrinho:", product.name);
                        }}
                    >
                        <i className="bx bx-shopping-bag"></i>
                    </button>
                    <button 
                        className="product-action-btn" 
                        aria-label="Favoritar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="bx bx-heart"></i>
                    </button>
                    <button 
                        className="product-action-btn" 
                        aria-label="Visualização rápida"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="bx bx-show"></i>
                    </button>
                </div>
            </div>

            {/* Informações do produto */}
            <div className="product-card-info">
                {/* Categoria/Tag do produto */}
                <span className="product-tag">{product.tag}</span>
                
                {/* Nome do produto */}
                <h3 className="product-name">{product.name}</h3>
                
                {/* Preços */}
                <div className="product-price">
                    {/* Só mostra preço antigo se existir */}
                    {product.oldPrice && (
                        <span className="price-old">
                            {formatCurrency(product.oldPrice)}
                        </span>
                    )}
                    
                    {/* Preço atual */}
                    <span className="price-current">
                        {formatCurrency(product.price)}
                    </span>
                </div>
            </div>
        </div>
    );
}
```

### Passo 2: Criar o ProductCarousel

Crie o arquivo src/components/home/ProductCarousel.jsx:

```jsx
// Importamos useState e o componente ProductCard
import { useState } from "react";
import ProductCard from "../shop/ProductCard";

// Componente ProductCarousel
// Exibe uma lista de produtos em formato de carrossel horizontal
// Props:
//   - products: array de produtos a exibir
//   - title: título da seção
//   - subtitle: subtítulo da seção
//   - onOpenModal: função para abrir modal de produto
export default function ProductCarousel({ products = [], title, subtitle, onOpenModal }) {
    // Índice do primeiro produto visível
    const [startIndex, setStartIndex] = useState(0);
    
    // Quantos produtos mostrar por vez
    const itemsPerPage = 4;

    // Navegar para a esquerda (produtos anteriores)
    const handlePrev = () => {
        setStartIndex((prev) => {
            // Se está no início, vai para o final
            if (prev === 0) {
                return Math.max(0, products.length - itemsPerPage);
            }
            // Senão, volta 1 posição
            return prev - 1;
        });
    };

    // Navegar para a direita (próximos produtos)
    const handleNext = () => {
        setStartIndex((prev) => {
            // Se está no final, volta ao início
            if (prev >= products.length - itemsPerPage) {
                return 0;
            }
            // Senão, avança 1 posição
            return prev + 1;
        });
    };

    // Pega apenas os produtos que devem aparecer na tela
    // slice(início, fim) retorna uma parte do array
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="section">
            <div className="container">
                {/* Cabeçalho da seção (só aparece se tiver título ou subtítulo) */}
                {(title || subtitle) && (
                    <div className="section-header">
                        {title && <h2 className="section-title">{title}</h2>}
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
                    </div>
                )}

                {/* Carrossel de produtos */}
                <div className="product-carousel">
                    {/* Botão anterior (só aparece se tiver mais produtos que o visível) */}
                    {products.length > itemsPerPage && (
                        <button 
                            className="carousel-nav prev" 
                            onClick={handlePrev} 
                            aria-label="Anterior"
                        >
                            <i className="bx bx-chevron-left"></i>
                        </button>
                    )}

                    {/* Container dos cards */}
                    <div className="product-carousel-container">
                        {/* 
                            Usamos map() para transformar cada produto em um ProductCard
                            key={product.id} é obrigatório para o React identificar cada item
                        */}
                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onOpenModal={onOpenModal}
                            />
                        ))}
                    </div>

                    {/* Botão próximo */}
                    {products.length > itemsPerPage && (
                        <button 
                            className="carousel-nav next" 
                            onClick={handleNext} 
                            aria-label="Próximo"
                        >
                            <i className="bx bx-chevron-right"></i>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
```

### Passo 3: Atualizar o main.jsx

Agora vamos buscar os dados da API no ponto de entrada da aplicação.

Substitua o conteúdo do arquivo src/main.jsx:

```jsx
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
```

### Passo 4: Atualizar o App.jsx

Substitua o conteúdo do arquivo src/App.jsx:

```jsx
// Importamos os componentes
import Layout from "./components/layout/Layout";
import HeroBanner from "./components/home/HeroBanner";
import ProductCarousel from "./components/home/ProductCarousel";
import PromoBanner from "./components/home/PromoBanner";

// O App agora recebe products como prop (vem do main.jsx)
function App({ products = [] }) {
    // Dados dos slides do banner
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
        <Layout>
            {/* Banner principal */}
            <HeroBanner slides={heroSlides} />

            {/* Carrossel de Novidades - todos os produtos */}
            <ProductCarousel
                products={products}
                title="Novidades"
                subtitle="As últimas peças que acabaram de chegar"
            />

            {/* Banner promocional */}
            <PromoBanner
                image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
                title="Outlet com até 50% OFF"
                subtitle="Peças selecionadas com preços imperdíveis"
                buttonText="Ver Ofertas"
            />

            {/* Carrossel de Mais Vendidos - primeiros 8 produtos */}
            <ProductCarousel
                products={products.slice(0, 8)}
                title="Mais Vendidos"
                subtitle="Os queridinhos das nossas clientes"
            />
        </Layout>
    );
}

export default App;
```

### 🎯 Exercícios para Fixação

1. Adicione um console.log: No ProductCarousel, adicione console.log("Produtos recebidos:", products) para ver os dados no console.

2. Filtre produtos: Crie uma terceira seção mostrando apenas produtos com desconto (use filter antes do map).

3. Altere itemsPerPage: Mude para 3 ou 5 e veja como o carrossel se comporta.

4. Teste o erro: Mude a URL da API para algo errado e veja a tela de erro aparecer.


### Enviar para o GitHub

```
git add .
git commit -m "Etapa 5: Cards de produtos com API"
git push origin etapa-5-cards-api-useEffect-map
```
