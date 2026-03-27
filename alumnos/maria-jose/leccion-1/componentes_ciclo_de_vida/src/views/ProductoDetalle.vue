<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const productos = [
  { id: 1, nombre: 'Laptop Pro' },
  { id: 2, nombre: 'Mouse Inalámbrico' },
  { id: 3, nombre: 'Teclado' },
  { id: 4, nombre: 'Monitor' },
];

// route.params.id llega como un String desde la URL -> convertir a número
const producto = computed(() => productos.find((p) => p.id === Number(id)));

/* si producto⬆️ encontrado  es distinto de undefined o null  */

if (!producto.value) {
  router.replace({ name: 'not-found', params: { pathMatch: route.path.split('/').slice(1) } });
}
</script>

<template>
  <div>
    <h1>Producto {{ id }}</h1>
    <p>Detalle cargado desde su propio Chunk JS.</p>
    <router-link to="/">Volver</router-link>
  </div>
</template>