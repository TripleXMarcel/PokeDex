let language = 'de';

async function init() {
    designMainPage();
    await loadAllPokemon();

}

async function loadAllPokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let results = responseAsJSON['results'];
    for (let i = 0; i < results.length; i++) {
        const pokemon = results[i];
        await loadPokemonContainer(pokemon.name, i);
    };
}

function designMainPage() {
    let container = document.getElementById('listContainer');
    container.innerHTML = mainPageHTML();
}

async function loadPokemonContainer(pokemon, i) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let pokemonIMG = responseAsJSON['sprites']['front_default'];
    let container = document.getElementById('pokemonMainContainer');
    let id = responseAsJSON.id;
    let name = await pokemonNameDE(id);
    container.innerHTML += pokemonContainerHTML(pokemon, pokemonIMG, id.toString().padStart(3, '0'), i, name);
    pokemonType(responseAsJSON, i);
}

function firstLetterToUpperCase(word) {
    return word[0].toUpperCase()+word.slice(1);
}

async function pokemonType(responseAsJSON, i){
    let x = '';
    if (i != null) {
        x=i;
    }
    let types = responseAsJSON['types'];
    let backgroundIMG = 'img/'+types[0]['type']['name']+'.png';
    let background = `background-image: url('${backgroundIMG}')`;
    document.getElementById(`pokemonContainer${x}`).style.cssText = background;
    for (let j = 0; j < types.length; j++) {
        const typeURL = types[j]['type']['url'];
        let type =  await pokemonTypeNameDE(typeURL);
        let pokemonInfo = `pokemonInfo${x}`;
        pokemonTypeHTML(type, pokemonInfo);
    }
}

async function pokemonNameDE(id){
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let name = responseAsJSON['names']['5']['name'];
    return name;
}

async function pokemonTypeNameDE(url){
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let type = responseAsJSON['names']['4']['name'];
    return type;
}

async function loadPokemon(pokemon){
    designPokemon(pokemon);
    //let responseAsJSON = await loadPokemonJson(pokemon);
    //about(responseAsJSON); //Species, height, weigth, Abilities
    //stats(responseAsJSON.stats);
    //evolution(responseAsJSON);
    //moves(responseAsJSON.moves);
}

async function loadPokemonJson(pokemon){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    return responseAsJSON;
}

async function designPokemon(pokemon){
    let container = document.getElementById('pokemon');
    container.innerHTML = pokemonHTML();
    let responseAsJSON = await loadPokemonJson(pokemon);
    pokemonType(responseAsJSON, null);
}

async function about(responseAsJSON){
    
}

