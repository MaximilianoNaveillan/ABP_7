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
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    id: 2,
    title: "Auriculares Inalámbricos",
    price: 89.99,
    category: "electronics",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
  },
  {
    id: 3,
    title: "Smartwatch Sport",
    price: 199.99,
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
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
