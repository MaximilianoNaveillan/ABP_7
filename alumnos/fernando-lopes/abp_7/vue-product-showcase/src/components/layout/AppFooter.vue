<!-- src/components/layout/AppFooter.vue -->
<script setup>
const año = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <p>© {{ año }} Vue Product Showcase — Bootcamp Módulo 7</p>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #2c3e50;
  color: #ccc;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
