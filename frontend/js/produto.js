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

const modalEditar = document.getElementById('modalEditarProduto')
modalEditar.addEventListener('show.bs.modal', () => {
    console.log('oii')
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
}

function fnEditarProduto() {
    let formEditProduto = {
        equipamento: document.getElementById("").value,
        modelo: document.getElementById("").value,
        marca: document.getElementById("").value,
        configuracao: document.getElementById("").value,
        serie: document.getElementById("").value,
        imei: document.getElementById("").value,
        dtacompra: document.getElementById("").value,
        dtacadastro: document.getElementById("").value,
        valor: document.getElementById("").value,
        nrodocument: document.getElementById("").value,
        nroddd: document.getElementById("").value,
        nrolinha: document.getElementById("").value,
        codchip: document.getElementById("").value,
        operadora: document.getElementById("").value,
        pinoperadora: document.getElementById("").value,
        localestoque: document.getElementById("").value,
        responsavelestoque: document.getElementById("").value,
        ean: document.getElementById("").value,
        alugado: document.getElementById("").value,
        disponivel: document.getElementById("").value
    }

    console.dir(formEditProduto)
}

function fnListarProdutos() {
    fetch(`http://localhost:3000/produtos`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarTabelaProdutos(produto)
            })
        })
}

fnListarProdutos()

// Preciso do Acesso no banco para fazer esse GET

// function fnMontarTabelaProdutos(produto) {
//     const tabela = ("corpo_tabProdutos")

//     let linhaTabela =  `
//     <tr>
//         <td>${produto.equipamento}</td>
//         <td>356789012345678</td>
//         <td>000123</td>
//         <td>Galaxy S23</td>
//         <td>FAB-00123</td>
//         <td>SN-987654321</td>
//         <td>10/01/2026</td>
//         <td>
//         <span class="badge bg-success">Disponível</span>
//         </td>
//         <td>
//         <div class="d-flex gap-2 justify-content-center">
//         <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
//         data-bs-target="#modalDetalhesProduto">
//         <i class="bi bi-eye"></i>
//         </button>
//         <button data-bs-toggle="modal" data-bs-target="#modalEditarProduto"
//         class="btn btn-warning btn-sm">
//         <i class="bi bi-pencil-square"></i>
//         </button>
//         <button class="btn btn-danger btn-sm">
//         <i class="bi bi-trash"></i>
//         </button>
//         <button class="btn btn-secondary btn-sm">
//         <i class="bi bi-box-seam"></i>
//         </button>
//         </div>
//         </td>
//     </tr>
//     `
// }