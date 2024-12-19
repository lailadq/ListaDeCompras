document.addEventListener("DOMContentLoaded", () => {
    const inputProduto = document.getElementById("produto");
    const inputImagem = document.getElementById("imagem");
    const botaoAdicionar = document.getElementById("adicionar");
    const listaSupermercado = document.getElementById("lista-supermercado");

    // Carregar produtos do localStorage ao inicializar
    carregarProdutos();

    botaoAdicionar.addEventListener("click", () => {
        const produto = inputProduto.value.trim();
        const imagem = inputImagem.value.trim();
        if (produto) {
            adicionarProduto(produto, imagem);
            inputProduto.value = ""; // Limpa o campo de entrada
            inputImagem.value = ""; // Limpa o campo da imagem
        }
    });

    function adicionarProduto(produto, imagem) {
        // Adicionar produto à lista no DOM
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = imagem || "https://via.placeholder.com/50"; // Imagem padrão se não encontrar
        img.alt = produto;

        const textoProduto = document.createTextNode(produto);
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => {
            li.remove();
            removerProdutoDoLocalStorage(produto);
        };

        li.appendChild(img);
        li.appendChild(textoProduto);
        li.appendChild(botaoExcluir);
        listaSupermercado.appendChild(li);

        // Armazenar produto no localStorage
        salvarProdutoNoLocalStorage(produto, imagem);
    }

    function salvarProdutoNoLocalStorage(produto, imagem) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push({ produto, imagem });
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function removerProdutoDoLocalStorage(produto) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos = produtos.filter(item => item.produto !== produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.forEach(({ produto, imagem }) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = imagem || "https://via.placeholder.com/50"; // Imagem padrão se não encontrar
            img.alt = produto;

            const textoProduto = document.createTextNode(produto);
            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "excluir";
            botaoExcluir.onclick = () => {
                li.remove();
                removerProdutoDoLocalStorage(produto);
            };

            li.appendChild(img);
            li.appendChild(textoProduto);
            li.appendChild(botaoExcluir);
            listaSupermercado.appendChild(li);
        });
    }
});
