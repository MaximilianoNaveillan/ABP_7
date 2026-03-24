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
const producto = computed(() => productos.find((item) => item.id == id));
// ej: id= 2 --> retorna {id:2,nombre:"Mouse Inalámbrico"} --> se guarda en memoria --< se puede usar en <template>{{ producto }}</template>

/* si producto⬆️ encontrado  es distinto de undefined o null  */

if (!producto.value) {
  router.replace({ name: 'not-found', params: { pathMatch: route.path.split('/').slice(1) } });
}
</script>

<template>
  <div v-if="producto" style="border: 1px solid green; margin: 2rem; padding: 2rem">
    <h1>Producto: {{ producto.nombre }}</h1>
    <p>id de producto: {{ producto.id }}</p>

    <p>Detalle cargado desde su propio Chunk JS.</p>
    <router-link to="/">Volver</router-link>
  </div>
</template>
