<script setup>
import { ref } from 'vue';
import MyLayout from './layout/MyLayout.vue';
import ProductList from './components/ProductList.vue';
import FiltrosPanel from './components/FiltrosPanel.vue';
import DemoAsyncComponent from './components/DemoAsyncComponent.vue';

const tabActual = ref('ProductList');

const tabs = {
  ProductList,
  FiltrosPanel,
};
// console.log(tabs["ProductList"])
</script>

<template>
  <MyLayout>
    <template #header>
      <router-link to="/">Inicio</router-link>
      <router-link to="/producto/2">Producto</router-link>
    </template>

    <hr />
    <h3>Demo keep-alive</h3>

    <!-- Botones para cambiar el tab -->
    <button @click="tabActual = 'ProductList'">Lista de productos</button>
    <button @click="tabActual = 'FiltrosPanel'">filtros</button>

    <keep-alive :include="['ProductList', 'FiltrosPanel']" :max="5">
      <component :is="tabs[tabActual]" />
    </keep-alive>
    <hr />

    <router-view />
    <DemoAsyncComponent />

    <template #footer>@ 2026</template>
  </MyLayout>
</template>

<style scoped></style>
