import '../styles/style.css';
import { DOMSelectors } from "./DOM";

//array

const URL = "https://pokeapi.co/api/v2/pokemon/?limit=386";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    document.getElementById("api-response").textContent = JSON.stringify(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchPokemonDetails(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    return {
      pokedexNumber: data.id,
      pokemonName: data.name,
      image: data.sprites.front_default,
      types: data.types.map(type => type.type.name),
      moves: data.moves.map(move => move.move.name),
      
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCard(card) {
  const capitalizedPokemonName = capitalizeFirstLetter(card.pokemonName);

  const cardHTML = `
    <div class="pokecard">
      <h2>${capitalizedPokemonName} #${card.pokedexNumber}</h2>
      <p>Type: ${card.types.join(', ')}</p>
      <img src="${card.image}" alt="${capitalizedPokemonName} Image">
      <p>Possible Moves: ${card.moves.join(', ')}</p>
    </div>
  `;

  DOMSelectors.container.insertAdjacentHTML('beforeend', cardHTML);
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
  }
});

const secondURL = "https://pokeapi.co/api/v2/evolution-chain/?limit=202"
