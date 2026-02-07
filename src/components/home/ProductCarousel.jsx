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
export default function ProductCarousel({
    products = [],
    title,
    subtitle,
    onOpenModal,
}) {
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
    const visibleProducts = products.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <section className="section">
            <div className="container">
                {/* Cabeçalho da seção (só aparece se tiver título ou subtítulo) */}
                {(title || subtitle) && (
                    <div className="section-header">
                        {title && <h2 className="section-title">{title}</h2>}
                        {subtitle && (
                            <p className="section-subtitle">{subtitle}</p>
                        )}
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
