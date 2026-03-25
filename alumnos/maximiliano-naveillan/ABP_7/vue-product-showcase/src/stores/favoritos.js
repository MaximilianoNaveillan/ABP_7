import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", {
  state: () => ({
    lista: JSON.parse(localStorage.getItem("favoritos") || "[]"),
  }),
  getters: {
    esFavorito: (state) => (id) => state.lista.some((p) => p.id === id),
    total: (state) => state.lista.length,
  },
  actions: {
    toggle(producto) {
      const idx = this.lista.findIndex((p) => p.id === producto.id);
      if (idx >= 0) {
        this.lista.splice(idx, 1); // ya es favorito -> quita de favorito
      } else {
        this.lista.push(producto); // no es favorito --> agregar
      }
      // persistir en localStorage drdpu´rs dr ca cambio
      localStorage.setItem("favoritos", JSON.stringify(this.lista));
    },
    limpiarTodo() {
      this.loista = [];
      localStorage.removeItem("favoritos");
    },
  },
});
