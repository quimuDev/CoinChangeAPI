document.addEventListener("DOMContentLoaded", function() {

    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = "https://v6.exchangerate-api.com/v6/bdffdfac5013ec2227959e92/latest/MAD";

    let cambio;

    // ACCEDEMOS A LA API Y OBTENEMOS LOS DATOS NECESARIOS PARA REALIZAR EL CAMBIO 
    // ADEMÁS DE CONTROLAR LOS POSIBLES ERRORES

    fetch(proxyUrl + apiUrl)
        .then(respuesta => respuesta.json())
        .then(datos => {
            var datosCambio = JSON.parse(datos.contents);

            if (datosCambio && datosCambio.conversion_rates.EUR) {
                cambio = datosCambio.conversion_rates.EUR;
            } else {
                document.getElementById("resultadoCambio").textContent = "Error al obtener el cambio";
            }
        })
        .catch(() => {
            document.getElementById("resultadoCambio").textContent = "Error al acceder a la API";
        });

    // REALIZAMOS EL CAMBIO DE MONEDA CON LOS DATOS OBTENIDOS DE LA API
    document.getElementById("botonCambio").addEventListener("click", function() {
        document.getElementById("resultadoCambio").textContent = ""
        var diramsInput = document.getElementById("dirams");
        var dirams = parseFloat(diramsInput.value);

        if (!isNaN(dirams) && dirams > 0) {
            if (cambio) {  
                var euros = dirams * cambio;
                const resultado = euros.toFixed(2) + "€";
                
                //LLAMAMOS A LA FUNCIÓN DE ESCRITURA 
                typeWriter(resultado, document.getElementById("resultadoCambio"), 100);
            } else {
                document.getElementById("resultadoCambio").textContent = "Esperando tasa de cambio...";
            }
        } else {
            document.getElementById("resultadoCambio").textContent = "Por favor ingresa un valor válido.";
        }
    });

        //FUNCIÓN PARA QUE SIMULE QUE ESTA TYPEANDO
        function typeWriter(text, element, speed) {
            let i = 0;
            function writeCharacter() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(writeCharacter, speed);
                }
            }
            writeCharacter(); 
        }
});
