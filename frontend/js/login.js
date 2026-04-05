function fnLimparCampos() {
    document.getElementById("login").reset()
}

function fnLoginUsuario() {
    let formLoginUsuario = {
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value
    }

    fetch('http://localhost:3000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formLoginUsuario)
    })
        .then(resposta => resposta.status)
        // .then((dados) => {
        //     fnLimparCampos()
        //     if (dados == 200) {
        //         window.location.href = "dashboard.html"
        //     } else {
        //         console.log("Email ou senha inválidos")
        //     }
        // })
        .then((dados) => {
            fnLimparCampos()
            if (dados == 200) {
                window.location.href = "dashboard.html"
            } else {
                document.getElementById("mensagemErro").innerHTML = "Email ou senha inválidos"
            }
        })


        .catch(erro => console.log(erro.message))
}


let btn_login = document.getElementById("entrar")

btn_login.addEventListener("click", function () {
    // fnValidacaoBootstrap()
    fnLoginUsuario()

})