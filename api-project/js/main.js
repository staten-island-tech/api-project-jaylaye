import '../styles/style.css';
import { DOMSelectors } from "./DOM";

const URL = "https://pokeapi.co/api/v2/pokemon/?limit=386";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const pokemonList = data.results;

   for (const pokemon of pokemonList){
      const pokemonDetails = await fetchPokemonDetails(pokemon.name);
      createCard(pokemonDetails);
    }
  
   // document.getElementById("api-response").textContent = JSON.stringify(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchPokemonDetails(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error('Invalid Pokémon name or ID');ff
    }

    const data = await response.json();
    const stats = data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }));

    return {
      pokedexNumber: data.id,
      pokemonName: data.name,
      image: data.sprites.front_default,
      types: data.types.map(type => type.type.name),
      moves: data.moves.map(move => move.move.name),
      stats: stats,
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
}
/* {
  getData("https://pokeapi.co/api/v2/pokemon/?limit=386");
}
*/
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCard(card) {
  const capitalizedPokemonName = capitalizeFirstLetter(card.pokemonName);

  const basicCardHTML = `
    <div class="pokecard">
      <h2>${capitalizedPokemonName} #${card.pokedexNumber}</h2>
      <h3>Type: ${card.types.join(', ')}</h3>
      <img src="${card.image}" alt="${capitalizedPokemonName} Image">
      <p>Possible Moves: ${card.moves.join(', ')}</p>
      <button class="remove-btn">Remove</button>
    </div>
  `;

  const statsCardHTML = `
    <div class="pokecard">
      <h2>${capitalizedPokemonName} Stats</h2>
      <h3>Stats:</h3>
      <ul>
        ${card.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
      </ul>
      <button class="remove-btn">Remove</button>
    </div>
  `;

  DOMSelectors.container.innerHTML = `
    <div class="pokecard-container">
      ${basicCardHTML}
    </div>
    <div class="pokecard-container">
      ${statsCardHTML}
    </div>
  `;

  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.parentElement.remove();
    });
  });
}

function displayErrorMessage(message) {
  alert(message);
}

function clearCards() {
  const container = DOMSelectors.container;
  container.innerHTML = '';
}

DOMSelectors.form.addEventListener("submit", async function (event) {
  event.preventDefault();
  clearCards();
  const inputElement = DOMSelectors.input;
  const pokemonNameOrId = inputElement.value.toLowerCase();

  try {
    const pokemonDetails = await fetchPokemonDetails(pokemonNameOrId);
    createCard(pokemonDetails);
  } catch (error) {
    console.error(error);
    if (error.message === 'Invalid Pokémon name or ID') {
      displayErrorMessage('Invalid Pokémon name or ID. Please enter a valid Pokémon name or ID.');
    }
  }
});

window.addEventListener("load", () => {
  getData(URL);
});
