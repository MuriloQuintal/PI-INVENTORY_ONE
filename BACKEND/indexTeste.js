require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

const conexao = require("../banco dados/db") 

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

app.listen(3000)