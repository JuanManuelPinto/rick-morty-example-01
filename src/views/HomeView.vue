<script setup>
import { ref, onMounted, watch } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";

const characters = ref([]);
const loading = ref(true);
const page = ref(1);
const totalPages = ref(0);

const fetchCharacters = async (pageNumber) => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}`,
    );
    const data = await response.json();
    characters.value = data.results;
    totalPages.value = data.info.pages;

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error cargando personajes:", error);
  } finally {
    loading.value = false;
  }
};

// Carga inicial
onMounted(() => fetchCharacters(page.value));

watch(page, (newPage) => {
  fetchCharacters(newPage);
});
</script>

<template>
  <v-container class="home-view">
    <h1 class="title">Rick and Morty Characters</h1>

    <v-row v-if="loading" justify="center" class="my-10">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        md="6"
      >
        <CharacterCard :character="character" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10 mb-5">
      <v-col cols="12" md="8" lg="6">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          rounded="circle"
          color="primary"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          class="custom-pagination"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.home-view {
  padding: 2rem 0;

  .title {
    text-align: center;
    font-size: 3rem;
    color: var(--v-theme-primary);
    margin-bottom: 3rem;
    text-transform: uppercase;
    font-weight: 900;
  }
}

.custom-pagination {
  :deep(.v-pagination__item--active) {
    box-shadow: 0 4px 15px rgba(var(--v-theme-primary), 0.4);
  }
}

@media (max-width: 600px) {
  .home-view .title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
}
</style>
