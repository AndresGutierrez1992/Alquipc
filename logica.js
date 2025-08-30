// Variables globales para el sistema
let VALOR_POR_DIA = 35000;
let contadorClientes = 1;
let datosFacturaActual = null; // Para almacenar los datos de la factura actual
let CORREO_ALQUIPC = "andresbmx11@gmail.com"; // Correo corporativo oficial

// Generar ID cliente cuando carga la página
window.onload = function () {
    generarIdCliente();
    agregarEventosRadio();
};

// Función para generar ID de cliente
function generarIdCliente() {
    let timestamp = new Date().getTime();
    let idCliente = "CLI-" + timestamp.toString().slice(-6);
    document.getElementById("cliente-id").value = idCliente;
}

// Función para agregar eventos a los radio buttons
function agregarEventosRadio() {
    let radioItems = document.querySelectorAll(".radio-item");
    let radios = document.querySelectorAll('input[name="opcion-alquiler"]');

    radioItems.forEach(function (item) {
        item.addEventListener("click", function () {
            // Remover selección anterior
            radioItems.forEach(function (r) {
                r.classList.remove("selected");
            });
            // Agregar selección actual
            this.classList.add("selected");
            // Marcar el radio button
            this.querySelector('input[type="radio"]').checked = true;
        });
    });
}

// Función para mostrar errores
function mostrarError(mensaje) {
    let errorDiv = document.getElementById("error-message");
    errorDiv.textContent = mensaje;
    errorDiv.classList.add("show");

    setTimeout(function () {
        errorDiv.classList.remove("show");
    }, 5000);
}

// Función para validar el formulario
function validarFormulario() {
    let numEquipos = parseInt(document.getElementById("num-equipos").value);
    let diasIniciales = parseInt(
        document.getElementById("dias-iniciales").value
    );
    let opcionAlquiler = document.querySelector(
        'input[name="opcion-alquiler"]:checked'
    );
    let emailCliente = document.getElementById("email-cliente").value;

    // Validación de equipos mínimos
    if (numEquipos < 2) {
        mostrarError(" Error: Debe alquilar mínimo 2 equipos");
        return false;
    }

    // Validación de días iniciales
    if (diasIniciales < 1) {
        mostrarError(" Error: Debe alquilar mínimo 1 día");
        return false;
    }

    // Validación de opción de alquiler
    if (!opcionAlquiler) {
        mostrarError(" Error: Debe seleccionar una opción de alquiler");
        return false;
    }

    // Validación de email
    if (!emailCliente || !validarEmail(emailCliente)) {
        mostrarError(" Error: Debe ingresar un correo electrónico válido");
        return false;
    }

    return true;
}

// Función para validar formato de email
function validarEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para calcular la factura
function calcularFactura() {
    // Obtener valores del formulario
    let numEquipos = parseInt(document.getElementById("num-equipos").value);
    let diasIniciales = parseInt(
        document.getElementById("dias-iniciales").value
    );
    let diasAdicionales =
        parseInt(document.getElementById("dias-adicionales").value) || 0;
    let opcionAlquiler = document.querySelector(
        'input[name="opcion-alquiler"]:checked'
    ).value;
    let idCliente = document.getElementById("cliente-id").value;
    let emailCliente = document.getElementById("email-cliente").value;

    // Calcular subtotal inicial
    let subtotalInicial = numEquipos * diasIniciales * VALOR_POR_DIA;
    let subtotalAdicional = 0;
    let descuentoAdicional = 0;

    // Calcular días adicionales con descuento del 2% por día
    if (diasAdicionales > 0) {
        subtotalAdicional = numEquipos * diasAdicionales * VALOR_POR_DIA;
        descuentoAdicional = subtotalAdicional * 0.02 * diasAdicionales;
        subtotalAdicional = subtotalAdicional - descuentoAdicional;
    }

    let subtotal = subtotalInicial + subtotalAdicional;
    let ajustePorUbicacion = 0;
    let porcentajeAjuste = 0;
    let descripcionAjuste = "";

    // Aplicar ajustes según la ubicación
    if (opcionAlquiler === "fuera-ciudad") {
        porcentajeAjuste = 5;
        ajustePorUbicacion = subtotal * 0.05;
        descripcionAjuste =
            "Incremento por servicio domicilio fuera de la ciudad (+5%)";
    } else if (opcionAlquiler === "establecimiento") {
        porcentajeAjuste = -5;
        ajustePorUbicacion = -(subtotal * 0.05);
        descripcionAjuste = "Descuento por recoger en establecimiento (-5%)";
    } else {
        descripcionAjuste = "Entrega dentro de la ciudad (sin ajustes)";
    }

    let totalFinal = subtotal + ajustePorUbicacion;

    // Mostrar resultado
    mostrarResultado({
        idCliente: idCliente,
        emailCliente: emailCliente,
        numEquipos: numEquipos,
        diasIniciales: diasIniciales,
        diasAdicionales: diasAdicionales,
        opcionAlquiler: opcionAlquiler,
        subtotalInicial: subtotalInicial,
        subtotalAdicional: subtotalAdicional,
        descuentoAdicional: descuentoAdicional,
        subtotal: subtotal,
        ajustePorUbicacion: ajustePorUbicacion,
        descripcionAjuste: descripcionAjuste,
        porcentajeAjuste: porcentajeAjuste,
        totalFinal: totalFinal,
    });
}

// Función para mostrar el resultado
function mostrarResultado(datos) {
    // Guardar datos para envío por email
    datosFacturaActual = datos;

    let opcionTexto = "";
    switch (datos.opcionAlquiler) {
        case "dentro-ciudad":
            opcionTexto = "🏢 Dentro de la Ciudad";
            break;
        case "fuera-ciudad":
            opcionTexto = "🚛 Fuera de la Ciudad";
            break;
        case "establecimiento":
            opcionTexto = "🏪 En el Establecimiento";
            break;
    }

    let detalleHTML = `
                <div class="detalle-item">
                    <span>ID Cliente:</span>
                    <strong>${datos.idCliente}</strong>
                </div>
                <div class="detalle-item">
                    <span>Opción de Alquiler:</span>
                    <strong>${opcionTexto}</strong>
                </div>
                <div class="detalle-item">
                    <span>Número de Equipos:</span>
                    <strong>${datos.numEquipos} equipos</strong>
                </div>
                <div class="detalle-item">
                    <span>Días Iniciales:</span>
                    <strong>${datos.diasIniciales} días</strong>
                </div>
                <div class="detalle-item">
                    <span>Subtotal Inicial:</span>
                    <strong>$${formatearNumero(datos.subtotalInicial)}</strong>
                </div>
            `;

    if (datos.diasAdicionales > 0) {
        detalleHTML += `
                    <div class="detalle-item">
                        <span>Días Adicionales:</span>
                        <strong>${datos.diasAdicionales} días</strong>
                    </div>
                    <div class="detalle-item">
                        <span>Descuento Días Adicionales (-2% por día):</span>
                        <strong>-$${formatearNumero(
            datos.descuentoAdicional
        )}</strong>
                    </div>
                    <div class="detalle-item">
                        <span>Subtotal Días Adicionales:</span>
                        <strong>$${formatearNumero(
            datos.subtotalAdicional
        )}</strong>
                    </div>
                `;
    }

    detalleHTML += `
                <div class="detalle-item">
                    <span>Subtotal:</span>
                    <strong>$${formatearNumero(datos.subtotal)}</strong>
                </div>
                <div class="detalle-item">
                    <span>${datos.descripcionAjuste}:</span>
                    <strong>${datos.ajustePorUbicacion >= 0 ? "+" : ""
        }$${formatearNumero(datos.ajustePorUbicacion)}</strong>
                </div>
            `;

    document.getElementById("detalle-factura").innerHTML = detalleHTML;
    document.getElementById("total-pagar").innerHTML = `
                💰 TOTAL A PAGAR: $${formatearNumero(datos.totalFinal)}
            `;

    document.getElementById("resultado").classList.add("show");
}

// Función para mostrar mensajes de éxito
function mostrarExito(mensaje) {
    let exitoDiv = document.getElementById("success-message");
    exitoDiv.textContent = mensaje;
    exitoDiv.classList.add("show");

    setTimeout(function () {
        exitoDiv.classList.remove("show");
    }, 5000);
}

// Función para generar el contenido de la factura para email
function generarContenidoFactura(datos) {
    let fecha = new Date().toLocaleDateString("es-CO");
    let hora = new Date().toLocaleTimeString("es-CO");

    let opcionTexto = "";
    switch (datos.opcionAlquiler) {
        case "dentro-ciudad":
            opcionTexto = "Dentro de la Ciudad";
            break;
        case "fuera-ciudad":
            opcionTexto = "Fuera de la Ciudad";
            break;
        case "establecimiento":
            opcionTexto = "En el Establecimiento";
            break;
    }

    let contenido = `
══════════════════════════════════════════════
               🖥️  ALQUIPC S.A.S
        FACTURA ELECTRÓNICA DE ALQUILER
══════════════════════════════════════════════

📅 Fecha: ${fecha}
🕒 Hora: ${hora}

──────────────────────────────────────────────
              📌 DATOS DEL CLIENTE
──────────────────────────────────────────────
🆔 ID Cliente: ${datos.idCliente}
📧 Email: ${datos.emailCliente}

──────────────────────────────────────────────
              📦 DETALLE DEL SERVICIO
──────────────────────────────────────────────
🖥️ Equipos: ${datos.numEquipos} equipos
📅 Días Iniciales: ${datos.diasIniciales} días
🚛 Modalidad: ${opcionTexto}
💰 Tarifa por equipo/día: ${formatearNumero(VALOR_POR_DIA)}

📊 Subtotal Inicial: ${formatearNumero(datos.subtotalInicial)}
${datos.diasAdicionales > 0
            ? `
📅 Días Adicionales: ${datos.diasAdicionales} días
💸 Descuento (-2% por día): -${formatearNumero(datos.descuentoAdicional)}
📊 Subtotal Días Adicionales: ${formatearNumero(datos.subtotalAdicional)}`
            : ""
        }

📊 Subtotal: ${formatearNumero(datos.subtotal)}
${datos.descripcionAjuste}: ${datos.ajustePorUbicacion >= 0 ? "+" : ""
        }${formatearNumero(datos.ajustePorUbicacion)}

══════════════════════════════════════════════
💰 TOTAL A PAGAR: ${formatearNumero(datos.totalFinal)}
══════════════════════════════════════════════

📝 TÉRMINOS Y CONDICIONES:
• El alquiler es por días completos
• Mínimo 2 equipos por alquiler
• Los equipos deben ser devueltos en buen estado
• Tarifa válida por 24 horas

🌱 ALQUIPC - Comprometidos con el medio ambiente
   Factura electrónica sin papel

──────────────────────────────────────────────
📞 CONTACTO ALQUIPC
📧 Email: andresbmx11@gmail.com
🏢 Sistema de Facturación Oficial
📱 Para dudas o consultas, responda a este correo
──────────────────────────────────────────────

✨ ¡Gracias por confiar en ALQUIPC! ✨
`;

    return contenido;
}

// Función para enviar la factura por email
function enviarFacturaPorEmail() {
    if (!datosFacturaActual) {
        mostrarError("Error: Primero debe calcular la factura");
        return;
    }

    let botonEnviar = document.getElementById("btn-enviar-email");

    // Deshabilitar botón y mostrar loading
    botonEnviar.disabled = true;
    botonEnviar.classList.add("loading");
    botonEnviar.textContent = "Enviando...";

    try {
        // Generar contenido de la factura
        // Crear enlace google con la factura
        let asunto = `ALQUIPC - Factura ${datosFacturaActual.idCliente
            } - ${new Date().toLocaleDateString("es-CO")}`;
        let contenidoFactura = generarContenidoFactura(datosFacturaActual);

        // Crear enlace directo a Gmail
        let gmailLink =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" +
            encodeURIComponent(datosFacturaActual.emailCliente) +
            "&su=" +
            encodeURIComponent(asunto) +
            "&body=" +
            encodeURIComponent(contenidoFactura);


        // Simular proceso de envío (2 segundos)
        setTimeout(function () {
            // Abrir cliente de correo
            window.open(gmailLink, "_blank");

            // Mostrar mensaje de éxito con instrucciones claras
            mostrarExito(
                "Factura lista para envío. Se abrió Gmail - asegúrate de estar logueado con andresbmx11@gmail.com"
            );

            // Restaurar botón
            botonEnviar.disabled = false;
            botonEnviar.classList.remove("loading");
            botonEnviar.textContent = "Enviar Factura por Email";
        }, 2000);
    } catch (error) {
        // Manejar errores
        mostrarError("Error al preparar el envío. Intente nuevamente.");

        // Restaurar botón
        botonEnviar.disabled = false;
        botonEnviar.classList.remove("loading");
        botonEnviar.textContent = "Enviar Factura por Email";
    }
}

// Función para formatear números con separadores de miles
function formatearNumero(numero) {
    return numero.toLocaleString("es-CO");
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("facturacion-form").reset();
    document.getElementById("resultado").classList.remove("show");
    generarIdCliente();

    // Limpiar datos de factura actual
    datosFacturaActual = null;

    // Limpiar selección de radio buttons
    let radioItems = document.querySelectorAll(".radio-item");
    radioItems.forEach(function (item) {
        item.classList.remove("selected");
    });

    // Limpiar errores y mensajes de éxito
    document.getElementById("error-message").classList.remove("show");
    document.getElementById("success-message").classList.remove("show");
}

// Event listener para el formulario
document
    .getElementById("facturacion-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        if (validarFormulario()) {
            calcularFactura();
        }
    });