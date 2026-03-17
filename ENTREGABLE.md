# 📝 ABP — Módulo 7: Desarrollo de Aplicaciones Front-End con Framework Vue

> **Proyecto Integrador:** Vue Product Showcase
> **Módulo:** 7 — Desarrollo de Aplicaciones Front-End con Framework Vue
> **Modalidad:** Entrega progresiva por lecciones (5 etapas)

---

## 📍 Situación Inicial

**Unidad solicitante:** Departamento de E-commerce de una empresa de tecnología ficticia.

El equipo de desarrollo del área de e-commerce necesita una aplicación **SPA (Single Page Application)** que sirva como catálogo interactivo de productos. Se busca un sistema moderno, dinámico y responsive que permita a los usuarios visualizar información de productos, filtrar por categorías y ver detalles individuales.

Actualmente, el equipo utiliza una API interna para exponer los productos, pero no cuentan con una interfaz robusta que consuma esos datos ni gestione el estado de forma centralizada. Además, buscan asegurar la calidad de la solución con pruebas automatizadas y dejar abierta la posibilidad de escalar la aplicación a móvil o escritorio.

---

## 📋 Nuestro Objetivo

Desarrollar una aplicación Vue moderna, optimizada y mantenible que permita:

- Visualizar un catálogo de productos obtenidos desde una API REST.
- Utilizar componentes reutilizables y bien organizados.
- Gestionar el estado global con Vuex.
- Incorporar pruebas unitarias y e2e.
- Integrar una librería UI y considerar Nuxt o Quasar según el enfoque del proyecto.

> La aplicación deberá ser **clara, accesible, modular y escalable** para futuras mejoras.

---

## 👣 Paso a Paso — Las 5 Etapas

Este proyecto se compone de **5 lecciones** que se desarrollan de forma progresiva y escalonada. Cada lección construye sobre la anterior.

> 💡 Invertir tiempo asincrónico entre clases es clave para completar el módulo. Las dudas se resuelven en los espacios sincrónicos en equipo.

---

### Lección 1 — Componentes y Ciclo de Vida

**🎯 Objetivo:** Iniciar la base del proyecto con estructura de componentes reutilizables.

**📋 Tareas a desarrollar:**

- [ ] Configurar el proyecto con Vue CLI / Vite.
- [ ] Crear el componente `<ProductCard>` para mostrar un producto.
- [ ] Implementar al menos un ciclo de vida (`mounted`, `created`, etc.).
- [ ] Diseñar la estructura base de la app: `<App>`, `<Header>`, `<Footer>`, `<ProductList>`.

> ➜ Esta lección establece las bases visuales y de estructura para el resto del proyecto.

📁 Referencia: [`lecciones/L1_Componentes_y_ciclo_de_vida/`](../lecciones/L1_Componentes_y_ciclo_de_vida/)

---

### Lección 2 — Consumo de Datos desde una API

**🎯 Objetivo:** Incorporar productos dinámicos mediante consumo de API.

**📋 Tareas a desarrollar:**

- [ ] Integrar Axios y obtener datos desde una API (pública o mock con JSON-server).
- [ ] Mostrar productos dinámicamente en `<ProductList>`.
- [ ] Incluir gestión de errores y carga (`loading`, `error`, `empty`).
- [ ] Agregar filtro simple por categoría.

> ➜ Esta lección conecta los componentes del paso anterior con datos reales y lógica.

📁 Referencia: [`lecciones/L2_Consumo_de_datos_API/`](../lecciones/L2_Consumo_de_datos_API/)

---

### Lección 3 — Almacenamiento de Estado en Vuex

**🎯 Objetivo:** Centralizar el estado y mejorar la arquitectura de datos.

**📋 Tareas a desarrollar:**

- [ ] Configurar Vuex y separar en módulos (`productos`, `filtros`, `favoritos`).
- [ ] Mover el consumo de API a acciones Vuex.
- [ ] Usar getters para computar productos filtrados.
- [ ] Conectar los componentes visuales con el estado centralizado.

> ➜ Esta entrega optimiza el flujo de datos y prepara la app para escalar.

📁 Referencia: [`lecciones/L3_Estado_Vuex/`](../lecciones/L3_Estado_Vuex/)

---

### Lección 4 — Pruebas en Vue

**🎯 Objetivo:** Asegurar calidad de componentes y flujos clave.

**📋 Tareas a desarrollar:**

- [ ] Escribir **2 pruebas unitarias** con Vue Test Utils + Vitest/Jest:
  - [ ] Render correcto de `<ProductCard>`
  - [ ] Respuesta visual ante error de API
- [ ] Crear **1 prueba end-to-end** con Cypress o Nightwatch:
  - [ ] Usuario filtra productos y ve resultados

> ➜ Esta etapa valida el comportamiento de lo construido hasta aquí.

📁 Referencia: [`lecciones/L4_Pruebas_Vue/`](../lecciones/L4_Pruebas_Vue/)

---

### Lección 5 — Librerías y Frameworks Complementarios

**🎯 Objetivo:** Aplicar diseño visual profesional y mejorar arquitectura.

**📋 Tareas a desarrollar:**

- [ ] Elegir una librería UI (Vuetify, Element Plus, etc.) y aplicarla.
- [ ] Estilizar `<ProductCard>`, botones, inputs, etc.
- [ ] _(Opcional)_ Migrar a Nuxt o Quasar y justificar por qué.
- [ ] Aplicar diseño responsive y tema claro/oscuro.

> ➜ Esta lección refina la experiencia visual del usuario final.

📁 Referencia: [`lecciones/L5_Librerias_y_frameworks/`](../lecciones/L5_Librerias_y_frameworks/)

---

## 🔍 ¿Qué se Valida?

| Criterio             | Descripción                                         |
| -------------------- | --------------------------------------------------- |
| Arquitectura         | Estructura escalable y organización por componentes |
| Integración de datos | Consumo y visualización correcta desde la API       |
| Estado global        | Gestión efectiva con Vuex y sus módulos             |
| Pruebas              | Cobertura básica unitaria y E2E funcionando         |
| Librería UI          | Uso profesional e integrado de componentes visuales |
| Documentación        | Entrega funcional, limpia y con README completo     |

---

## ✅ Entregables

- [ ] **Código fuente** en GitHub dentro de `alumnos/tu-nombre-apellido/` con estructura clara.
- [ ] **`README.md`** con instrucciones de instalación y justificaciones técnicas.
- [ ] **Evidencias de pruebas** ejecutadas (capturas de pantalla o logs).
- [ ] **Demo funcional** o capturas del producto final.

---

## 🦺 Referencias

| Herramienta    | Documentación                 |
| -------------- | ----------------------------- |
| Vue.js         | https://vuejs.org/            |
| Axios          | https://axios-http.com/       |
| Vuex           | https://vuex.vuejs.org/       |
| Vue Test Utils | https://test-utils.vuejs.org/ |
| Vitest         | https://vitest.dev/           |
| Jest           | https://jestjs.io/            |
| Cypress        | https://www.cypress.io/       |
| Vuetify        | https://vuetifyjs.com/        |
| Nuxt.js        | https://nuxt.com/             |
| Quasar         | https://quasar.dev/           |

---

## 💼 Portafolio

Este proyecto es ideal para mostrar en tu portafolio como ejemplo de:

- Aplicación SPA con Vue.
- Integración de arquitectura moderna (Vuex, componentes, pruebas).
- Criterios de calidad, diseño y documentación profesional.

> 📸 Recomendamos publicar capturas, enlazar al repo y redactar un breve resumen explicando el enfoque y las decisiones técnicas tomadas.

---

## 📤 Cómo Entregar

Seguir el flujo del [GIT_WORKFLOW.md](../GIT_WORKFLOW.md):

```bash
# 1. Asegurarte de estar en tu rama
git checkout tu-nombre-apellido

# 2. Agregar solo tu carpeta
git add alumnos/tu-nombre-apellido/

# 3. Commit descriptivo
git commit -m "Entrega final M7 - Vue Product Showcase - tu-nombre-apellido"

# 4. Push a tu rama
git push origin tu-nombre-apellido
```
