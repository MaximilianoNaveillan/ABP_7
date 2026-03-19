<!-- src/components/products/ProductCard.vue -->
<script setup>
// Definición de props
const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});

// Definición de emits
const emit = defineEmits(["agregar"]);
</script>

<template>
  <div class="product-card" data-cy="product-card">
    <img :src="producto.image" :alt="producto.title" class="product-image" />
    <div class="product-info">
      <h3 class="product-title">{{ producto.title }}</h3>
      <p class="product-category">{{ producto.category }}</p>
      <p class="product-price">${{ producto.price }}</p>
      <button @click="$emit('agregar', producto)" class="btn-agregar">Agregar al carrito</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background: white;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 1rem;
  background: #f9f9f9;
}
.product-info {
  padding: 1rem;
}
.product-title {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-category {
  color: #42b883;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}
.btn-agregar {
  width: 100%;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-agregar:hover {
  background-color: #35a372;
}
</style>
