<script setup>
import { ref } from "vue";

const totalCharacters = ref(826);
const createdBy = ref("Juan Manuel Pinto");
</script>

<template>
  <div class="about-view">
    <div class="about-card">
      <h2 class="title">Sobre este proyecto</h2>
      <p class="description">Proyecto creado con VUE 3 y SCSS.</p>

      <div class="stats">
        <div class="stat-item">
          <span class="number">{{ totalCharacters }}</span>
          <span class="label">Characters</span>
        </div>
        <div class="stat-item">
          <span class="number">1</span>
          <span class="label">API</span>
        </div>
      </div>

      <div class="footer">
        <p>
          Desarrollado por <span class="author">{{ createdBy }}</span>
        </p>
        <a
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noopener"
          class="api-link"
        >
          Rick and Morty API
        </a>
      </div>

      <router-link to="/" class="btn-back"> ← Volver al Inicio </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "../assets/styles/variables" as *;

.about-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;

  .about-card {
    background-color: var(--card-bg);
    padding: 3rem;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    text-align: center;
    box-shadow: 0 10px 30px var(--card-shadow);
    border: 1px solid rgba(151, 206, 76, 0.2);
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;

    @media (max-width: 640px) {
      padding: 2rem 1.5rem;
    }

    .title {
      color: $primary;
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      text-transform: uppercase;

      @media (max-width: 640px) {
        font-size: 1.8rem;
      }
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: $text-white;
      margin-bottom: 2rem;

      @media (max-width: 640px) {
        font-size: 1rem;
      }
    }

    .stats {
      display: flex;
      justify-content: space-around;
      margin: 2.5rem 0;
      padding: 1.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      transition: background-color 0.3s ease;

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 1.5rem;
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .number {
          font-size: 2rem;
          font-weight: 800;
          color: $secondary;

          @media (max-width: 640px) {
            font-size: 1.5rem;
          }
        }

        .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: $text-gray;
        }
      }
    }

    .footer {
      margin-bottom: 2rem;

      .author {
        color: $primary;
        font-weight: bold;
      }

      .api-link {
        display: block;
        margin-top: 0.5rem;
        color: $secondary;
        font-size: 0.9rem;
        transition: $transition;

        &:hover {
          color: $primary;
          text-decoration: underline;
        }
      }
    }

    .btn-back {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background-color: var(--primary);
      color: #202329;
      font-weight: bold;
      border-radius: 30px;
      transition: $transition;

      &:hover {
        transform: scale(1.05);
        background-color: var(--primary-hover);
        box-shadow: 0 0 15px rgba(151, 206, 76, 0.4);
      }
    }
  }
}
</style>
