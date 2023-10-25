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
                <img src="back.png">
                <img src="like.png">
            </div>
            <div class="headerPokemonNameAndId">
                <div class="headerPokemonInfo">
                    <div>${pokemonName}</div>
                    <div id="pokemonInfo"></div>
                </div>
                <div>${id}</div>
            </div>
        </div>
        <div class="headerPokemonImg">
            <img src="${pokemonIMG}">
        </div>
    </div>
    <div id="pokemonBottomContainer">
        <div>
            <div onclick="about('${pokemon}');">About</div>
            <div onclick="stats('${pokemon}')">BaseStats</div>
            <div onclick="evolution('${pokemon}')">Evolution</div>
            <div onclick="moves('${pokemon}')">Moves</div>
        </div>
        <div id="pokemonAbout">12
        </div>
        <div id="pokemonBaseStats" class="displayNone">13
        </div>
        <div id="pokemonEvolution" class="displayNone">
        </div>
        <div id="pokemonMoves" class="displayNone">15
        </div>
    </div>
    `;
}

function aboutHTML(species, height, weight) {
    return `
    <div>
        <div>Species</div>
        <div>${species}</div>
        <div>Height</div>
        <div>${height} m</div>
        <div>Weight</div>
        <div>${weight} m</div>
        <div>Abilities</div>
        <div id="abilities"></div>
        <div>Egg Group</div>
        <div id="eggGroups"></div>
    </div>
    `;
}
function pokemonBaseStatsHTML(baseStat, statName, i) {
    return `
        <div>${statName}</div>
        <div>${baseStat}</div>
        <div class="progressBar">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="12px">
            <rect x="0" y="0" width="200px" height="12px" fill="#ffffff" />
            <rect x="0" y="0" width="0" height="12px" fill="#4CAF50" id="bar${i + 1}">
            <animate attributeName="width" from="0" to="0" dur="1s" fill="freeze" begin="0s" id="animation${i + 1}" />
            </rect>
        </svg>
        <div>
    `;
}

function pokemonEvolutionHTML(){
    return `<div id="first"></div>
    <div id="second"></div>
    <div id="third"></div>`;
}

function pokemonEvolutionIMGHTML(pokemonIMG) {
    return `<img src="${pokemonIMG}">`;
}

function pokemonMovesHTML(move) {
    return `<div>${move}</div>`;
}