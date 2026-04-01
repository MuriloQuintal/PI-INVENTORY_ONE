function fnListarProdutoDisponibilidade(){
    const categoria = "" // Falta puxar a categoria
    const disponibilidade = "" // Falta pegar a disponibilidade
    fetch(`https://localhost:3000/produtos/${categoria}/${disponibilidade}`)
    .then(resposta => resposta.json())
    .then((produtos) => {
        produtos.forEach(produto => {

        })
    })
}

function fnSomarTotalInventario(){
    fetch("http://localhost:3000/produtos/precificacao", { method: "GET" })
    .then(resposta => resposta.json())
    .then((dados) => {
        console.log(dados)
        fnPreencherValoresPreco(dados)
    })
}

fnSomarTotalInventario()

function fnPreencherValoresPreco(totalPreco){
    console.log(totalPreco)
}