const calculateMortgage = (e) =>{

    e.preventDefault();

    let cuota       = document.forms["form_mortgage"]["f_cuota"].value;
    let costo_total = document.forms["form_mortgage"]["f_valor_total"].value;
    let interes     = document.forms["form_mortgage"]["f_t_interes"].value;
    let plazo_anio  = document.forms["form_mortgage"]["f_plazo"].value;
    const MONTHS_ON_YEAR = 12;

    const mortgage = {
        costo_total_inmueble : 0,
        total_prestamo  : 0,
        total_intereses : 0,
        cuota_mensual   : 0
    };

    mortgage.costo_total_inmueble = costo_total;
    mortgage.total_prestamo       = costo_total - cuota;
    mortgage.total_intereses      = mortgage.total_prestamo * interes / 100;
    mortgage.cuota_mensual        = ( mortgage.total_prestamo + mortgage.total_intereses ) / ( plazo_anio * MONTHS_ON_YEAR );

    //alert(mortgage.cuota_mensual);
    output_mortgage(mortgage);
}

const output_mortgage = (final_mortgage) => {
    document.getElementById("o_monto_prestamo").innerHTML = value_to_dollar( final_mortgage.total_prestamo );
    document.getElementById("o_cuota_mensual").innerHTML  = value_to_dollar( final_mortgage.cuota_mensual );

    let totalPrestamoPorcentaje = 0;
    totalPrestamoPorcentaje = final_mortgage.total_prestamo * 100 / final_mortgage.costo_total_inmueble;
    alert(totalPrestamoPorcentaje);
    if(totalPrestamoPorcentaje > 90){
        //document.getElementById("o_monto_prestamo").className = "alertaPorcentaje";
        document.getElementById("o_monto_prestamo").classList.add("alertaPorcentaje");
    }else{
        document.getElementById("o_monto_prestamo").classList.remove("alertaPorcentaje");
    }
}

const reset_form = () => {
    document.forms["form_mortgage"].reset();
}

const value_to_dollar = ( value ) => {

    const dollar_formatter = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2});
    return dollar_formatter.format( value );

}