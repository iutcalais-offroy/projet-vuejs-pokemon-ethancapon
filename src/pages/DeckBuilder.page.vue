<template>
  <div class="pokemon-list">
    <h2>Liste des Pokémon</h2>
    <input type="text" v-model="searchQuery" placeholder="Rechercher un Pokémon..." class="search-input" />
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error" class="cards">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="card">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-image" />
        <h3 class="card-title">{{ pokemon.name }}</h3>
        <p class="card-info">PV: {{ pokemon.lifePoints }}</p>
        <p class="card-info">
          Type: <span :class="`type-${pokemon.type.name.toLowerCase()}`">{{ pokemon.type.name }}</span>
        </p>
        <p class="card-info">Taille: {{ pokemon.height }} m</p>
        <p class="card-info">Poids: {{ pokemon.weight }} kg</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { fetchPokemonCards } from '../services/apiService';

interface PokemonType {
  id: number;
  name: string;
}

interface Pokemon {
  id: number;
  name: string;
  pokedexId: number;
  type: PokemonType;
  imageUrl: string;
  lifePoints: number;
  attackId: number;
  height: number;
  weight: number;
}

const pokemons = ref<Pokemon[]>([]);
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');

const fetchPokemons = async () => {
  try {
    const results: Pokemon[] = await fetchPokemonCards();
    const pokemonDetails = results.map((pokemon: Pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      pokedexId: pokemon.pokedexId,
      type: pokemon.type,
      imageUrl: pokemon.imageUrl,
      lifePoints: pokemon.lifePoints,
      attackId: pokemon.attackId,
      height: pokemon.height,
      weight: pokemon.weight,
    }));
    pokemons.value = pokemonDetails;
  } catch (err) {
    error.value = 'Erreur lors du chargement des Pokémon.';
  } finally {
    loading.value = false;
  }
};

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchPokemons();
});
</script>

<style scoped>
.pokemon-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.loading, .error {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #dc3545;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  min-width: 1200px; /* Ajout d'une largeur minimale */
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 220px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.card-title {
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: #333;
}

.card-info {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
}

.card-info span {
  font-weight: bold;
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.type-fire {
  background-color: #f08030;
}

.type-water {
  background-color: #6890f0;
}

.type-grass {
  background-color: #78c850;
}

.type-electric {
  background-color: #f8d030;
}

.type-bug {
  background-color: #a8b820;
}

.type-normal {
  background-color: #a8a878;
}

.type-poison {
  background-color: #a040a0;
}

.type-ground {
  background-color: #e0c068;
}
</style>