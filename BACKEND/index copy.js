require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())


const conexao = require('../banco_dados/conexaoBanco')


app.post("/cadastrousuarios/", function (req, res) {
    const data = req.body;
    conexao.query(`INSERT INTO usuarios set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
           
        });
})


app.post("/cadastropessoas/", function (req, res) {
    const data = req.body;
    conexao.query(`INSERT INTO pessoas set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
           
        });
})


app.listen(3000)