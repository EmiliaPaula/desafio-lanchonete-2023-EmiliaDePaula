class CaixaDaLanchonete {
    constructor() {
        this.menu = {
            cafe: 3.0,
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2.0,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5,
        };
        this.extras = {
            chantily: "cafe",
            queijo: "sanduiche",
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let total = 0;

        //Validação básica
        if (itens.length === 0) return "Não há itens no carrinho de compra!";
        if (!["debito", "credito", "dinheiro"].includes(formaDePagamento))
            return "Forma de pagamento inválida!";
        for (let item of itens) {
            const [codigo, quantidade] = item.split(",");

            //Validações do item
            if (!this.menu[codigo]) return "Item inválido!";
            if (Number(quantidade) <= 0) return "Quantidade inválida!";
            if (
                this.extras[codigo] &&
                !itens.some((i) => i.startsWith(this.extras[codigo]))
            ) {
                return "Item extra não pode ser pedido sem o principal";
            }
            total += this.menu[codigo] * Number(quantidade);
        }

        //Aplicar descontos / taxas
        if (formaDePagamento === "dinheiro") {
            total *= 0.95;
        } else if (formaDePagamento === "credito") {
            total *= 1.03;
        }
        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

//exemplos de uso:
const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra("debito", ["chantily,1"])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"])); // "R$ 4,50"
console.log(caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])); // "R$ 15,96"
export { CaixaDaLanchonete };