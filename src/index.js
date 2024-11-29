const url = "https://ecom-back-strapi.onrender.com/api/products";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwOTU1NDMyLCJleHAiOjE3MzM1NDc0MzJ9.b6ocgEJeBUyCTwJ-9htLN_PzvjuC9soxP27OOQD-728"; 

async function buscarProdutos() {
    try {
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}` 
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
       
        const data = await response.json();

        console.log(data);
        return data.data;
    } catch (error) {
        
        console.error("Erro ao consumir a API:", error);
    }
}

//buscarProdutos();

function exibirProdutos(produtos) {
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

    produtos.forEach(produto => {
        // Crie um elemento de produto
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');

        // Adicione a imagem do produto
        const imagem = document.createElement('img');
        imagem.src = produto.attributes.imagens[0]; // Usa a primeira imagem
        imagem.alt = produto.nome;
        imagem.classList.add('produto-imagem');

        // Adicione o nome e preço do produto
        const nome = document.createElement('h2');
        nome.textContent = produto.attributes.nome;

        const preco = document.createElement('p');
        preco.textContent = `Preço: R$ ${produto.attributes.preco.toFixed(2)}`;

        // Adicione um botão de compra
        const botaoComprar = document.createElement('button');
        botaoComprar.textContent = 'Comprar';
        botaoComprar.onclick = () => {
            // Aqui você pode adicionar lógica para o botão de compra
            alert(`Você comprou: ${produto.nome}`);
        };

        console.log(produto.id)
        

        // Adicione os elementos ao container do produto
        produtoDiv.appendChild(imagem);
        produtoDiv.appendChild(nome);
        produtoDiv.appendChild(preco);
        produtoDiv.appendChild(botaoComprar);
        produtosContainer.appendChild(produtoDiv);
    });
}

async function iniciarApp() {
    const produtos = await buscarProdutos();
    if (produtos) {
        exibirProdutos(produtos);
    } else {
        console.error('Nenhum produto encontrado.');
    }
}

// Chame a função principal ao carregar a página
window.onload = iniciarApp;
