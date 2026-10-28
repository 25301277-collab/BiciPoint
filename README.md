# BiciPoint

Sitio escolar demostrativo de un taller de bicicletas, con cinco páginas independientes y navegación común.

**Sitio público:** https://25301277-collab.github.io/BiciPoint/

## Páginas y archivos

- `index.html`: presentación, beneficios y llamadas a solicitar revisión.
- `servicios.html`: seis servicios con filtros de ajustes y mantenimiento.
- `precios.html`: tres paquetes ilustrativos y preguntas frecuentes con Bootstrap.
- `nosotros.html`: propósito de la propuesta y funcionamiento.
- `citas.html`: formulario de ocho campos, resumen de solicitud y enlace a WhatsApp.
- `css/estilos.css`, `js/funciones.js`: presentación e interacción separadas del HTML.
- `libs/`: Bootstrap 5.3.6, Bootstrap Icons 1.13.1 y SweetAlert2 11.26.25, con sus licencias.
- `documentacion/REVISION_RUBRICA.md`: revisión por criterio, pruebas y límites de verificación.
- `evidencias/`: capturas y resultados de las pruebas realizadas.

## Abrir en Visual Studio Code

Abre esta carpeta con **Archivo → Abrir carpeta**. No necesita compilación ni instalación de paquetes. Puedes usar Live Server o ejecutar `python -m http.server 8000` si tienes Python y abrir `http://localhost:8000`.

Para comprobar estructura y rutas: `python scripts/verificar.py`. Para comprobar sintaxis JavaScript, si tienes Node.js: `node --check js/funciones.js`.

## Formulario y WhatsApp

1. Completa los datos, acepta la condición y pulsa **Preparar mensaje de WhatsApp**.
2. Los errores se indican junto a cada campo y mediante un modal; al cerrarlo, el foco va al primer error.
3. Si los datos son válidos, se muestra un resumen como texto y un enlace explícito.
4. **Abrir WhatsApp con esta solicitud** abre otra pestaña; allí eliges contacto y decides si envías el mensaje.

No se simula un envío exitoso ni una cita confirmada. No hay base de datos ni almacenamiento del formulario. Editar un campo elimina el resumen y el enlace anteriores. Las fechas anteriores al día local actual se rechazan.

No se recibió un número real del taller. El modo demostrativo usa `https://wa.me/?text=...`. Si se desea un destinatario fijo, cambia únicamente `numeroTaller` al principio de `js/funciones.js`, con país y número sin `+`, espacios ni guiones, y actualiza los textos de demostración y privacidad. No inventes un número.

## Publicación y alcance académico

GitHub Pages publica desde la rama `main`. Los commits añadidos corresponden a cambios efectivos de esta revisión; no se alteraron fechas ni se fabricó un historial de desarrollo anterior.

La revisión y las correcciones se realizaron con apoyo de Codex. El estudiante debe comprender el código, revisar las reglas de su asignatura y explicar las decisiones. El registro del tema, su exclusividad y la autorización de apoyo ante la profesora corresponden al estudiante; esta entrega no afirma haberlos realizado ni demuestra autoría individual absoluta.

Los precios y el negocio son ilustrativos. No se añaden testimonios de clientes ni datos de contacto ficticios. Las tipografías usan Google Fonts; las demás bibliotecas y las imágenes se sirven localmente.
