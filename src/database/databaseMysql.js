const {databaseConnection} = require('./connection')

const pokemons = {}

async function salvarPokemons (pokemon){   //Função de salvar o Pokemon- CREATE
    /*
    pokemon == {
        nome: 'Pikachu'
        tipo: 'Elétrico'
    }
    */
    const queryInsertPokemon = `INSERT INTO pokemons(nome_pokemon, tipo, fraquesa, resistencia) VALUES
    ('${pokemon.nome}', '${pokemon.tipo}', '${pokemon.fraquesa}', '${pokemon.resistencia}' )`

    const result = await databaseConnection.raw(queryInsertPokemon)
    
    console.log(result)

    if (result){
        return{
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            id: result[0].insertId  //Sei da descrição do ID devido a documentação do https://knexjs.org/
        }
    }else{
        console.error("Deu erro jovem !!!")
        return {
            error: "Erro na inserção"
        }
    }

}

function mostrarPokemon(id) {      // aqui só aparece o 1 pokemon com seu id - READ
    return pokemons [id] || {}
}

function mostrarPokemons(){     //Aqui mostra todos os Pokemons do array - REad
    return Object.values(pokemons)
}

function atualizarPokemon(id, pokemon){ //UPDATE
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) {
    sequence._id = sequence._id -1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id,1)   // aqui eu deleto o pokem com determinado id
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id -1
        }

    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp !=0){    //aqui começa a batalha
        if(pokemon1.tipo == pokemon2.fraqueza){
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp -efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp !=0){    //aqui começa a batalha
        if(pokemon2.tipo == pokemon1.fraqueza){
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp -efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`

}

//======== Curar Pokemon Desafio 3=====================

function curarPokemon(id){
    let energeticoHp = 20
    let pokemonVida = pokemons[id]

  
    if (pokemonVida.hp <90){
        pokemonVida.hp += energeticoHp
        return `${pokemonVida.nome}: ${pokemonVida.hp}`
    }else if (pokemonVida.hp == 90) {
        pokemonVida.hp = 100
        return `${pokemonVida.nome}: ${pokemonVida.hc}`
    }else if (pokemonVida.hp >=100) {
        return `O HP de ${pokemonVida.nome} Estou 100% para Luta ;)`
    }
}


module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon,
batalhaPokemon, curarPokemon } //Está exportanto as funções
