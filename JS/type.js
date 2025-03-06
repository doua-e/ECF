function gettype() {
    fetch(`https://pokeapi.co/api/v2/type`)
    .then((response) => response.json())         
    .then((data) => {
        data.results.forEach((type) => {
            let container = document.getElementById('continertype');
            let button = document.createElement('button');
            button.className = 'type';
            button.textContent = type.name;
            container.appendChild(button); 
            
            button.addEventListener('click', () => {
                fetch(`https://pokeapi.co/api/v2/type/${type.name}`)
                .then((response) => response.json())         
                .then((typeData) => {
                    let pokemonContainer = document.getElementById('continer');
                    pokemonContainer.innerHTML = ''; 

                    typeData.pokemon.forEach(pokemon => {
                        let url = pokemon.pokemon.url;

                        fetch(url)
                        .then((response) => response.json())
                        .then((pokeData) => {
                            let img = document.createElement('img');
                            img.setAttribute('src', pokeData.sprites.front_default);

                            let cardDiv = document.createElement('div');
                            cardDiv.className = 'card';
                            pokemonContainer.appendChild(cardDiv);

                            cardDiv.innerHTML = `
                                <h2>${pokeData.name}</h2>
                                <span>${pokeData.types[0].type.name}</span><br>
                                <span>${pokeData.weight}</span><br>
                                <span>Pokédex ID: ${pokeData.id}</span><br>
                            `;

                            cardDiv.appendChild(img);
                            
                            let voirplus = document.createElement('button');
                            voirplus.className = 'voirplus';
                            voirplus.innerHTML = `<a href="detaille.html?type=${pokeData.id}">voir plus</a>`;
                            cardDiv.appendChild(voirplus);  
                            
                            
                        })
                        .catch((err) => {
                            console.error('Erreur lors de la récupération des données pour Pokémon:', err);
                        });
                    });
                })
                .catch((err) => {
                    console.error('Erreur lors de la récupération des données pour le type:', err);
                });
            });
        });
    })
    .catch((err) => {
        console.error('Erreur lors de la récupération des types:', err);
    });
}

gettype();
