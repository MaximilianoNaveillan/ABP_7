<script setup>
import { onMounted } from 'vue';

const props = defineProps({ id: String });

onMounted(() => console.log('productoDetalle montado, id:', props.id));
</script>

<template>
  <div>
    <h1>Producto {{ id }}</h1>
    <p>Detalle cargado desde su propio Chunk JS.</p>
  </div>
</template>
