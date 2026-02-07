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
            selectedColor,
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
                        {product.description ||
                            "Produto de alta qualidade, perfeito para diversas ocasiões."}
                    </p>

                    {sizes.length > 0 && (
                        <div className="modal-options">
                            <h4>Tamanho</h4>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${
                                            selectedSize === size
                                                ? "active"
                                                : ""
                                        }`}
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
                                        className={`color-btn ${
                                            selectedColor === color
                                                ? "active"
                                                : ""
                                        }`}
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
