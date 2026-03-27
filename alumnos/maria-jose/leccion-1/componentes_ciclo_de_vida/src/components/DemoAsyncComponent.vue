<script setup>
import { ref, defineAsyncComponent } from 'vue';
import Spinner from './Spinner.vue';
import ErrorFallback from './ErrorFallback.vue';

const mostrar = ref(false);
const modo = 'timeout';

const loaders = {
  normal: () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import('../views/ProductoDetalle.vue')), 2000)
    ),
  timeout: () => new Promise(() => {}), //Nunca se resuelve
};

const ProductoDetalleAsync = defineAsyncComponent({
  //loader; la función que importa el componente real --> vite genera un chunck separado para producto Detalle.vue
  loader: loaders[modo],
  // loadingComponent: qué mostrar mientras el chuck se descarga.--> sin esto: la UI queda en blnco durante la descarga
  loadingComponent: Spinner,
  // errorComponent: qué mostrar si el import() falla.
  errorComponent: ErrorFallback,
  // delay (ms): cuándo espera Antes de montar
  delay: 200,
  // timeOut (ms): si después de este tiempo el loader no resolvió
  timeout: 5000,
});
</script>
<template>
  <div>
    <h3>Demo defineAsyncCompontet</h3>
    <!-- boton controla si mostramos el componente pesado. -->
    <button @click="mostrar = !mostrar">
      {{ mostrar ? 'Ocultar' : 'Cargar' }} ProductoDetalle
    </button>
    <div v-if="mostrar">
      <!-- ProductoDetalleAsync se comporta como cualquier componente.
         vue maneja enternamente los estados -->
      <ProductoDetalleAsync :id="99" />
    </div>
  </div>
</template>