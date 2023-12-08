import '../styles/style.css'

const url = "https://pokeapi.co/api/v2/pokemon/";
async function getData(URL){
    try{
    const response = await fetch(URL);
    if (response.status !=200){
        throw new Error(response.statusText);
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    } catch (error) {
        console.log("error");
        document.querySelector("api").textContent = "error";
    }
}
getData(URL);