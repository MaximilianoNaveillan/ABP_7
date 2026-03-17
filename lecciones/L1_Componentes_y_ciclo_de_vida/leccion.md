# 📚 Lección 1 — Componentes y su Ciclo de Vida en Vue

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección serás capaz de:
- Crear y organizar componentes Vue reutilizables
- Comprender y usar el ciclo de vida de un componente
- Implementar patrones de comunicación entre componentes
- Usar componentes dinámicos y técnicas avanzadas de reutilización
- Escribir pruebas unitarias básicas con Vitest y Vue Test Utils

---

## I. Patrones de Comunicación y Manejo de Estado

### a. Event Bus y Pinia

#### Event Bus (patrón clásico)

El **Event Bus** es un patrón que permite comunicación entre componentes no relacionados usando un objeto Vue como intermediario.

```javascript
// eventBus.js
import mitt from 'mitt'
export const emitter = mitt()

// ComponenteA.vue (emisor)
import { emitter } from './eventBus'
emitter.emit('producto-seleccionado', { id: 1, nombre: 'Laptop' })

// ComponenteB.vue (receptor)
import { emitter } from './eventBus'
onMounted(() => {
  emitter.on('producto-seleccionado', (producto) => {
    console.log('Producto recibido:', producto)
  })
})
```

> ⚠️ **Nota:** En Vue 3, el Event Bus nativo fue eliminado. Se recomienda usar `mitt` o directamente **Pinia**.

#### Pinia (gestión de estado moderna)

**Pinia** es la librería oficial de gestión de estado para Vue 3. Es más simple y flexible que Vuex.

```bash
npm install pinia
```

```javascript
// stores/productos.js
import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', {
  state: () => ({
    lista: [],
    cargando: false
  }),
  getters: {
    totalProductos: (state) => state.lista.length
  },
  actions: {
    async cargarProductos() {
      this.cargando = true
      const res = await fetch('https://fakestoreapi.com/products')
      this.lista = await res.json()
      this.cargando = false
    }
  }
})

// En un componente
import { useProductosStore } from '@/stores/productos'
const store = useProductosStore()
store.cargarProductos()
```

---

### b. Provide / Inject para compartir datos sin Prop Drilling

El **Prop Drilling** ocurre cuando debes pasar datos a través de múltiples niveles de componentes que no los necesitan directamente.

**Sin provide/inject (prop drilling):**
```
App → Layout → Sidebar → UserMenu → Avatar (solo aquí se usa el dato)
```

**Con provide/inject:**

```javascript
// Componente padre (App.vue)
import { provide, ref } from 'vue'

const usuario = ref({ nombre: 'Ana', rol: 'admin' })
provide('usuario', usuario)

// Componente nieto (Avatar.vue) - sin pasar por los intermedios
import { inject } from 'vue'
const usuario = inject('usuario')
```

---

## II. Componentes Dinámicos y Reutilización

### a. Uso de `<component :is="...">` y Slots

#### Componentes Dinámicos

```vue
<template>
  <component :is="componenteActual" />
</template>

<script setup>
import { ref } from 'vue'
import VistaLista from './VistaLista.vue'
import VistaTarjeta from './VistaTarjeta.vue'

const componenteActual = ref(VistaLista)

function cambiarVista(tipo) {
  componenteActual.value = tipo === 'lista' ? VistaLista : VistaTarjeta
}
</script>
```

#### Slots

Los slots permiten que un componente padre inyecte contenido en un componente hijo.

```vue
<!-- ProductCard.vue (hijo) -->
<template>
  <div class="card">
    <slot name="imagen" />        <!-- Slot nombrado -->
    <slot />                       <!-- Slot por defecto -->
    <slot name="acciones">
      <!-- Contenido por defecto si no se provee -->
      <button>Ver más</button>
    </slot>
  </div>
</template>

<!-- App.vue (padre) -->
<ProductCard>
  <template #imagen>
    <img :src="producto.imagen" />
  </template>

  <h2>{{ producto.nombre }}</h2>
  <p>{{ producto.descripcion }}</p>

  <template #acciones>
    <button @click="agregar">Agregar al carrito</button>
  </template>
</ProductCard>
```

---

### b. Lazy Loading, Keep-Alive y Componentes Asíncronos

#### Lazy Loading (carga diferida)

```javascript
// router/index.js
const routes = [
  {
    path: '/productos',
    component: () => import('../views/Productos.vue')  // Se carga solo cuando se navega aquí
  }
]
```

#### Keep-Alive (mantener estado de componentes)

```vue
<template>
  <!-- Mantiene el estado del componente aunque no esté visible -->
  <keep-alive>
    <component :is="tabActual" />
  </keep-alive>
</template>
```

#### Componentes Asíncronos con defineAsyncComponent

```javascript
import { defineAsyncComponent } from 'vue'

const ProductoDetalle = defineAsyncComponent({
  loader: () => import('./ProductoDetalle.vue'),
  loadingComponent: Spinner,    // Componente mientras carga
  errorComponent: Error,        // Componente si falla
  delay: 200,                   // Retraso antes de mostrar loading
  timeout: 3000                 // Tiempo máximo de espera
})
```

---

## III. Pruebas Unitarias con Vitest y Vue Test Utils

### a. Instalación y Configuración

```bash
npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
```

### b. Render, Queries, Assertions y Mocks

```javascript
// tests/ProductCard.test.js
import { mount } from '@vue/test-utils'
import ProductCard from '../src/components/ProductCard.vue'

describe('ProductCard', () => {
  it('renderiza el nombre del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { nombre: 'Laptop Pro', precio: 999 }
    })
    expect(wrapper.text()).toContain('Laptop Pro')
  })

  it('emite evento al hacer click en "Agregar"', async () => {
    const wrapper = mount(ProductCard, {
      props: { nombre: 'Mouse', precio: 25 }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('agregar')).toBeTruthy()
  })
})
```

**Ejecutar pruebas:**
```bash
npx vitest
npx vitest --coverage
```

---

## IV. Pruebas End-to-End con Cypress

### a. Instalación y Selectores

```bash
npm install -D cypress
npx cypress open
```

```javascript
// cypress/e2e/productos.cy.js
describe('Catálogo de Productos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('muestra la lista de productos', () => {
    cy.get('[data-cy=product-card]').should('have.length.greaterThan', 0)
  })

  it('filtra productos por categoría', () => {
    cy.get('[data-cy=filtro-categoria]').select('electronics')
    cy.get('[data-cy=product-card]').each((card) => {
      cy.wrap(card).should('contain', 'electronics')
    })
  })
})
```

### b. Fixtures y Commands

```javascript
// cypress/fixtures/productos.json
[
  { "id": 1, "title": "Laptop", "category": "electronics", "price": 999 }
]

// cypress/support/commands.js
Cypress.Commands.add('cargarProductosMock', () => {
  cy.intercept('GET', '**/products', { fixture: 'productos.json' }).as('getProductos')
})
```

---

## 📖 Recursos Adicionales

- [Vue 3 Docs — Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Test Utils Docs](https://test-utils.vuejs.org/)
- [Vitest Docs](https://vitest.dev/)
- [Cypress Docs](https://docs.cypress.io/)
