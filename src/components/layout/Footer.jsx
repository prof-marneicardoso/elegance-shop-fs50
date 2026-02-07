// Componente Footer
// Um componente visual que exibe informações da loja
// Não precisa de estado porque apenas exibe conteúdo estático

export default function Footer() {
    return (
        <footer className="footer-elegance">
            <div className="container">
                {/* ==================== LOGO ==================== */}
                <div className="footer-top">
                    <a href="/" className="footer-logo">
                        ELEGANCE
                    </a>
                </div>

                {/* ==================== NEWSLETTER ==================== */}
                <div className="footer-newsletter">
                    <h3>Receba Novidades</h3>
                    <p>
                        Cadastre-se e receba ofertas exclusivas e lançamentos em
                        primeira mão
                    </p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            required
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                {/* ==================== COLUNAS DE LINKS ==================== */}
                <div className="footer-content">
                    {/* Coluna 1: Institucional */}
                    <div className="footer-column">
                        <h4>Institucional</h4>
                        <ul>
                            <li>
                                <a href="/sobre">Sobre Nós</a>
                            </li>
                            <li>
                                <a href="/lojas">Nossas Lojas</a>
                            </li>
                            <li>
                                <a href="/trabalhe-conosco">Trabalhe Conosco</a>
                            </li>
                            <li>
                                <a href="/sustentabilidade">Sustentabilidade</a>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 2: Ajuda */}
                    <div className="footer-column">
                        <h4>Ajuda</h4>
                        <ul>
                            <li>
                                <a href="/central-ajuda">Central de Ajuda</a>
                            </li>
                            <li>
                                <a href="/como-comprar">Como Comprar</a>
                            </li>
                            <li>
                                <a href="/trocas">Trocas e Devoluções</a>
                            </li>
                            <li>
                                <a href="/pagamento">Formas de Pagamento</a>
                            </li>
                            <li>
                                <a href="/entrega">Prazo de Entrega</a>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 3: Categorias */}
                    <div className="footer-column">
                        <h4>Categorias</h4>
                        <ul>
                            <li>
                                <a href="/novidades">Novidades</a>
                            </li>
                            <li>
                                <a href="/vestidos">Vestidos</a>
                            </li>
                            <li>
                                <a href="/blusas">Blusas</a>
                            </li>
                            <li>
                                <a href="/calcas">Calças</a>
                            </li>
                            <li>
                                <a href="/acessorios">Acessórios</a>
                            </li>
                            <li>
                                <a href="/outlet">Outlet</a>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 4: Contato */}
                    <div className="footer-column">
                        <h4>Contato</h4>

                        <div className="footer-contact-item">
                            <i className="bx bx-phone"></i>
                            <span>(85) 98410-0173</span>
                        </div>

                        <div className="footer-contact-item">
                            <i className="bx bx-envelope"></i>
                            <span>contato@elegance.com.br</span>
                        </div>

                        <div className="footer-contact-item">
                            <i className="bx bx-map"></i>
                            <span>
                                Av. Washinton Soares, 1234 - Fortaleza/CE
                            </span>
                        </div>

                        <div className="footer-contact-item">
                            <i className="bx bx-time"></i>
                            <span>Seg a Sex: 9h às 18h</span>
                        </div>

                        {/* Redes Sociais */}
                        <div className="footer-social">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <i className="bx bxl-instagram"></i>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <i className="bx bxl-facebook"></i>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                            >
                                <i className="bx bxl-youtube"></i>
                            </a>
                            <a
                                href="https://wa.me/5585984100173"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <i className="bx bxl-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ==================== COPYRIGHT ==================== */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>
                            &copy; 2026 Elegance. Todos os direitos reservados.
                        </p>
                        <div className="footer-payments">
                            <i className="bx bxl-visa"></i>
                            <i className="bx bxl-mastercard"></i>
                            <i className="bx bxs-credit-card"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
