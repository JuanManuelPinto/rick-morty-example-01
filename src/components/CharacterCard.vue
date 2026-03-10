<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["character"]);
const router = useRouter();
const firstEpisodeName = ref("Cargando...");

const goToDetails = (id) => {
  router.push({ name: "CharacterDetail", params: { id } });
};

onMounted(async () => {
  if (props.character.episode && props.character.episode.length > 0) {
    try {
      const response = await fetch(props.character.episode[0]);
      const data = await response.json();
      firstEpisodeName.value = data.name;
    } catch (error) {
      firstEpisodeName.value = "Desconocido";
    }
  }
});
</script>

<template>
  <v-card
    class="character-card"
    rounded="lg"
    elevation="4"
    @click="goToDetails(character.id)"
  >
    <div class="d-flex flex-no-wrap fill-height">
      <div class="image-container">
        <v-img
          :src="character.image"
          :alt="character.name"
          cover
          class="character-image"
        ></v-img>
      </div>

      <div class="content-container">
        <div class="header-section mb-auto">
          <h2 class="name">{{ character.name }}</h2>
          <div class="status-species mt-1">
            <span
              class="status-dot"
              :class="character.status.toLowerCase()"
            ></span>
            {{ character.status }} - {{ character.species }}
          </div>
        </div>

        <div class="info-section mb-4">
          <span class="label">Last known location:</span>
          <p class="value mt-1">{{ character.location.name }}</p>
        </div>

        <div class="info-section">
          <span class="label">First seen in:</span>
          <p class="value mt-1">{{ firstEpisodeName }}</p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.character-card {
  background-color: var(--card-bg) !important;
  color: var(--text-white) !important;
  height: 220px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(var(--primary), 0.1);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
  }
}

.image-container {
  width: 220px;
  min-width: 220px;
  height: 100%;
}

.character-image {
  height: 100%;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-width: 0;
  padding: 0.75rem 1rem !important;
}

.name {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--primary);
}

.status-species {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.alive {
    background-color: #55cc44;
  }
  &.dead {
    background-color: #d63d2e;
  }
  &.unknown {
    background-color: #9e9e9e;
  }
}

.info-section {
  display: flex;
  flex-direction: column;

  .label {
    color: var(--text-gray);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .value {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.2;
    color: var(--text-white);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (max-width: 600px) {
  .character-card {
    height: auto;
  }
  .image-container {
    width: 140px;
    min-width: 140px;
  }
  .name {
    font-size: 1.2rem;
  }
}
</style>
