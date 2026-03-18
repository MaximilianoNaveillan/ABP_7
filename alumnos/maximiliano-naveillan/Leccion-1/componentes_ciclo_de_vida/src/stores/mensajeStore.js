import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMansajeStore = defineStore('mensaje', () => {
  const mensaje = ref('Hola desde Pinia');
  function cambiarMensaje() {
    mensaje.value = 'Mensaje global';
  }

  return { mensaje, cambiarMensaje };
});
