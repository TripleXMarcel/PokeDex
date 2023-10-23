let languageCode = 'de';
let loading = true;

function changeLanguage() {
    if (loading === true) {
        let languageSelect = document.getElementById("languageDropdown");
        languageCode = languageSelect.value;
        init();
    }
}

async function init() {
    loading = false;
    document.getElementById('pokemonMainContainer').innerHTML = '';
    await loadAllPokemon();
}

async function loadAllPokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let results = responseAsJSON['results'];
    for (let i = 0; i < results.length; i++) {
        const pokemon = results[i];
        await loadPokemonContainer(pokemon.name, i, 'pokemonMainContainer');
    };
    loading = true;
}

async function loadPokemonContainer(pokemon, i, elementId) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let pokemonIMG = responseAsJSON['sprites']['front_default'];
    let container = document.getElementById(elementId);
    let id = responseAsJSON.id;
    let name = await pokemonNameDE(id);
    if (elementId === 'pokemonMainContainer') {
        container.innerHTML += pokemonContainerHTML(pokemon, pokemonIMG, id.toString().padStart(3, '0'), i, name);
    }
    else {
        container.innerHTML = pokemonHTML(pokemon, pokemonIMG, id.toString().padStart(3, '0'), i, name);
    }
    await pokemonType(responseAsJSON, i);
}

async function pokemonType(responseAsJSON, i) {
    let types = responseAsJSON['types'];
    let backgroundIMG = 'img/' + types[0]['type']['name'] + '.png';
    let background = `background-image: url('${backgroundIMG}')`;
    document.getElementById(`pokemonContainer${i}`).style.cssText = background;
    for (let j = 0; j < types.length; j++) {
        const typeURL = types[j]['type']['url'];
        let type = await pokemonTypeNameDE(typeURL);
        let pokemonInfo = `pokemonInfo${i}`;
        pokemonTypeHTML(type, pokemonInfo);
    }
}

async function pokemonNameDE(id) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let name = await searchLanguage(responseAsJSON);
    return name;
}

async function pokemonTypeNameDE(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let type = await searchLanguage(responseAsJSON);
    return type;
}

async function loadPokemonJson(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    return responseAsJSON;
}

async function designPokemon(pokemon) {
    let container = document.getElementById('pokemon');
    container.classList.remove('displayNone');
    document.getElementById('pokemonClose').classList.remove('displayNone');
    loadPokemonContainer(pokemon, '', 'pokemon');
}

async function searchLanguage(responseAsJSON) {
    for (let i = 0; i < responseAsJSON['names'].length; i++) {
        if (responseAsJSON['names'][i]['language']['name'] === languageCode) {
            let result = await responseAsJSON['names'][i]['name'];
            return result;
        }
    }
}

async function loadPokemon(pokemon) {
    designPokemon(pokemon);
    //let responseAsJSON = await loadPokemonJson(pokemon);
    //about(responseAsJSON); //Species, height, weigth, Abilities
    //stats(responseAsJSON.stats);
    //evolution(responseAsJSON);
    //moves(responseAsJSON.moves);
}

async function about(responseAsJSON) {

}

function closePokemon() {
    document.getElementById('pokemon').classList.add('displayNone');
    document.getElementById('pokemonClose').classList.add('displayNone');
}