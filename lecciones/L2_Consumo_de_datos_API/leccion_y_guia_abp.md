# 📚 Lección 2 — Consumo de Datos desde una API

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección serás capaz de:
- Diferenciar backends tradicionales de servicios BaaS
- Integrar Firebase como backend para Vue
- Realizar peticiones HTTP con Axios (GET, POST, PUT, DELETE)
- Manejar estados de carga, error y datos vacíos
- Implementar autenticación JWT con interceptores de Axios

---

## I. Backends Tradicionales y Backend as a Service (BaaS)

### a. Diferencias

| Aspecto | Backend Tradicional | BaaS (Firebase, Supabase) |
|---------|--------------------|-----------------------------|
| Configuración | Manual (servidor, DB, API) | Automática (cloud) |
| Escalabilidad | Manual | Automática |
| Costo inicial | Mayor | Menor (planes gratuitos) |
| Control | Total | Limitado por el proveedor |
| Ideal para | Apps grandes y complejas | MVPs, apps medianas, prototipado |

### b. Cuándo usar cada uno

**Backend tradicional:** cuando necesitas lógica de negocio compleja, control total de la infraestructura, o integraciones muy específicas.

**BaaS:** cuando quieres lanzar rápido, el equipo es pequeño, o es un MVP.

---

## II. Firebase como Backend para Vue

### a. Configuración básica

```bash
npm install firebase
```

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-app.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
```

### b. Autenticación con Firebase

```javascript
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

// Registrar usuario
async function registrar(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// Iniciar sesión
async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}
```

---

## III. Manejo de Datos y Errores con Axios

### a. Instalación y configuración

```bash
npm install axios
```

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

### b. Peticiones CRUD

```javascript
// GET - Obtener lista
const { data } = await api.get('/products')

// GET - Obtener uno
const { data } = await api.get('/products/1')

// POST - Crear
const { data } = await api.post('/products', {
  title: 'Nuevo producto',
  price: 99.99,
  category: 'electronics'
})

// PUT - Actualizar completo
const { data } = await api.put('/products/1', { title: 'Actualizado' })

// DELETE - Eliminar
await api.delete('/products/1')
```

### c. Control de estados en el ciclo de vida de Vue

```vue
<template>
  <div>
    <!-- Estado: Cargando -->
    <div v-if="cargando" class="spinner">Cargando productos...</div>

    <!-- Estado: Error -->
    <div v-else-if="error" class="error">
      ⚠️ {{ error }}
      <button @click="cargarProductos">Reintentar</button>
    </div>

    <!-- Estado: Sin datos -->
    <div v-else-if="productos.length === 0" class="empty">
      No hay productos disponibles.
    </div>

    <!-- Estado: Con datos -->
    <div v-else class="grid">
      <ProductCard
        v-for="p in productosFiltrados"
        :key="p.id"
        :producto="p"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const productos = ref([])
const cargando = ref(false)
const error = ref(null)
const categoriaSeleccionada = ref('todas')

const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === 'todas') return productos.value
  return productos.value.filter(p => p.category === categoriaSeleccionada.value)
})

async function cargarProductos() {
  cargando.value = true
  error.value = null
  try {
    const { data } = await api.get('/products')
    productos.value = data
  } catch (err) {
    error.value = 'Error al cargar los productos. Intenta de nuevo.'
    console.error(err)
  } finally {
    cargando.value = false
  }
}

onMounted(cargarProductos)
</script>
```

---

## IV. Autenticación y Optimización

### a. JWT con headers de autorización

```javascript
// Agregar token al header manualmente
const token = localStorage.getItem('token')
const { data } = await api.get('/products', {
  headers: { Authorization: `Bearer ${token}` }
})
```

### b. Interceptores de Axios

```javascript
// src/services/api.js
// Interceptor de peticiones (request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de respuestas (response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado → redirigir al login
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
```

---

# 🛠️ Guía ABP — Lección 2: Consumo de Datos desde una API

## 🎯 Objetivo
Incorporar productos dinámicos desde la API de FakeStore usando Axios.

---

## Paso 1: Instalar Axios

```bash
npm install axios
```

---

## Paso 2: Crear el servicio de API

Crea el archivo `src/services/api.js`:

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000
})

export default api
```

---

## Paso 3: Crear el servicio de productos

```javascript
// src/services/productosService.js
import api from './api'

export const productosService = {
  async getAll() {
    const { data } = await api.get('/products')
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  async getCategorias() {
    const { data } = await api.get('/products/categories')
    return data
  },

  async getByCategoria(categoria) {
    const { data } = await api.get(`/products/category/${categoria}`)
    return data
  }
}
```

---

## Paso 4: Actualizar `HomeView.vue` con consumo real de API

```vue
<!-- src/views/HomeView.vue -->
<template>
  <main class="home">
    <!-- Filtro por categoría -->
    <div class="filtros">
      <select
        v-model="categoriaSeleccionada"
        @change="filtrar"
        data-cy="filtro-categoria"
      >
        <option value="todas">Todas las categorías</option>
        <option
          v-for="cat in categorias"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- Estado: Cargando -->
    <div v-if="cargando" class="estado-carga">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </div>

    <!-- Estado: Error -->
    <div v-else-if="error" class="estado-error">
      <p>⚠️ {{ error }}</p>
      <button @click="cargarProductos">Reintentar</button>
    </div>

    <!-- Estado: Sin resultados -->
    <div v-else-if="productosFiltrados.length === 0" class="estado-vacio">
      <p>No se encontraron productos en esta categoría.</p>
    </div>

    <!-- Lista de productos -->
    <ProductList
      v-else
      :productos="productosFiltrados"
      @agregar="onAgregar"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductList from '../components/products/ProductList.vue'
import { productosService } from '../services/productosService'

const productos = ref([])
const categorias = ref([])
const categoriaSeleccionada = ref('todas')
const cargando = ref(false)
const error = ref(null)

const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === 'todas') return productos.value
  return productos.value.filter(p => p.category === categoriaSeleccionada.value)
})

async function cargarProductos() {
  cargando.value = true
  error.value = null
  try {
    const [prods, cats] = await Promise.all([
      productosService.getAll(),
      productosService.getCategorias()
    ])
    productos.value = prods
    categorias.value = cats
  } catch (err) {
    error.value = 'No se pudieron cargar los productos. Verifica tu conexión.'
  } finally {
    cargando.value = false
  }
}

function filtrar() {
  // La computed 'productosFiltrados' se actualiza automáticamente
  console.log('Filtrando por:', categoriaSeleccionada.value)
}

function onAgregar(producto) {
  alert(`✅ "${producto.title}" agregado al carrito`)
}

onMounted(cargarProductos)
</script>

<style scoped>
.home { padding: 1rem 2rem; max-width: 1200px; margin: 0 auto; }
.filtros { margin-bottom: 1.5rem; }
.filtros select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.estado-carga, .estado-error, .estado-vacio {
  text-align: center;
  padding: 3rem;
  color: #666;
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
.estado-error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

## ✅ Verificación

- [ ] Los productos se cargan desde la API real de FakeStore
- [ ] Se muestra el spinner mientras carga
- [ ] Se muestra mensaje de error si la API falla
- [ ] El filtro por categoría funciona correctamente
- [ ] La consola no muestra errores

---

## 📤 Entrega

```bash
git add alumnos/tu-nombre-apellido/leccion2/
git commit -m "Agrega lección 2 con consumo de API - tu-nombre-apellido"
git push origin tu-nombre-apellido
```

---

## 🏆 Criterios de Evaluación L2

| Criterio | Peso |
|---------|------|
| Axios configurado correctamente | 20% |
| Datos cargados dinámicamente desde API | 30% |
| Gestión de estados (loading, error, empty) | 30% |
| Filtro funcional por categoría | 20% |
