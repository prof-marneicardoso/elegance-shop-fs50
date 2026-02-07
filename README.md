# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 6 - Modal de Detalhes (useState + Eventos)

🎯 Objetivos desta etapa

- Criar um Modal para exibir detalhes do produto
- Gerenciar abertura e fechamento com useState
- Trabalhar com eventos de teclado (ESC para fechar)
- Entender propagação de eventos
- Implementar seleção de tamanho e cor

---

### O que é um Modal?

Modal é uma janela que aparece sobre o conteúdo da página, pedindo atenção do usuário. É como uma caixa de diálogo.

Características de um bom modal:

1. Overlay escuro: Escurece o fundo para destacar o modal
2. Centralizado: Aparece no centro da tela
3. Bloqueia scroll: A página não rola enquanto o modal está aberto
4. Fecha ao clicar fora: Clicar no overlay fecha o modal
5. Fecha com ESC: Pressionar a tecla ESC fecha o modal
6. Botão de fechar: Um X visível para fechar

## Criando o Modal

### Criar a branch da Etapa 6

```
git switch -c etapa-6-modal-useState-eventos
```

### Passo 1: Criar o ProductModal

Crie o arquivo src/components/product/ProductModal.jsx:

```jsx
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";

// Componente ProductModal
// Exibe detalhes de um produto em uma janela modal
// Props:
//   - product: objeto com dados do produto (ou null)
//   - isOpen: boolean indicando se o modal está aberto
//   - onClose: função para fechar o modal
export default function ProductModal({ product, isOpen, onClose }) {
    // ========== ESTADOS LOCAIS ==========
    // Tamanho selecionado pelo usuário
    const [selectedSize, setSelectedSize] = useState("");

    // Cor selecionada pelo usuário
    const [selectedColor, setSelectedColor] = useState("");

    // ========== EFEITO: BLOQUEAR SCROLL ==========
    // Quando o modal abre, bloqueamos o scroll da página
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup: garante que o scroll volta ao normal
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // ========== EFEITO: FECHAR COM ESC ==========
    // Permite fechar o modal pressionando a tecla Escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        // Só adiciona o listener se o modal estiver aberto
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        // Cleanup: remove o listener
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    // ========== EFEITO: RESETAR SELEÇÕES ==========
    // Quando o produto muda, limpa as seleções anteriores
    useEffect(() => {
        if (product) {
            setSelectedSize("");
            setSelectedColor("");
        }
    }, [product]);

    // ========== RENDERIZAÇÃO CONDICIONAL ==========
    // Se não tem produto, não renderiza nada
    if (!product) return null;

    // ========== PROCESSAMENTO DOS DADOS ==========
    // Os tamanhos e cores vêm como string separada por vírgula
    // Convertemos para array para poder usar map()
    const sizes = product.sizes
        ? product.sizes.split(",").map((s) => s.trim())
        : [];

    const colors = product.colors
        ? product.colors.split(",").map((c) => c.trim())
        : [];

    // ========== FUNÇÃO: ADICIONAR AO CARRINHO ==========
    const handleAddToCart = () => {
        // Por enquanto, só exibe no console
        // Na próxima etapa, vamos integrar com o carrinho real
        console.log("Adicionar ao carrinho:", {
            ...product,
            selectedSize,
            selectedColor,
        });

        // Fecha o modal após adicionar
        onClose();
    };

    // ========== RENDERIZAÇÃO ==========
    return (
        // Overlay - fundo escuro que fecha o modal ao clicar
        <div
            className={`modal-overlay ${isOpen ? "open" : ""}`}
            onClick={onClose}
        >
            {/* Container do modal - stopPropagation impede que clique feche */}
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão de fechar (X) */}
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    <i className="bx bx-x"></i>
                </button>

                {/* Imagem do produto */}
                <div className="modal-image">
                    <img src={product.image} alt={product.name} />

                    {/* Tags */}
                    <div className="product-tags">
                        {product.isNew && (
                            <span className="tag tag-new">Novo</span>
                        )}
                        {product.discount && (
                            <span className="tag tag-discount">
                                -{product.discount}%
                            </span>
                        )}
                    </div>
                </div>

                {/* Conteúdo/informações do produto */}
                <div className="modal-content">
                    {/* Categoria */}
                    <span className="modal-tag">{product.tag}</span>

                    {/* Nome */}
                    <h2 className="modal-title">{product.name}</h2>

                    {/* Preços */}
                    <div className="modal-price">
                        {product.oldPrice && (
                            <span className="price-old">
                                {formatCurrency(product.oldPrice)}
                            </span>
                        )}
                        <span className="price-current">
                            {formatCurrency(product.price)}
                        </span>
                    </div>

                    {/* Descrição */}
                    <p className="modal-description">
                        {product.description ||
                            "Produto de alta qualidade, perfeito para diversas ocasiões. Confeccionado com materiais selecionados para garantir conforto e durabilidade."}
                    </p>

                    {/* Seleção de tamanho (só aparece se tiver tamanhos) */}
                    {sizes.length > 0 && (
                        <div className="modal-options">
                            <h4>Tamanho</h4>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Seleção de cor (só aparece se tiver cores) */}
                    {colors.length > 0 && (
                        <div className="modal-options">
                            <h4>Cor</h4>
                            <div className="color-options">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`color-btn ${selectedColor === color ? "active" : ""}`}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botões de ação */}
                    <div className="modal-actions">
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                        >
                            Adicionar à Sacola
                        </button>
                        <button
                            className="btn btn-outline btn-favorite"
                            aria-label="Favoritar"
                        >
                            <i className="bx bx-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

### Passo 2: Atualizar o App.jsx

Agora vamos conectar o modal ao resto da aplicação.

Substitua o conteúdo do arquivo src/App.jsx:

```jsx
import { useState } from "react";
import Layout from "./components/layout/Layout";
import HeroBanner from "./components/home/HeroBanner";
import ProductCarousel from "./components/home/ProductCarousel";
import PromoBanner from "./components/home/PromoBanner";
import ProductModal from "./components/product/ProductModal";

function App({ products = [] }) {
    // ========== ESTADOS DO MODAL ==========
    // Produto selecionado para exibir no modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Se o modal está aberto ou fechado
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ========== FUNÇÕES DO MODAL ==========
    // Abre o modal com o produto clicado
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Fecha o modal e limpa o produto selecionado
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // ========== DADOS DO BANNER ==========
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

            {/* Carrossel de Novidades */}
            <ProductCarousel
                products={products}
                title="Novidades"
                subtitle="As últimas peças que acabaram de chegar"
                onOpenModal={handleOpenModal}
            />

            {/* Banner promocional */}
            <PromoBanner
                image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
                title="Outlet com até 50% OFF"
                subtitle="Peças selecionadas com preços imperdíveis"
                buttonText="Ver Ofertas"
            />

            {/* Carrossel de Mais Vendidos */}
            <ProductCarousel
                products={products.slice(0, 8)}
                title="Mais Vendidos"
                subtitle="Os queridinhos das nossas clientes"
                onOpenModal={handleOpenModal}
            />

            {/* Modal de detalhes do produto */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </Layout>
    );
}

export default App;
```

## Entendendo o Fluxo de Dados do Modal

```
App.jsx
├── selectedProduct (estado)
├── isModalOpen (estado)
├── handleOpenModal (função)
└── handleCloseModal (função)
        │
        ▼
ProductCarousel
└── onOpenModal={handleOpenModal}  // Passa a função para baixo
        │
        ▼
ProductCard
└── onClick → onOpenModal(product)  // Chama a função ao clicar
        │
        ▼
ProductModal
├── product={selectedProduct}  // Recebe o produto
├── isOpen={isModalOpen}       // Recebe se está aberto
└── onClose={handleCloseModal} // Recebe função para fechar
```

### 🎯 Exercícios para Fixação

1. Adicione quantidade: Crie um estado quantity e botões + e - para alterar a quantidade antes de adicionar ao carrinho.

2. Validação: Antes de adicionar ao carrinho, verifique se o usuário selecionou tamanho (se houver). Mostre um alert se não selecionou.

3. Indicador de seleção: Mostre abaixo dos botões qual tamanho e cor foram selecionados (ex: "Tamanho: M | Cor: Preto").

4. Animação: Experimente adicionar uma transição CSS para o modal aparecer suavemente (o CSS já deve ter isso, observe).

### Enviar para o GitHub

```
git add .
git commit -m "Etapa 6: Modal de detalhes do produto"
git push origin etapa-6-modal-useState-eventos
```
