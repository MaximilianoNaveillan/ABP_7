<script setup>
import { useMensajeStore } from '@/stores/mensajeStore';

const store = useMensajeStore();

import { ref } from 'vue';


</script>
<template>
    <h3>Componente 3</h3>
    <p>{{ store.mensaje }}</p>
    <button @click="store.cambiarMensaje">Cambiar Mensaje</button>
</template>
<style></style>