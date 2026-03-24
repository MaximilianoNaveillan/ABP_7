import api from "./api";
export const productosService = {
  // Get /products => retorna array de datos de los productos
  async getAll() {
    const { data } = await api.get("/products");
    return data;
  },
  // const name = Fer
  // const edad = 27
  // console-log("Hola soy "+name+"y tengo "+ edad +"años")
  // console.log(`Hola soy ${name} y tengo ${edad} años`)
  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  async getCategorias() {
    const { data } = await api.get("/products/categories");
    return data;
  },
  async getByCategoria(categoria) {
    const { data } = await api.get(`/products/category/${categoria}`);
    return data;
  },
};
