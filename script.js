let languageCode = 'de';
let loadedPokemon = [];
let languageAbout = '';
let languageStats = '';
let languageEvolution = '';
let languageMoves = '';
let languageSpecies = '';
let languageHeight = '';
let languageWeight = '';
let languageAbilities = '';
let languageEggGroups = '';

function changeLanguage() {
    let languageSelect = document.getElementById("languageDropdown");
    languageCode = languageSelect.value;
    init();
}

async function init() {
    loading();
    loadedPokemon = [];
    loadLanguage();
    document.getElementById('pokemonMainContainer').innerHTML = '';
    await loadAllPokemon();
    loadingFinish();
}

async function search(){
    let inputValue = document.getElementById('searchInput').value.toLowerCase();
    for (let i = 0; i < loadedPokemon.length; i++) {
        if (loadedPokemon[i].toLowerCase().includes(inputValue)) {
            document.getElementById(`pokemonContainer${i}`).classList.remove('displayNone');
        }
        else{
            document.getElementById(`pokemonContainer${i}`).classList.add('displayNone');
        }
    }
}

function loadLanguage() {
    if (languageCode === 'de') {loadGerman();}
    if (languageCode === 'en') {loadEnglish();}
    if (languageCode === 'fr') {loadFrench();}
    if (languageCode === 'ja-Hrkt') {loadJapanese();}
    if (languageCode === 'it') {loadItalian();}
    if (languageCode === 'es') {loadSpanish();}
    if (languageCode === 'ko') {loadKorean();}
}

function loadGerman() {
    document.getElementById('searchInput').placeholder = 'Suche';
    languageAbout = 'Über';
    languageStats = 'Basiswerte';
    languageEvolution = 'Entwicklung'; 
    languageMoves = 'Attacken';
    languageSpecies = 'Art';
    languageHeight = 'Höhe';
    languageWeight = 'Gewicht';
    languageAbilities = 'Fähigkeiten';
    languageEggGroups = 'Eigruppen';
}

function loadEnglish() {
    document.getElementById('searchInput').placeholder = 'Search';
    languageAbout = 'About';
    languageStats = 'Base Stats';
    languageEvolution = 'Evolution';
    languageMoves = 'Moves';
    languageSpecies = 'Species';
    languageHeight = 'Height';
    languageWeight = 'Weight';
    languageAbilities = 'Abilities';
    languageEggGroups = 'Egg Groups';
}

function loadFrench() {
    document.getElementById('searchInput').placeholder = 'Recherche';
    languageAbout = 'À propos de';
    languageStats = 'Statistiques de base';
    languageEvolution = 'Evolution';
    languageMoves = 'Attaques';
    languageSpecies = 'Espèce';
    languageHeight = 'Taille';
    languageWeight = 'Poids';
    languageAbilities = 'Capacités';
    languageEggGroups = 'Groupes d\'œufs';
}

function loadJapanese() {
    document.getElementById('searchInput').placeholder = '検索';
    languageAbout = '約';
    languageStats = '基本ステータス';
    languageEvolution = '進化';
    languageMoves = '動き';
    languageSpecies = '種類';
    languageHeight = '高さ';
    languageWeight = '重さ';
    languageAbilities = '特性';
    languageEggGroups = '卵グループ';
}

function loadItalian() {
    document.getElementById('searchInput').placeholder = 'Cerca';
    languageAbout = 'Informazioni';
    languageStats = 'Statistiche di Base';
    languageEvolution = 'Evoluzione';
    languageMoves = 'Attacchi';
    languageSpecies = 'Specie';
    languageHeight = 'Altezza';
    languageWeight = 'Peso';
    languageAbilities = 'Abilità';
    languageEggGroups = 'Gruppi Uova';
}

function loadSpanish() {
    document.getElementById('searchInput').placeholder = 'Buscar';
    languageAbout = 'Acerca de';
    languageStats = 'Estadísticas Base';
    languageEvolution = 'Evolución';
    languageMoves = 'Movimientos';
    languageSpecies = 'Especie';
    languageHeight = 'Altura';
    languageWeight = 'Peso';
    languageAbilities = 'Habilidades';
    languageEggGroups = 'Grupos de Huevo';
}

function loadKorean() {
    document.getElementById('searchInput').placeholder = '검색';
    languageAbout = '소개';
    languageStats = '기초 스탯';
    languageEvolution = '진화';
    languageMoves = '기술';
    languageSpecies = '종류';
    languageHeight = '키';
    languageWeight = '무게';
    languageAbilities = '능력';
    languageEggGroups = '알 그룹';
}

function loading() {
    document.getElementById('mainContainer').classList.add('displayNone');
    document.getElementById('languageDropdown').disabled = true;
    document.getElementById('loadingScreen').classList.remove('displayNone');
}

function loadingFinish() {
    document.getElementById('mainContainer').classList.remove('displayNone');
    document.getElementById('languageDropdown').disabled = false;
    document.getElementById('loadingScreen').classList.add('displayNone');
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
}

async function loadPokemonContainer(pokemon, i, elementId) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let pokemonIMG = responseAsJSON['sprites']['front_default'];
    let container = document.getElementById(elementId);
    let id = responseAsJSON.id;
    let url = responseAsJSON['species']['url'];
    let name = await pokemonTypeName(url);
    if (elementId === 'pokemonMainContainer') {  
        loadedPokemon.push(name);
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
    switchCard('pokemonAbout', 'pokemonAboutHeadline')
}

async function loadAbilities(responseAsJSON) {
    for (let i = 0; i < responseAsJSON['abilities'].length; i++) {
        let url = responseAsJSON['abilities'][i]['ability']['url'];
        let abilitie = await pokemonTypeName(url);
        if (i != 0) {
            document.getElementById('abilities').innerHTML += `, <br>${abilitie}`;
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
    switchCard('pokemonBaseStats', 'pokemonBaseStatsHeadline');
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
    switchCard('pokemonEvolution', 'pokemonEvolutionHeadline');
    let evolutionChainUrl = responseAsJSON['evolution_chain']['url'];
    let evolutionChainResponse = await fetch(evolutionChainUrl);
    let evolutionChainResponseAsJSON = await evolutionChainResponse.json();
    pokemonEvolution(evolutionChainResponseAsJSON);
}

async function pokemonEvolution(evolutionChainResponseAsJSON) {
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
    container.innerHTML += pokemonEvolutionIMGHTML(pokemonIMG, pokemon);
}



async function moves(pokemon) {
    let responseAsJSON = await loadPokemonJson(pokemon);
    let container = document.getElementById('pokemonMoves');
    container.innerHTML = "";
    switchCard('pokemonMoves', 'pokemonMovesHeadline');
    for (let i = 0; i < responseAsJSON['moves'].length; i++) {
        let url = responseAsJSON['moves'][i]['move']['url'];
        let move = await pokemonTypeName(url);
        container.innerHTML += pokemonMovesHTML(move);
    }
}

function switchCard(x, y) {
    document.getElementById('pokemonAbout').classList.add('displayNone');
    document.getElementById('pokemonBaseStats').classList.add('displayNone');
    document.getElementById('pokemonEvolution').classList.add('displayNone');
    document.getElementById('pokemonMoves').classList.add('displayNone');
    document.getElementById(x).classList.remove('displayNone');
    document.getElementById('pokemonAboutHeadline').classList.remove('active');
    document.getElementById('pokemonBaseStatsHeadline').classList.remove('active');
    document.getElementById('pokemonEvolutionHeadline').classList.remove('active');
    document.getElementById('pokemonMovesHeadline').classList.remove('active');
    document.getElementById(y).classList.add('active');
}

function closePokemon() {
    document.getElementById('pokemon').classList.add('displayNone');
    document.getElementById('pokemonClose').classList.add('displayNone');
}