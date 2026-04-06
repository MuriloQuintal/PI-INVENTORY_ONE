console.log(localStorage.getItem("logado"))

if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnListarProdutoDisponibilidade() {
    const categoria = "" // Falta puxar a categoria
    const disponibilidade = "" // Falta pegar a disponibilidade
    fetch(`https://localhost:3000/produtos/${categoria}/${disponibilidade}`)
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {

            })
        })
}

function fnSomarTotalInventario() {
    fetch("http://localhost:3000/produtos-precificacao", { method: "GET" })
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