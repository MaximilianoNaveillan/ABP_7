<script setup>
// Sin lógica por ahora
</script>

<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="container">
      <h1>🛍️ Vue Product Showcase</h1>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
