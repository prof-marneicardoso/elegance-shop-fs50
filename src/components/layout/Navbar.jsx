// Importamos os hooks do React
import { useState, useEffect } from "react";

// Componente Navbar
// Responsável pela barra de navegação do site
export default function Navbar() {
    // ========== ESTADO ==========
    // useState retorna um array com 2 elementos:
    // 1. menuOpen = o valor atual do estado (true ou false)
    // 2. setMenuOpen = função para atualizar o estado
    // useState(false) = o menu começa FECHADO
    const [menuOpen, setMenuOpen] = useState(false);

    // ========== FUNÇÕES ==========
    // Função para alternar o menu (abrir/fechar)
    const toggleMenu = () => {
        // Se menuOpen é true, vira false
        // Se menuOpen é false, vira true
        setMenuOpen(!menuOpen);
    };

    // Função para fechar o menu
    // Usada quando clica em um link ou no overlay
    const closeMenu = () => {
        setMenuOpen(false);
    };

    // ========== EFEITO ==========
    // useEffect executa código quando menuOpen muda
    useEffect(() => {
        // Quando o menu abre, bloqueamos o scroll da página
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup: quando o componente sair da tela,
        // garantimos que o scroll volta ao normal
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]); // Array de dependências: executa quando menuOpen mudar

    // ========== RENDERIZAÇÃO ==========
    return (
        <nav className="navbar-elegance">
            <div className="navbar-container">
                {/* Botão do Menu Mobile (hamburguer) */}
                {/* A classe "open" é adicionada quando menuOpen é true */}
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
                {/* A classe "open" é adicionada quando menuOpen é true */}
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

                {/* Overlay - fundo escuro quando menu está aberto */}
                {/* Só aparece quando menuOpen é true */}
                {/* Ao clicar, fecha o menu */}
                {menuOpen && (
                    <div className="navbar-overlay" onClick={closeMenu}></div>
                )}

                {/* Ícones do lado direito */}
                <div className="navbar-icons">
                    <button
                        className="navbar-icon-btn cart-btn"
                        aria-label="Sacola"
                    >
                        <i className="bx bx-shopping-bag"></i>
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
