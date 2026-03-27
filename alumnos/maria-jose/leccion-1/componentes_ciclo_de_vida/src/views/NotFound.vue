<script setup>
import { useRoute } from 'vue-router';

const router = useRoute();
</script>
<template>
    <div><h1>404 - Producto no encontrado</h1>
    <p>
        El producto con id {{ router.params.id }} no existe
    </p>
    <router-link to="/">Volver al Inicio </router-link>
    </div>
</template>