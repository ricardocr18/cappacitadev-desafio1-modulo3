//Esse arquivo foi contruido na aula 11 para demonstrar mais segurança com os dados
const { default: knex } = require('knex')
const {databaseConnection} = require('./connection')

async function salvarPokemons (pokemon){   //Função de salvar o Pokemon- CREATE
   
    const insertPokemon = {
        nome_pokemon: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia
    }

    const result = await databaseConnection('pokemons').insert(insertPokemon) //Funcionalidade do Knex para segurança para nãp mostrar as Query do SQL
    
    if (result){
        return{
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            id: result[0]  //Sei da descrição do ID devido a documentação do https://knexjs.org/
        }
    }else{
        console.error("Deu erro jovem !!!")
        return {
            error: "Erro na inserção"
        }
    }

}

async function mostrarPokemon(id) {      // aqui só aparece o 1 pokemon com seu id - READ

    const result = await databaseConnection('pokemons').where({id})
    return result[0]
       
}

async function mostrarPokemons(){     //Aqui mostra todos os Pokemons do array - REad

    const result = await databaseConnection('pokemons')
    return result
}

async function atualizarPokemon(id, pokemon){ // atualizar Pokemons
    
    const updatePokemon = {
        nome_pokemon: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia
    }

    const result = await databaseConnection('pokemons').where({id}).update(updatePokemon) //uso o where para não atualizar toda a tabela
    
    if (result){
        return{
            nome: pokemon.nome, //essas linhas de dados poderiam ser substituido pelo ...pokemon
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            id  //Sei da descrição do ID devido a documentação do https://knexjs.org/
        }
    }else{
        console.error("Deu erro jovem !!!")
        return {
            error: "Erro na inserção"
        }
    }

}

async function deletarPokemon(id) {

    const result = await databaseConnection('pokemons').where({id}).del()
    return result[0]
   
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
