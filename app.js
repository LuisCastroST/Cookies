const express = require('express')
const app = express()
const port = 6700
const session = require('express-session')

app.set("view engine", "ejs")

app.use(session({
    secret: 'Secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    req.session.contador = (req.session.contador || 0) + 1

    const nombre = req.session.nombre || "Invitado"
    const apellido = req.session.apellido || ""

    res.send(`Los datos ingresados fueron ${nombre} ${apellido}`)
})

app.get('/user', (req, res) => {
    res.render("users", {
        Nombre: req.session.nombre || "Invitado", 
        Apellido: req.session.apellido || ""
    })
})

app.get('/form', (req, res) => {
    res.render('index')
})

app.post('/enviar', (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    
    req.session.nombre = nombre
    req.session.apellido = apellido
    
res.render("users", { Nombre: nombre, Apellido: apellido })
})


app.listen(port, () => {
    console.log(`Conectando a ${port}`)
})