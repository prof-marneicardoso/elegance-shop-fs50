// Importamos os componentes
import Layout from "./components/layout/Layout";
import HeroBanner from "./components/home/HeroBanner";
import ProductCarousel from "./components/home/ProductCarousel";
import PromoBanner from "./components/home/PromoBanner";

// O App agora recebe products como prop (vem do main.jsx)
function App({ products = [] }) {
    // Dados dos slides do banner
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

            {/* Carrossel de Novidades - todos os produtos */}
            <ProductCarousel
                products={products}
                title="Novidades"
                subtitle="As últimas peças que acabaram de chegar"
            />

            {/* Banner promocional */}
            <PromoBanner
                image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
                title="Outlet com até 50% OFF"
                subtitle="Peças selecionadas com preços imperdíveis"
                buttonText="Ver Ofertas"
            />

            {/* Carrossel de Mais Vendidos - primeiros 8 produtos */}
            <ProductCarousel
                products={products.slice(0, 8)}
                title="Mais Vendidos"
                subtitle="Os queridinhos das nossas clientes"
            />
        </Layout>
    );
}

export default App;
