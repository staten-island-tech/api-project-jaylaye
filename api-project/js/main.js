import '../styles/style.css';
import { DOMSelectors } from "./DOM";

//array
const URL = "https://pokeapi.co/api/v2/pokemon/";
async function getData(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
}

getData(URL);

DOMSelectors.form.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = {
      Poke: DOMSelectors.Poke.value,
  };
  createCard(card);
  clearFields();
});

function clearFields() {
  DOMSelectors.Poke.value = "";

};

function createCard(card) {
  DOMSelectors.container.insertAdjacentHTML()
  removeW();
};

/*theme
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.btn');
  const themeButton = document.getElementById('theme');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const category = this.id.substring(3).toLowerCase();
      
    });
  });

  themeButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleTheme();
  });
}); */
