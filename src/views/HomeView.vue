<script setup>
import { ref, onMounted } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";

const characters = ref([]);

onMounted(async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  characters.value = data.results;
});
</script>

<template>
  <v-container class="home-view">
    <h1 class="title">Rick and Morty Characters</h1>
    <v-row>
      <v-col 
        v-for="character in characters" 
        :key="character.id"
        cols="12"    
        md="6"       
      >
        <CharacterCard :character="character" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.home-view {
  padding: 1rem 0;

  .title {
    text-align: center;
    font-size: 3rem;
    color: $primary;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .home-view .title {
    font-size: 2rem;
  }
}
</style>
