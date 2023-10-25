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
    let url = responseAsJSON['species']['url'];
    let name = await pokemonTypeName(url);
    if (elementId === 'pokemonMainContainer') {
        container.innerHTML += pokemonContainerHTML(pokemon, pokemonIMG, id.toString().padStart(3, '0'), i, name);
    }
    else {
        container.innerHTML = pokemonHTML(pokemonIMG, id.toString().padStart(3, '0'), name, pokemon);
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
        let type = await pokemonTypeName(typeURL);
        let pokemonInfo = `pokemonInfo${i}`;
        pokemonTypeHTML(type, pokemonInfo);
    }
}

async function pokemonTypeName(url) {
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

async function loadPokemonSpeciesJson(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
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

async function about(pokemon) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let species = await loadSpecies(pokemon);
    let height = responseAsJSON['height'] / 10;
    let weight = responseAsJSON['weight'] / 10;
    document.getElementById('pokemonAbout').innerHTML = aboutHTML(species, height, weight);
    loadAbilities(responseAsJSON);
    loadeggGroups(pokemon);
    switchCard('pokemonAbout')
}

async function loadAbilities(responseAsJSON) {
    for (let i = 0; i < responseAsJSON['abilities'].length; i++) {
        let url = responseAsJSON['abilities'][i]['ability']['url'];
        let abilitie = await pokemonTypeName(url);
        if (i != 0) {
            document.getElementById('abilities').innerHTML += `, ${abilitie}`;
        }
        else {
            document.getElementById('abilities').innerHTML += `${abilitie}`;
        }
    }
}

async function loadSpecies(pokemon) {
    let responseAsJSON = await loadPokemonSpeciesJson(pokemon);
    for (let i = 0; i < responseAsJSON['genera'].length; i++) {
        if (responseAsJSON['genera'][i]['language']['name'] === languageCode) {
            let result = await responseAsJSON['genera'][i]['genus'];
            return result;
        }
    }
}

async function loadeggGroups(pokemon) {
    let responseAsJSON = await loadPokemonSpeciesJson(pokemon);
    for (let i = 0; i < responseAsJSON['egg_groups'].length; i++) {
        let url = responseAsJSON['egg_groups'][i]['url'];
        let eggGroup = await pokemonTypeName(url);
        if (i != 0) {
            document.getElementById('eggGroups').innerHTML += `, ${eggGroup}`;
        }
        else {
            document.getElementById('eggGroups').innerHTML += `${eggGroup}`;
        }
    }
}

async function stats(pokemon) {
    switchCard('pokemonBaseStats');
    let container = document.getElementById('pokemonBaseStats');
    container.innerHTML = "";
    let responseAsJSON = await loadPokemonJson(pokemon);
    for (let i = 0; i < responseAsJSON['stats'].length; i++) {
        let baseStat = responseAsJSON['stats'][i]['base_stat'];
        let url = responseAsJSON['stats'][i]['stat']['url'];
        let statName = await pokemonTypeName(url);
        container.innerHTML += pokemonBaseStatsHTML(baseStat, statName, i);
        startProgressBarAnimation(`animation${i + 1}`, baseStat / 2, `bar${i + 1}`);
    }
}

function startProgressBarAnimation(animationId, value, barId) {
    const animation = document.getElementById(animationId);
    const bar = document.getElementById(barId);
    if (animation && bar) {
        animation.setAttribute('from', '0');
        animation.setAttribute('to', `${value}%`);
        animation.beginElement();
    }
}

async function evolution(pokemon) {
    document.getElementById('pokemonEvolution').innerHTML = pokemonEvolutionHTML();
    let responseAsJSON = await loadPokemonSpeciesJson(pokemon);
    switchCard('pokemonEvolution');
    let evolutionChainUrl = responseAsJSON['evolution_chain']['url'];
    let evolutionChainResponse = await fetch(evolutionChainUrl);
    let evolutionChainResponseAsJSON = await evolutionChainResponse.json();
    pokemonEvolution(evolutionChainResponseAsJSON)
}

async function pokemonEvolution(evolutionChainResponseAsJSON){
    whichEvolution(await evolutionChainResponseAsJSON['chain']['species']['name'], 'first');
    for (let i = 0; i < 3; i++) {
        if (evolutionChainResponseAsJSON['chain']['evolves_to'][i] != undefined) {
            whichEvolution(await evolutionChainResponseAsJSON['chain']['evolves_to'][i]['species']['name'], 'second');
        }
    }
    if (evolutionChainResponseAsJSON['chain']['evolves_to']['0']['evolves_to']['0'] != undefined) {
        whichEvolution(await evolutionChainResponseAsJSON['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'], 'third');
    }
}

async function whichEvolution(pokemon, which) {
    let container = document.getElementById(which);
    let responseAsJSON = await loadPokemonJson(pokemon);
    let pokemonIMG = responseAsJSON['sprites']['front_default'];
    container.innerHTML += pokemonEvolutionIMGHTML(pokemonIMG);
}



async function moves(pokemon) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let container = document.getElementById('pokemonMoves');
    container.innerHTML = "";
    switchCard('pokemonMoves');
    for (let i = 0; i < responseAsJSON['moves'].length; i++) {
        let url = responseAsJSON['moves'][i]['move']['url'];
        let move = await pokemonTypeName(url);
        container.innerHTML += pokemonMovesHTML(move);
    }
}

function switchCard(x) {
    document.getElementById('pokemonAbout').classList.add('displayNone');
    document.getElementById('pokemonBaseStats').classList.add('displayNone');
    document.getElementById('pokemonEvolution').classList.add('displayNone');
    document.getElementById('pokemonMoves').classList.add('displayNone');
    document.getElementById(x).classList.remove('displayNone');
}

function closePokemon() {
    document.getElementById('pokemon').classList.add('displayNone');
    document.getElementById('pokemonClose').classList.add('displayNone');
}