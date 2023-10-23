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

function pokemonHTML(pokemon, pokemonIMG, id, i, pokemonName) {
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
        <table>
        <ul>1</ul>
        <ul>1</ul>
        <ul>1</ul>
        <ul>1</ul>
        <ul>1</ul>
        <ul>1</ul>
        </table>
    </div>
    `;
}