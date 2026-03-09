<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Rick & Morty App</h3>
        <p>Proyecto de ejemplo para practicar Vue 3 y SCSS.</p>
      </div>
      
      <div class="footer-section social">
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener">API Oficial</a>
        <a href="https://github.com/afuh/rick-and-morty-api" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} - Desarrollado con Vue 3 y SCSS - Juan Manuel Pinto</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "../assets/styles/variables" as *;

.app-footer {
  background-color: var(--bg-footer);
  padding: 3rem 2rem 1.5rem;
  margin-top: 4rem;
  border-top: 2px solid $primary;
  transition: background-color 0.3s ease;
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2.5rem;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .footer-section {
      h3 {
        color: $primary;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      p {
        color: $text-gray;
        max-width: 300px;
        line-height: 1.6;
      }

      &.social {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        a {
          color: $text-white;
          font-weight: 500;
          transition: $transition;
          
          &:hover {
            color: $secondary;
            transform: translateX(5px);
          }
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(128, 128, 128, 0.1);
    
    p {
      color: var(--text-gray);
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}
</style>
