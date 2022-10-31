class PokeApi {
	constructor() {}

	async getPokemon(pokemonId) {
		const test = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const pokemon = await test.json();
		return {
			pokemon,
		};
	}
}
