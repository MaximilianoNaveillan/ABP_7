# 📚 Lección 5 — Librerías y Frameworks Complementarios

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección serás capaz de:
- Comparar librerías UI para Vue y elegir la adecuada para cada proyecto
- Integrar Vuetify o Element Plus en tu aplicación
- Entender qué es Nuxt.js y Quasar y cuándo usarlos
- Aplicar diseño responsive y tema claro/oscuro
- Seguir buenas prácticas de integración de frameworks

---

## I. Librerías UI para Vue

### a. Comparativo de librerías

| Librería | Diseño | Vue 3 | Tamaño | Ideal para |
|---------|--------|-------|--------|-----------|
| **Vuetify 3** | Material Design | ✅ | Grande | Apps corporativas, dashboards |
| **Element Plus** | Flat/Clean | ✅ | Mediano | Paneles admin, B2B |
| **Quasar** | Material-like | ✅ | Grande | Apps multiplataforma |
| **Naive UI** | Minimalista | ✅ | Pequeño | Apps modernas |
| **PrimeVue** | Flexible | ✅ | Mediano | Apps empresariales |

### b. Vuetify 3 — Instalación y uso

```bash
npm install vuetify@^3
npm install @mdi/font  # Íconos
```

```javascript
// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#42b883',
          secondary: '#2c3e50',
          error: '#e74c3c'
        }
      },
      dark: {
        colors: {
          primary: '#42b883',
          secondary: '#ecf0f1'
        }
      }
    }
  }
})

// main.js
import vuetify from './plugins/vuetify'
app.use(vuetify)
```

```vue
<!-- Ejemplo de ProductCard con Vuetify -->
<template>
  <v-card class="product-card" elevation="2" rounded="lg">
    <v-img :src="producto.image" height="200" cover />
    <v-card-title class="text-subtitle-1">{{ producto.title }}</v-card-title>
    <v-card-subtitle>
      <v-chip color="primary" size="small">{{ producto.category }}</v-chip>
    </v-card-subtitle>
    <v-card-text>
      <span class="text-h6 font-weight-bold">${{ producto.price }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="$emit('agregar', producto)">
        <v-icon left>mdi-cart-plus</v-icon>
        Agregar al carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
```

---

## II. Nuxt.js y Quasar

### a. Nuxt.js — Server-Side Rendering

**Nuxt** extiende Vue con capacidades de SSR (Server-Side Rendering) y generación estática (SSG).

```bash
npx nuxi@latest init mi-proyecto-nuxt
```

**¿Cuándo usar Nuxt?**
- SEO es crítico (e-commerce, blogs, landing pages)
- Necesitas carga inicial rápida
- Quieres generación estática (JAMstack)

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,          // SSR activado
  // o
  ssr: false,         // SPA (como Vue normal)

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: 'https://fakestoreapi.com'
    }
  }
})
```

### b. Quasar Framework — Multiplataforma

**Quasar** permite compilar desde una única base de código para: Web, Mobile (iOS/Android) y Desktop (Electron).

```bash
npm init quasar
```

**¿Cuándo usar Quasar?**
- Necesitas app mobile + web desde el mismo código
- Quieres distribución como app de escritorio
- Proyectos con equipos pequeños y múltiples plataformas objetivo

---

## III. Frameworks Alternativos

| Framework | Tipo | Casos de uso |
|-----------|------|-------------|
| **VitePress** | Documentación estática | Docs de librerías, guías técnicas |
| **VuePress** | Documentación estática | Wikis, documentación de proyectos |
| **Gridsome** | Static Site Generator | Blogs, portafolios con GraphQL |

### Factores para elegir la herramienta correcta

1. **SEO**: ¿Necesitas que Google indexe el contenido? → Nuxt SSR/SSG
2. **Multiplataforma**: ¿App móvil + web? → Quasar
3. **Documentación**: ¿Solo docs? → VitePress
4. **UI rápida**: ¿Panel admin corporativo? → Vuetify + Vue
5. **Rendimiento**: ¿Bundles pequeños? → Naive UI o PrimeVue
6. **Experiencia del equipo**: Elegir lo que el equipo ya conoce siempre suma

---

## IV. Buenas Prácticas y Tendencias

- Importar solo los componentes que uses (tree-shaking)
- Usar variables CSS del theme en lugar de colores hardcodeados
- Documentar por qué se eligió la librería en el README
- Vue 3 Composition API + Vite es el estándar actual del ecosistema
- Pinia reemplaza a Vuex como gestor de estado oficial recomendado

---

# 🛠️ Guía ABP — Lección 5: Librerías y Frameworks Complementarios

## 🎯 Objetivo
Aplicar diseño visual profesional con una librería UI y mejorar la arquitectura del proyecto final.

---

## Paso 1: Instalar Vuetify 3

```bash
npm install vuetify@^3 @mdi/font
```

---

## Paso 2: Configurar Vuetify con tema claro/oscuro

```javascript
// src/plugins/vuetify.js
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: { primary: '#42b883', secondary: '#2c3e50' }
      },
      dark: {
        colors: { primary: '#42b883', secondary: '#ecf0f1' }
      }
    }
  }
})
```

```javascript
// src/main.js
import vuetify from './plugins/vuetify'
app.use(vuetify)
```

---

## Paso 3: Agregar toggle de tema al Header

```vue
<!-- src/components/layout/AppHeader.vue -->
<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title>🛍️ Vue Product Showcase</v-app-bar-title>
    <v-spacer />
    <v-btn icon @click="toggleTema">
      <v-icon>{{ temaOscuro ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const temaOscuro = ref(false)

function toggleTema() {
  temaOscuro.value = !temaOscuro.value
  theme.global.name.value = temaOscuro.value ? 'dark' : 'light'
}
</script>
```

---

## Paso 4: Rediseñar `ProductCard.vue` con Vuetify

```vue
<!-- src/components/products/ProductCard.vue -->
<template>
  <v-card
    class="product-card"
    elevation="2"
    rounded="lg"
    data-cy="product-card"
    hover
  >
    <v-img
      :src="producto.image"
      :alt="producto.title"
      height="200"
      cover
      class="product-image"
    >
      <template #placeholder>
        <v-row align="center" justify="center" class="fill-height">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>

    <v-card-title class="text-subtitle-1 product-title">
      {{ producto.title }}
    </v-card-title>

    <v-card-subtitle>
      <v-chip color="primary" size="small" variant="tonal">
        {{ producto.category }}
      </v-chip>
    </v-card-subtitle>

    <v-card-text>
      <span class="text-h6 font-weight-bold text-primary">
        ${{ producto.price }}
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        block
        variant="elevated"
        data-cy="btn-agregar"
        @click="$emit('agregar', producto)"
        prepend-icon="mdi-cart-plus"
      >
        Agregar al carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  producto: { type: Object, required: true }
})
defineEmits(['agregar'])
</script>

<style scoped>
.product-card { height: 100%; display: flex; flex-direction: column; }
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  min-height: 3rem;
}
</style>
```

---

## Paso 5: Rediseñar `HomeView.vue` con Vuetify

```vue
<!-- src/views/HomeView.vue -->
<template>
  <v-container fluid class="py-6">
    <!-- Filtro -->
    <v-row justify="center" class="mb-4">
      <v-col cols="12" sm="8" md="4">
        <v-select
          v-model="categoriaActual"
          :items="['todas', ...categorias]"
          label="Filtrar por categoría"
          variant="outlined"
          density="comfortable"
          data-cy="filtro-categoria"
          @update:modelValue="cambiarCategoria"
        />
      </v-col>
    </v-row>

    <!-- Cargando -->
    <v-row v-if="cargando" justify="center" class="py-10">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <!-- Error -->
    <v-row v-else-if="error" justify="center">
      <v-col cols="12" sm="8" class="text-center">
        <v-alert type="error" rounded="lg">{{ error }}</v-alert>
        <v-btn color="primary" class="mt-4" @click="fetchProductos">Reintentar</v-btn>
      </v-col>
    </v-row>

    <!-- Sin resultados -->
    <v-row v-else-if="productosFiltrados.length === 0" justify="center">
      <v-col class="text-center py-10">
        <v-icon size="64" color="grey">mdi-package-variant-off</v-icon>
        <p class="text-h6 mt-2 text-grey">No hay productos en esta categoría</p>
      </v-col>
    </v-row>

    <!-- Grilla de productos -->
    <v-row v-else>
      <v-col
        v-for="producto in productosFiltrados"
        :key="producto.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <ProductCard :producto="producto" @agregar="onAgregar" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '../components/products/ProductCard.vue'

const store = useStore()
const cargando = computed(() => store.state.productos.cargando)
const error = computed(() => store.state.productos.error)
const productosFiltrados = computed(() => store.getters['productos/filtrados'])
const categorias = computed(() => store.state.productos.categorias)
const categoriaActual = computed(() => store.state.filtros.categoriaActual)

function fetchProductos() { store.dispatch('productos/fetchProductos') }
function cambiarCategoria(cat) { store.dispatch('filtros/cambiarCategoria', cat) }
function onAgregar(producto) {
  store.commit('favoritos/TOGGLE', producto)
}

onMounted(fetchProductos)
</script>
```

---

## Paso 6: Actualizar `App.vue` para Vuetify

```vue
<!-- src/App.vue -->
<template>
  <v-app>
    <AppHeader />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>
```

---

## Paso 7: Escribir el README final del proyecto

Crea `README.md` dentro de tu carpeta de alumno:

```markdown
# Vue Product Showcase — [Tu Nombre]

## Descripción
SPA de catálogo de productos desarrollada como proyecto integrador del Módulo 7.

## Tecnologías utilizadas
- Vue 3 + Vite
- Vuex (gestión de estado)
- Axios (consumo de API)
- Vuetify 3 (UI library)
- Vitest + Vue Test Utils (pruebas unitarias)
- Cypress (pruebas E2E)

## Instalación

\`\`\`bash
npm install
npm run dev
\`\`\`

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run test:unit` | Pruebas unitarias |
| `npx cypress open` | Pruebas E2E |

## Decisiones técnicas

**¿Por qué Vuetify?**
Se eligió Vuetify 3 por su amplio ecosistema de componentes Material Design,
soporte nativo para Vue 3, y facilidad para implementar tema claro/oscuro.

**¿Por qué Vuex y no Pinia?**
Se usó Vuex para aplicar los contenidos del módulo. En un proyecto nuevo
se recomendaría Pinia por su API más simple.

**API utilizada:** [FakeStore API](https://fakestoreapi.com)

## Capturas

[Agregar capturas del proyecto funcionando]
```

---

## ✅ Verificación Final del Proyecto

- [ ] Vuetify integrado correctamente
- [ ] Todas las tarjetas estilizadas con componentes Vuetify
- [ ] Toggle de tema claro/oscuro funcional
- [ ] Diseño responsive (probar en móvil con DevTools)
- [ ] README.md completo con justificaciones técnicas
- [ ] Todas las pruebas anteriores siguen pasando

---

## 📤 Entrega Final

```bash
git add alumnos/tu-nombre-apellido/
git commit -m "Entrega final M7 - Vue Product Showcase - tu-nombre-apellido"
git push origin tu-nombre-apellido
```

---

## 🏆 Criterios de Evaluación L5

| Criterio | Peso |
|---------|------|
| Librería UI integrada y aplicada | 30% |
| Diseño responsive | 20% |
| Tema claro/oscuro | 20% |
| README con justificaciones | 15% |
| Código limpio y documentado | 15% |

---

## 🏆 Criterios de Evaluación Totales del Módulo

| Lección | Criterio | Peso |
|---------|---------|------|
| L1 | Arquitectura de componentes | 15% |
| L2 | Integración y visualización de datos | 20% |
| L3 | Gestión de estado global | 25% |
| L4 | Cobertura de pruebas | 20% |
| L5 | Uso profesional de librerías UI | 20% |
