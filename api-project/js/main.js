import '../styles/style.css'

const url = " https://pokeapi.co/api/v2/pokemon"
async function getData(URL){
    const response = await fetch(URL);
    console.log(response)

}
getData(URL);