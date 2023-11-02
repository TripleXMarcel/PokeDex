function pokemonContainerHTML(pokemon, pokemonIMG, id, i, pokemonName) {
    return `
    <div onclick="designPokemon('${pokemon}')" id="pokemonContainer${i}" class="pokemonContainer">
        <div class="pokemonInfoLeftContainer" id="pokemonInfo${i}">
            <div class="pokemonName">${pokemonName}</div>
        </div>
        <div class="pokemonInfoRightContainer">
        <div class="pokemonNumber">#${id}</div>
        <img src="${pokemonIMG}">
        </div>
    </div>
    `;
}

function pokemonTypeHTML(type, pokemonInfo) {
    document.getElementById(pokemonInfo).innerHTML += `<div class="pokemonCategory">${type}</div>`;
}

function pokemonHTML(pokemonIMG, id, pokemonName, pokemon) {
    return `
    <div id="pokemonContainer" class="headerPokemonContainer">
        <div>
            <div class="headerPokemonBackAndFav">
                <img onclick="closePokemon()" src="img/back.png">
            </div>
            <div class="headerPokemonNameAndId">
                <div class="headerPokemonInfo">
                    <h3>${pokemonName}</h3>
                    <div id="pokemonInfo"></div>
                </div>
                <h3>${id}</h3>
            </div>
        </div>
        <div class="headerPokemonImg">
            <img src="${pokemonIMG}">
        </div>
    </div>
    <div id="pokemonBottomContainer">
        <div class="menu">
            <div id="pokemonAboutHeadline" class="menuHeadline" onclick="about('${pokemon}');">${languageAbout}</div>
            <div id="pokemonBaseStatsHeadline" class="menuHeadline" onclick="stats('${pokemon}')">${languageStats}</div>
            <div id="pokemonEvolutionHeadline" class="menuHeadline" onclick="evolution('${pokemon}')">${languageEvolution}</div>
            <div id="pokemonMovesHeadline" class="menuHeadline" onclick="moves('${pokemon}')">${languageMoves}</div>
        </div>
        <div id="pokemonAbout">
        </div>
        <div id="pokemonBaseStats" class="displayNone">
        </div>
        <div id="pokemonEvolution" class="displayNone">
        </div>
        <div id="pokemonMoves" class="displayNone">
        </div>
    </div>
    `;
}

function aboutHTML(species, height, weight) {
    return `
        <div class="flex mt15">
            <h4>${languageSpecies}</h4>
            <h5>${species}</h5>
        </div>
        <div class="flex mt15">
            <h4>${languageHeight}</h4>
            <h5>${height} m</h5>
        </div>
        <div class="flex mt15">
            <h4>${languageWeight}</h4>
            <h5>${weight} kg</h5>
        </div>
        <div class="flex mt15">
            <h4>${languageAbilities}</h4>
            <h5 id="abilities"></h5>
        </div>
        <div class="flex mt15">
            <h4>${languageEggGroups}</h4>
            <h5 id="eggGroups"></h5>
        </div>
    `;
}
function pokemonBaseStatsHTML(baseStat, statName, i) {
    return `
    <div class="flex">
        <h4 class="width120">${statName}</h4>
        <h5>${baseStat}</h5>
        </div>
        <div class="progressBar">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="12px">
            <rect x="0" y="0" width="200px" height="12px" fill="#ffffff" />
            <rect x="0" y="0" width="0" height="12px" fill="#4CAF50" id="bar${i + 1}">
            <animate attributeName="width" from="0" to="0" dur="1s" fill="freeze" begin="0s" id="animation${i + 1}" />
            </rect>
        </svg>
        </div>
    `;
}

function pokemonEvolutionHTML() {
    return `<div id="first"></div>
            <div id="second"></div>
            <div id="third"></div>`;
}

function pokemonEvolutionIMGHTML(pokemonIMG, pokemon) {
    return `<img onclick="designPokemon('${pokemon}')" src="${pokemonIMG}">`;
}

function pokemonMovesHTML(move) {
    return `<h4>${move}</h4>`;
}