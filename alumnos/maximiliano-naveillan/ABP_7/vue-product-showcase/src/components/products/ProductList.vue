<!-- src/components/products/ProductList.vue -->
<script setup>
import { onMounted } from "vue";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  productos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["agregar"]);

// 🔑 Ciclo de vida: mounted
onMounted(() => {
  console.log("ProductList montado. Total productos:", props.productos.length);
});

function manejarAgregar(producto) {
  emit("agregar", producto);
}
</script>

<template>
  <section class="product-list">
    <div class="grid">
      <ProductCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar="manejarAgregar"
      />
    </div>
  </section>
</template>

<style scoped>
.product-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>
