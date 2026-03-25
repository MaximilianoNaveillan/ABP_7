import { defineStore } from "pinia";
import api from "../services/api"; // reutilizamoa la instancia de axios
import { useFiltrosStore } from "./filtros"; // importar el store de filtros directamente
// defineStore(id,{ definición --> clave: ()=> })
// el id ('productos') es único en la app. Pinia lo usa internamente
// para DevTools y para ifdentificar el store si hay multiples instancias.
export const useProductStore = defineStore("productos", {
  // state: funcioón que retorna el estado inicial.
  // evita referencias compartidas
  state: () => ({
    lista: [],
    cargando: false,
    error: null,
    categorias: [],
  }),
  // getters: computed del proyecto
  // reciben "state" como primer argumento
  getters: {
    filtrados(state) {
      const filtradosStore = useFiltrosStore();
      if (filtradosStore === "todas") return state.lista;
      return state.lista.filter((item) => item.category === filtradosStore.categoriaActual);
    },
    total: (state) => state.lista.length,
  },
  // actions: operaciones síncronas o asíncronas.
  // Diferencia con Manejadores de estados tradicionales no usamos mutations.
  // las actions modifican "this" (el state) directamente
  actions: {
    async fetchProductos() {
      this.cargando = true;
      this.error = null;
      try {
        const [{ data: prods }, { data: cats }] = await Promise.all([
          api.get("/products"),
          api.get("/products/categories"),
        ]);
        this.lista = prods;
        this.categorias = cats;
      } catch (e) {
        this.error = "No se pudieron caragar los productos. Verificar tu conxión";
      } finally {
        this.cargando = false;
      }
    },
  },
});
