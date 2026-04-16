console.log(localStorage.getItem("logado"))
if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnSomarTotalInventario() {
    fetch("https://pi-inventory-one-fvwa.onrender.com/produtos-precificacao", { method: "GET" })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnPreencherValoresPreco(dados[0].soma)
        })
}

fnSomarTotalInventario()

function fnPreencherValoresPreco(totalPreco) {
    document.getElementById("valorTotal").innerHTML = totalPreco

    const calculoDepreciacao = totalPreco - (totalPreco * 0.4)
    let arredondarDepreciacao = Math.round(calculoDepreciacao * 100) / 100

    document.getElementById("depreciacaoTotal").innerHTML = arredondarDepreciacao

    const calculoDepreciacaoTotal = totalPreco - arredondarDepreciacao
    let arredondarDepreciacaoTotal = Math.round(calculoDepreciacaoTotal * 100) / 100


    document.getElementById("valorAtualTotal").innerHTML = arredondarDepreciacaoTotal
}

function fnListarTodosProdutos() {
    fetch(`https://pi-inventory-one-fvwa.onrender.com/produtos/agrupamentos/dashboard`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((produtos) => {
            console.log("Chamou a função")
            console.log(produtos)
            produtos.forEach(produto => {
                fnMontarCardsProdutos(produto)
            })
        })
}

fnListarTodosProdutos()

function fnMontarCardsProdutos(produto) {
    const containerCards = document.getElementById("containerCardsProdutos")

    containerCards.innerHTML += `   
    <div class="card_inventario col-3" >
        <div class="card-body conteudo_card_inventario">
            <div class="espaco_icone_card row">
                <i class="bi bi-laptop fs-3"></i>
            </div>
            <div class="dados_card row">
                <label class="texto_linhas col-6 text-start">Equipamento</label>
                <label class="texto_totais col-6 text-end">Totais</label>
            </div>
            <div class="row">
                <label class="nome_item col-6 text-start">${produto.nome}</label>
                <label class="qtd_item col-6 text-end">${produto.qtdTotal}</label>
            </div>
            <hr>
            <div class="row mt-2 text-center">
                <div class="col-6 text-start">
                    <a class="btn btn-danger d-flex align-items-center p-2" href="./produtos.html?equipamento=${produto.nome}&disponibilidade=N">Indisponíveis<i
                    class="bi bi-x-lg icone_x mx-1 mt-1"></i></a>
                </div>
                <div class="col-6 text-end">
                    <a class="w-100 btn btn-success align-items-center p-2" href="./produtos.html?equipamento=${produto.nome}&disponibilidade=S">Disponiveis<i
                    class="bi bi-check-lg mx-1 mt-1"></i></a>
                </div>
            </div>
        </div>
    </div>

    `
}