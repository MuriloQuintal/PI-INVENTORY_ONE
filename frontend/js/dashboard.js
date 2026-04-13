if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

async function fnBuscarValoresInventario() {
  const resposta = await fetch("http://localhost:3000/produtos-precificacao");

  if (!resposta.ok) { 
    throw new Error("Erro ao listar precificação dos produtos");
  }

  const dados = await resposta.json(); 
  return dados;
}

async function fnGerarCardsValoresInventario() {

    try {
        const valoresInventario = await fnBuscarValoresInventario();
        
        if (!valoresInventario || (Array.isArray(valoresInventario) && valoresInventario.length === 0)) 
        {
            throw new Error("Erro ao acessar valores inventário");
        }

        document.getElementById("valorTotal").innerHTML = valoresInventario.valor_total;
        document.getElementById("depreciacaoTotal").innerHTML = valoresInventario.depreciacao;
        document.getElementById("valorAtualTotal").innerHTML = valoresInventario.valor_liquido;
    
    } catch (error) {
        console.log(error)
    }
    
}

fnListarTodosProdutos()

function fnListarTodosProdutos() {
    fetch(`http://localhost:3000/produtos/agrupamentos/dashboard`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarCardsProdutos(produto)
            })
        })
}


function fnMontarCardsProdutos(produto) {
    const containerCards = document.getElementById("containerCardsProdutos")

    containerCards.innerHTML += `   
        <div class="col-12 col-sm-3">
            <div class="conteudo_card_inventario">

                <div class="card_inv_header">
                    <div class="card_inv_icone">
                        <i class="bi bi-laptop"></i>
                    </div>
                </div>

                <div class="card_inv_dados">
                    <div>
                        <p class="card_inv_label">Equipamento</p>
                        <p class="card_inv_valor">${produto.nome}</p>
                    </div>
                    <div class="text-end">
                        <p class="card_inv_label">Totais</p>
                        <p class="card_inv_valor">${produto.qtdTotal}</p>
                    </div>
                </div>

                <hr class="card_inv_divider">

                <div class="card_inv_acoes">
                    <a class="card_inv_btn card_inv_btn_danger"
                        href="./produtos.html?equipamento=${produto.nome}&disponibilidade=N">
                        <i class="bi bi-x-lg"></i> Indisponíveis
                    </a>
                    <a class="card_inv_btn card_inv_btn_success"
                        href="./produtos.html?equipamento=${produto.nome}&disponibilidade=S">
                        <i class="bi bi-check-lg"></i> Disponíveis
                    </a>
                </div>

            </div>
        </div>
    `
}

fnGerarCardsValoresInventario();