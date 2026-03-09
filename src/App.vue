<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    
    <main class="container">
      <router-view></router-view>
    </main>
    
    <AppFooter />
  </div>
</template>

<style lang="scss">
@use "sass:color";
@use "./assets/styles/variables" as *;

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  width: 100%;
  padding: 0 1.5rem;
}
</style>