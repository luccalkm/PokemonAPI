class UI {
	constructor() {
		this.search = document.querySelector("#search");
	}

	showPokemonCard(pokemon) {
		let output = "";

		// BUILD IMAGE AND POKEMON NAME
		output = `
      <div class="card-body w-100 p-1">
         <div class="container">
            <div class="w-100 "> 
               <h1 class="d-flex nomePokemon justify-content-center align-items-center fs-3 mb-0">${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)} (${pokemon.id})
               `;

		// BUILD EACH TYPE SPAN
		output += `<div class="d-flex align-items-center ms-4">`;
		pokemon.types.forEach((e, index) => {
			const color = this.getTypeColors(e.type.name);
			output += `
         <div class="col pl-0">
            <p style="background: ${color};" id="type-output" class="active-type form-control lead m-0">${pokemon.types[index]["type"]["name"].toUpperCase()}
            </p>
         </div>`;
		});
		output += `</h1><Hr style="margin: 8px 0px 16px 0px!important;"></div>    <img style="background:#fcfcfc; transition: all 1s;" class="m-auto card text-left card-img-top p-2 mb-2 rounded-circle" id="pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="" />
      `;

		// BUILD EACH SPEC ROW
		output += "</div>";
		pokemon.stats.forEach((e, index) => {
			// SIZE OF PROGRESS BAR
			let progressBar = Number(e["base_stat"]) / 1.5;

			// SPEC NAME DISPLAYED
			let displayName = e["stat"]["name"];

			// CHANGE SPECIAL TO SP.
			if (displayName.startsWith("special")) {
				displayName = displayName.replace("special-", "sp. ");
			}

			// LIMIT 69% SO IT DOESNT GO OVER THE SUM OF 100%
			// (31% THE SPEC NAMES and 69% FOR THE REST)
			if (progressBar > 90) {
				progressBar = 90;
			} else if (progressBar < 0) {
				progressBar = 1;
			}

			output += `
			<div style="width: 75%;" class="m-auto">
         	<div style="font-weight: bold;" class="row text-center p-2">
					${displayName.toUpperCase()} - ${e["base_stat"]}
				</div>
				<div class="row">
					<span style="font-weight: bold; width: ${progressBar}%; height: 24px!important;" class="border text-center bg-danger"></span>
					<span style="background:#dee2e6; height: 24px!important;" class="border col"></span>
				</div>
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
