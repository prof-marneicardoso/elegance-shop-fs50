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

                    {/* Seleção de cor (só aparece se tiver cores) */}
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
