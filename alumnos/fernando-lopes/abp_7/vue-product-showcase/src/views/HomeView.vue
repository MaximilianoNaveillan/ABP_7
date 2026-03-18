<!-- src/views/HomeView.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ProductList from "../components/products/ProductList.vue";

// 🔑 Datos de ejemplo (temporales, se reemplazarán en Lección 2)
const productosEjemplo = ref([
  {
    id: 1,
    title: "Laptop Gaming Pro",
    price: 1299.99,
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  },
  {
    id: 2,
    title: "Auriculares Inalámbricos",
    price: 89.99,
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },
  {
    id: 3,
    title: "Smartwatch Sport",
    price: 199.99,
    category: "electronics",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg",
  },
]);

// 🔑 Uso de ciclos de vida
onMounted(() => {
  console.log("HomeView montado — inicializando datos de ejemplo");
});

onUnmounted(() => {
  console.log("HomeView desmontado");
});

function onAgregar(producto) {
  alert(`✅ "${producto.title}" agregado al carrito`);
}
</script>
<template>
  <main>
    <ProductList :productos="productosEjemplo" @agregar="onAgregar" />
  </main>
</template>
