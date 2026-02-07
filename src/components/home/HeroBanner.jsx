// Importamos os hooks necessários
import { useState, useEffect, useCallback } from "react";

// Componente HeroBanner
// Um carrossel de imagens para o topo da página
// Props:
//   - slides: array com os dados de cada slide
//   - autoplayInterval: tempo entre trocas automáticas (em ms)
export default function HeroBanner({ slides = [], autoplayInterval = 5000 }) {
    // ========== ESTADO ==========
    // Qual slide está ativo (começa no primeiro: índice 0)
    const [currentSlide, setCurrentSlide] = useState(0);

    // Se está no meio de uma animação (evita cliques rápidos)
    const [isAnimating, setIsAnimating] = useState(false);

    // ========== SLIDES PADRÃO ==========
    // Se não receber slides via props, usa esses
    const defaultSlides = [
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

    // Usa os slides recebidos ou os padrão
    const activeSlides = slides.length > 0 ? slides : defaultSlides;

    // ========== FUNÇÕES ==========
    // useCallback memoriza a função para evitar recriações desnecessárias
    // Isso é importante quando a função é usada em useEffect

    // Ir para um slide específico
    const goToSlide = useCallback(
        (index) => {
            // Se está animando, ignora o clique
            if (isAnimating) return;

            setIsAnimating(true);
            setCurrentSlide(index);

            // Libera para nova animação após 500ms
            setTimeout(() => setIsAnimating(false), 500);
        },
        [isAnimating]
    );

    // Ir para o próximo slide
    const goToNext = useCallback(() => {
        // Se está no último, volta para o primeiro
        const next = (currentSlide + 1) % activeSlides.length;
        goToSlide(next);
    }, [currentSlide, activeSlides.length, goToSlide]);

    // Ir para o slide anterior
    const goToPrev = useCallback(() => {
        // Se está no primeiro, vai para o último
        const prev =
            (currentSlide - 1 + activeSlides.length) % activeSlides.length;
        goToSlide(prev);
    }, [currentSlide, activeSlides.length, goToSlide]);

    // ========== EFEITO: AUTOPLAY ==========
    // Troca de slide automaticamente a cada X segundos
    useEffect(() => {
        // Se só tem 1 slide, não precisa de autoplay
        if (activeSlides.length <= 1) return;

        // Cria um intervalo que executa goToNext
        const interval = setInterval(() => {
            goToNext();
        }, autoplayInterval);

        // Cleanup: limpa o intervalo quando o componente sai da tela
        // ou quando as dependências mudam
        return () => clearInterval(interval);
    }, [activeSlides.length, autoplayInterval, goToNext]);

    // ========== RENDERIZAÇÃO ==========
    return (
        <section className="hero-banner">
            {/* Container dos slides */}
            <div className="hero-slides">
                {activeSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${
                            index === currentSlide ? "active" : ""
                        }`}
                    >
                        {/* Imagem de fundo */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="hero-slide-image"
                        />

                        {/* Overlay escuro para melhorar leitura do texto */}
                        <div className="hero-slide-overlay"></div>

                        {/* Conteúdo do slide */}
                        <div className="hero-slide-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <button className="btn btn-white">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navegação (só aparece se tiver mais de 1 slide) */}
            {activeSlides.length > 1 && (
                <>
                    {/* Setas de navegação */}
                    <button
                        className="hero-nav prev"
                        onClick={goToPrev}
                        aria-label="Anterior"
                    >
                        <i className="bx bx-chevron-left"></i>
                    </button>
                    <button
                        className="hero-nav next"
                        onClick={goToNext}
                        aria-label="Próximo"
                    >
                        <i className="bx bx-chevron-right"></i>
                    </button>

                    {/* Indicadores (bolinhas) */}
                    <div className="hero-indicators">
                        {activeSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`hero-indicator ${
                                    index === currentSlide ? "active" : ""
                                }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
