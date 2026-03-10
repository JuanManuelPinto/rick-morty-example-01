<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const character = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${route.params.id}`,
    );
    character.value = await response.json();
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
      class="mb-6 px-0 text-none font-weight-bold"
      @click="goBack"
    >
      <ChevronLeft class="mr-2" />
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
      <v-col cols="12" md="10" lg="8">
        <v-card rounded="xl" elevation="10" class="detail-card overflow-hidden">
          <v-row no-gutters>
            <v-col cols="12" md="5">
              <v-img
                :src="character.image"
                :alt="character.name"
                cover
                height="100%"
                class="detail-image"
              >
                <div
                  class="status-overlay"
                  :class="character.status.toLowerCase()"
                >
                  {{ character.status }}
                </div>
              </v-img>
            </v-col>

            <v-col cols="12" md="7">
              <v-card-text class="pa-8 pa-md-12">
                <h1 class="text-h2 font-weight-black text-primary mb-2">
                  {{ character.name }}
                </h1>
                <p class="text-h5 text-grey-darken-1 mb-8">
                  {{ character.species }} • {{ character.gender }}
                </p>

                <v-divider class="mb-8 opacity-10"></v-divider>

                <v-row>
                  <v-col cols="12" sm="6" class="mb-6">
                    <span class="info-label">ESTADO</span>
                    <p class="info-value text-h6">{{ character.status }}</p>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-6">
                    <span class="info-label">ORIGEN</span>
                    <p class="info-value text-h6">
                      {{ character.origin.name }}
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-6">
                    <span class="info-label">UBICACIÓN ACTUAL</span>
                    <p class="info-value text-h6">
                      {{ character.location.name }}
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-6">
                    <span class="info-label">APARICIONES</span>
                    <p class="info-value text-h6">
                      {{ character.episode.length }} Episodios
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
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
  border: 1px solid rgba(var(--primary), 0.1);
}

.detail-image {
  position: relative;
}

.status-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 16px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &.alive {
    border: 2px solid var(--primary);
    color: var(--primary);
  }
  &.dead {
    border: 2px solid #ff4444;
    color: #ff4444;
  }
  &.unknown {
    border: 2px solid #9e9e9e;
    color: #9e9e9e;
  }
}

.info-label {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-gray);
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: 4px;
}

.info-value {
  color: var(--text-white);
  font-weight: 600;
}

.opacity-10 {
  opacity: 0.1;
}
</style>
