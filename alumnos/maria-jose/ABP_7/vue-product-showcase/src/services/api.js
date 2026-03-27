import axios from "axios";

//axios create() genera una instancia personalizada de Axios
// configuramos la baseURL una sola vez 

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 50000 //Si la API no responde en 10 segundos
})

export default api;