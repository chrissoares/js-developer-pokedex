//Variáveis e constantes
const htmlPokemonDetail = document.getElementById('pokemon');
const pokeApi = {}

function getPokemonId()
{
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      return params.id;
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height * 10;
    pokemon.weight = pokeDetail.weight / 10;

    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name);
    pokemon.abilities = abilities;
    console.log(abilities);

    return pokemon;
}

pokeApi.getPokemonDetail = (id) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    console.log(pokemonUrl);
    return fetch(pokemonUrl)
            .then((response) => response.json());
}

function loadPokemonData(){
    const pokemonId = getPokemonId();
    pokeApi.getPokemonDetail(pokemonId).then((PokemonDetail) => {
        const pokemon = convertPokeApiDetailToPokemon(PokemonDetail);
        htmlPokemonDetail.innerHTML = `
            <div class="pokemon">
                <div class="pokemonContent margin ${pokemon.type}">
                    <div class="head">
                        <a href="index.html">
                            <span class="material-symbols-outlined">
                                keyboard_backspace
                            </span>
                        </a>
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                    </div>
                    <h1 class="name">${pokemon.name}</h1>
                    <div class="number">
                        <span>#${pokemon.number}</span>
                    </div>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <div class="image">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="pokemonData margin">
                    <h2>About</h2>
                    <div class="data">
                        <span class="label">Species</span>
                        <span class="value">Seed</span>
                        <span class="label">Height</span>
                        <span class="value">${pokemon.height} cm</span>
                        <span class="label">Weight</span>
                        <span class="value">${pokemon.weight} kg</span>
                        <span class="label">Abilities</span>
                        <span class="value">${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</span>
                    </div>
                </div>
            </div>
        `
    }) 
}
//Carrega os dados do Pokemon
loadPokemonData();