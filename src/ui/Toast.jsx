// Componente Toast
// Exibe mensagens de feedback temporárias
// Props:
//   - message: texto da mensagem
//   - type: "success" (verde) ou "info" (azul)
export default function Toast({ message, type = "success" }) {
    // Se não tem mensagem, não renderiza nada
    if (!message) return null;

    return <div className={`toast ${type}`}>{message}</div>;
}
