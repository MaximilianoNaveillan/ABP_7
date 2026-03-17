# 🛠️ Guía ABP — Lección 1: Componentes y Ciclo de Vida

## 🎯 Objetivo

Iniciar la base del proyecto **Vue Product Showcase** con estructura de componentes reutilizables.

---

## Paso 1: Crear el proyecto con Vue CLI

```bash
npm create vue@latest vue-product-showcase
```

Seleccionar las siguientes opciones cuando se presenten:

- ✅ Add TypeScript? → **No**
- ✅ Add JSX Support? → **No**
- ✅ Add Vue Router? → **Yes**
- ✅ Add Pinia? → **Yes**
- ✅ Add Vitest? → **Yes**
- ✅ Add E2E Testing? → **Cypress**
- ✅ Add ESLint? → **Yes**

```bash
cd vue-product-showcase
npm install
npm run dev
```

---

## Paso 2: Limpiar el proyecto base

Eliminar los archivos de ejemplo que Vue genera por defecto:

```
src/
├── assets/           ← Borrar contenido, dejar la carpeta
├── components/       ← Borrar HelloWorld.vue y TheWelcome.vue
├── views/            ← Borrar HomeView.vue y AboutView.vue
└── App.vue           ← Reemplazar contenido
```

---

## Paso 3: Crear la estructura de componentes

Crear la siguiente estructura dentro de `src/`:

```
src/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   └── products/
│       ├── ProductCard.vue
│       └── ProductList.vue
├── views/
│   └── HomeView.vue
└── App.vue
```

---

## Paso 4: Crear el componente `AppHeader.vue`

```vue
<script setup>
// Sin lógica por ahora
</script>

<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="container">
      <h1>🛍️ Vue Product Showcase</h1>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
```

---

## Paso 5: Crear el componente `AppFooter.vue`

```vue
<!-- src/components/layout/AppFooter.vue -->
<script setup>
const año = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <p>© {{ año }} Vue Product Showcase — Bootcamp Módulo 7</p>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #2c3e50;
  color: #ccc;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
```

---

## Paso 6: Crear el componente `ProductCard.vue`

> 🔑 Este es el componente más importante de la lección.

```vue
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
const emit = defineEmits(['agregar']);
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
```

---

## Paso 7: Crear el componente `ProductList.vue`

```vue
<!-- src/components/products/ProductList.vue -->
<script setup>
import { onMounted } from 'vue';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  productos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['agregar']);

// 🔑 Ciclo de vida: mounted
onMounted(() => {
  console.log('ProductList montado. Total productos:', props.productos.length);
});

function manejarAgregar(producto) {
  emit('agregar', producto);
}
</script>

<template>
  <section class="product-list">
    <div class="grid">
      <ProductCard
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        @agregar="manejarAgregar"
      />
    </div>
  </section>
</template>

<style scoped>
.product-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>
```

---

## Paso 8: Crear la vista `HomeView.vue`

```vue
<!-- src/views/HomeView.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductList from '../components/products/ProductList.vue';

// 🔑 Datos de ejemplo (temporales, se reemplazarán en Lección 2)
const productosEjemplo = ref([
  {
    id: 1,
    title: 'Laptop Gaming Pro',
    price: 1299.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
  },
  {
    id: 2,
    title: 'Auriculares Inalámbricos',
    price: 89.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
  },
  {
    id: 3,
    title: 'Smartwatch Sport',
    price: 199.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg',
  },
]);

// 🔑 Uso de ciclos de vida
onMounted(() => {
  console.log('HomeView montado — inicializando datos de ejemplo');
});

onUnmounted(() => {
  console.log('HomeView desmontado');
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
```

---

## Paso 9: Actualizar `App.vue`

```vue
<!-- src/App.vue -->
<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
</script>
<template>
  <div class="app-wrapper">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #2c3e50;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
```

---

## Paso 10: Actualizar el Router

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
  ],
});

export default router;
```

---

## ✅ Verificación

Ejecuta el proyecto y verifica que:

- [ ] El header y footer se muestran correctamente
- [ ] Las tarjetas de productos se renderizan con datos de ejemplo
- [ ] Al hacer click en "Agregar al carrito" se muestra la alerta
- [ ] En consola se ven los mensajes del ciclo de vida (`onMounted`)

```bash
npm run dev
```

---

## 📤 Entrega

Sube tu carpeta al repositorio dentro de `alumnos/tu-nombre-apellido/leccion1/`:

```bash
git add alumnos/tu-nombre-apellido/leccion1/
git commit -m "Agrega lección 1 - tu-nombre-apellido"
git push origin tu-nombre-apellido
```

---

## 🏆 Criterios de Evaluación L1

| Criterio                                                | Peso |
| ------------------------------------------------------- | ---- |
| Estructura correcta del proyecto                        | 20%  |
| Componente `ProductCard` funcional con props y emits    | 30%  |
| Uso de al menos un ciclo de vida                        | 20%  |
| Componentes `Header`, `Footer`, `ProductList` presentes | 20%  |
| Código limpio y comentado                               | 10%  |
