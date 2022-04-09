import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from "./selectores.js";

//instaciamos las clases
const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

//objeto con la informacion de la cita
const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
//funciones
//agrega datos de maner dinamica al objeto
export function datosCitas(e) {
    citasObj[e.target.name] = e.target.value;
}

//valida y agrega nueva cita
export function agregaNuevaCita(e) {
    e.preventDefault();

    //Extraemos la informacion del objeto cita
    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas
    } = citasObj;

    //validamos
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');
        //pasar el bojeto de la cita correctamente
        administrarCitas.editarCita({
            ...citasObj
        });

        //Regresando el texto a su estado original
        document.querySelector('button[type=submit]').textContent = 'Crear Cita';

        //Quitando el modo edicion
        editando = false;


    } else {
        console.log('Guardando nuevo registro');
        //generar un id unico para objeto
        citasObj.id = Date.now();
        //Creando una nueva cita
        //Le pasamos una copia del objeto sin pasarle la referencia
        administrarCitas.agregarCita({
            ...citasObj
        });

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se guardo correctament!')
    }

    //reiniciamos el objeto
    reiniciarObjeto();

    formulario.reset();

    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

export function eliminarCita(id) {
    //eliminar una cita
    administrarCitas.eliminarCita(id);

    //Muestra un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //Refresca las citas
    ui.imprimirCitas(administrarCitas);

}

//carga los datos y el modo edicion
export function cargarEdicion(cita) {
    //Extraemos la informacion del objeto cita
    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
        id
    } = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenamos el objeto
    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    //Cambiamos el texto del boton del formulario
    document.querySelector('button[type=submit]').textContent = 'Guardar Cambios';

    editando = true;
}