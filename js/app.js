// Global Variables
poke = new PokeApi();
ui = new UI();
let actualId = 0;

// Search Buttons
document.querySelector("#search").addEventListener("click", (e) => {
	const pokemonId = document.querySelector("#searchText").value;
	consultarId(pokemonId.toLowerCase());
	consultarApi(pokemonId.toLowerCase());
	document.querySelector("#searchText").value = "";
});

// Search Enter
document.querySelector("#searchText").addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		const pokemonId = document.querySelector("#searchText").value;
		consultarId(pokemonId.toLowerCase());
		consultarApi(pokemonId.toLowerCase());
		document.querySelector("#searchText").value = "";
	}
});

// Next Button
document.querySelector("#next").addEventListener("click", (e) => {
	document.querySelector("#searchText").innerText = actualId;
	actualId++;
	if (actualId < 0) {
		actualId = 0;
	}
	consultarApi(actualId);
});

// Previous Button
document.querySelector("#previous").addEventListener("click", (e) => {
	document.querySelector("#searchText").innerText = actualId;
	actualId--;
	if (actualId < 0) {
		actualId = 0;
	}
	consultarApi(actualId);
});

function consultarApi(pokemonId) {
	poke.getPokemon(pokemonId)
		.then((pokemon) => {
			ui.showPokemonCard(pokemon.pokemon);
			// showTempoCard(pokemon.pokemon);
		})
		.catch((err) => {
			ui.showErrorMessage("Nome/Número do Pokémon inválido! Tente novamente.");
		});
}

function consultarId(pokemonName) {
	poke.getPokemon(pokemonName).then((name) => {
		actualId = name.pokemon.id;
	});
}
