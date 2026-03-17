# 📚 Lección 4 — Pruebas en Vue

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección serás capaz de:
- Diferenciar pruebas unitarias de pruebas E2E
- Configurar Jest y Vue Test Utils
- Crear mocks, stubs y pruebas de componentes
- Escribir pruebas E2E con Cypress
- Automatizar flujos de usuario e integrar en CI/CD

---

## I. Fundamentos y Herramientas de Pruebas Unitarias

### a. Tipos de pruebas y su importancia

| Tipo | Qué prueba | Velocidad | Ejemplo |
|------|-----------|-----------|---------|
| **Unitaria** | Una función o componente aislado | Muy rápida (ms) | `ProductCard` renderiza bien |
| **Integración** | Interacción entre módulos | Media (s) | Store + componente |
| **E2E** | Flujo completo del usuario | Lenta (min) | Login → Ver productos → Filtrar |

### b. Configuración de Jest y Vue Test Utils

```bash
# Para proyectos Vue 3 con Vite (recomendado: Vitest)
npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue

# O con Jest clásico
npm install -D jest @vue/test-utils jest-environment-jsdom babel-jest @babel/core @babel/preset-env
```

```javascript
// vite.config.js (con Vitest)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
})
```

---

## II. Mocks, Stubs y Pruebas de Componentes

### a. Pruebas unitarias básicas

```javascript
// tests/unit/ProductCard.test.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductCard from '@/components/products/ProductCard.vue'

const productoMock = {
  id: 1,
  title: 'Laptop Gaming Pro',
  price: 1299.99,
  category: 'electronics',
  image: 'https://via.placeholder.com/200'
}

describe('ProductCard', () => {
  it('renderiza el nombre del producto correctamente', () => {
    const wrapper = mount(ProductCard, {
      props: { producto: productoMock }
    })
    expect(wrapper.text()).toContain('Laptop Gaming Pro')
  })

  it('renderiza el precio con formato correcto', () => {
    const wrapper = mount(ProductCard, {
      props: { producto: productoMock }
    })
    expect(wrapper.text()).toContain('1299.99')
  })

  it('emite el evento "agregar" al hacer click', async () => {
    const wrapper = mount(ProductCard, {
      props: { producto: productoMock }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('agregar')).toBeTruthy()
    expect(wrapper.emitted('agregar')[0]).toEqual([productoMock])
  })

  it('muestra la imagen del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { producto: productoMock }
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(productoMock.image)
    expect(img.attributes('alt')).toBe(productoMock.title)
  })
})
```

### b. Simulación de dependencias y errores de API

```javascript
// tests/unit/HomeView.test.js
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import * as productosService from '@/services/productosService'

describe('HomeView - manejo de errores', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra mensaje de error cuando la API falla', async () => {
    // Mock que simula un error de red
    vi.spyOn(productosService.productosService, 'getAll')
      .mockRejectedValue(new Error('Network Error'))

    const wrapper = mount(HomeView)
    await flushPromises() // Esperar a que se resuelvan las promesas

    expect(wrapper.text()).toContain('Error al cargar')
  })

  it('muestra spinner mientras carga', () => {
    vi.spyOn(productosService.productosService, 'getAll')
      .mockReturnValue(new Promise(() => {})) // Promesa que nunca resuelve

    const wrapper = mount(HomeView)
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })

  it('muestra los productos cuando la API responde correctamente', async () => {
    vi.spyOn(productosService.productosService, 'getAll')
      .mockResolvedValue([
        { id: 1, title: 'Producto Test', price: 10, category: 'test', image: '' }
      ])

    const wrapper = mount(HomeView)
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-card]').length).toBe(1)
  })
})
```

---

## III. Fundamentos y Herramientas de Pruebas E2E

### a. ¿Qué son las pruebas E2E?

Las pruebas **End-to-End** simulan el comportamiento real de un usuario en el navegador. A diferencia de las unitarias, prueban el sistema completo (frontend + backend).

| Aspecto | Unitarias | E2E |
|---------|-----------|-----|
| Velocidad | Milisegundos | Segundos/minutos |
| Aislamiento | Componente solo | Sistema completo |
| Confianza | Media | Alta |
| Mantenimiento | Fácil | Más complejo |

### b. Configuración de Cypress

```bash
npm install -D cypress
npx cypress open
```

Estructura de Cypress:
```
cypress/
├── e2e/             ← Archivos de prueba
├── fixtures/        ← Datos de prueba (JSON)
├── support/
│   ├── commands.js  ← Comandos personalizados
│   └── e2e.js
└── cypress.config.js
```

```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720
  }
})
```

---

## IV. Automatización de Flujos con Cypress

### a. Selectores recomendados

```javascript
// ✅ Usar data-cy para selectores de prueba (no se rompen con cambios de CSS)
cy.get('[data-cy=filtro-categoria]')
cy.get('[data-cy=product-card]')
cy.get('[data-cy=btn-agregar]')

// En los componentes Vue:
// <select data-cy="filtro-categoria">
// <div data-cy="product-card">
```

### b. Prueba E2E: Filtrar productos

```javascript
// cypress/e2e/catalogo.cy.js
describe('Catálogo de Productos', () => {
  beforeEach(() => {
    // Interceptar la API para no depender de internet
    cy.intercept('GET', '**/products', { fixture: 'productos.json' }).as('getProductos')
    cy.intercept('GET', '**/products/categories', { fixture: 'categorias.json' }).as('getCategorias')
    cy.visit('/')
  })

  it('muestra el título de la aplicación', () => {
    cy.contains('Vue Product Showcase').should('be.visible')
  })

  it('carga y muestra los productos', () => {
    cy.wait('@getProductos')
    cy.get('[data-cy=product-card]').should('have.length.greaterThan', 0)
  })

  it('filtra productos por categoría', () => {
    cy.wait('@getCategorias')
    cy.get('[data-cy=filtro-categoria]').select('electronics')
    cy.get('[data-cy=product-card]').should('exist')
  })

  it('muestra el spinner durante la carga', () => {
    cy.intercept('GET', '**/products', (req) => {
      req.reply({ delay: 500, fixture: 'productos.json' })
    })
    cy.visit('/')
    cy.get('.spinner').should('be.visible')
    cy.get('.spinner').should('not.exist')
  })
})
```

---

# 🛠️ Guía ABP — Lección 4: Pruebas en Vue

## 🎯 Objetivo
Asegurar la calidad de los componentes y flujos clave del proyecto.

---

## Paso 1: Preparar fixtures para Cypress

```json
// cypress/fixtures/productos.json
[
  {
    "id": 1,
    "title": "Laptop Gaming Pro",
    "price": 1299.99,
    "category": "electronics",
    "image": "https://via.placeholder.com/200",
    "description": "Laptop de alta gama para gaming"
  },
  {
    "id": 2,
    "title": "Camiseta Casual",
    "price": 29.99,
    "category": "men's clothing",
    "image": "https://via.placeholder.com/200",
    "description": "Camiseta cómoda de algodón"
  }
]
```

```json
// cypress/fixtures/categorias.json
["electronics", "jewelery", "men's clothing", "women's clothing"]
```

---

## Paso 2: Agregar atributos `data-cy` a los componentes

En `ProductCard.vue`:
```html
<div class="product-card" data-cy="product-card">
  ...
  <button data-cy="btn-agregar" @click="$emit('agregar', producto)">
    Agregar al carrito
  </button>
</div>
```

En `HomeView.vue`:
```html
<select data-cy="filtro-categoria" v-model="...">
```

---

## Paso 3: Escribir las 2 pruebas unitarias requeridas

```javascript
// tests/unit/ProductCard.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductCard from '@/components/products/ProductCard.vue'

const mockProducto = {
  id: 1,
  title: 'Laptop Gaming',
  price: 999,
  category: 'electronics',
  image: 'test.jpg'
}

// ✅ PRUEBA 1: Render correcto de ProductCard
describe('ProductCard - Render', () => {
  it('muestra nombre, precio y categoría del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { producto: mockProducto }
    })
    expect(wrapper.text()).toContain('Laptop Gaming')
    expect(wrapper.text()).toContain('999')
    expect(wrapper.text()).toContain('electronics')
  })
})

// ✅ PRUEBA 2: Respuesta visual ante error de API
describe('HomeView - Error de API', () => {
  it('muestra mensaje de error cuando falla la carga', async () => {
    // Esta prueba se implementa en el archivo HomeView.spec.js
    // Ver instrucciones en el Paso 4
  })
})
```

---

## Paso 4: Prueba de error de API

```javascript
// tests/unit/HomeView.spec.js
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HomeView from '@/views/HomeView.vue'

// Mock del módulo de servicios
vi.mock('@/services/productosService', () => ({
  productosService: {
    getAll: vi.fn().mockRejectedValue(new Error('Error de red')),
    getCategorias: vi.fn().mockRejectedValue(new Error('Error de red'))
  }
}))

describe('HomeView - Manejo de error', () => {
  it('muestra mensaje de error cuando la API falla', async () => {
    const wrapper = mount(HomeView)
    await flushPromises()

    const errorEl = wrapper.find('.estado-error')
    expect(errorEl.exists()).toBe(true)
    expect(wrapper.text()).toContain('Error')
  })
})
```

---

## Paso 5: Prueba E2E con Cypress

```javascript
// cypress/e2e/filtrar_productos.cy.js
describe('Flujo: Usuario filtra productos', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products', { fixture: 'productos.json' }).as('prods')
    cy.intercept('GET', '**/products/categories', { fixture: 'categorias.json' }).as('cats')
    cy.visit('/')
    cy.wait(['@prods', '@cats'])
  })

  it('el usuario puede filtrar y ver resultados por categoría', () => {
    // Verificar que hay productos
    cy.get('[data-cy=product-card]').should('have.length', 2)

    // Filtrar por electronics
    cy.get('[data-cy=filtro-categoria]').select('electronics')

    // Solo debería verse 1 producto
    cy.get('[data-cy=product-card]').should('have.length', 1)
    cy.get('[data-cy=product-card]').first().contains('Laptop Gaming Pro')
  })
})
```

---

## Paso 6: Ejecutar todas las pruebas

```bash
# Pruebas unitarias
npm run test:unit

# Con cobertura
npm run test:unit -- --coverage

# E2E (requiere que el servidor esté corriendo)
npm run dev &
npx cypress run
```

---

## ✅ Verificación

- [ ] 2 pruebas unitarias pasan (ProductCard render + error API)
- [ ] 1 prueba E2E pasa (filtrar productos)
- [ ] Capturas o logs de pruebas exitosas disponibles
- [ ] Atributos `data-cy` en los componentes correctos

---

## 📤 Entrega

```bash
# Incluir evidencias de pruebas en tu carpeta
git add alumnos/tu-nombre-apellido/leccion4/
git commit -m "Agrega lección 4 con pruebas unitarias y E2E - tu-nombre-apellido"
git push origin tu-nombre-apellido
```

---

## 🏆 Criterios de Evaluación L4

| Criterio | Peso |
|---------|------|
| 2 pruebas unitarias escritas y pasando | 35% |
| 1 prueba E2E escrita y pasando | 35% |
| Uso correcto de mocks/stubs | 15% |
| Evidencias de ejecución (capturas/logs) | 15% |
