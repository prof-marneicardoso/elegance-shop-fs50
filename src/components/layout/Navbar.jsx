import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
    // Estado do menu mobile
    const [menuOpen, setMenuOpen] = useState(false);

    // Pega dados do carrinho via Context
    const { cartCount, toggleCart } = useCart();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Bloqueia scroll quando menu está aberto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <nav className="navbar-elegance">
            <div className="navbar-container">
                {/* Botão do Menu Mobile */}
                <button
                    className={`navbar-menu-toggle ${menuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Logo */}
                <a href="/" className="navbar-logo">
                    ELEGANCE
                </a>

                {/* Menu de Navegação */}
                <div
                    className={`navbar-menu-wrapper ${menuOpen ? "open" : ""}`}
                >
                    <ul className="navbar-menu">
                        <li>
                            <a href="/" onClick={closeMenu}>
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="/novidades" onClick={closeMenu}>
                                Novidades
                            </a>
                        </li>
                        <li>
                            <a href="/vestidos" onClick={closeMenu}>
                                Vestidos
                            </a>
                        </li>
                        <li>
                            <a href="/blusas" onClick={closeMenu}>
                                Blusas
                            </a>
                        </li>
                        <li>
                            <a href="/calcas" onClick={closeMenu}>
                                Calças
                            </a>
                        </li>
                        <li>
                            <a href="/acessorios" onClick={closeMenu}>
                                Acessórios
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Overlay Mobile */}
                {menuOpen && (
                    <div className="navbar-overlay" onClick={closeMenu}></div>
                )}

                {/* Ícones */}
                <div className="navbar-icons">
                    {/* Botão do Carrinho - agora funcional! */}
                    <button
                        className="navbar-icon-btn cart-btn"
                        onClick={toggleCart}
                        aria-label="Sacola"
                    >
                        <i className="bx bx-shopping-bag"></i>
                        {/* Badge com quantidade (só aparece se tiver itens) */}
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>

                    <button
                        className="navbar-icon-btn"
                        aria-label="Minha conta"
                    >
                        <i className="bx bx-user"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}
