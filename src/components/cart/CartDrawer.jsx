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
                                    <span className="free-shipping">
                                        Grátis
                                    </span>
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
