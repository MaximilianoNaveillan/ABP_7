import { defineStore } from "pinia";
import { ref } from "vue";

export const useMensajeStore = defineStore("mensaje",()=>{
    const mensaje = ref('Hola desde Pinia');
    function cambiarMensaje(){
        mensaje.value = 'Mensaje Global';
    }

    return { mensaje, cambiarMensaje };
});

