"use strict";

// Vacío: el visitante elige contacto. Taller real: país y número sin + ni espacios.
const numeroTaller = "";
const botonesFiltro = document.querySelectorAll(".filtro-servicio");
const tarjetas = document.querySelectorAll(".servicio-item");
const estadoServicios = document.querySelector("#estadoServicios");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const filtro = boton.dataset.filtro;
    let visibles = 0;
    botonesFiltro.forEach(function (otro) {
      otro.classList.toggle("filtro-activo", otro === boton);
      otro.setAttribute("aria-pressed", String(otro === boton));
    });
    tarjetas.forEach(function (tarjeta) {
      const mostrar = filtro === "todos" || tarjeta.dataset.categoria === filtro;
      tarjeta.hidden = !mostrar;
      if (mostrar) visibles += 1;
    });
    if (estadoServicios) {
      estadoServicios.textContent = visibles + " servicios disponibles: " + boton.textContent.trim() + ".";
    }
  });
});

const formulario = document.querySelector("#formCita");
if (formulario) {
  const campos = formulario.querySelectorAll("input, select, textarea");
  const fecha = formulario.querySelector("#fecha");
  const servicio = formulario.querySelector("#servicio");
  const nombre = formulario.querySelector("#nombre");
  const comentarios = formulario.querySelector("#comentarios");
  const aviso = formulario.querySelector("#mensajeFormulario");
  const resultado = formulario.querySelector("#solicitudPreparada");
  const resumen = formulario.querySelector("#resumenSolicitud");
  const enlace = formulario.querySelector("#abrirWhatsApp");

  function actualizarFechaMinima() {
    const hoy = new Date();
    fecha.min = hoy.getFullYear() + "-" + String(hoy.getMonth() + 1).padStart(2, "0") +
      "-" + String(hoy.getDate()).padStart(2, "0");
  }
  function borrarSolicitud() {
    resultado.hidden = true;
    resumen.textContent = "";
    enlace.removeAttribute("href");
    aviso.className = "mensaje-formulario";
    aviso.textContent = "";
  }

  actualizarFechaMinima();
  const solicitado = new URLSearchParams(window.location.search).get("servicio");
  if (Array.from(servicio.options).some(function (opcion) {
    return opcion.value !== "" && opcion.value === solicitado;
  })) servicio.value = solicitado;

  campos.forEach(function (campo) {
    function editarCampo() {
      campo.setCustomValidity("");
      campo.classList.remove("is-invalid");
      campo.setAttribute("aria-invalid", "false");
      borrarSolicitud();
    }
    campo.addEventListener("input", editarCampo);
    campo.addEventListener("change", editarCampo);
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    borrarSolicitud();
    actualizarFechaMinima();
    nombre.setCustomValidity("");
    comentarios.setCustomValidity("");
    const letras = nombre.value.match(/\p{L}/gu) || [];
    if (nombre.value.trim().length < 3 || letras.length < 3) {
      nombre.setCustomValidity("Escribe un nombre con al menos 3 letras.");
    }
    if (comentarios.value.trim().length < 10) {
      comentarios.setCustomValidity("Describe la falla con al menos 10 caracteres.");
    }
    campos.forEach(function (campo) {
      const invalido = !campo.checkValidity();
      campo.classList.toggle("is-invalid", invalido);
      campo.setAttribute("aria-invalid", String(invalido));
    });
    const primerError = formulario.querySelector(".is-invalid");
    if (primerError) {
      aviso.className = "mensaje-formulario mostrar error";
      aviso.textContent = "Revisa los campos señalados antes de preparar la solicitud.";
      if (typeof Swal !== "undefined") {
        Swal.fire({icon: "warning", title: "Revisa tu solicitud",
          text: "Corrige los campos señalados. Aún no se ha enviado ningún dato.",
          confirmButtonText: "Revisar datos", confirmButtonColor: "#153830", returnFocus: false
        }).then(function () { primerError.focus(); });
      } else primerError.focus();
      return;
    }

    const mensaje = "Hola, me gustaría solicitar una revisión en BiciPoint.\n\n" +
      "Nombre: " + nombre.value.trim() + "\n" +
      "Teléfono: " + formulario.querySelector("#telefono").value + "\n" +
      "Tipo de bici: " + formulario.querySelector("#bicicleta").value + "\n" +
      "Servicio: " + servicio.value + "\n" + "Fecha preferida: " + fecha.value + "\n" +
      "Horario: " + formulario.querySelector("#horario").value + "\n" +
      "Comentarios: " + comentarios.value.trim() + "\n\n" +
      "Quedo pendiente de confirmar disponibilidad. Gracias.";
    // textContent conserva literalmente las entradas, sin interpretar HTML.
    resumen.textContent = mensaje;
    const destinatario = /^[1-9][0-9]{7,14}$/.test(numeroTaller) ? numeroTaller : "";
    enlace.href = "https://wa.me/" + destinatario + "?text=" + encodeURIComponent(mensaje);
    resultado.hidden = false;
    aviso.className = "mensaje-formulario mostrar correcto";
    aviso.textContent = "Solicitud preparada. Revisa el resumen y abre WhatsApp cuando quieras continuar. Todavía no se ha enviado.";
    formulario.querySelector("#tituloSolicitud").focus();
  });

  formulario.addEventListener("reset", function () {
    campos.forEach(function (campo) {
      campo.setCustomValidity("");
      campo.classList.remove("is-invalid");
      campo.setAttribute("aria-invalid", "false");
    });
    borrarSolicitud();
  });
  // Sin JS, el botón queda desactivado y el aviso noscript explica el motivo.
  formulario.noValidate = true;
  formulario.querySelector('button[type="submit"]').disabled = false;
}
