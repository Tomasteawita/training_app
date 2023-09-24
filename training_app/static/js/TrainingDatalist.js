// JavaScript para manejar la entrada y el autocompletado
const inputEjercicios = document.getElementById('ejercicios');
const listaEjercicios = document.getElementById('lista-ejercicios');

// Agregar un evento para manejar el cambio en el input
inputEjercicios.addEventListener('input', function() {
    const valorInput = inputEjercicios.value.toLowerCase();
    const opciones = listaEjercicios.querySelectorAll('option');

    // Filtrar las opciones que coinciden con el valor del input
    opciones.forEach(function(opcion) {
        const valorOpcion = opcion.value.toLowerCase();
        if (valorOpcion.indexOf(valorInput) !== -1) {
            opcion.style.display = 'block';
        } else {
            opcion.style.display = 'none';
        }
    });
});