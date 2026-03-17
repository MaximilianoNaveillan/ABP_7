# 🔀 Git Workflow Guide — Módulo 7

## 🎯 Objetivo

Establecer un flujo de trabajo claro para organizar las lecciones y evitar conflictos entre ramas en el repositorio compartido.

---

## 📂 Estructura del Proyecto

```
/alumnos
    ├── alumno1/
    ├── alumno2/
    └── ...
/lecciones
    ├── L1_Componentes_y_ciclo_de_vida/
    ├── L2_Consumo_de_datos_API/
    └── ...
```

---

## 🔹 Regla Principal

- Cada alumno **debe crear una carpeta** con su nombre y apellido dentro de `/alumnos`
- Solo puede **modificar archivos dentro de su propia carpeta**
- **No debe modificar** carpetas de otros compañeros

---

## 🪜 Paso a Paso del Workflow

### 1️⃣ Crear tu rama personal

Desde la rama principal:

```bash
git checkout -b nombre-apellido
```

Ejemplo:
```bash
git checkout -b maximiliano-naveillan
```

---

### 2️⃣ Crear tu carpeta dentro de `/alumnos`

```
/alumnos/tu-nombre-apellido/
```

Dentro de esa carpeta subirás **todas tus actividades y el proyecto ABP**.

Estructura sugerida para tu carpeta:

```
/alumnos/tu-nombre-apellido/
    ├── leccion1/          ← Entrega de la lección 1
    ├── leccion2/          ← Entrega de la lección 2
    ├── ...
    └── README.md          ← Tu propio README con notas del proyecto
```

---

### 3️⃣ Agregar solo tu carpeta

> ⚠️ **IMPORTANTE:** Solo debes hacer `add` a tu carpeta.

```bash
git add alumnos/tu-nombre-apellido/
```

**NO usar:**
```bash
git add .   # ❌ PROHIBIDO
```

---

### 4️⃣ Hacer commit

```bash
git commit -m "Agrega lección X - nombre-apellido"
```

Ejemplos de buenos commits:
```bash
git commit -m "Agrega lección 1 - maximiliano-naveillan"
git commit -m "Agrega lección 2 con Axios - maximiliano-naveillan"
git commit -m "Agrega pruebas unitarias lección 4 - maximiliano-naveillan"
```

---

### 5️⃣ Hacer push a tu rama

```bash
git push origin nombre-apellido
```

---

## 🚫 Lo que NO se debe hacer

| ❌ Prohibido | ✅ Correcto |
|-------------|------------|
| Modificar archivos fuera de tu carpeta | Solo tocar `/alumnos/tu-nombre/` |
| Trabajar directamente en `main` | Trabajar en tu rama personal |
| Hacer push a `main` | Push a tu propia rama |
| Usar `git add .` | Usar `git add alumnos/tu-nombre/` |
| Eliminar carpetas de otros | No tocar carpetas ajenas |

---

## 🧠 Buenas Prácticas

- ✔ Usar nombres de carpeta **claros y consistentes** (minúsculas, con guiones)
- ✔ Hacer commits **descriptivos** (qué hiciste + tu nombre)
- ✔ Mantener tu rama **actualizada con main** si el docente lo indica:
  ```bash
  git checkout nombre-apellido
  git merge main
  ```
- ✔ **Verificar cambios** antes de hacer push: `git status` y `git diff`

---

## 📌 Resumen Visual del Flujo

```
main
 │
 └── git checkout -b nombre-apellido
         │
         ├── Crear /alumnos/nombre-apellido/
         │
         ├── Modificar solo tu carpeta
         │
         ├── git add alumnos/nombre-apellido/
         │
         ├── git commit -m "Agrega lección X - nombre-apellido"
         │
         └── git push origin nombre-apellido
```

---

## ✅ Resultado Esperado

- 🗂️ Orden en el repositorio
- ⚡ Sin conflictos entre alumnos
- 📋 Control claro de versiones
- 📜 Historial limpio y organizado

---

> 🚀 Este workflow asegura una colaboración estructurada y profesional dentro del equipo.
