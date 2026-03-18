<script setup>
import { useMansajeStore } from '../stores/mensajeStore';

const store = useMansajeStore();
</script>
<template>
  <div class="container">
    <h3>Componente 3</h3>
    <p>{{ store.mensaje }}</p>
    <button @click="store.cambiarMensaje()">Cambiar mensaje</button>
  </div>
</template>
