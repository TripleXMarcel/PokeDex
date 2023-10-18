function mainPageHTML() {
    return `
    <div>
        <h1>Pokedex<h1>
        <div id="pokemonContainer">
        </div>
    <div>
    `;
}

function pokemonContainerHTML(pokemon, pokemonIMG, id, i) {
    return `
    <div onclick="${i}" class="pokemonContainer">
        <div class="pokemonNameId">
            <div>${pokemon}</div>
            <div>#${id}</div>
        </div>
        <img src="${pokemonIMG}">
    </div>
    `;
}