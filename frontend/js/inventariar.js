if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

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

const btnInventariar = document.getElementById("botaoInventariar")
document.addEventListener("DOMContentLoaded", () => {
    fnValidacaoBootstrap()
});

function fnInventariar() {
    // Terminar o cadastro de inventariar um produto em especifico
    const idPessoa = document.getElementById("idPessoa").value
    const idProduto = document.getElementById("idProduto").value

    // let formInventariar = {
    //     codigoPessoa: document.getElementById("txtCodigoPessoa").value,
    //     nomePessoa: document.getElementById("txtNomePessoa").value,
    //     filialPessoa: document.getElementById("txtFilial").value,
    //     departamentoPessoa: document.getElementById("txtDepartamento").value,
    //     cargoPessoa: document.getElementById("txtCargo").value,
    //     equipamento: document.getElementById("txtEquipamento").value,
    //     marca: document.getElementById("txtMarca").value,
    //     modelo: document.getElementById("txtModelo").value,
    //     imei: document.getElementById("txtImei").value,
    //     serie: document.getElementById("txtSerie").value,
    //     descricao: document.getElementById("txtDescricao").value,
    //     numeroLinha: document.getElementById("txtNumeroLinha").value,
    //     codigoChip: document.getElementById("txtCodigoChip").value,
    //     operadora: document.getElementById("txtOperadora").value,
    //     pinOpeardora: document.getElementById("txtPinOperadora").value,
    //     historico: document.getElementById("txtHistorico").value
    // }
    // console.dir(formInventariar)

    // fetch(`http://localhost:3000/inventariar`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringfy(formInventariar)
    // })
    //     .then(resposta => resposta.status)
    //     .then((dados) => {
    //         fnLimparCampos()
    //         if (dados == 200) {
    //             window.location.href = "inventario.html"
    //         }else{
    //             alert("Deu errado")
    //         }
    //     })


}

function fnListarProduto() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('idProduto')

    fetch(`http://localhost:3000/produtos/${id}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            fnPreencherCamposInventariar(dados)
        })
}

fnListarProduto()

function fnPreencherCamposInventariar(produto) {
    console.log(produto)
    document.getElementById("txtEquipamento").value = produto[0].equipamento
    document.getElementById("txtMarca").value = produto[0].marca
    document.getElementById("txtModelo").value = produto[0].modelo
    document.getElementById("txtImei").value = produto[0].imei
    document.getElementById("txtSerie").value = produto[0].serie
    document.getElementById("txtNumeroLinha").value = produto[0].nrolinha
    document.getElementById("txtCodigoChip").value = produto[0].codchip
    document.getElementById("txtOperadora").value = produto[0].operadora
    document.getElementById("txtPinOperadora").value = produto[0].pinoperadora
    document.getElementById("txtConfiguracao").value = produto[0].configuracao
    document.getElementById("idProduto").value = produto[0].id
}

document.getElementById("txtCodigoPessoa").addEventListener("blur", () => {
    const codigoPessoa = document.getElementById("txtCodigoPessoa").value

    fetch(`http://localhost:3000/pessoas/${codigoPessoa}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            console.dir(dados)
            fnPreencherCamposPessoaInventariar(dados[0])
        })
})

function fnPreencherCamposPessoaInventariar(pessoa) {
    document.getElementById("idPessoa").value = pessoa.id
    document.getElementById("txtNomePessoa").value = pessoa.nome
    document.getElementById("txtFilial").value = pessoa.filial
    document.getElementById("txtDepartamento").value = pessoa.departamento
    document.getElementById("txtCargo").value = pessoa.cargo
}

// const btnInventariar = document.getElementById("botaoInventariar")
// btnInventariar.addEventListener("click", () => {
// })