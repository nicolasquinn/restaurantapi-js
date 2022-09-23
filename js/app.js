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

    console.log("Todo lleno.")

}

