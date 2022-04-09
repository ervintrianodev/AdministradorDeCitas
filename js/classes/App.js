import {
    datosCitas,
    agregaNuevaCita
} from "../funciones.js";
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from "../selectores.js";


export default class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        document.addEventListener('DOMContentLoaded', () => {

            mascotaInput.addEventListener('input', datosCitas);
            propietarioInput.addEventListener('input', datosCitas);
            telefonoInput.addEventListener('input', datosCitas);
            fechaInput.addEventListener('input', datosCitas);
            horaInput.addEventListener('input', datosCitas);
            sintomasInput.addEventListener('input', datosCitas);

            formulario.addEventListener('submit', agregaNuevaCita);
        });
    }
}