const express = require('express')
const app = express()
const dataBase = require('./database/databaseMysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/pokemons', async (req, res) => {
    res.send(await dataBase.mostrarPokemons()) //Aqui mostrar os pokemons
})

app.get('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.mostrarPokemon(req.params.id)) //Aqui mostrar o pokemon po id
})

app.post('/pokemons', async (req, res) => {           //Aqui estou salvando os Pokemons, usando POSTcom seus dados
    const pokemon = await dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp:100
    })
    res.send(pokemon)
})

app.put('/pokemons/:id', (req, res) => {            // Aqui faço a atualização do Pokemon
    const pokemon = dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp:100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)  
})

app.delete('/pokemons/:id', (req, res) => {     //Aqui estou deletando
    res.send(dataBase.deletarPokemon(req.params.id))
})

app.post('/batalha', (req,res) => {         // Aqui é a batalha
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

app.post('/curar', (req, res) => {
    res.send(dataBase.curarPokemon(req.body.id))
})

    
app.listen(3003)