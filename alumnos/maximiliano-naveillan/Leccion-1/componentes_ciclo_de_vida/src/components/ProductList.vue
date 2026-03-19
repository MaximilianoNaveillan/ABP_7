<script setup>
import { ref, computed, onMounted, onActivated, onDeactivated } from 'vue';

/* defineOptions es necesario para que keep-alive reconozaca el nombre del componente
El string "ProductList" debe coincidir exactamente con el :include de Keep-alive*/
defineOptions({ name: 'ProductList' });

const busqueda = ref('');
const contadorMontajes = ref(0);
const contadorActivaciones = ref(0);

const productos = [
  { id: 1, nombre: 'Laptop Pro' },
  { id: 2, nombre: 'Mouse Inalámbrico' },
  { id: 3, nombre: 'Teclado' },
  { id: 4, nombre: 'Monitor' },
];
const productosFiltrados = computed(() =>
  productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
);

// onMounted: solos se llama una vez (primera vez que el componente aparece)
onMounted(() => {
  contadorMontajes.value++;
  console.log('onMounted, ProductList montado - fetch inicial de datos aquí');
});

// onActived: se llama cada vez que el componente "se activa" desde el caché

onActivated(() => {
  contadorActivaciones.value++;
  console.log('onActivated, ProductList activado desde caché - No repetir en fetch');
});

// onDeactive: se llama cuando el componente "se duerme"  en la caché

onDeactivated(() => {
  console.log('onDeactivated, ProductList guardado en caché');
});
</script>

<template>
  <div>
    <h2>Lista de Productos</h2>
    <!--  Este input guarda sus valor aunque cambies de tab y vuelvas -->
    <input v-model="busqueda" placeholder="Buscar Productos..." />

    <ul>
      <li v-for="p in productosFiltrados" :key="p.id">{{ p.nombre }}</li>
    </ul>

    <p style="color: grey; font-size: 12px">
      Montajes {{ contadorMontajes }} | Activaciones: {{ contadorActivaciones }}
    </p>
  </div>
</template>
