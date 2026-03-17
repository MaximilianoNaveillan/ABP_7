# 📚 Lección 3 — Almacenamiento de Estado en Vuex

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección serás capaz de:
- Entender la arquitectura de Vuex y cuándo usarlo
- Configurar un store con módulos namespaced
- Mover el consumo de API a actions de Vuex
- Usar getters para datos computados y filtrados
- Manejar autenticación y persistencia de sesión

---

## I. Conceptos y Estructura de Vuex

### a. ¿Qué es Vuex y cuándo usarlo?

**Vuex** es una librería de gestión de estado centralizado para Vue. Implementa el patrón **Flux** y es ideal cuando:

- Múltiples componentes comparten el mismo estado
- Las acciones de un componente afectan a otros
- El estado es complejo y necesita ser persistido o sincronizado

**Flujo unidireccional de Vuex:**
```
Vue Components → Dispatch Actions → Commit Mutations → Mutate State → Render Components
```

### b. Elementos principales

```javascript
// store/index.js
import { createStore } from 'vuex'

const store = createStore({
  // STATE: fuente única de verdad
  state: {
    productos: [],
    cargando: false
  },

  // GETTERS: datos derivados/computados del state
  getters: {
    totalProductos: (state) => state.productos.length,
    productosPorCategoria: (state) => (categoria) => {
      return state.productos.filter(p => p.category === categoria)
    }
  },

  // MUTATIONS: única forma de modificar el state (síncronas)
  mutations: {
    SET_PRODUCTOS(state, productos) {
      state.productos = productos
    },
    SET_CARGANDO(state, valor) {
      state.cargando = valor
    }
  },

  // ACTIONS: operaciones asíncronas (llaman a mutations)
  actions: {
    async fetchProductos({ commit }) {
      commit('SET_CARGANDO', true)
      try {
        const { data } = await api.get('/products')
        commit('SET_PRODUCTOS', data)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  }
})
```

---

## II. Casos Prácticos de Vuex

### a. Módulos namespaced

Para organizar el store en proyectos grandes:

```javascript
// store/modules/productos.js
export default {
  namespaced: true,
  state: () => ({ lista: [], cargando: false, error: null }),
  getters: {
    filtrados: (state, getters, rootState) => {
      const filtro = rootState.filtros.categoriaActual
      if (filtro === 'todas') return state.lista
      return state.lista.filter(p => p.category === filtro)
    }
  },
  mutations: { /* ... */ },
  actions: { /* ... */ }
}

// Uso en componente
store.dispatch('productos/fetchProductos')
store.getters['productos/filtrados']
```

---

## III. Vuex + Axios: Operaciones Asíncronas

```javascript
// store/modules/productos.js
import api from '@/services/api'

export default {
  namespaced: true,
  state: () => ({
    lista: [],
    cargando: false,
    error: null
  }),
  mutations: {
    SET_LISTA(state, lista) { state.lista = lista },
    SET_CARGANDO(state, val) { state.cargando = val },
    SET_ERROR(state, msg) { state.error = msg }
  },
  actions: {
    async fetchTodos({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      try {
        const { data } = await api.get('/products')
        commit('SET_LISTA', data)
      } catch (e) {
        commit('SET_ERROR', 'Error al cargar productos')
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  },
  getters: {
    total: (state) => state.lista.length
  }
}
```

---

## IV. Autenticación y Persistencia con Vuex

```javascript
// store/modules/auth.js
export default {
  namespaced: true,
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    token: localStorage.getItem('token') || null
  }),
  mutations: {
    SET_AUTH(state, { usuario, token }) {
      state.usuario = usuario
      state.token = token
      localStorage.setItem('usuario', JSON.stringify(usuario))
      localStorage.setItem('token', token)
    },
    LOGOUT(state) {
      state.usuario = null
      state.token = null
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
    }
  },
  getters: {
    estaAutenticado: (state) => !!state.token
  }
}
```

---

# 🛠️ Guía ABP — Lección 3: Estado con Vuex

## 🎯 Objetivo
Centralizar el estado de la aplicación usando Vuex con módulos.

---

## Paso 1: Instalar Vuex

```bash
npm install vuex@next
```

---

## Paso 2: Crear la estructura del store

```
src/store/
├── index.js
└── modules/
    ├── productos.js
    ├── filtros.js
    └── favoritos.js
```

---

## Paso 3: Módulo de productos

```javascript
// src/store/modules/productos.js
import api from '@/services/api'

export default {
  namespaced: true,
  state: () => ({
    lista: [],
    cargando: false,
    error: null,
    categorias: []
  }),
  mutations: {
    SET_LISTA(state, lista) { state.lista = lista },
    SET_CARGANDO(state, val) { state.cargando = val },
    SET_ERROR(state, msg) { state.error = msg },
    SET_CATEGORIAS(state, cats) { state.categorias = cats }
  },
  actions: {
    async fetchProductos({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      try {
        const [{ data: prods }, { data: cats }] = await Promise.all([
          api.get('/products'),
          api.get('/products/categories')
        ])
        commit('SET_LISTA', prods)
        commit('SET_CATEGORIAS', cats)
      } catch (e) {
        commit('SET_ERROR', 'Error al cargar los productos')
      } finally {
        commit('SET_CARGANDO', false)
      }
    }
  },
  getters: {
    filtrados(state, getters, rootState) {
      const cat = rootState.filtros.categoriaActual
      if (cat === 'todas') return state.lista
      return state.lista.filter(p => p.category === cat)
    },
    total: (state) => state.lista.length
  }
}
```

---

## Paso 4: Módulo de filtros

```javascript
// src/store/modules/filtros.js
export default {
  namespaced: true,
  state: () => ({
    categoriaActual: 'todas',
    busqueda: ''
  }),
  mutations: {
    SET_CATEGORIA(state, cat) { state.categoriaActual = cat },
    SET_BUSQUEDA(state, texto) { state.busqueda = texto }
  },
  actions: {
    cambiarCategoria({ commit }, categoria) {
      commit('SET_CATEGORIA', categoria)
    }
  }
}
```

---

## Paso 5: Módulo de favoritos

```javascript
// src/store/modules/favoritos.js
export default {
  namespaced: true,
  state: () => ({
    lista: JSON.parse(localStorage.getItem('favoritos')) || []
  }),
  mutations: {
    TOGGLE(state, producto) {
      const idx = state.lista.findIndex(p => p.id === producto.id)
      if (idx >= 0) {
        state.lista.splice(idx, 1)
      } else {
        state.lista.push(producto)
      }
      localStorage.setItem('favoritos', JSON.stringify(state.lista))
    }
  },
  getters: {
    esFavorito: (state) => (id) => state.lista.some(p => p.id === id),
    total: (state) => state.lista.length
  }
}
```

---

## Paso 6: Store principal

```javascript
// src/store/index.js
import { createStore } from 'vuex'
import productos from './modules/productos'
import filtros from './modules/filtros'
import favoritos from './modules/favoritos'

export default createStore({
  modules: { productos, filtros, favoritos }
})
```

---

## Paso 7: Conectar el store a Vue

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
```

---

## Paso 8: Conectar `HomeView.vue` al store

```vue
<!-- src/views/HomeView.vue -->
<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Leer del store
const cargando = computed(() => store.state.productos.cargando)
const error = computed(() => store.state.productos.error)
const productosFiltrados = computed(() => store.getters['productos/filtrados'])
const categorias = computed(() => store.state.productos.categorias)
const categoriaActual = computed(() => store.state.filtros.categoriaActual)

// Dispatchar acciones
onMounted(() => store.dispatch('productos/fetchProductos'))

function cambiarCategoria(cat) {
  store.dispatch('filtros/cambiarCategoria', cat)
}

function toggleFavorito(producto) {
  store.commit('favoritos/TOGGLE', producto)
}
</script>
```

---

## ✅ Verificación

- [ ] El store tiene 3 módulos (productos, filtros, favoritos)
- [ ] Los productos se cargan desde Vuex actions
- [ ] El filtro actualiza el store y los componentes reaccionan
- [ ] Los favoritos persisten al recargar la página
- [ ] No hay lógica de API en los componentes

---

## 📤 Entrega

```bash
git add alumnos/tu-nombre-apellido/leccion3/
git commit -m "Agrega lección 3 con Vuex - tu-nombre-apellido"
git push origin tu-nombre-apellido
```

---

## 🏆 Criterios de Evaluación L3

| Criterio | Peso |
|---------|------|
| Store configurado con módulos namespaced | 25% |
| API consumida desde Vuex actions | 25% |
| Getters para datos filtrados | 25% |
| Componentes conectados al store | 25% |
