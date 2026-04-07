if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnValidacaoBootstrap() {
    'use strict'

    const forms = document.querySelectorAll('.validarForms')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
                return
            }
            else {
                fnCadastrarProduto()
            }
        }, false)
    })

}


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
            if (produtos.length <= 0) {
                console.log("Não Tem Nada Aqui")
                // Criar Função Para exibir imagem no lugar da tabela
            }

            produtos.forEach(produto => {
                fnMontarLinhaProduto(produto)
            })
        })
}
fnListarProdutos()

function fnMontarLinhaProduto(produto) {
    let tipoDisponibilidade = "bg-success"
    let produtoDisponivel = "Disponivel"
    if (produto.disponivel != "S") {
        produtoDisponivel = "Indisponivel"
        tipoDisponibilidade = "bg-danger"
    }

    let linhaProduto = `
    <tr>
    <td>${produto.equipamento}</td>
    <td>${produto.imei}</td>
    <td>${produto.nrodocumento}</td>
    <td>${produto.modelo}</td>
    <td>${produto.ean}</td>
    <td>${produto.serie}</td>
    <td>${produto.dtacompra.split("T")[0]}</td>
    <td><span class="badge ${tipoDisponibilidade}">${produtoDisponivel}</span></td>
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
    <button class="btn btn-danger btn-sm botaoDeletarProduto" data-id="${produto.id}">
    <i class="bi bi-trash"></i>
    </button>
    <a class="btn btn-secondary btn-sm botaoInventariarProduto" href="./inventariar.html?idProduto=${produto.id}">
    <i class="bi bi-box-seam"></i>
    </a>
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
        localestoque: document.getElementById("cadLocalidadeEstoqueProduto").value,
        responsavelestoque: document.getElementById("cadResponsavelProduto").value,
        ean: document.getElementById("cadEanProduto").value,
        alugado: document.getElementById("cadAlugadoProduto").value,
        disponivel: document.getElementById("cadDisponibilidadeProduto").value
    }

    const ddd = document.getElementById("cadDddProduto").value
    if (ddd != "") {
        formProduto.nroddd = document.getElementById("cadDddProduto").value
        formProduto.nrolinha = document.getElementById("cadLinhaProduto").value
        formProduto.codchip = document.getElementById("cadCodChipProduto").value
        formProduto.operadora = document.getElementById("cadOperadoraProduto").value
        formProduto.pinoperadora = document.getElementById("cadPinOperadoraProduto").value
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
    fnValidacaoBootstrap()
})

function fnPreencherModalEditProdutos(produto) {
    const arrayProduto = produto[0]

    console.log(arrayProduto.dtacompra)
    document.getElementById("editProduto").value = arrayProduto.equipamento
    document.getElementById("editModeloProduto").value = arrayProduto.modelo
    document.getElementById("editMarcaProduto").value = arrayProduto.marca
    document.getElementById("editConfiguracaoProduto").value = arrayProduto.configuracao
    document.getElementById("editNumSerieProduto").value = arrayProduto.serie
    document.getElementById("editImeiProduto").value = arrayProduto.imei
    document.getElementById("editDataCompraProduto").value = arrayProduto.dtacompra.split("T")[0]
    document.getElementById("editValorProduto").value = arrayProduto.valor
    document.getElementById("editDocumentoNfProduto").value = arrayProduto.nrodocumento
    document.getElementById("editDddProduto").value = arrayProduto.nroddd
    document.getElementById("editLinhaProduto").value = arrayProduto.nrolinha
    document.getElementById("editCodChipProduto").value = arrayProduto.codchip
    document.getElementById("editOperadoraProduto").value = arrayProduto.operadora
    document.getElementById("editPinOperadoraProduto").value = arrayProduto.pinoperadora
    document.getElementById("editLocalidadeEstoqueProduto").value = arrayProduto.localestoque
    document.getElementById("editResponsavelProduto").value = arrayProduto.responsavelestoque
    document.getElementById("editEanProduto").value = arrayProduto.ean
    document.getElementById("editAlugadoProduto").value = arrayProduto.alugado
    document.getElementById("editDisponibilidadeProduto").value = arrayProduto.disponivel

    document.getElementById("btnSalvarEditProduto").dataset.id = arrayProduto.id
}

function fnEditarProduto(id) {
    let formEditProduto = {
        equipamento: document.getElementById("editProduto").value,
        modelo: document.getElementById("editModeloProduto").value,
        marca: document.getElementById("editMarcaProduto").value,
        configuracao: document.getElementById("editConfiguracaoProduto").value,
        serie: document.getElementById("editNumSerieProduto").value,
        imei: document.getElementById("editImeiProduto").value,
        dtacompra: document.getElementById("editDataCompraProduto").value,
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

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formEditProduto)
    })
        .then((resposta) => resposta.json)
        .then((dados) => {
            console.log(dados)
            console.log("Deu Certo")
        })
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

    const disponivelDetalheProduto = document.getElementById("detalheDisponibilidadeProduto")
    let tipoDisponibilidade = "bg-success"
    let produtoDisponivel = "Disponivel"
    if (arrayProduto.disponivel != "S") {
        produtoDisponivel = "Indisponivel"
        tipoDisponibilidade = "bg-danger"
        disponivelDetalheProduto.classList.add(`${tipoDisponibilidade}`)
    }

    disponivelDetalheProduto.innerText = produtoDisponivel


    console.log(produtoDisponivel)
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
    document.getElementById("detalheEanProduto").value = arrayProduto.ean
    // document.getElementById("").value = arrayProduto.alugado
    document.getElementById("editDisponibilidadeProduto").value = arrayProduto.disponivel
}

document.addEventListener("DOMContentLoaded", () => {
    // const btnAbrirEditProdutos = document.querySelector(".botaoEditarProduto");

    document.addEventListener("click", (e) => {
        const btnEditar = e.target.closest(".botaoEditarProduto");
        const btnDetalhes = e.target.closest(".botaoDetalhesProduto")
        const btnDeletar = e.target.closest(".botaoDeletarProduto")
        const btnSavarEditProduto = e.target.closest(".botaoSalvarEdicaoProduto")

        if (btnEditar) {
            fnListarProduto(btnEditar.dataset.id)
        }

        if (btnDetalhes) {
            fnListarProduto(btnDetalhes.dataset.id)
        }

        if (btnDeletar) {
            Swal.fire({
                title: "Deseja deletar esse Produto",
                text: "Não terá como recupera-lo após a deleção",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, Deletar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    fnDeletarProduto(btnDeletar.dataset.id)
                    Swal.fire({
                        title: "Deletado",
                        text: "Produto Deletado Com Sucesso!!",
                        icon: "success"
                    });
                    window.location.reload()
                }
            });
        }

        if (btnSavarEditProduto) {
            const idProduto = btnSavarEditProduto.dataset.id

            fnEditarProduto(idProduto)
            window.location.reload()
        }
    });



});

function fnDeletarProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" })
        .then(resposta => resposta.json)
        .then(dados => {
            console.log(dados.message)

        })
        .catch(erro => console.log(erro.message))
}