function fnValidacaoBootstrap() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validarForms')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })

}

const btnSalvar = document.getElementById("btnSalvarProduto")
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formulario_cadProduto");

    btnSalvar.addEventListener("click", () => {
        const ddd = document.getElementById('cadDddProduto');
        const linha = document.getElementById('cadLinhaProduto');
        const chip = document.getElementById('cadCodChipProduto');
        const operadora = document.getElementById('cadOperadoraProduto');
        const pin = document.getElementById('cadPinOperadoraProduto');
        const inputsChip = [ddd, linha, chip, operadora, pin]

        fnValidarCamposChip(inputsChip)


        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            console.log("Login válido");
            fnCadastrarProduto()
            window.location.reload()
        }

    });

});

const modal = document.getElementById('modalProduto')
modal.addEventListener('show.bs.modal', () => {
    console.log('ola')
})

const modalDetalhes = document.getElementById('modalDetalhesProduto')
modalDetalhes.addEventListener('show.bs.modal', () => {
    console.log('ola')
})

const bntEditarProduto = document.getElementById("btnEditarAlteracao")
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form_editarProduto");

    const ddd = document.getElementById('editDddProduto');
    const linha = document.getElementById('editLinhaProduto');
    const chip = document.getElementById('editCodChipProduto');
    const operadora = document.getElementById('editOperadoraProduto');
    const pin = document.getElementById('editPinOperadoraProduto');
    const inputsEditarChip = [ddd, linha, chip, operadora, pin]

    fnValidarCamposChip(inputsEditarChip)

    bntEditarProduto.addEventListener("click", () => {
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        } else {
            fnEditarProduto()
            // window.location.reload()
        }

    });

})

const modalEditar = document.getElementById('modalEditarProduto')
modalEditar.addEventListener('show.bs.modal', () => {
    const botao = event.relatedTarget;

    const idProduto = botao.getAttribute('data-id-editar');

    console.log(idProduto)

    fnConsultarProdutoEditar(idProduto)
})

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

    fetch(`http://localhost:3000/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formProduto)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            if (dados = 201) {
                console.log("Deu Certo")
            } else if (dados == 400) {
                console.log("Deu errado")
            }
        })
        .catch(erro => console.log(erro.message))
}

function fnValidarCamposChip(inputs) {
    const algumPreenchido = inputs.some(input => input.value.trim() !== "")

    if (algumPreenchido) {
        inputs.forEach(campo => {
            if (campo.value.trim() === "") {
                campo.setCustomValidity("Preencha todos os campos do chip")
            } else {
                campo.setCustomValidity("")
            }
        })
    } else {
        inputs.forEach(input => input.setCustomValidity(""))
    }
}

// Editar Incompleto

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
        nrodocument: document.getElementById("editDocumentoNfProduto").value,
        nroddd: document.getElementById("editDddProduto").value,
        nrolinha: document.getElementById("editLinhaProduto").value,
        codchip: document.getElementById("editCodChipProduto").value,
        operadora: document.getElementById("editOperadoraProduto").value,
        pinoperadora: document.getElementById("editPinOperadoraProduto").value,
        localestoque: document.getElementById("editLocalidadeEstoqueProduto").value,
        responsavelestoque: document.getElementById("editResponsavelProduto").value,
        ean: document.getElementById("editEanProduto").value,
        alugado: document.getElementById("editAlugadoProduto").value,
        disponivel: document.getElementById("editDisponivelProduto").value
    }

    console.dir(formEditProduto)

    const idProduto = document.querySelector(".idProdutoTabela")

    fetch(`http://localhost:3000/produtos/${idProduto}`, {
        method: "PUT",
        heades: { "Content-Type": "application/json" },
        body: JSON.stringify(formEditProduto)
    })
        .then(resultado => resultado.status)
        .then((dados) => {
            console.log("Edição Executada")
        })
}

function fnListarProdutos() {
    fetch(`http://localhost:3000/produtos`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                console.log(produto)
                fnMontarTabelaProdutos(produto)
            })
        })
}

fnListarProdutos()

function fnMontarTabelaProdutos(produto) {
    const tabela = document.getElementById("corpo_tabProdutos")

    console.dir(produto)

    const disponibilidade = produto.disponivel
    let estaDisponivel = ""
    const linhaDisponibilidade = document.querySelectorAll(".badge")

    if (disponibilidade == "S") {
        estaDisponivel = "Disponível"
    } else {
        estaDisponivel = "Indisponível"
    }

    let linhaTabela = `
    <tr>
        <input class="idProdutoTabela" type="hidden" value="${produto.id}">
        <td>${produto.equipamento}</td>
        <td>${produto.imei}</td>
        <td>${produto.nrodocumento}</td>
        <td>${produto.modelo}</td>
        <td>${produto.ean}</td>
        <td>${produto.serie}</td>
        <td>${produto.dtacompra.split("T")[0].split("-").reverse().join("/")}</td>
        <td>
        <span class="badge bg-success">${estaDisponivel}</span>
        </td>
        <td>
        <div class="d-flex gap-2 justify-content-center">
        <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
        data-bs-target="#modalDetalhesProduto" data-id-detalhes="${produto.id}">
        <i class="bi bi-eye"></i>
        </button>
        <button data-bs-toggle="modal" data-bs-target="#modalEditarProduto"
        class="btn btn-warning btn-sm" data-id-editar="${produto.id}">
        <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger btn-sm botao_deletarProduto" data-idDeletar="${produto.id}">
        <i class="bi bi-trash"></i>
        </button>
        <button class="btn btn-secondary btn-sm" data-id-inventariar="${produto.id}">
        <i class="bi bi-box-seam"></i>
        </button>
        </div>
        </td>
    </tr>
    `
    // Ainda Não Está Funcionando

    if (estaDisponivel == "Disponível") {

        linhaDisponibilidade.forEach(linha => {
            linha.classList.remove("bg-danger")
            linha.classList.add("bg-success")
        })
    } else {

        linhaDisponibilidade.forEach(linha => {
            linha.classList.add("bg-danger")
            linha.classList.remove("bg-success")
        })

    }

    tabela.innerHTML += linhaTabela
}

function fnConsultarProdutoEditar(id) {
    fetch(`http://localhost:3000/produtos/${id}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then(produto => {
            console.log(produto)
            fnPreencherEditarProduto(produto)
        })
}

function fnPreencherEditarProduto(produto) {
    document.getElementById("editProduto").value = produto[0].equipamento
    document.getElementById("editModeloProduto").value = produto[0].modelo
    document.getElementById("editMarcaProduto").value = produto[0].marca
    document.getElementById("editConfiguracaoProduto").value = produto[0].configuracao
    document.getElementById("editNumSerieProduto").value = produto[0].serie
    document.getElementById("editImeiProduto").value = produto[0].imei
    document.getElementById("editDataCompraProduto").value = produto[0].dtacompra.split("T")[0]
    document.getElementById("editValorProduto").value = produto[0].valor
    document.getElementById("editDocumentoNfProduto").value = produto[0].nrodocumento
    document.getElementById("editDddProduto").value = produto[0].nroddd
    document.getElementById("editLinhaProduto").value = produto[0].nrolinha
    document.getElementById("editCodChipProduto").value = produto[0].codchip
    document.getElementById("editOperadoraProduto").value = produto[0].operadora
    document.getElementById("editPinOperadoraProduto").value = produto[0].pinoperadora
    document.getElementById("editLocalidadeEstoqueProduto").value = produto[0].localestoque
    document.getElementById("editResponsavelProduto").value = produto[0].responsavelestoque
    document.getElementById("editEanProduto").value = produto[0].ean
    document.getElementById("editAlugadoProduto").value = produto[0].alugado
    document.getElementById("editDisponivelProduto").value = produto[0].disponivel
}

document.addEventListener("click", (e) => {
    const botao = e.target.closest(".botao_deletarProduto");

    if (botao) {
        console.log(botao.dataset);
        Swal.fire({
            title: "Realmente deseja deletar este produto?",
            icon: "warning",
            iconColor: "#3085d6",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Deletar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const id = botao.dataset.iddeletar;
                fnDeletarProduto(id);
                Swal.fire({
                    title: "Deletado!",
                    text: "Produto deletado com sucesso!!.",
                    icon: "success"
                }).then(() => {
                    window.location.reload()
                })
            }
        });
    }
})

function fnDeletarProduto(idProduto) {
    fetch(`http://localhost:3000/produtos/${idProduto}`, { method: "DELETE" })
        .then(resposta => resposta.json)
        .then(dados => {
            console.log(dados)
        })
        .catch(erro => console.log(erro))
}