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
    fnLimparCampos()

}