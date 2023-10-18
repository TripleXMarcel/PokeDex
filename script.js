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
    console.log(responseAsJSON);
}

function designMainPage() {
    let container = document.getElementById('mainContainer');
    container.innerHTML = mainPageHTML();
}

async function loadPokemonContainer(pokemon, i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let pokemonIMG = responseAsJSON['sprites']['front_default'];
    let container = document.getElementById('pokemonContainer');
    container.innerHTML += pokemonContainerHTML(firstLetterToUpperCase(pokemon), pokemonIMG, responseAsJSON.id, i);
}

function firstLetterToUpperCase(word) {
    return word[0].toUpperCase()+word.slice(1);
}

