const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

function pokemonListTemplate(item) {
  return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item) {
  return `
    <h2>${item.name}</h2>
    <img src="${item.sprites.front_default}" alt="Sprite of ${item.name}">
    <p><strong>Height:</strong> ${item.height}</p>
    <p><strong>Weight:</strong> ${item.weight}</p>
  `;
}

function renderPokemonList(pokemon) {
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  pokemonList.insertAdjacentHTML("afterbegin", pokemonListHtml);
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function pokeListHandler(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const pokemonUrl = button.dataset.url;
  const details = await getData(pokemonUrl);

  if (details) {
    const detailsHtml = pokemonDetailsTemplate(details);
    pokemonDetails.innerHTML = "";
    pokemonDetails.insertAdjacentHTML("afterbegin", detailsHtml);
  }
}

async function init() {
  const data = await getData(apiUrl);
  if (data && data.results) {
    renderPokemonList(data.results);
  }
}

pokemonList.addEventListener("click", pokeListHandler);

init();