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
                <img src={product.image} alt={product.name} loading="lazy" />

                {/* Tags: Novo e/ou Desconto */}
                <div className="product-tags">
                    {/* Só mostra a tag "Novo" se isNew for true */}
                    {product.isNew && <span className="tag tag-new">Novo</span>}

                    {/* Só mostra a tag de desconto se discount existir */}
                    {product.discount && (
                        <span className="tag tag-discount">
                            -{product.discount}%
                        </span>
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
