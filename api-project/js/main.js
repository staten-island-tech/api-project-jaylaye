import '../styles/style.css';
import { DOMSelectors } from "./DOM";

//array
const URL = "https://pokeapi.co/api/v2/pokemon/?limit=386";
async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    document.getElementById("api-response").textContent = data.content;
    console.log(data)
  } catch (error) {
    console.error(error);
  }
}
getData(URL);

async function fetchPokemonDetails(pokemonId) {
  try {
    const response = await fetch(`${URL}${pokemonId}`);
    const data = await response.json();
    return {
      pokedexNumber: data.id,
      pokemonName: data.name,
      types: data.types.map(type => type.type.name),
      moves: data.moves.map(move => move.move.name),
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
}

/*
DOMSelectors.form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const pokemonName = DOMSelectors.Poke.value.trim();

  if (pokemonName !== "") {
    try {
      const data = await fetchData(pokemonName);
      createCard(data);
      clearFields();
    } catch (error) {
      alert("Failed to fetch Pokemon data. Please try again.");
    }
  } else {
    alert("Please enter a Pokemon name.");
  }
});

function clearFields() {
  DOMSelectors.Poke.value = "";
}

function createCard(card) {
  DOMSelectors.container.insertAdjacentHTML()
  removeW();
};

//theme
/*
function toggleTheme() {
  console.log("Toggle theme function called");
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded event fired");

  if (DOMSelectors && DOMSelectors.themeButton) {
    console.log("DOMSelectors.themeButton:", DOMSelectors.themeButton);

    DOMSelectors.themeButton.addEventListener("click", function (e) {
      console.log("Theme button clicked");
      e.preventDefault();
      toggleTheme();
    });
  } else {
    console.error("DOMSelectors or DOMSelectors.themeButton is undefined. Check your DOMSelectors definition.");
  }

  const storedTheme = localStorage.getItem("theme");
  console.log("Stored Theme:", storedTheme);

  if (storedTheme === "dark") {
    console.log("Applying dark theme");
    document.body.classList.add("dark-theme");
  }
}); */
