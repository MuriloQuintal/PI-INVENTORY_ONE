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