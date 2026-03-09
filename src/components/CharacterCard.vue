<script setup>
defineProps(['character']);
</script>

<template>
  <div class="character-card">
    <div class="image-wrapper">
      <img :src="character.image" :alt="character.name" loading="lazy" />
    </div>
    <div class="card-content">
      <h3 class="name">{{ character.name }}</h3>
      <div class="status-info">
        <span class="status-dot" :class="character.status.toLowerCase()"></span>
        <span class="status-text">{{ character.status }} - {{ character.species }}</span>
      </div>
      <div class="location-info">
        <p class="label">Last known location:</p>
        <p class="value">{{ character.location.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.character-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px var(--card-shadow);
  }

  .image-wrapper {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &:hover .image-wrapper img {
    transform: scale(1.1);
  }

  .card-content {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .name {
      font-size: 1.5rem;
      font-weight: 800;
      color: $primary;
      margin: 0;
    }

    .status-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $text-gray;

        &.alive { background-color: $primary; }
        &.dead { background-color: #d63d2e; }
        &.unknown { background-color: $text-gray; }
      }

      .status-text {
        font-weight: 500;
        font-size: 1rem;
      }
    }

    .location-info {
      .label {
        color: $text-gray;
        font-size: 0.85rem;
        margin-bottom: 0.25rem;
      }
      .value {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
</style>