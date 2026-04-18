let logadoSistema = localStorage.getItem("logado")

if (logadoSistema == "true") {
    localStorage.setItem("logado", "false")
    window.location.href = "login.html"
}


function fnLimparCampos() {
    document.getElementById("login").reset()
}

function fnLoginUsuario() {
    let formLoginUsuario = {
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value
    }

    if (formLoginUsuario.email == "" || formLoginUsuario.email == null || formLoginUsuario.senha == "" || formLoginUsuario.senha == null) {
        document.getElementById("mensagemErro").innerHTML = "Campos vazios, preencha email e senha"
    } else {

        fetch('https://pi-inventory-one-fvwa.onrender.com/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formLoginUsuario)
        })
            .then(resposta => resposta.status)
            .then((dados) => {
                fnLimparCampos()
                if (dados == 200) {
                    localStorage.setItem("logado", "true")
                    window.location.href = "dashboard.html"
                } else {
                    document.getElementById("mensagemErro").innerHTML = "Email ou senha inválidos"
                }
            })


            .catch(erro => console.log(erro.message))
    }

}


let btn_login = document.getElementById("entrar")

btn_login.addEventListener("click", function () {
    fnLoginUsuario()

})