// Importamos os componentes
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
    return (
        <div>
            {/* Navbar no topo */}
            <Navbar />

            {/* Conteúdo temporário */}
            <main className="main-elegance">
                <div className="container" style={{ padding: "60px 20px" }}>
                    <h1>Elegance Shop</h1>
                    <p>Em construção...</p>
                    <p>Role para baixo para ver o Footer!</p>

                    {/* Espaço para simular conteúdo */}
                    <div style={{ height: "50vh" }}></div>
                </div>
            </main>

            {/* Footer no rodapé */}
            <Footer />
        </div>
    );
}

export default App;
