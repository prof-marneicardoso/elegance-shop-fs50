// Componente PromoBanner
// Um banner promocional simples com imagem e texto
// Props:
//   - image: URL da imagem de fundo
//   - title: título do banner
//   - subtitle: texto secundário
//   - buttonText: texto do botão
export default function PromoBanner({ image, title, subtitle, buttonText }) {
    return (
        <section
            className="promo-banner"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Overlay para escurecer a imagem */}
            <div className="promo-banner-overlay"></div>

            {/* Conteúdo */}
            <div className="promo-banner-content">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <button className="btn btn-white">{buttonText}</button>
            </div>
        </section>
    );
}
