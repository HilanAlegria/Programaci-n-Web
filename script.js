

let hojaDeVida = {
    nombre: '',
    edad: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    descripcion: '',
    estudios: [],
    empleos: [],
    habilidades: []
};

function cargarFoto(event) {
    const fotoPerfil = document.getElementById('foto-perfil');
    const archivo = event.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = (e) => { fotoPerfil.src = e.target.result; };
        lector.readAsDataURL(archivo);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const contenedorFoto = document.getElementById('contenedor-foto');
    const formularioDatos = document.getElementById('formulario-datos');
    
    contenedorFoto.style.float = 'right';
    contenedorFoto.style.border = '2px solid #343a40';
    contenedorFoto.style.padding = '10px';
    contenedorFoto.style.borderRadius = '10px';
    contenedorFoto.style.width = '200px';

    formularioDatos.style.float = 'left';
    formularioDatos.style.width = '60%';
});

function agregarElemento(tipo) {
    const contenedor = document.getElementById(`historial-${tipo}`);
    const nuevoElemento = document.createElement('div');
    nuevoElemento.className = 'elemento-lista';
    nuevoElemento.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Nuevo ${tipo}" />
        <button class="btn btn-warning btn-sm" onclick="editarElemento(this)">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarElemento(this)">Eliminar</button>
    `;
    contenedor.appendChild(nuevoElemento);
}

function editarElemento(boton) {
    const input = boton.parentElement.querySelector('input');
    input.removeAttribute('readonly');
    input.focus();
}

function eliminarElemento(boton) {
    boton.parentElement.remove();
}

function guardarDatos() {
    hojaDeVida.nombre = document.getElementById('nombre').value.trim();
    hojaDeVida.edad = parseInt(document.getElementById('edad').value.trim()) || '';
    hojaDeVida.fechaNacimiento = document.getElementById('fecha-nacimiento').value.trim();
    hojaDeVida.lugarNacimiento = document.getElementById('lugar-nacimiento').value.trim();
    hojaDeVida.descripcion = document.getElementById('descripcion').value.trim();

    if (!hojaDeVida.nombre || !hojaDeVida.edad || !hojaDeVida.fechaNacimiento) {
        alert('Por favor, completa los campos obligatorios.');
        return;
    }

    hojaDeVida.estudios = [...document.querySelectorAll('#historial-academico input')].map(i => i.value.trim()).filter(Boolean);
    hojaDeVida.empleos = [...document.querySelectorAll('#historial-laboral input')].map(i => i.value.trim()).filter(Boolean);
    hojaDeVida.habilidades = [...document.querySelectorAll('#habilidades input')].map(i => i.value.trim()).filter(Boolean);

    localStorage.setItem('hojaDeVida', JSON.stringify(hojaDeVida));
    alert('Datos guardados correctamente.');
}

function cargarDatos() {
    const datosGuardados = localStorage.getItem('hojaDeVida');
    if (datosGuardados) {
        hojaDeVida = JSON.parse(datosGuardados);

        document.getElementById('nombre').value = hojaDeVida.nombre;
        document.getElementById('edad').value = hojaDeVida.edad;
        document.getElementById('fecha-nacimiento').value = hojaDeVida.fechaNacimiento;
        document.getElementById('lugar-nacimiento').value = hojaDeVida.lugarNacimiento;
        document.getElementById('descripcion').value = hojaDeVida.descripcion;

        cargarLista('historial-academico', hojaDeVida.estudios);
        cargarLista('historial-laboral', hojaDeVida.empleos);
        cargarLista('habilidades', hojaDeVida.habilidades);
    }
}

function cargarLista(id, datos) {
    const contenedor = document.getElementById(id);
    contenedor.innerHTML = '';
    datos.forEach(dato => {
        const elemento = document.createElement('div');
        elemento.className = 'elemento-lista';
        elemento.innerHTML = `
            <input type="text" class="form-control mb-2" value="${dato}" readonly />
            <button class="btn btn-warning btn-sm" onclick="editarElemento(this)">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarElemento(this)">Eliminar</button>
        `;
        contenedor.appendChild(elemento);
    });
}

document.addEventListener("DOMContentLoaded", cargarDatos);
