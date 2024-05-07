const persona = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ciudad: '',
    pais: ''
}


const datos_contacto = (e) => {

    persona.nombre = document.forms["form_contact"]["inp_nombre"].value;
    persona.apellido = document.forms["form_contact"]["inp_apellido"].value;
    persona.telefono = document.forms["form_contact"]["inp_telefono"].value;
    persona.email = document.forms["form_contact"]["inp_email"].value;
    persona.ciudad = document.forms["form_contact"]["inp_ciudad"].value;
    persona.pais = document.forms["form_contact"]["inp_pais"].value;

    if (persona.id <= 0) {
        persona.id = new Date().valueOf();
    }

    let personaJson = JSON.stringify(persona);

    localStorage.setItem(persona.id, personaJson);

    e.preventDefault();
    alert("Datos guardados correctamente");

    listarContactos();
    reset_form();
};

const reset_form = () => {
    document.forms["form_contact"].reset();
    persona.id = 0;
}

const listarContactos = () => {

    let persona = {};
    let dinamicTable = "";
    let personasLocalStorage = allStorage();

    dinamicTable += "<table>";
    dinamicTable += "<tr>";
    dinamicTable += "<th>ID</th>";
    dinamicTable += "<th>Nombre</th>";
    dinamicTable += "<th>Apellido</th>";
    dinamicTable += "<th>Teléfono</th>";
    dinamicTable += "<th>Email</th>";
    dinamicTable += "<th>Acción</th>";
    dinamicTable += "</tr>";

    for (let i = 0; i < personasLocalStorage.length; i++) {
        persona = JSON.parse(personasLocalStorage[i]);

        dinamicTable += "<tr>";
        dinamicTable += "<td>" + persona.id + "</td>";
        dinamicTable += "<td>" + persona.nombre + "</td>";
        dinamicTable += "<td>" + persona.apellido + "</td>";
        dinamicTable += "<td>" + persona.ciudad + "</td>";
        dinamicTable += "<td>" + persona.email + "</td>";
        dinamicTable += "<td>"
            + "<a href='../views/details.html?id=" + persona.id + "'>Ver<a/>"
            + "</td>";
        dinamicTable += "<td>"
            + "<a href='javascript:editarContacto(" + persona.id + ");'>Editar<a/>"
            + "</td>";
        dinamicTable += "<td>"
            + "<a href='javascript:eliminarContacto(" + persona.id + ");'>Eliminar<a/>"
            + "</td>";
        dinamicTable += "</tr>";
    }

    dinamicTable += "</table>";


    document.getElementById("table_contact").innerHTML = dinamicTable;
}


const allStorage = () => {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    return values;
}

const verDetalles = () => {

    let contactoID = obtenerParametroURL();
    let contactoString = localStorage.getItem(contactoID)
    if (contactoString.length > 0) {
        let contacto = JSON.parse(contactoString);
        document.getElementById("pname").innerText = contacto.nombre;
        document.getElementById("psurname").innerText = contacto.apellido;
        document.getElementById("pphone").innerText = contacto.telefono;
        document.getElementById("pemail").innerText = contacto.email;
        document.getElementById("pcity").innerText = contacto.ciudad;
        document.getElementById("pcountry").innerText = contacto.pais;
    }
}

const editarContacto = (id) => {
    let contactoString = localStorage.getItem(id)
    if (contactoString.length > 0) {
        let contacto = JSON.parse(contactoString);
        document.getElementById("inp_nombre").value = contacto.nombre;
        document.getElementById("inp_apellido").value = contacto.apellido;
        document.getElementById("inp_telefono").value = contacto.telefono;
        document.getElementById("inp_email").value = contacto.email;
        document.getElementById("inp_ciudad").value = contacto.ciudad;
        document.getElementById("inp_pais").value = contacto.pais;
        persona.id = id;
    }
}

const eliminarContacto = (id) => {
    let contactoString = localStorage.getItem(id);
    if(contactoString.length > 0){
        localStorage.removeItem(id);
    }

    listarContactos();
}

const obtenerParametroURL = () => {
    let url = window.location.href;
    let paramString = url.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for (let pair of queryString.entries()) {
        console.log("Key is " + pair[0]);
        console.log("Values is: " + pair[1]);
        parameterID = Number(pair[1]);
    }

    return parameterID;
}
