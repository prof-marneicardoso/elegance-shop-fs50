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
