<script setup>
import ComponenteUno from './components/ComponenteUno.vue';
import MyLayout from './layoaut/MyLayout.vue';
</script>

<template>
  <MyLayout>
    <template #header><h1>Mi App</h1></template>

    <ComponenteUno />

    <template #footer>@ 2026</template>
  </MyLayout>
</template>

<style scoped></style>
