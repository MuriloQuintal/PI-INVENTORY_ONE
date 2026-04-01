require('dotenv').config()

const express = require('express')
const app = express()

const session = require('express-session')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

const conexao = require("../banco_dados/db") 

app.post("/pessoa/", function (req, res) {
    const data = req.body;
    conexao.query(`INSERT INTO pessoas set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            res.send(resultado.insertId());
        });
})

app.post("/produtos/", (req, res) => {
    const dados = req.body
    conexao.query("INSERT INTO produtos SET ?", [dados], (erro, resultado) => {
        if(erro){
            res.json(erro)
        }
        console.log("Deu Certo")
        // res.send(resultado.insertId())
    })
})

app.get("/produtos", (req, res) => {
    conexao.query(`SELECT * FROM produtos`, (erro, listaProdutos) => {
        if(erro){
            console.log("Deu Errado")
        }

        res.send(listaProdutos)
        console.log("Deu Certo")
    })
})

app.get("/produtos/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM produtos WHERE id = ?`, [id], (erro, produto) => {
        if(erro){
            console.error(erro)
            return
        }

        res.send(produto)
    })
})

app.delete("/produtos/:id", (req, res) => {
    const idProduto = req.params.id
    conexao.query(`DELETE FROM produtos WHERE id = ${idProduto}`, (erro, resultado) => {
        if(erro){
            console.error("ERRO AQUI:::::" + erro)
            return
        }

        res.send(resultado)
    })
})

app.put("/produtos/:id", (req, res) => {
    const idProduto = req.params.id
    const dados = req.body

    conexao.query(`UPDATE produtos SET ? WHERE id = ${idProduto}`, [dados], (erro, resultado) => {
        if(erro){
            console.error("ERRO AQUI::::::" + erro)
            return
        }

        console.log(resultado)
    })
})

app.get("/produtos/precificacao", (req, res) => {
    conexao.query(`SELECT SUM(valor) AS soma FROM produtos`, (erro, resultado) => {
        if(erro){
            console.error("Erro Aqui::::" + erro)
            return
        }

        res.json(resultado)
    })
})

app.listen(3000)
app.use(session({
    secret: 'meu_segredo',
    resave: false,
    saveUninitialized: false
}));

app.post('/login', (req, res) => {
    const { email, senha } = req.body

    if(email === "" && senha == "" ){
            req.session.usuario = {
                email: email
            }

            return res.send("Login Realizado")
    }

    res.status(401).send("Login inválido");
})

app.get('/')
