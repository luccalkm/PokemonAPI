class UI {
	constructor() {
		this.search = document.querySelector("#search");
	}

	showPokemonCard(pokemon) {
		let output = "";

		// BUILD IMAGE AND POKEMON NAME
		output = `
      <img style="width: 40%; height: 40%; background:#fcfcfc; transition: all 1s;" class="m-auto me-5 card text-left card-img-top p-2 rounded-circle" id="pokemon" src=${pokemon.sprites.front_default} alt="" />
      <div class="card-body">
         <div class="container">
            <div class="row w-100"> 
               <h1 class="h1">${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} - ${pokemon.id}</h1>
               `;

		// BUILD EACH TYPE SPAN
		output += `<div class="row w-100 d-flex mt-3">`;
		pokemon.types.forEach((e, index) => {
			const color = this.getTypeColors(e.type.name);
			output += `
         <div class="col pl-0">
            <p style="background: ${color};" id="type-output" class="active-type form-control lead ">${pokemon.types[index]["type"]["name"].toUpperCase()}
            </p>
         </div>`;
		});
		output += `<Hr></div>
      `;

		// BUILD EACH SPEC ROW
		output += "</div>";
		pokemon.stats.forEach((e, index) => {
			output += `<div class="row ms-lg-0 text-right">
         <div style="text-align: center; font-weight: bold;" class="col-3 text-white bg-danger p-2 border">${e["stat"]["name"].toUpperCase()}</div>
         <div style="text-align: center;" class="col border p-2 ">${e["base_stat"]}</div>
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
