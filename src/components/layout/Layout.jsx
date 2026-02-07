// Importamos os componentes que fazem parte do Layout
import Navbar from "./Navbar";
import Footer from "./Footer";

// Componente Layout
// Recebe "children" como prop - tudo que estiver entre <Layout> e </Layout>
// Esse padrão é chamado de COMPOSIÇÃO
export default function Layout({ children }) {
    return (
        <div className="layout-elegance">
            {/* Navbar sempre aparece no topo */}
            <Navbar />

            {/* 
                O children é o conteúdo específico de cada página
                Pode ser a Home, a página de Produtos, o Carrinho, etc.
                O Layout não precisa saber o que é - só renderiza!
            */}
            <main className="main-elegance">{children}</main>

            {/* Footer sempre aparece no rodapé */}
            <Footer />
        </div>
    );
}
