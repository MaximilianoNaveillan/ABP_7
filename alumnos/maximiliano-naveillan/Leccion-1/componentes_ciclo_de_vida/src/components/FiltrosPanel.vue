<script setup>
import { ref } from 'vue';

defineOptions({ name: 'FiltrosPanel' });

const soloDisponibles = ref(false);
const precioMax = ref(2500);
</script>

<template>
  <div>
    <h2>Panel de Filtros</h2>
    <label>
      <input type="checkbox" v-model="soloDisponibles" />
      Solo disponibles
    </label>
    <br />
    <label> Precio máximo : ${{ precioMax }}</label>
    <input type="range" v-model="precioMax" min="0" max="5000" step="100" />
    <p style="color: grey; font-size: 12px">
      Estos filtros se preservan al ambiar de tab gracias a Keep-alive.
    </p>
  </div>
</template>
