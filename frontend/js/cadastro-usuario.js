function fnLimparCampos() {
    document.getElementById("cad-user").reset()
}


function fnCadastrarUsuario() {
    let formCadUsuario = {

        nome: document.getElementById("campoNome").value,
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value,
        telefone: document.getElementById("campoTelefone").value
    }
    console.dir(formCadUsuario)

    fetch('http://localhost:3000/cadastrousuarios/', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(formCadUsuario)
    })
          .then(resposta => resposta.status())
        .then((dados) => {
            fnLimparCampos()
       
            console.log(dados)

        })
        .catch(erro => console.log(erro.message))
}


let btn_salvar = document.getElementById("cadastrar")

btn_salvar.addEventListener("click", function () {
    fnCadastrarUsuario()

})