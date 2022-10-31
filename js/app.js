poke = new PokeApi();
ui = new UI();
let actualId = 0;

document.querySelector("#search").addEventListener("click", (e) => {
	const pokemonId = document.querySelector("#searchText").value;
	consultarId(pokemonId.toLowerCase());
	consultApi(pokemonId.toLowerCase());
	document.querySelector("#searchText").value = "";
});

document.querySelector("#next").addEventListener("click", (e) => {
	console.log(actualId++);
	document.querySelector("#searchText").innerText = actualId;
	consultApi(actualId);
});

document.querySelector("#previous").addEventListener("click", (e) => {
	console.log(actualId--);
	document.querySelector("#searchText").innerText = actualId;
	consultApi(actualId);
});

function consultApi(pokemonId) {
	poke.getPokemon(pokemonId)
		.then((pokemon) => {
			ui.showPokemonCard(pokemon.pokemon);
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
