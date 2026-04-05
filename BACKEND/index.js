require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

const bcrypt = require('bcrypt')
async function geraHash(senha) {
    const salts = 12;
    const senhaHash = await bcrypt.hash(senha, salts);
    return senhaHash;

}
const conexao = require('../banco_dados/db.js')


app.post("/cadastrousuarios/", async function (req, res) {
    const data = req.body;
    const senhaCriptografada = await geraHash(data.senha);
    data.senha = senhaCriptografada
    conexao.query(`INSERT INTO usuarios set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            console.log(resultado)
            res.json({ sucesso: true });

        });
})

app.post("/login/", function (req, res) {
    const email = req.body.email
    const senha = req.body.senha

    conexao.query(`select * from usuarios where email = '${email}'`, function (erro, resultado, campos) {
        if (erro) {
            res.send(erro)
        } else {
            if (resultado.length > 0) {
                const senhaCorreta = bcrypt.compareSync(senha, resultado[0].senha)
                if (senhaCorreta) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        }
    })
})

// ia
// app.post("/cadastrousuarios/", async function (req, res) {
//     try {
//         const data = req.body;
//         const senhaCriptografada = await geraHash(data.senha);
//         data.senha = senhaCriptografada;

//         conexao.query(`INSERT INTO usuarios SET ?`, [data], function (erro, resultado) {
//             if (erro) {
//                 console.error('Erro INSERT:', erro);
//                 return res.status(400).json({ erro: erro.message });  // Erro com status
//             }
//             console.log('Inserido:', resultado);
//             res.status(201).json({ sucesso: true, id: resultado.insertId });  // <--- SUCESSO!
//         });
//     } catch (err) {
//         res.status(500).json({ erro: err.message });
//     }
// });


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