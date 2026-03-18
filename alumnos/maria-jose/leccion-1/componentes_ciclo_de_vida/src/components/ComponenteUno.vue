<script setup>
import ComponenteDos from './ComponenteDos.vue';

defineProps(['mensaje', 'cambiarMensaje']);
</script>
<template>
  <h1>Componente 1</h1>
  <ComponenteDos />
</template>