<script setup>
import { onMounted } from 'vue';
onMounted(() => console.log("HomeViews montado"))
</script>
<template>
<div>
    <h1>
        Inicio
    </h1>
    <p>
        Esta vista se cargó como chunk separado
    </p>
    <router-link to="/producto/42"></router-link>
</div>
</template>