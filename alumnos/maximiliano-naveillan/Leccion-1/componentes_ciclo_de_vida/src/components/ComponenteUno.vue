<script setup>
import ComponenteDos from './ComponenteDos.vue';
</script>
<template>
  <div class="container">
    <h1>Componente 1</h1>
    <ComponenteDos>
      <p>'slot inject'</p>
    </ComponenteDos>
  </div>
</template>

<style>
.container {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}
</style>
