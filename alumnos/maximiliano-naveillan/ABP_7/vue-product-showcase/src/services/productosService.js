import api from "./api";

// Agrupamos todos los llamados a la API de productos en un objeto.
// Ventajas: si la URL de la API cambia, solo modificamos el archivo,
// no cada componente que hace las peticiones.

export const productosService = {
  // GET /products -> retorna el array completo de productos
  async getAll() {
    const { data } = await api.get("/products"); // ---> {data:valor_data,timeOut:valor_time,...}
    return data;
  },
  // GET /products/:id -> retorna un solo producto
  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  // GET (products/categories)
  async getCategorias() {
    const { data } = await api.get("/products/categories");
    return data;
  },
  // GET /products/category/:categoria -> productos filtrados por categoría
  async getByCategoria(categoria) {
    const { data } = await api.get(`/products/category/${categoria}`);
    return data;
  },
};
