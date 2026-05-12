// function fnValidacaoBootstrap() {
//     'use strict'

//     const forms = document.querySelectorAll('.validarForms')

//     Array.from(forms).forEach(form => {
//         form.addEventListener('submit', event => {
//             if (!form.checkValidity()) {
//                 event.preventDefault()
//                 event.stopPropagation()
//             }

//             form.classList.add('was-validated')
//         }, false)
//     })

// }


function fnLimparCampos() {
    document.getElementById("cad-user").reset()
}


function fnCadastrarUsuario() {
    const confirmSenha = document.getElementById("confirmaSenha").value
    let formCadUsuario = {
        nome: document.getElementById("campoNome").value,
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value,
        telefone: document.getElementById("campoTelefone").value
    }

    if (!formCadUsuario.senha || formCadUsuario.senha.trim() === '') {
        alert('Digite a senha!');
        return;
    }
    if (!confirmSenha || confirmSenha.trim() === '') {
        alert('Digite a confirmação da senha!');
        return;
    }

    if (formCadUsuario.senha !== confirmSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    if (formCadUsuario.telefone && !/^\d+$/.test(formCadUsuario.telefone.replace(/\s/g, ''))) {
        alert('Telefone deve conter apenas números!');
        return;
    }

    fetch('http://localhost:3000/cadastrousuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formCadUsuario)
    })
        .then(resposta => resposta.status)
        .then((dados) => {

            fnLimparCampos()
            window.location.href = "login.html"
            console.log(dados)

        })
        .catch(erro => console.log(erro.message))
}


const form = document.getElementById("cad-user");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

  

    const sucesso = await fnCadastrarUsuario();

    if (sucesso) {
        window.location.href = "./login.html";
    }

});