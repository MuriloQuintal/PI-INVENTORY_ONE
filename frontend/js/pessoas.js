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



        }, false)
    })

}

function fnLimparCampos() {
    document.getElementById("formCadPessoa").reset()
}


function fnCadastrarPessoa() {
    let formDados = {
        codPessoa: document.getElementById("cadCodPessoa").value,
        nome: document.getElementById("cadNomePessoa").value,
        nascimento: document.getElementById("cadNascimentoPessoa").value,
        sexo: document.getElementById("cadSelectSexoPessoa").value,
        cargo: document.getElementById("cadCargoPessoa").value,
        departamento: document.getElementById("cadDepartamentoPessoa").value,
        filial: document.getElementById("cadFilialPessoa").value,
        telefone: document.getElementById("cadTelefonePessoa").value,
        email: document.getElementById("cadEmailPessoa").value,
        endereco: document.getElementById("cadEnderecoPessoa").value,
        cep: document.getElementById("cadCep").value

    }

    console.dir(formDados)
        fetch('http://localhost:3000/pessoas/', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(formDados)
        })
            .then(resposta => resposta.status)
            .then((dados) => {
                // fnLimparCampos()

                console.log(dados)

            })
            .catch(erro => console.log(erro.message))
}

let btn_salvar = document.getElementById("salvarPessoa")
btn_salvar.addEventListener("click", function () {
    fnCadastrarPessoa()
})

