let logadoSistema = localStorage.getItem("logado")

if (logadoSistema == "true") {
    localStorage.setItem("logado", "false")
    window.location.href = "login.html"
}


const campoEmail = document.getElementById("campoEmail");
const camposSenha = document.getElementById("campoSenha");
const labelEmail = document.querySelector("label[for='campoEmail']");
const labelSenha = document.querySelector("label[for='campoSenha']");

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
        labelEmail.classList.add("labelColorErro");
        labelSenha.classList.add("labelColorErro");
        
        
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
    if(e.target.value.length > 0 && e.target.value.includes("@"))
    {
        campoEmail.classList.remove("formColorError")
        labelEmail.classList.remove("labelColorErro");
    }
})

camposSenha.addEventListener("input", (e)=>{
    if(e.target.value.length > 0)
    {
        camposSenha.classList.remove("formColorError");
        labelSenha.classList.remove("labelColorErro");
    }
})

var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl)
})