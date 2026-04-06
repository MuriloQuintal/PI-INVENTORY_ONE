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

function fnInveriar() {
    let formInventariar = {
        codigoPessoa: document.getElementById("txtCodigoPessoa").value,
        nomePessoa: document.getElementById("txtNomePessoa").value,
        filialPessoa: document.getElementById("txtFilial").value,
        departamentoPessoa: document.getElementById("txtDepartamento").value,
        cargoPessoa: document.getElementById("txtCargo").value,
        equipamento: document.getElementById("txtEquipamento").value,
        marca: document.getElementById("txtMarca").value,
        modelo: document.getElementById("txtModelo").value,
        imei: document.getElementById("txtImei").value,
        serie: document.getElementById("txtSerie").value,
        descricao: document.getElementById("txtDescricao").value,
        numeroLinha: document.getElementById("txtNumeroLinha").value,
        codigoChip: document.getElementById("txtCodigoChip").value,
        operadora: document.getElementById("txtOperadora").value,
        pinOpeardora: document.getElementById("txtPinOperadora").value,
        historico: document.getElementById("txtHistorico").value
    }
    console.dir(formInventariar)


}

function fnListarProduto() {
    const params = new URLSearchParams(window.location.search)
    const idProduto = params.get('idProduto')

    fetch(`http://localhost:3000/produtos/${idProduto}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            fnPreencherCamposInventariar(dados)
        })
}

function fnPreencherCamposInventariar(produto) {
    document.getElementById("")
}

fnPreencherCamposInventariar()

// const btnInventariar = document.getElementById("botaoInventariar")
// btnInventariar.addEventListener("click", () => {
// })