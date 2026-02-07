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
                item.id === productId ? { ...item, quantity } : item
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
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
