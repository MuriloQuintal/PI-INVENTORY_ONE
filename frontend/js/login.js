let logadoSistema = localStorage.getItem("logado");

if (logadoSistema == "true") {
    localStorage.setItem("logado", "false");
    window.location.href = "login.html";
}

function fnLimparCampos() {
    document.getElementById("login").reset();
}

async function fnLoginUsuario() {
    let formLoginUsuario = {
        email: document.getElementById("campoEmail").value,
        senha: document.getElementById("campoSenha").value
    };

    if (formLoginUsuario.email == "" || formLoginUsuario.senha == "") {
        document.getElementById("mensagemErro").innerHTML = "Campos vazios, preencha email e senha";
        return false;
    }

    try {
        const resposta = await fetch("http://localhost:3000/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formLoginUsuario)
        });

        if (resposta.status == 200) {
            localStorage.setItem("logado", "true");
            return true;
        } else {
            document.getElementById("mensagemErro").innerHTML = "Email ou senha inválidos";
            return false;
        }

    } catch (erro) {
        console.log(erro.message);
        document.getElementById("mensagemErro").innerHTML = "Erro ao conectar com o servidor";
        return false;
    }
}

const form = document.getElementById("login");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const sucesso = await fnLoginUsuario();

    if (sucesso) {
        window.location.href = "./dashboard.html";
    }
});