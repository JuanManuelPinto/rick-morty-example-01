<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const character = ref(null);
const loading = ref(true);
const firstEpisodeName = ref("Cargando...");

onMounted(async () => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${route.params.id}`,
    );
    character.value = await response.json();

    if (character.value.episode && character.value.episode.length > 0) {
      const epResponse = await fetch(character.value.episode[0]);
      const epData = await epResponse.json();
      firstEpisodeName.value = epData.name;
    }
  } catch (error) {
    console.error("Error fetching character details:", error);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <v-container class="py-10">
    <v-btn
      variant="text"
      color="primary"
      class="mb-6 back-btn text-none px-2"
      @click="goBack"
    >
      <ChevronLeft class="mr-1 btn-volver" :size="20" />
      Volver al listado
    </v-btn>

    <div
      v-if="loading"
      class="d-flex justify-center align-center"
      style="min-height: 400px"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </div>

    <v-row v-else-if="character" justify="center">
      <v-col cols="12" lg="10">
        <v-card rounded="xl" elevation="12" class="detail-card overflow-hidden">
          <div class="d-flex flex-column flex-md-row">
            <div class="image-container">
              <v-img
                :src="character.image"
                :alt="character.name"
                cover
                class="detail-image"
              ></v-img>
            </div>

            <div class="content-container pa-8 pa-md-10">
              <div class="header-section">
                <h1 class="name">{{ character.name }}</h1>
                <div class="status-species mt-2">
                  <span
                    class="status-dot"
                    :class="character.status.toLowerCase()"
                  ></span>
                  {{ character.status }} - {{ character.species }}
                </div>
              </div>

              <div class="info-grid mt-8">
                <div class="info-section mb-6">
                  <span class="label">Gender:</span>
                  <p class="value mt-1">{{ character.gender }}</p>
                </div>

                <div class="info-section mb-6">
                  <span class="label">Origin:</span>
                  <p class="value mt-1">{{ character.origin.name }}</p>
                </div>

                <div class="info-section mb-6">
                  <span class="label">Last known location:</span>
                  <p class="value mt-1">{{ character.location.name }}</p>
                </div>

                <div class="info-section mb-6">
                  <span class="label">First seen in:</span>
                  <p class="value mt-1">{{ firstEpisodeName }}</p>
                </div>

                <div class="info-section">
                  <span class="label">Total appearances:</span>
                  <p class="value mt-1">
                    {{ character.episode.length }} episodes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="text-center py-10">
      <p class="text-h5 text-error">No se encontró el personaje.</p>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.detail-card {
  background-color: var(--card-bg) !important;
  color: var(--text-white) !important;
  border: 1px solid rgba(var(--primary), 0.2);
  transition: transform 0.3s ease;
}

.back-btn {
  font-weight: 700;
  letter-spacing: 0.5px;
  opacity: 0.8;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateX(-4px);
  }
}

.image-container {
  width: 400px;
  min-width: 400px;

  @media (max-width: 960px) {
    width: 100%;
    max-width: 100%;
    min-height: 400px;
  }
}

.detail-image {
  height: 100%;
}

.content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.name {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: var(--primary);
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
}

.status-species {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-white);
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.alive {
    background-color: #55cc44;
    box-shadow: 0 0 10px rgba(85, 204, 68, 0.5);
  }
  &.dead {
    background-color: #d63d2e;
    box-shadow: 0 0 10px rgba(214, 61, 46, 0.5);
  }
  &.unknown {
    background-color: #9e9e9e;
  }
}

.btn-volver {
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-section {
  .label {
    color: var(--text-gray);
    font-size: 1rem;
    font-weight: 600;
    text-transform: none;
    display: block;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-white);
    margin: 0;
    line-height: 1.2;
  }
}
</style>
