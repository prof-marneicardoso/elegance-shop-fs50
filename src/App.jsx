// Importamos o Layout e os componentes da Home
import Layout from "./components/layout/Layout";
import HeroBanner from "./components/home/HeroBanner";
import PromoBanner from "./components/home/PromoBanner";

function App() {
    // Dados dos slides do HeroBanner
    // Poderíamos deixar o HeroBanner usar os slides padrão,
    // mas passando via props temos mais controle
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
        // Layout envolve todo o conteúdo usando CHILDREN
        // Tudo entre <Layout> e </Layout> vira o children
        <Layout>
            {/* HeroBanner - Carrossel principal */}
            <HeroBanner slides={heroSlides} />

            {/* Seção de produtos virá aqui na próxima etapa */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Novidades</h2>
                        <p className="section-subtitle">
                            As últimas peças que acabaram de chegar
                        </p>
                    </div>
                    <p style={{ textAlign: "center", color: "#666" }}>
                        Os produtos serão carregados na próxima etapa...
                    </p>
                </div>
            </section>

            {/* PromoBanner - Banner promocional */}
            <PromoBanner
                image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop"
                title="Outlet com até 50% OFF"
                subtitle="Peças selecionadas com preços imperdíveis"
                buttonText="Ver Ofertas"
            />

            {/* Outra seção de produtos virá aqui */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Mais Vendidos</h2>
                        <p className="section-subtitle">
                            Os queridinhos das nossas clientes
                        </p>
                    </div>
                    <p style={{ textAlign: "center", color: "#666" }}>
                        Os produtos serão carregados na próxima etapa...
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default App;
