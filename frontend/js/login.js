let logadoSistema = localStorage.getItem("logado")

if (logadoSistema == "true") {
    localStorage.setItem("logado", "false")
    window.location.href = "login.html"
}


const campoEmail = document.getElementById("campoEmail");
const camposSenha = document.getElementById("campoSenha");
const labelsCampos = document.querySelectorAll(".form-label"); 


function fnLimparCampos() {
    document.getElementById("login").reset()
}

function fnLoginUsuario() {
    let formLoginUsuario = {
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value
    }

    if (formLoginUsuario.email == "" || formLoginUsuario.email == null || formLoginUsuario.senha == "" || formLoginUsuario.senha == null) {
        document.getElementById("mensagemErro").innerHTML = "Campos vazios, preencha email e senha";
        campoEmail.classList.add("formColorError")
        camposSenha.classList.add("formColorError");
        labelsCampos.forEach((label) => 
        {
            label.classList.add("labelColorErro");
        })
    } else {

        fetch('http://localhost:3000/login/', {
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

campoEmail.addEventListener("input", (e)=>{
    if(e.target.value.length > 0)
    {
        campoEmail.classList.remove("formColorError")
    }
})

camposSenha.addEventListener("input", (e)=>{
    if(e.target.value.length > 0)
    {
        camposSenha.classList.remove("formColorError")
        labelsCampos.forEach((label) => 
        {
            label.classList.add("labelColorErro");
        })
    }
})