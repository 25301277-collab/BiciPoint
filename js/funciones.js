


const botonesFiltro = document.querySelectorAll(".filtro-servicio");
const tarjetas = document.querySelectorAll(".servicio-item");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const filtro = boton.dataset.filtro;

    botonesFiltro.forEach(function (otroBoton) {
      otroBoton.classList.remove("filtro-activo");
    });
    boton.classList.add("filtro-activo");
    botonesFiltro.forEach(function (elemento) {
      elemento.setAttribute("aria-pressed", elemento === boton ? "true" : "false");
    });

    tarjetas.forEach(function (tarjeta) {
      if (filtro === "todos" || tarjeta.dataset.categoria === filtro) {
        tarjeta.classList.remove("d-none");
      } else {
        tarjeta.classList.add("d-none");
      }
    });
  });
});


const formulario = document.querySelector("#formCita");

if (formulario) {
  const fecha = document.querySelector("#fecha");
  const servicio = document.querySelector("#servicio");
  const aviso = document.querySelector("#mensajeFormulario");


  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  fecha.min = anio + "-" + mes + "-" + dia;

  const parametros = new URLSearchParams(window.location.search);
  const servicioSolicitado = parametros.get("servicio");
  if (servicioSolicitado) {
    const opciones = Array.from(servicio.options);
    if (opciones.some(function (opcion) { return opcion.value === servicioSolicitado; })) {
      servicio.value = servicioSolicitado;
    }
  }

  const campos = formulario.querySelectorAll("input, select, textarea");
  campos.forEach(function (campo) {
    campo.addEventListener("input", function () {
      campo.classList.remove("is-invalid");
    });
    campo.addEventListener("change", function () {
      campo.classList.remove("is-invalid");
    });
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); 
    aviso.className = "mensaje-formulario";
    aviso.textContent = "";

    let valido = true;
    campos.forEach(function (campo) {
      if (!campo.checkValidity()) {
        campo.classList.add("is-invalid");
        valido = false;
      } else {
        campo.classList.remove("is-invalid");
      }
    });

    
    const nombreCampo = document.querySelector("#nombre");
    const comentarioCampo = document.querySelector("#comentarios");
    if (nombreCampo.value.trim().length < 3) {
      nombreCampo.classList.add("is-invalid");
      valido = false;
    }
    if (comentarioCampo.value.trim().length < 10) {
      comentarioCampo.classList.add("is-invalid");
      valido = false;
    }

    
    if (fecha.value && fecha.value < fecha.min) {
      fecha.classList.add("is-invalid");
      valido = false;
    }

    if (!valido) {
      aviso.className = "mensaje-formulario mostrar error";
      aviso.textContent = "Revisa los campos señalados antes de continuar.";
      const primerError = formulario.querySelector(".is-invalid");
      if (primerError) primerError.focus();
      if (typeof Swal !== "undefined") {
        Swal.fire({icon: "warning", title: "Faltan algunos datos", text: "Revisa los campos marcados en el formulario.", confirmButtonColor: "#153830"});
      }
      return;
    }

    const nombre = document.querySelector("#nombre").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const bicicleta = document.querySelector("#bicicleta").value;
    const horario = document.querySelector("#horario").value;
    const comentarios = document.querySelector("#comentarios").value.trim();

    const mensaje = "Hola, me gustaría solicitar una revisión en BiciPoint.\n\n" +
      "Nombre: " + nombre + "\n" +
      "Teléfono: " + telefono + "\n" +
      "Tipo de bici: " + bicicleta + "\n" +
      "Servicio: " + servicio.value + "\n" +
      "Fecha preferida: " + fecha.value + "\n" +
      "Horario: " + horario + "\n" +
      "Comentarios: " + comentarios + "\n\n" +
      "Quedo pendiente de confirmar disponibilidad. Gracias.";

    const numeroTaller = "";
    let enlace = "https://wa.me/?text=" + encodeURIComponent(mensaje);
    if (numeroTaller !== "") {
      enlace = "https://wa.me/" + numeroTaller + "?text=" + encodeURIComponent(mensaje);
    }

    aviso.className = "mensaje-formulario mostrar correcto";
    aviso.textContent = "¡Datos correctos! Se abrirá WhatsApp con tu solicitud. Elige el contacto y presiona Enviar.";

    
    const ventana = window.open(enlace, "_blank");
    if (ventana) { ventana.opener = null; }
    if (!ventana) {
      
      aviso.textContent = "Tu navegador bloqueó la nueva pestaña. Haz clic en el enlace que aparece abajo.";
      const enlaceManual = document.createElement("a");
      enlaceManual.href = enlace;
      enlaceManual.target = "_blank";
      enlaceManual.rel = "noopener noreferrer";
      enlaceManual.textContent = "Abrir WhatsApp";
      enlaceManual.className = "d-block mt-2 fw-bold";
      aviso.appendChild(enlaceManual);
    }
  });
}
