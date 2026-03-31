const modal = document.getElementById('modalProduto')
modal.addEventListener('show.bs.modal', () => {
    console.log('ola')
})

const modalDetalhes = document.getElementById('modalDetalhesProduto')
modalDetalhes.addEventListener('show.bs.modal', () => {
    console.log('ola')
})

const modalEditar = document.getElementById('modalEditarProduto')
modalEditar.addEventListener('show.bs.modal', () => {
})

function fnListarProdutos() {
    fetch(`http://localhost:3000/produtos`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarLinhaProduto(produto)
            })
        })
}
fnListarProdutos()

function fnMontarLinhaProduto(produto) {
    let produtoDisponivel = ""
    if (produto.disponivel == "S") {
        produtoDisponivel = "Disponivel"
    } else {
        produtoDisponivel = "Indisponivel"
    }

    console.log(produto.dtaCompra)

    let linhaProduto = `
    <tr>
    <td>${produto.equipamento}</td>
    <td>${produto.imei}</td>
    <td>${produto.nrodocumento}</td>
    <td>${produto.modelo}</td>
    <td>${produto.ean}</td>
    <td>${produto.serie}</td>
    <td>${produto.dtacompra.split("T")[0]}</td>
    <td><span class="badge bg-success">${produtoDisponivel}</span></td>
    <td>
                                        <div class="d-flex gap-2 justify-content-center">
                                            <button class="btn btn-primary btn-sm botaoDetalhesProduto" data-bs-toggle="modal"
                                                data-bs-target="#modalDetalhesProduto" data-id="${produto.id}">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <button data-bs-toggle="modal" data-bs-target="#modalEditarProduto" data-id="${produto.id}"
                                                class="btn btn-warning btn-sm botaoEditarProduto">
                                                <i class="bi bi-pencil-square"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <button class="btn btn-secondary btn-sm">
                                                <i class="bi bi-box-seam"></i>
                                            </button>
                                        </div>
                                    </td>
                                    </tr>
    `

    document.querySelector(".corpo_tabelaProdutos").innerHTML += linhaProduto
}

function fnCadastrarProduto() {
    let formProduto = {
        equipamento: document.getElementById("cadProduto").value,
        modelo: document.getElementById("cadModeloProduto").value,
        marca: document.getElementById("cadMarcaProduto").value,
        configuracao: document.getElementById("cadConfiguracaoProduto").value,
        serie: document.getElementById("cadNumeroSerieProduto").value,
        imei: document.getElementById("cadImeiProduto").value,
        dtaCompra: document.getElementById("cadDataCompraProduto").value,
        valor: document.getElementById("cadValorCompraProduto").value,
        nroDocumento: document.getElementById("cadDocumentNfProduto").value,
        nroddd: document.getElementById("cadDddProduto").value,
        nrolinha: document.getElementById("cadLinhaProduto").value,
        codchip: document.getElementById("cadCodChipProduto").value,
        operadora: document.getElementById("cadOperadoraProduto").value,
        pinoperadora: document.getElementById("cadPinOperadoraProduto").value,
        localestoque: document.getElementById("cadLocalidadeEstoqueProduto").value,
        responsavelestoque: document.getElementById("cadResponsavelProduto").value,
        ean: document.getElementById("cadEanProduto").value,
        alugado: document.getElementById("cadAlugadoProduto").value,
        disponivel: document.getElementById("cadDisponibilidadeProduto").value
    }

    console.dir(formProduto)

    fetch(`http://localhost:3000/produtos/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formProduto)
    })
        .then((resposta) => resposta.status)
        .then((dados) => {
            if (dados == 200) {
                console.log("Produto Cadastrado Com Sucesso!!!")
            } else if (dados == 401) {
                console.log("Deu Errado")
            } else {
                console.log("Ocorreu Algum Problema Não Identificado")
            }
        })
}

const btnSalvar = document.getElementById("btnSalvarProduto")
btnSalvar.addEventListener('click', () => {
    fnCadastrarProduto()
})

function fnPreencherModalEditProdutos(produto) {
    const arrayProduto = produto[0]

    console.log(arrayProduto.dtacompra)

    const equipamento = document.getElementById("editProduto").value = arrayProduto.equipamento
    const modelo = document.getElementById("editModeloProduto").value = arrayProduto.modelo
    const marca = document.getElementById("editMarcaProduto").value = arrayProduto.marca
    const configuracao = document.getElementById("editConfiguracaoProduto").value = arrayProduto.configuracao
    const serie = document.getElementById("editNumSerieProduto").value = arrayProduto.serie
    const imei = document.getElementById("editImeiProduto").value = arrayProduto.imei
    const dtaCompra = document.getElementById("editDataCompraProduto").value = arrayProduto.dtacompra.split("T")[0]
    const valor = document.getElementById("editValorProduto").value = arrayProduto.valor
    const nrodocumento = document.getElementById("editDocumentoNfProduto").value = arrayProduto.nrodocumento
    const nroddd = document.getElementById("editDddProduto").value = arrayProduto.nroddd
    const nrolinha = document.getElementById("editLinhaProduto").value = arrayProduto.nrolinha
    const codchip = document.getElementById("editCodChipProduto").value = arrayProduto.codchip
    const operadora = document.getElementById("editOperadoraProduto").value = arrayProduto.operadora
    const pinoperadora = document.getElementById("editPinOperadoraProduto").value = arrayProduto.pinoperadora
    const localestoque = document.getElementById("editLocalidadeEstoqueProduto").value = arrayProduto.localestoque
    const responsavelestoque = document.getElementById("editResponsavelProduto").value = arrayProduto.responsavelestoque
    const ean = document.getElementById("editEanProduto").value = arrayProduto.ean
    const alugado = document.getElementById("editAlugadoProduto").value = arrayProduto.alugado
    const disponivel = document.getElementById("editDisponibilidadeProduto").value = arrayProduto.disponivel
}

function fnEditarProduto() {
    let formEditProduto = {
        equipamento: document.getElementById("editProduto").value,
        modelo: document.getElementById("editModeloProduto").value,
        marca: document.getElementById("editMarcaProduto").value,
        configuracao: document.getElementById("editConfiguracaoProduto").value,
        serie: document.getElementById("editNumSerieProduto").value,
        imei: document.getElementById("editImeiProduto").value,
        dtacompra: document.getElementById("editDataCompraProduto").value,
        dtacadastro: "hoje",
        valor: document.getElementById("editValorProduto").value,
        nrodocumento: document.getElementById("editDocumentoNfProduto").value,
        nroddd: document.getElementById("editDddProduto").value,
        nrolinha: document.getElementById("editLinhaProduto").value,
        codchip: document.getElementById("editCodChipProduto").value,
        operadora: document.getElementById("editOperadoraProduto").value,
        pinoperadora: document.getElementById("editPinOperadoraProduto").value,
        localestoque: document.getElementById("editLocalidadeEstoqueProduto").value,
        responsavelestoque: document.getElementById("editResponsavelProduto").value,
        ean: document.getElementById("editEanProduto").value,
        alugado: document.getElementById("editAlugadoProduto").value,
        disponivel: document.getElementById("editDisponibilidadeProduto").value
    }

    console.dir(formEditProduto)
    fetch(`http://localhost:3000/produtos/`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formEditProduto)
    })
        .then((resposta) => resposta.json)
        .then((dados) => {

        })
}

const btnSalvarEditProduto = document.getElementById("btnSalvarEditProduto")
btnSalvarEditProduto.addEventListener('click', () => {
    fnEditarProduto()
})

function fnDetalhesProduto() {

}

function fnListarProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, { method: "GET" })
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            fnPreencherModalEditProdutos(dados)
            fnPreencherModalDetalhes(dados)
        })
}

function fnPreencherModalDetalhes(produto) {
    let arrayProduto = produto[0]
    console.log(arrayProduto)

    document.getElementById("detalheProduto").value = arrayProduto.equipamento
    document.getElementById("detalheModeloProduto").value = arrayProduto.modelo
    document.getElementById("detalheMarcaProduto").value = arrayProduto.marca
    document.getElementById("detalheConfiguracaoProduto").value = arrayProduto.configuracao
    document.getElementById("detalheNumeroSerieProduto").value = arrayProduto.serie
    document.getElementById("detalheImeiProduto").value = arrayProduto.imei
    document.getElementById("detalheDataCompraProduto").value = arrayProduto.dtacompra.split("T")[0]
    document.getElementById("detalheValorCompraProduto").value = arrayProduto.valor
    document.getElementById("detalheDocumentoNfProduto").value = arrayProduto.nrodocumento
    // document.getElementById("").value = arrayProduto.nroddd
    // document.getElementById("").value = arrayProduto.nrolinha
    // document.getElementById("").value = arrayProduto.codchip
    // document.getElementById("").value = arrayProduto.operadora
    // document.getElementById("").value = arrayProduto.pinoperadora
    document.getElementById("detalheLocalEstoque").value = arrayProduto.localestoque
    document.getElementById("detalheResponsavelProduto").value = arrayProduto.responsavelestoque
    document.getElementById("detalheEanProduto").value = 176
    // document.getElementById("").value = arrayProduto.alugado
    document.getElementById("editDisponibilidadeProduto").value = arrayProduto.disponivel
}

document.addEventListener("DOMContentLoaded", () => {
    // const btnAbrirEditProdutos = document.querySelector(".botaoEditarProduto");

    document.addEventListener("click", (e) => {
        const btnEditar = e.target.closest(".botaoEditarProduto");
        const btnDetalhes = e.target.closest(".botaoDetalhesProduto")

        if (btnEditar) {
            fnListarProduto(btnEditar.dataset.id)
        }

        if (btnDetalhes) {
            fnListarProduto(btnDetalhes.dataset.id)
        }
    });

});

function fnDeletarProduto(id){
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        
    })
}