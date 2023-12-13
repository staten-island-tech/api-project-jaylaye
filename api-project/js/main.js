import '../styles/style.css';

const URL = "https://pokeapi.co/api/v2/pokemon/"
async function getData(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
}
//user input
function pokemonInput(){
    let userInput = document.querySelector("#userInput");
    let message = document.querySelector("#message");
  }
// let pokemon = prompt("Please Enter a Pokemon Name");

getData(URL);