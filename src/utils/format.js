// Função para formatar valores em Real brasileiro
// Exemplo: formatCurrency(189.90) retorna "R$ 189,90"

export function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}
