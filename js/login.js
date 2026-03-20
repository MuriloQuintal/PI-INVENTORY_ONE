function fnLimparCampos() {
    document.getElementById("login").reset()
}


function fnLoginUsuario() {
    let formLoginUsuario = {

        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value
    }
    console.dir(formLoginUsuario)
    fnLimparCampos()

}