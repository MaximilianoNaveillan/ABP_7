<!-- src/views/HomeView.vue -->
<script setup>
import { ref, computed, onMounted } from "vue";
import ProductList from "../components/products/ProductList.vue";
import { productosService } from "../services/productosService.js";

// Array con todos los prductos que devuelve la api
const productos = ref([]);

// Array con las categorías disponibles para el <select>
const categorias = ref([]);

// categoría actualmente seleccionada. todas = sin filtro activo
const categoriaSeleccionada = ref("todas");

// true mientras esperamos la respuesta de la API
const cargando = ref(false);

// null si no hay error; string con el mensaje de error si algo falló
const error = ref(null);

// Computed
// productosFiltrados se recalcula automaticamente cuando cambian
// productos o categoriaSeleccionada. No hace falta llamar nada manualmente.
const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === "todas") return productos.value;
  return productos.value.filter((item) => item.category === categoriaSeleccionada.value);
});

async function cargarProductos() {
  // Reiniciamos el estado antes de cada petición para que
  // el spinner aparezca y cualquier error anterior desaparezaca.
  cargando.value = true;
  error.value = null;
  try {
    // Promise.all ejecuta ambas peticiones en paralelo
    // Es mas rápido que hacer solicitudes en serie (una despues de otra)
    const [prods, cats] = await Promise.all([
      productosService.getAll(),
      productosService.getCategorias(),
    ]);
    productos.value = prods;
    categorias.value = cats;
  } catch (err) {
    // Si cualquiera de las dos peticiones falla, llegamoa a este bloque 🤔
    error.value = "No se pudieron caragar los productos. Verificar tu conxión";
    console.log("Error al cargar productos", err);
  } finally {
    // finally se ejecuta siempre, haya error o no
    // Así garantizamos que el spinner siempre se oculte
    cargando.value = false;
  }
}

// filtrar() es llamada por @change del <select>
// No necessita hacer nada mas que loggear, por que "productosFiltrados"
// ya reacciona a "categoriaSeleccionada"
function filtrar() {
  console.log("filtrando por", categoriaSeleccionada.value);
}

function onAgregar(producto) {
  alert(`✅ "${producto.title}" agregado al carrito`);
}

onMounted(cargarProductos);
</script>
<template>
  <main class="home">
    <div class="filtrar">
      <select v-model="categoriaSeleccionada" @change="filtrar" data-cy="filtro-categoría">
        <option value="todas">Todas las categorías</option>
        <option v-for="(cat, index) in categorias" :key="index" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <!-- spinner -->
    <div v-if="cargando" class="estado-carga">
      <div class="spinner"></div>
      <p>Cargando productos ...</p>
    </div>
    <ProductList :productos="productos" @agregar="onAgregar" />
  </main>
</template>
