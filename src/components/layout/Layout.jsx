import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import Toast from "../../ui/Toast";
import { useCart } from "../../context/CartContext";

// Componente Layout
// Estrutura base de todas as páginas
// Inclui Navbar, Footer, CartDrawer e Toast
export default function Layout({ children }) {
    // Pega o toast do contexto para exibir mensagens
    const { toast } = useCart();

    return (
        <div className="layout-elegance">
            <Navbar />

            <main className="main-elegance">{children}</main>

            <Footer />

            {/* Carrinho lateral */}
            <CartDrawer />

            {/* Toast de feedback */}
            {toast.message && (
                <Toast message={toast.message} type={toast.type} />
            )}
        </div>
    );
}
