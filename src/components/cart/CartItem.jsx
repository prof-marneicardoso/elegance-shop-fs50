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
                        onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                    >
                        <i className="bx bx-minus"></i>
                    </button>

                    <span className="quantity-value">{item.quantity}</span>

                    <button
                        className="quantity-btn"
                        onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                        }
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
