<!-- src/App.vue -->
<script setup>
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
</script>
<template>
  <div class="app-wrapper">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #2c3e50;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
