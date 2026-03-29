require("dotenv").config()

const express = require('express')
const app = express()

const session = require('express-session')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

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