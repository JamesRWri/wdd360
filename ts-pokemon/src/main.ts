interface PokemonSimple {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
}

const pokemonList = document.querySelector<HTMLUListElement>("#pokemon-list");
const pokemonDetails = document.querySelector<HTMLDivElement>("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

function pokemonListTemplate(item: PokemonSimple): string {
  return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item: PokemonDetails): string {
  return `
    <h2>${item.name}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
  `;
}

function renderPokemonList(pokemon: PokemonSimple[]): void {
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  if (pokemonList) {
    pokemonList.insertAdjacentHTML("afterbegin", pokemonListHtml);
  }
}

async function getData<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function pokeListHandler(event: Event): Promise<void> {
  const target = event.target as HTMLElement;
  const button = target.closest("button");
  
  if (!button) return;
  
  const pokemonUrl = button.dataset.url;
  if (!pokemonUrl) {
    console.error("No URL found on the target element.");
    return;
  }

  try {
    const details = await getData<PokemonDetails>(pokemonUrl);
    if (details && pokemonDetails) {
      const detailsHtml = pokemonDetailsTemplate(details);
      pokemonDetails.innerHTML = "";
      pokemonDetails.insertAdjacentHTML("afterbegin", detailsHtml);
    } else if (!pokemonDetails) {
      throw new Error("Output element not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function init(): Promise<void> {
  const data = await getData<{ results: PokemonSimple[] }>(apiUrl);
  if (data && data.results) {
    renderPokemonList(data.results);
  }
}

if (pokemonList) {
  pokemonList.addEventListener("click", pokeListHandler);
}

init();