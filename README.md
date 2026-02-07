# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 7 - Carrinho de Compras (Context API + localStorage)

🎯 Objetivos desta etapa

- Entender o problema do prop drilling
- Aprender a usar Context API para estado global
- Criar um Custom Hook (useCart)
- Implementar persistência com localStorage
- Criar o CartDrawer (carrinho lateral)
- Criar o componente Toast para feedback

---

### O Problema do Prop Drilling

Imagine que você precisa passar o carrinho de compras para vários componentes:

```
App
└── Layout
    └── Navbar (precisa mostrar quantidade)
    └── Main
        └── ProductCarousel
            └── ProductCard (precisa adicionar ao carrinho)
        └── ProductModal (precisa adicionar ao carrinho)
    └── CartDrawer (precisa da lista completa)
```

Para o ProductCard acessar o carrinho, precisaríamos passar props por todos os componentes intermediários:

```
App → Layout → Main → ProductCarousel → ProductCard
```

Isso é chamado de prop drilling (perfuração de props). É ruim porque:

  - Componentes intermediários recebem props que não usam
  - Código fica difícil de manter
  - Qualquer mudança exige alterar vários arquivos

### Context API - A Solução

O Context permite compartilhar dados entre componentes sem passar props manualmente em cada nível.

Analogia do rádio:

  - Provider é a estação de rádio (transmite o sinal)
  - Consumer/useContext é o rádio receptor (capta o sinal)
  - Qualquer rádio sintonizado recebe a mensagem, não importa a distância

### Três passos para usar Context:

1. Criar o Context:

```
const MeuContexto = createContext();
```

2. Criar o Provider (quem transmite):

```
function MeuProvider({ children }) {
    const [dados, setDados] = useState([]);
    
    return (
        <MeuContexto.Provider value={{ dados, setDados }}>
            {children}
        </MeuContexto.Provider>
    );
}
```

3. Consumir com useContext (quem recebe):

```
function MeuComponente() {
    const { dados, setDados } = useContext(MeuContexto);
    // Agora pode usar dados e setDados!
}
```

### localStorage para Persistência

O localStorage permite salvar dados no navegador. Os dados persistem mesmo após fechar a aba.

Salvar dados:

```
localStorage.setItem("chave", "valor");

// Para objetos, converta para JSON
localStorage.setItem("carrinho", JSON.stringify(arrayDeItens));
```

Recuperar dados:

```
const valor = localStorage.getItem("chave");

// Para objetos, converta de volta
const itens = JSON.parse(localStorage.getItem("carrinho"));
```

Remover dados:

```
localStorage.removeItem("chave");
```

### No carrinho, usamos assim:

  1. Quando o app inicia → carrega do localStorage
  2. Quando o carrinho muda → salva no localStorage



## Criando o Sistema de Carrinho

### Criar a branch da Etapa 6

```
git switch -c etapa-7-carrinho-context-localStorage
```

### Passo 1: Criar o CartContext

Crie o arquivo src/context/CartContext.jsx:

```jsx
import { createContext, useContext, useState, useEffect } from "react";

// ========== 1. CRIAR O CONTEXT ==========
// Criamos um "canal de comunicação" para o carrinho
const CartContext = createContext();

// ========== 2. CRIAR O PROVIDER ==========
// O Provider é o componente que "transmite" os dados
// Todos os componentes dentro dele podem acessar o carrinho
export function CartProvider({ children }) {
    // ----- Estados -----
    // Lista de itens no carrinho
    const [cartItems, setCartItems] = useState([]);
    
    // Se o drawer do carrinho está aberto
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Mensagem de toast (feedback para o usuário)
    const [toast, setToast] = useState({ message: "", type: "success" });

    // ----- Efeito: Carregar do localStorage -----
    // Executa apenas uma vez, quando o componente monta
    useEffect(() => {
        const saved = localStorage.getItem("elegance-cart");
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error("Erro ao carregar carrinho:", e);
            }
        }
    }, []);

    // ----- Efeito: Salvar no localStorage -----
    // Executa toda vez que cartItems muda
    useEffect(() => {
        localStorage.setItem("elegance-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // ----- Função: Mostrar Toast -----
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        
        // Remove o toast após 3 segundos
        setTimeout(() => {
            setToast({ message: "", type: "success" });
        }, 3000);
    };

    // ----- Função: Adicionar ao Carrinho -----
    const addToCart = (product) => {
        setCartItems((prev) => {
            // Verifica se o produto já está no carrinho
            const exists = prev.find((item) => item.id === product.id);
            
            if (exists) {
                // Se existe, aumenta a quantidade
                showToast(`${product.name} - quantidade atualizada!`);
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            // Se não existe, adiciona com quantidade 1
            showToast(`${product.name} adicionado à sacola!`);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // ----- Função: Remover do Carrinho -----
    const removeFromCart = (productId) => {
        const product = cartItems.find((item) => item.id === productId);
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        
        if (product) {
            showToast(`${product.name} removido da sacola`, "info");
        }
    };

    // ----- Função: Atualizar Quantidade -----
    const updateQuantity = (productId, quantity) => {
        // Não permite quantidade menor que 1
        if (quantity < 1) return;
        
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId 
                    ? { ...item, quantity } 
                    : item
            )
        );
    };

    // ----- Função: Limpar Carrinho -----
    const clearCart = () => {
        setCartItems([]);
        showToast("Sacola limpa", "info");
    };

    // ----- Funções: Abrir/Fechar Drawer -----
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen((prev) => !prev);

    // ----- Cálculos -----
    // Total de itens (soma das quantidades)
    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity, 
        0
    );
    
    // Subtotal (soma dos preços * quantidades)
    const cartSubtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    
    // Total (por enquanto igual ao subtotal, mas poderia ter desconto/frete)
    const cartTotal = cartSubtotal;

    // ----- Provider: Transmite tudo para os filhos -----
    return (
        <CartContext.Provider
            value={{
                // Estados
                cartItems,
                isCartOpen,
                toast,
                // Funções
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                openCart,
                closeCart,
                toggleCart,
                // Cálculos
                cartCount,
                cartSubtotal,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// ========== 3. CRIAR O CUSTOM HOOK ==========
// Facilita o uso do context nos componentes
export function useCart() {
    const context = useContext(CartContext);
    
    // Erro se usar fora do Provider
    if (!context) {
        throw new Error("useCart deve ser usado dentro de CartProvider");
    }
    
    return context;
}
```

### Passo 2: Criar o componente Toast

Crie o arquivo src/components/ui/Toast.jsx:

```jsx
// Componente Toast
// Exibe mensagens de feedback temporárias
// Props:
//   - message: texto da mensagem
//   - type: "success" (verde) ou "info" (azul)
export default function Toast({ message, type = "success" }) {
    // Se não tem mensagem, não renderiza nada
    if (!message) return null;

    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}
```

### Passo 3: Criar o CartItem

Crie o arquivo src/components/cart/CartItem.jsx:

```jsx
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/format";

// Componente CartItem
// Exibe um item individual do carrinho
// Props:
//   - item: objeto com dados do produto + quantidade
export default function CartItem({ item }) {
    // Usa o hook do carrinho para acessar as funções
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="cart-item">
            {/* Imagem do produto */}
            <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
            </div>

            {/* Informações */}
            <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">{formatCurrency(item.price)}</p>

                {/* Controles de quantidade */}
                <div className="cart-item-quantity">
                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                    >
                        <i className="bx bx-minus"></i>
                    </button>
                    
                    <span className="quantity-value">{item.quantity}</span>
                    
                    <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                    >
                        <i className="bx bx-plus"></i>
                    </button>
                </div>
            </div>

            {/* Botão remover */}
            <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover item"
            >
                <i className="bx bx-trash"></i>
            </button>
        </div>
    );
}
```

### Passo 4: Criar o CartDrawer

Crie o arquivo src/components/cart/CartDrawer.jsx:

```jsx
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/format";

// Componente CartDrawer
// Painel lateral que exibe o carrinho de compras
export default function CartDrawer() {
    // Pega tudo que precisa do contexto do carrinho
    const {
        cartItems,
        isCartOpen,
        closeCart,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
    } = useCart();

    // Bloqueia scroll quando o drawer está aberto
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        
        return () => {
            document.body.style.overflow = "";
        };
    }, [isCartOpen]);

    return (
        <>
            {/* Overlay - fundo escuro */}
            <div
                className={`cart-overlay ${isCartOpen ? "open" : ""}`}
                onClick={closeCart}
            />

            {/* Drawer - painel lateral */}
            <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
                {/* Cabeçalho */}
                <div className="cart-header">
                    <h2>Minha Sacola ({cartCount})</h2>
                    <button 
                        className="cart-close" 
                        onClick={closeCart} 
                        aria-label="Fechar"
                    >
                        <i className="bx bx-x"></i>
                    </button>
                </div>

                {/* Corpo do carrinho */}
                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        // Carrinho vazio
                        <div className="cart-empty">
                            <i className="bx bx-shopping-bag cart-empty-icon"></i>
                            <p>Sua sacola está vazia</p>
                            <span>Adicione produtos para continuar</span>
                        </div>
                    ) : (
                        // Carrinho com itens
                        <>
                            {/* Lista de itens */}
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Totais */}
                            <div className="cart-totals">
                                <div className="cart-totals-row">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(cartSubtotal)}</span>
                                </div>
                                <div className="cart-totals-row">
                                    <span>Frete</span>
                                    <span className="free-shipping">Grátis</span>
                                </div>
                                <div className="cart-totals-row total">
                                    <span>Total</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                            </div>

                            {/* Botões de ação */}
                            <div className="cart-actions">
                                <button className="btn btn-primary btn-full">
                                    Finalizar Compra
                                </button>
                                <button 
                                    className="btn btn-outline btn-full" 
                                    onClick={clearCart}
                                >
                                    Limpar Sacola
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
```

### Passo 5: Atualizar o Layout.jsx

Substitua o conteúdo do arquivo src/components/layout/Layout.jsx:

```jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import Toast from "../ui/Toast";
import { useCart } from "../../context/CartContext";

// Componente Layout
// Estrutura base de todas as páginas
// Inclui Navbar, Footer, CartDrawer e Toast
export default function Layout({ children }) {
    // Pega o toast do contexto para exibir mensagens
    const { toast } = useCart();

    return (
        <div className="layout-elegance">
            <Navbar />
            
            <main className="main-elegance">
                {children}
            </main>
            
            <Footer />
            
            {/* Carrinho lateral */}
            <CartDrawer />
            
            {/* Toast de feedback */}
            {toast.message && (
                <Toast message={toast.message} type={toast.type} />
            )}
        </div>
    );
}
```

### Passo 6: Atualizar a Navbar.jsx

Substitua o conteúdo do arquivo src/components/layout/Navbar.jsx:

```jsx
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
    // Estado do menu mobile
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Pega dados do carrinho via Context
    const { cartCount, toggleCart } = useCart();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Bloqueia scroll quando menu está aberto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <nav className="navbar-elegance">
            <div className="navbar-container">
                {/* Botão do Menu Mobile */}
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

                {/* Overlay Mobile */}
                {menuOpen && (
                    <div className="navbar-overlay" onClick={closeMenu}></div>
                )}

                {/* Ícones */}
                <div className="navbar-icons">
                    {/* Botão do Carrinho - agora funcional! */}
                    <button 
                        className="navbar-icon-btn cart-btn" 
                        onClick={toggleCart}
                        aria-label="Sacola"
                    >
                        <i className="bx bx-shopping-bag"></i>
                        {/* Badge com quantidade (só aparece se tiver itens) */}
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
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

### Passo 7: Atualizar o ProductCard.jsx

Substitua o conteúdo do arquivo src/components/shop/ProductCard.jsx:

```jsx
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/format";

export default function ProductCard({ product, onOpenModal }) {
    // Agora usa o hook do carrinho!
    const { addToCart } = useCart();

    // Adiciona ao carrinho (botão da sacolinha)
    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    // Abre o modal de detalhes
    const handleOpenModal = () => {
        if (onOpenModal) {
            onOpenModal(product);
        }
    };

    return (
        <div className="product-card" onClick={handleOpenModal}>
            <div className="product-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />

                {/* Tags */}
                <div className="product-tags">
                    {product.isNew && (
                        <span className="tag tag-new">Novo</span>
                    )}
                    {product.discount && (
                        <span className="tag tag-discount">-{product.discount}%</span>
                    )}
                </div>

                {/* Overlay com botões */}
                <div className="product-card-overlay">
                    <button
                        className="product-action-btn"
                        onClick={handleAddToCart}
                        aria-label="Adicionar à sacola"
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

            <div className="product-card-info">
                <span className="product-tag">{product.tag}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    {product.oldPrice && (
                        <span className="price-old">
                            {formatCurrency(product.oldPrice)}
                        </span>
                    )}
                    <span className="price-current">
                        {formatCurrency(product.price)}
                    </span>
                </div>
            </div>
        </div>
    );
}
```

### Passo 8: Atualizar o ProductModal.jsx

Substitua o conteúdo do arquivo src/components/product/ProductModal.jsx:

```jsx
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/format";

export default function ProductModal({ product, isOpen, onClose }) {
    // Agora usa o hook do carrinho!
    const { addToCart } = useCart();
    
    // Estados locais
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Bloqueia scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Fecha com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Reseta seleções quando produto muda
    useEffect(() => {
        if (product) {
            setSelectedSize("");
            setSelectedColor("");
        }
    }, [product]);

    if (!product) return null;

    // Processa tamanhos e cores
    const sizes = product.sizes 
        ? product.sizes.split(",").map((s) => s.trim()) 
        : [];
    const colors = product.colors 
        ? product.colors.split(",").map((c) => c.trim()) 
        : [];

    // Adiciona ao carrinho e fecha o modal
    const handleAddToCart = () => {
        addToCart({ 
            ...product, 
            selectedSize, 
            selectedColor 
        });
        onClose();
    };

    return (
        <div 
            className={`modal-overlay ${isOpen ? "open" : ""}`} 
            onClick={onClose}
        >
            <div 
                className="modal-container" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="modal-close" 
                    onClick={onClose} 
                    aria-label="Fechar"
                >
                    <i className="bx bx-x"></i>
                </button>

                <div className="modal-image">
                    <img src={product.image} alt={product.name} />
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

                <div className="modal-content">
                    <span className="modal-tag">{product.tag}</span>
                    <h2 className="modal-title">{product.name}</h2>

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

                    <p className="modal-description">
                        {product.description || "Produto de alta qualidade, perfeito para diversas ocasiões."}
                    </p>

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

### Passo 9: Atualizar o main.jsx

Substitua o conteúdo do arquivo src/main.jsx:

```jsx
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
```



### 🎯 Exercícios para Fixação

1. Adicione desconto: Crie uma lógica que aplica 10% de desconto se o subtotal for maior que R$ 500.

2. Limite de quantidade: No updateQuantity, adicione um limite máximo de 10 unidades por produto.

3. Botão de continuar comprando: No CartDrawer, adicione um botão que fecha o drawer.

4. Favoritos: Usando o mesmo padrão do carrinho, crie um sistema de favoritos.



### Enviar para o GitHub

```
git add .
git commit -m "Etapa 7: Carrinho com Context API e localStorage"
git push origin etapa-7-carrinho-context-localStorage
```
