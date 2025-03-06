const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('type');

fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  .then((response) => response.json())
  .then((data) => {
    let div = document.createElement("div");
    div.className = "detaille";
    document.body.appendChild(div);

    div.innerHTML += `
        <span>${
          data.flavor_text_entries
            ? data.flavor_text_entries[0]?.flavor_text
            : "Pas de description"
        }</span><br>
        <h3>Description</h3>:
        <span>${
          data.form_descriptions
            ? data.form_descriptions[0]?.description
            : "Aucune description de forme"
        }</span><br>
        <span>${
          data.pokedex_numbers
            ? data.pokedex_numbers[0]?.entry_number
            : "Pas de numéro dans le Pokédex"
        }</span><br>
        <span>${
          data.pokedex_numbers
            ? data.pokedex_numbers[0]?.pokedex.name
            : "Pas d'information sur le Pokédex"
        }</span><br>
         <h2>${data.name}</h2>
    `;

    let cardDiv = document.createElement("section");
    cardDiv.className = "card";
    div.appendChild(cardDiv);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((pokeData) => {
        let img = document.createElement("img");
        img.className = "pokeimg";
        img.setAttribute(
          "src",
          pokeData.sprites.other["official-artwork"].front_shiny
        );

        cardDiv.appendChild(img);

        let button = document.createElement("button");
        button.innerHTML = '<i class="fa-solid fa-plus"></i>Ajouter le Pokémon';
        button.className = "favoris";
        button.addEventListener("click", () => {
            let favoris = localStorage.getItem("favoris");
            if (favoris) {
                favoris = JSON.parse(favoris);
            } else {
                favoris = [];
            }
            favoris.push({
                name: data.name,
                flavor_text: data.flavor_text_entries[0]?.flavor_text || "Pas de description",
                description: data.form_descriptions[0]?.description || "Aucune description de forme",
                entry_number: data.pokedex_numbers[0]?.entry_number || "Pas de numéro dans le Pokédex",
                pokedex_name: data.pokedex_numbers[0]?.pokedex.name || "Pas d'information sur le Pokédex",
                type: pokeData.types[0].type.name,
                weight: pokeData.weight,
                id: pokeData.id,
                img: pokeData.sprites.other["official-artwork"].front_shiny
            });
            localStorage.setItem("favoris", JSON.stringify(favoris));
            window.location.href = 'panier.html';
        });
        div.appendChild(button);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données:", err);
      });
  })
  .catch((err) => {
    console.error("Erreur lors de la récupération des données:", err);
  });