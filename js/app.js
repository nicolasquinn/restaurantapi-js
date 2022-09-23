let cliente = {
    mesa: '',
    hora: '',
    pedido: [],
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente () {

    // Validación
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    const campoVacio = [ mesa, hora ].some( campo => campo === '' );

    if (campoVacio) {
        // Revisa si existe una alerta
        const alertaExiste = document.querySelector('div.invalid-feedback');
        if (!alertaExiste) {

            // Creo e inserto
            const alerta = document.createElement('DIV');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios.'
            document.querySelector('.modal-dialog form').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3500);
        }

        return; // corto la función.
    }

    // Lleno el objeto "cliente" con los datos.
    cliente = { ...cliente, mesa, hora };

    // Ocultar modal BS
    const modalForm = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalForm);
    modalBootstrap.hide();

    // Mostrar las secciones
    mostrarSecciones();

    // Obtener datos de la API
    obtenerPlatillos();
}

function mostrarSecciones () {
    const secciones = document.querySelectorAll('.d-none')
    secciones.forEach( seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos () {
    const url = 'http://localhost:4000/platillos'
    
    fetch(url)
        .then( resp => resp.json() )
        .then( result => mostrarPlatillos(result) ) // ejecuto la función para mostrar en HTML todos los resultados.
        .catch( error => console.log(error) );
}

function mostrarPlatillos(platillos) {
    const divContenido = document.querySelector('#platillos .contenido');
    
    platillos.forEach( platillo => {
        const { categoria, id, nombre, precio } = platillo;

        const row = document.createElement('DIV');
        row.classList.add('row');

        const titulo = document.createElement('DIV');
        titulo.classList.add('col-md-4');
        titulo.textContent = nombre;

        row.appendChild(titulo)
        divContenido.appendChild(row);
        
    })

}

