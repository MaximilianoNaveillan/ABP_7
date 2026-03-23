import axios from "axios";
// axios create() --> genera una instancia personalizada de Axios.
//configuramos la baseURL una sola vez aquí:
// en cualquier lugar de la app que importe 'api', ya sabe a que servidor hablar
// edto evita repetir la URL completa en cada petición
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000, // si la API no responde en 10seg, la petición falla con error
});

export default api;
