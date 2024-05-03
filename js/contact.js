const persona = {
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ciudad: '',
    pais: ''
}


const datos_contacto = (e) => {

    persona.nombre   = document.forms["form_contact"]["inp_nombre"].value;
    persona.apellido = document.forms["form_contact"]["inp_apellido"].value;
    persona.telefono = document.forms["form_contact"]["inp_telefono"].value;
    persona.email    = document.forms["form_contact"]["inp_email"].value;
    persona.ciudad   = document.forms["form_contact"]["inp_ciudad"].value;
    persona.pais     = document.forms["form_contact"]["inp_pais"].value;
    persona.id       = allStorage().length;
    
    let personaJson = JSON.stringify(persona);
    
    localStorage.setItem(persona.id, personaJson );

    e.preventDefault();
    alert("Datos guardados correctamente");
};


const listarContactos =  () => {

    let persona = {};
    let dinamicTable = "";
    let personasLocalStorage = allStorage();

    dinamicTable += "<table class='table'>";
    dinamicTable +=     "<tr>";
    dinamicTable +=         "<th>ID</th>";
    dinamicTable +=         "<th>Nombre</th>";
    dinamicTable +=         "<th>Apellido</th>";
    dinamicTable +=         "<th>Teléfono</th>";
    dinamicTable +=         "<th>Email</th>";
    dinamicTable +=         "<th>Acción</th>";
    dinamicTable +=     "</tr>";

    for(let i=0; i<personasLocalStorage.length; i++){
        persona = JSON.parse(personasLocalStorage[i]);

        dinamicTable +=     "<tr>";
        dinamicTable +=         "<td>"+persona.id+"</td>";
        dinamicTable +=         "<td>"+persona.nombre+"</td>";
        dinamicTable +=         "<td>"+persona.apellido+"</td>";
        dinamicTable +=         "<td>"+persona.ciudad+"</td>";
        dinamicTable +=         "<td>"+persona.email+"</td>";
        dinamicTable +=         "<td>"
                                    +"<a href='../views/details.html?id="+ persona.id+"'>Ver<a/>"
                                +"</td>";
        dinamicTable +=     "</tr>";
    }
    
    dinamicTable += "</table>";
        
    
    document.getElementById("table_contact").innerHTML = dinamicTable;
}


const allStorage = () => {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        
        while(i--){
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
}

const verDetalles =  () => {
    
    let contactoID     = obtenerParametroURL();
    let contactoString = localStorage.getItem(contactoID)
    if(contactoString.length > 0){
        let contacto = JSON.parse(contactoString);
        document.getElementById("pname").innerText    = contacto.nombre;       
        document.getElementById("psurname").innerText = contacto.apellido;       
        document.getElementById("pphone").innerText   = contacto.telefono;       
        document.getElementById("pemail").innerText   = contacto.email;       
        document.getElementById("pcity").innerText    = contacto.ciudad;       
        document.getElementById("pcountry").innerText = contacto.pais;       
    }
}

const obtenerParametroURL = () => {
    let url = window.location.href;
    let paramString = url.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for(let pair of queryString.entries()){
        console.log("Key is " + pair[0]);
        console.log("Values is: " + pair[1]);
        parameterID = Number( pair[1]);
    }

    return parameterID;
}
