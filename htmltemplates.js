function pokemonContainerHTML(pokemon, pokemonIMG, id, i, pokemonName) {
    return `
    <div onclick="loadPokemon('${pokemon}')" id="pokemonContainer${i}" class="pokemonContainer">
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

function pokemonHTML(pokemonName,) {
    return `
    <div id="pokemonContainer">
        <div class="headerPokemon"><div>
        <div>
            <div>
                <div>
                </div>
                <div id="pokemonInfo">
                </div>
            </div>
            <div>id
            </div>
        </div>
        <img src="">
    </div>
    `;
}