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

function fnInventariar() {
    const idPessoa = document.getElementById("idPessoa").value
    const idProduto = document.getElementById("idProduto").value

    let formInventariar = {
        id_pessoa: idPessoa,
        id_produto: idProduto
    }

    fetch(`https://pi-inventory-one-fvwa.onrender.com/inventariar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInventariar)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            console.log(dados)
            if (dados == 200) {
                window.location.href = "inventario.html"
            } else {
                alert("Deu errado")
            }
        })


}

function fnListarProduto() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('idProduto')

    fetch(`https://pi-inventory-one-fvwa.onrender.com/produtos/${id}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            if (dados.length > 0) {
                fnPreencherCamposInventariar(dados)
            }
        })
}

fnListarProduto()

function fnPreencherCamposInventariar(produto) {
    if (produto.length == 0) {
        return
    }


    if (produto[0].disponivel != "S") {
        Swal.fire({
            title: "Produto Indisponível",
            text: "Delete o inventario que contém esse produto",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ir para inventario",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "inventario.html"
            }
        })
        return
    }

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

    fetch(`https://pi-inventory-one-fvwa.onrender.com/pessoas-codigo/${codigoPessoa}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            console.dir(dados)
            fnPreencherCamposPessoaInventariar(dados[0])
        })
})

document.getElementById("txtImei").addEventListener("blur", () => {
    const imeiProduto = document.getElementById("txtImei").value

    fetch(`https://pi-inventory-one-fvwa.onrender.com/produtos/imei/${imeiProduto}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            console.log("imeiProduto" + dados)
            fnPreencherCamposInventariar(dados)
        })
})

function fnPreencherCamposPessoaInventariar(pessoa) {
    console.log(pessoa)
    document.getElementById("idPessoa").value = pessoa.id
    document.getElementById("txtNomePessoa").value = pessoa.nome
    document.getElementById("txtFilial").value = pessoa.filial
    document.getElementById("txtDepartamento").value = pessoa.departamento
    document.getElementById("txtCargo").value = pessoa.cargo
}

document.addEventListener("DOMContentLoaded", () => {
    fnValidacaoBootstrap()
    const btnInventariar = document.getElementById("botaoInventariar")

    if (btnInventariar) {
        btnInventariar.addEventListener("click", () => {
            fnInventariar()
        })
    }
})