const persona = {
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ciudad: '',
    pais: ''
}

let personasArray = [];


const datos_contacto = (e) => {

    persona.nombre   = document.forms["form_contact"]["inp_nombre"].value;
    persona.apellido = document.forms["form_contact"]["inp_apellido"].value;
    persona.telefono = document.forms["form_contact"]["inp_telefono"].value;
    persona.email    = document.forms["form_contact"]["inp_email"].value;
    persona.ciudad   = document.forms["form_contact"]["inp_ciudad"].value;
    persona.pais     = document.forms["form_contact"]["inp_pais"].value;
    persona.id       = personasArray.length;
    
    let personaJson = JSON.stringify(persona);

    personasArray.push(personaJson);

    e.preventDefault();
    //alert("Datos guardados correctamente" + personasArray.toString() );
};


const listarContactos =  () => {

    let persona = {};
    let dinamicTable = "";

    dinamicTable += "<table class='table'>";
    dinamicTable +=     "<tr>";
    dinamicTable +=         "<th>ID</th>";
    dinamicTable +=         "<th>Nombre</th>";
    dinamicTable +=         "<th>Apellido</th>";
    dinamicTable +=         "<th>Teléfono</th>";
    dinamicTable +=         "<th>Email</th>";
    dinamicTable +=     "</tr>";

    for(let i=0; i<personasArray.length; i++){
        persona = JSON.parse(personasArray[i]);

        dinamicTable +=     "<tr>";
        dinamicTable +=         "<td>"+persona.id+"</td>";
        dinamicTable +=         "<td>"+persona.nombre+"</td>";
        dinamicTable +=         "<td>"+persona.apellido+"</td>";
        dinamicTable +=         "<td>"+persona.ciudad+"</td>";
        dinamicTable +=         "<td>"+persona.email+"</td>";
        dinamicTable +=     "</tr>";
    }
    
    dinamicTable += "</table>";
        
    
    document.getElementById("table_contact").innerHTML = dinamicTable;
}


