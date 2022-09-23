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
        console.log("Al menos 1 campo está vacío")
    } else {
        console.log("Ambos campos están llenos.")
    }

}

