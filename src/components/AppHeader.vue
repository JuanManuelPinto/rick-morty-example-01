<script setup>
import { ref, onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  isDark.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
});
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">
        <img src="/logo.svg" alt="Rick and Morty Logo" />
      </router-link>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/table" class="nav-link">Table</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Modo Claro' : 'Modo Oscuro'">
        <Sun v-if="isDark" class="icon" />
        <Moon v-else class="icon" />
      </button>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "../assets/styles/variables" as *;

.app-header {
  background-color: var(--bg-header);
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid $primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  transition: background-color 0.3s ease;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1.5rem 1rem;
  }

  .logo {
    img {
      height: 50px;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.05) rotate(-2deg);
      }
    }
  }
  
  .nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    .nav-link {
      font-size: 1.2rem;
      font-weight: 600;
      color: $text-white;
      transition: $transition;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid transparent;

      &:hover {
        color: $primary;
      }

      &.router-link-active {
        color: $primary;
        border-bottom-color: $primary;
      }
    }

    .theme-toggle {
      background: none;
      border: 2px solid $primary;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition;
      color: $primary;
      
      .icon {
        width: 20px;
        height: 20px;
      }
      
      &:hover {
        background-color: rgba($primary, 0.1);
        transform: rotate(15deg);
      }
    }
  }
}
</style>
