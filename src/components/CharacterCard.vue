<script setup>
import { useRouter } from 'vue-router';

defineProps(["character"]);
const router = useRouter();

const goToDetails = (id) => {
  router.push({ name: 'CharacterDetail', params: { id } });
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 16 : 4"
      class="character-card mx-auto"
      rounded="xl"
      :class="{ 'card--hovered': isHovering }"
      @click="goToDetails(character.id)"
    >
      <div class="image-container">
        <v-img
          :src="character.image"
          :alt="character.name"
          cover
          class="character-image"
        >
          <div class="status-badge" :class="character.status.toLowerCase()">
            <span class="status-dot"></span>
            {{ character.status }}
          </div>

          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>

      <div class="content-wrapper">
        <div>
          <v-card-title class="name-title px-0">
            {{ character.name }}
          </v-card-title>

          <v-card-subtitle class="species-subtitle px-0 mt-1">
            {{ character.species }} • {{ character.gender }}
          </v-card-subtitle>

          <div class="info-body mt-4">
            <div class="info-section">
              <span class="info-label">UBICACIÓN ACTUAL</span>
              <p class="info-value">{{ character.location.name }}</p>
            </div>

            <div class="info-section">
              <span class="info-label">ORIGEN</span>
              <p class="info-value">{{ character.origin.name }}</p>
            </div>
          </div>
        </div>

        <v-divider class="mt-4 theme-divider"></v-divider>

        <v-card-actions class="pa-0 mt-2 justify-end">
          <v-btn
            variant="text"
            color="primary"
            class="text-none font-weight-bold"
            density="comfortable"
          >
            Ver Detalles →
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-hover>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.character-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: var(--card-bg) !important;
  color: var(--text-white) !important;
  border: 1px solid rgba(151, 206, 76, 0.1);
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.card--hovered {
    transform: translateY(-8px);
    border-color: rgba(var(--primary), 0.4);
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.6),
      0 0 15px rgba(151, 206, 76, 0.2) !important;

    .character-image {
      transform: scale(1.1);
    }
  }
}

.image-container {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
}

.character-image {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex-grow: 1;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  z-index: 2;

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }

  &.alive .status-dot {
    background-color: var(--primary);
    box-shadow: 0 0 8px var(--primary);
  }
  &.dead .status-dot {
    background-color: #ff4444;
    box-shadow: 0 0 8px #ff4444;
  }
  &.unknown .status-dot {
    background-color: var(--text-gray);
  }
}

.name-title {
  font-size: 1.5rem !important;
  line-height: 1.2 !important;
  font-weight: 900 !important;
  color: var(--primary) !important;
  white-space: normal;
  text-shadow: 0 0 10px rgba(151, 206, 76, 0.15);
}

.species-subtitle {
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  color: var(--secondary) !important;
  letter-spacing: 0.3px;
}

.info-section {
  margin-bottom: 16px;

  .info-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-gray);
    display: block;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
  }

  .info-value {
    font-size: 1.05rem;
    line-height: 1.4;
    font-weight: 500;
    color: var(--text-white);
    margin: 0;
    transition: color 0.3s ease;
  }
}
.theme-divider {
  opacity: 0.1;
  border-color: var(--primary) !important;
}
</style>
