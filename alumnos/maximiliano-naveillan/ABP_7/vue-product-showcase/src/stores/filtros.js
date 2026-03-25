import { defineStore } from "pinia";

export const useFiltrosStore = defineStore("filtros", {
  state: () => ({
    categoriaActual: "todas", // todas sin filtro
    busqueda: "", // preparado para la (busqueda por texto)
  }),
  actions: {
    cambiarCategoria(categoria) {
      this.categoriaActual = categoria;
    },
    limpiarFiltrado() {
      this.categoriaActual = "todas";
      this.busqueda = "";
    },
  },
});
