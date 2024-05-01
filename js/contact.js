const datos_contacto = (e) => {

    e.preventDefault();

    const nombre   = document.forms["form_contact"]["inp_nombre"].value;
    const apellido = document.forms["form_contact"]["inp_apellido"].value;
    const telefono = document.forms["form_contact"]["inp_telefono"].value;
    const email    = document.forms["form_contact"]["inp_email"].value;
    const ciudad   = document.forms["form_contact"]["inp_ciudad"].value;
    const pais     = document.forms["form_contact"]["inp_pais"].value;

    alert(nombre + " " + apellido + " " +  telefono + " " +  email + " " +  ciudad + " " +  pais);
};