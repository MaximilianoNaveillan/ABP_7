<!-- src/views/HomeView.vue -->
<script setup>
import { onMounted, computed } from "vue";
import ProductList from "../components/products/ProductList.vue";

// Importar los stores directamente - sin useStore(),
// Cada Store es una función que se inboca acá
import { useProductStore } from "../stores/productos";
import { useFiltrosStore } from "../stores/filtros";
import { useFavoritosStore } from "../stores/favoritos";

const productosStore = useProductStore();
const filtradosStore = useFiltrosStore();
const favoritosStore = useFavoritosStore();

const cargando = computed(() => productosStore.cargando);
const error = computed(() => productosStore.error);
const categorias = computed(() => productosStore.categorias);
const productosFiltrados = computed(() => productosStore.filtrados);

onMounted(() => productosStore.fetchProductos());

function cambiarCategoria(cat) {
  filtradosStore.cambiarCategoria(cat);
}

function toggleFavorito(producto) {
  favoritosStore.toggle(producto);
}

function onAgregar(producto) {
  alert(`✅ "${producto.title}" agregado al carrito`);
}

/* 
*********** Acceso directo a state y geters ******
productosStore.cargando ya es rectivo: si cambia en el store la vista es actualizada.
Nota: si se destructura el store 
ej:
prosuctosStore = {
    lista: [],
    cargando: false,
    error: null,
    categorias: [],
  }
forma tradicional:  
const lista =  productosStore.lista
const cargando = productosStore.cargando
const error = productosStore.error

forma destructurada de obj.

const {lista, cargando, error,categoria} = productosStore 
*/

/* 
********** Disparar actions ********
onMounted: cargar productos cuando el componente entra al DOM --> 
onMounted(()=> proDuctStore.fetchProductos())

function cambiarCategoria(cat) {
filtradosStore.cambiarCategoria(cat)
}

function toggleFavorito(producto) {
 favoritosStore.toggle(producto)
}

*/
</script>
<!-- 
En el Template, acceder a los store directamente:
 v-if="productosStor.cargando"
 v-else-if="productosStor.error"
 :productos="productosStor.filtrados"...
-->
<template>
  <main class="home">
    <div class="filtrar">
      <select
        :value="filtradosStore.categoriaActual"
        @change="cambiarCategoria($event.target.value)"
        data-cy="filtro-categoria"
      >
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

    <div v-else-if="error" class="estado-error">
      <p>error: {{ error }}</p>
      <button></button>
    </div>
    <ProductList
      :productos="productosFiltrados"
      @agregar="onAgregar"
      @agregarFavorito="toggleFavorito"
    />
  </main>
</template>