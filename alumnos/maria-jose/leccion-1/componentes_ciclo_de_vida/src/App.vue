<script setup>
import ComponenteUno from './components/ComponenteUno.vue';
import MyLayout from './components/layouts/MyLayout.vue';

</script>

<template>
<MyLayout>
  <template #header><h1>My App</h1></template>
  <ComponenteUno />
  <template #footer>@2026</template>
</MyLayout>
</template>

<style scoped></style>