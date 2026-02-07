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
