// Importamos o componente Navbar
import Navbar from "./components/layout/Navbar";

function App() {
    return (
        <div>
            {/* Navbar no topo */}
            <Navbar />

            {/* Conteúdo temporário */}
            <main style={{ padding: "100px 20px" }}>
                <h1>Elegance Shop</h1>
                <p>Em construção...</p>
                <p>Teste o menu mobile redimensionando a janela!</p>
            </main>
        </div>
    );
}

export default App;
