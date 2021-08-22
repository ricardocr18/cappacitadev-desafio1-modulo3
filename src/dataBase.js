const sequence = {
    _id:1,
    get id() {return this._id++}
}

const pokemons = []

function salvarPokemons (pokemon){   //Função de salvar o Pokemon- CREATE
    if (!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
    return pokemon
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
            pokemon2.hp = pokemon2.hp - nãoefetivo
        } else {
            pokemon2.hp = pokemon2.hp -efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp !=0){    //aqui começa a batalha
        if(pokemon2.tipo == pokemon1.fraqueza){
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - nãoefetivo
        } else {
            pokemon1.hp = pokemon1.hp -efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`

}

//=================================================================
function curarPokemon(id){
    let pocaoHp = 20
    let pokemonRec = pokemons[id]

    if (pokemons.legth === 0) {
        return `Òpsss... Por favor, verifique se o ID pokemon é valido ou se o mesmp já foi cadastrado anteriormente, obrigado`
    }else if (pokemonRec.hp <90){
        pokemonRec.hp += pocaoHp
        return `${pokemonRec.nome}: ${pokemonRec.hp}`
    }else if (pokemonRec.hp == 90) {
        pokemonRec.hp = 100
        return `${pokemonRec}: ${pokemonRec.hc}`
    }else if (pokemonRec.hp >=100) {
        return `O HP de ${pokemonRec.nome} já está no máximo, obrigado`
    }
}

function mostrarPorTipoPokemons(tipo) {
    if (pokemons.length ===0)
        return`Nenhum Pokemon ainda foi cadastrado`
    else {
        const tipoPokemon = pokemons.filter(pokemons => pokemons.tipo == tipo)
        if (tipoPokemon.length ===0) {
            return `Opsss... Não encontramos nenhum pokemon do tipo ${tipo}.`
        } else {
            return tipoPokemon
        }
    }
}



module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon,
batalhaPokemon, curarPokemon, mostrarPorTipoPokemons } //Está exportanto as funções
