class UI {
	constructor() {
		this.search = document.querySelector("#search");
	}

	showPokemonCard(pokemon) {
		let output = "";

		// BUILD IMAGE AND POKEMON NAME
		output = `
      <img style="background:#fcfcfc; transition: all 1s;" class="m-auto card text-left card-img-top p-2 mb-2 rounded-circle" id="pokemon" src=${pokemon.sprites.front_default} alt="" />
      <div class="card-body w-100 p-1">
         <div class="container">
            <div class="w-100"> 
               <h1 class="d-flex nomePokemon fs-3 mb-0">${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} (${pokemon.id})
               `;

		// BUILD EACH TYPE SPAN
		output += `<div class="d-flex align-items-center m-auto">`;
		pokemon.types.forEach((e, index) => {
			const color = this.getTypeColors(e.type.name);
			output += `
         <div class="col pl-0">
            <p style="background: ${color};" id="type-output" class="active-type form-control lead m-0">${pokemon.types[index]["type"]["name"].toUpperCase()}
            </p>
         </div>`;
		});
		output += `</h1><Hr></div>
      `;

		// BUILD EACH SPEC ROW
		output += "</div>";
		pokemon.stats.forEach((e, index) => {
			output += `<div class="row ms-lg-0 text-right">
         <div style="text-align: center; font-weight: bold;" class="col-5 text-white bg-danger p-2 border">${e["stat"]["name"].toUpperCase()}</div>
         <div style="text-align: center;" class="col border p-1 ">${e["base_stat"]}</div>
         </div>`;
		});

		document.querySelector("#main-inside").innerHTML = output;
	}

	showErrorMessage(message) {
		if (document.querySelector(".error-message")) {
			this.clearErrorMessage();
		}
		const errorPoint = document.querySelector("#errorPoint");
		const mainOutside = document.querySelector("#main-outside");

		const div = document.createElement("div");
		div.className = "w-100 error-message";
		div.appendChild(document.createTextNode(message));
		mainOutside.insertBefore(div, errorPoint);
		setTimeout(() => this.clearErrorMessage(), 2500);
	}

	// BASE COLORS FOR POKEMON TYPES
	getTypeColors(type) {
		const types = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];

		const colors = ["#A1DB41", "#644104", "#9479DD", "#EEC621", "#E982C7", "#80470A", "#D12E2E", "#6597D8", "#114486", "#15D112", "#BCA83F", "#1AC4DC", "#B2B49E", "#742293", "#D21C79", "#A2843B", "#CDCDCD", "#2D76DA"];

		const colorIndex = types.indexOf(type);

		return colors[colorIndex];
	}

	clearErrorMessage() {
		document.querySelector(".error-message").remove();
	}
}
