function getState(id) {
    fetch(`https://pokeapi.co/api/v2/stat/${id}/`)
    .then((response) => response.json())         
    .then((data) => {
        let div = document.createElement('div');
        div.className = 'statistique';
        document.body.appendChild(div);
        
        div.innerHTML = `
            <h2>Statistiques</h2>
            <span id="pv">PV: ${data.stats[0].base_stat}</span>
            <span id="attaque">Attaque: ${data.stats[1].base_stat}</span>
            <span id="defense">Défense: ${data.stats[2].base_stat}</span>
            <span id="vitesse">Vitesse: ${data.stats[5].base_stat}</span>
        `;
    })
    .catch((err) => {
        console.error('Erreur lors de la récupération des données:', err);
    })
}

