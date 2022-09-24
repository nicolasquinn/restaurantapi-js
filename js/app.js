let cliente = {
    mesa: '',
    hora: '',
    pedido: [],
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres',
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
    
    // Por cada objeto obtenido del API creo e inserto HTML en divContenido.
    platillos.forEach( platillo => {
        const { categoria, id, nombre, precio } = platillo;

        // DIV Contenedor
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3');

        // DIVs individuales que irán dentro del contenedor
        const divNombre = document.createElement('DIV');
        divNombre.classList.add('col-md-4');
        divNombre.textContent = nombre;

        const divPrecio = document.createElement('DIV');
        divPrecio.classList.add('col-md-3', 'fw-bold');
        divPrecio.textContent = `$${precio}`;

        const divCategoria = document.createElement('DIV');
        divCategoria.classList.add('col-md-3');
        divCategoria.textContent = categorias[categoria];

        // Input que va dentro del divCantidad.
        const input = document.createElement('INPUT');
        input.classList.add('form-control');
        input.type = 'number';
        input.value = 0;
        input.min = 0;
        input.id = `producto-${id}`;

        // Registrar la cantidad y id del input.
        input.onchange = function () {
            const cantidad = parseInt(input.value);
            agregarPlatillo({...platillo, cantidad}) // mando el objeto registrado en la DB + cantidad puesta en el input.
        }

        const divCantidad = document.createElement('DIV');
        divCantidad.classList.add('col-md-2');
        divCantidad.appendChild(input);

        // Inserto todos los divs dentro del div contenedor, luego inserto este en el divContenido.
        row.appendChild(divNombre)
        row.appendChild(divPrecio)
        row.appendChild(divCategoria)
        row.appendChild(divCantidad)
        divContenido.appendChild(row);

    })

}

function agregarPlatillo (producto) {
    // Extraigo el arreglo pedido del obj. global cliente.
    let { pedido } = cliente;
   
    // Almaceno en resultado todos los objetos de pedido que no tengan el mismo ID del nuevo producto insertado.
    const resultado = pedido.filter( item => item.id !== producto.id);
   
    // Si hay cantidad agrego el nuevo producto con su nueva cantidad
    if (producto.cantidad > 0) {
        cliente.pedido = [...resultado, producto];
    // Si cantidad es 0 el producto ya se eliminó en el filter  
    } else {
        cliente.pedido = [...resultado];
    }

    // Mostrar el resumen en el HTML
    actualizarResumen();

}

function actualizarResumen () {

    // Elemento padre donde va ir todo
    const contenido = document.querySelector('#resumen .contenido');

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6');

    const mesa = document.createElement('P');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('SPAN');
    mesaSpan.textContent = cliente.mesa; 
    mesaSpan.classList.add('fw-normal');

    const hora = document.createElement('P');
    hora.classList.add('fw-bold');
    hora.textContent = 'Hora: ';

    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    // Inserto los spans dentro de los p 
    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);
    // Inserto los p dentro del div
    contenido.appendChild(mesa);
    contenido.appendChild(hora);
}