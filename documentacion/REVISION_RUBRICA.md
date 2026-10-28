# Revisión de BiciPoint contra la rúbrica

Fecha de revisión: 27 de octubre de 2026, hora de Ciudad de México.

URL verificada: https://25301277-collab.github.io/BiciPoint/

Referencia: `indicaciones.docx`, recuperado de Descargas. Se aplicaron los requisitos 2.1 y 2.2 y los criterios 3.1 a 3.7 de la matriz. Esta revisión presenta evidencia técnica; no asigna una calificación ni sustituye la evaluación de la profesora.

## Resultado por criterio

| Criterio | Evidencia y resultado |
| --- | --- |
| 3.1 Individualidad, originalidad y tema único (10%) | No se puede validar técnicamente el registro del tema, la exclusividad en el grupo o la autoría individual absoluta. La revisión y las correcciones tuvieron apoyo de Codex. El estudiante debe confirmar las condiciones académicas y explicar el código. No se contactó a la profesora ni se registró un tema en su nombre. |
| 3.2 Multipágina y HTML5 (15%) | Cinco páginas independientes: Inicio, Servicios, Precios, Nosotros y Agendar cita. Navegación común y página activa indicada con `aria-current`. Idioma español, UTF-8, viewport, título y descripción en las cinco. Cabecera, navegación, contenido principal, secciones y pie semánticos; artículos en servicios y precios. Todas las imágenes tienen `alt`; los logotipos decorativos usan `alt` vacío. Verificador: 136 referencias locales válidas, sin ID duplicados ni anclas rotas. |
| 3.3 Bootstrap responsive (20%) | Bootstrap 5.3.6 local, `.container`, `.row`, columnas por tamaños y utilidades Flexbox. Las 25 combinaciones locales de cinco páginas a 320, 390, 768, 1024 y 1440 px quedaron sin desbordamiento horizontal. Se corrigió un exceso inicial de 12 px en filas con `g-5`. Las tarjetas de precios usan dos columnas en tableta y tres en escritorio. En publicación se repitieron 15 combinaciones a 390, 768 y 1440 px, también sin desbordamiento. |
| 3.4 Color, tipografía y usabilidad (15%) | Paleta conservada: verde, naranja, crema y gris. DM Sans y Outfit mediante Google Fonts, con Arial como alternativa. Comprobación de contraste de los pares principales, revisión visual en escritorio, móvil y tableta; foco visible, enlace para saltar al contenido, reducción de movimiento y blancos táctiles de los enlaces de las tarjetas. Esto no constituye una auditoría WCAG completa. |
| 3.5 Formulario y JavaScript (20%) | Ocho controles: nombre, teléfono, tipo de bici, servicio, fecha, horario, descripción y consentimiento. HTML5 y JS validan obligatoriedad, límites, 10 dígitos, nombre con letras, comentario no vacío y fecha local desde hoy. El envío usa `preventDefault`, `querySelector`, `querySelectorAll`, `addEventListener` y `classList`. Errores asociados mediante `aria-describedby` y `aria-invalid`, avisos dinámicos, resumen de texto y foco al primer error. Los datos nunca se declaran enviados al preparar el mensaje. |
| 3.6 Tecnología adicional (10%) | SweetAlert2 11.26.25 muestra errores del formulario y devuelve el foco al primer campo incorrecto. Bootstrap Icons 1.13.1 carga y se utiliza en la interfaz. Ambas bibliotecas, Bootstrap y las fotografías se sirven desde el mismo sitio. Las licencias de las bibliotecas están incluidas. Filtros con conteo anunciado, preselección por URL y acordeón añaden interacción funcional. |
| 3.7 Hosting y versiones (10%) | GitHub Pages respondió con las cinco páginas públicas. El despliegue del commit de correcciones terminó en `success`. Se comprobaron 23 recursos públicos: HTTP 200 y SHA-256 idéntico a los archivos locales. Se conserva el commit inicial y se añaden cambios reales de corrección y documentación, sin alterar fechas ni fabricar un historial previo. El historial anterior tenía un solo commit; su continuidad a lo largo del curso queda a valoración de la profesora. |

## Pruebas realizadas

- Contrastes calculados de la paleta: naranja sobre crema 4.84:1; blanco sobre naranja 5.14:1; gris sobre crema 5.41:1. Superan 4.5:1 en esos pares de texto principal.
- Sintaxis de `js/funciones.js`: correcta con Node.js.
- `python scripts/verificar.py`: cinco páginas y 136 referencias locales correctas; navegación, semántica básica, metadatos, imágenes, ID y anclas comprobados.
- Filtros: Ajustes muestra tres servicios, Mantenimiento muestra tres y Todos muestra seis; una sola selección activa y contador coherente.
- Enlace desde una tarjeta: preselecciona exactamente el servicio solicitado en Citas.
- Menú móvil: se abre, actualiza `aria-expanded` y permite navegar a Precios.
- Acordeón: cambia el estado expandido y muestra la respuesta elegida.
- Formulario vacío: ocho campos inválidos, sin resumen ni enlace de WhatsApp. SweetAlert2 aparece y, al cerrarlo, el foco vuelve a Nombre.
- Nombre numérico, teléfono corto, fecha pasada y comentario con espacios: rechazados y señalados individualmente.
- Datos de prueba válidos: resumen visible, sin errores, foco en el resumen y enlace de WhatsApp con caracteres especiales codificados. El resumen no interpreta HTML.
- Cambiar un campo después de preparar: oculta el resumen y elimina el enlace anterior.
- En el sitio público: filtro con teclado, servicio preseleccionado, consentimiento obligatorio y solicitud válida comprobados con datos sintéticos. No se enviaron mensajes ni se crearon citas.
- Durante las comprobaciones del navegador no se registraron advertencias ni errores de consola.
- Las cuatro fotografías originales son de 768 × 512 px; se conservan comprimidas, con dimensiones declaradas y carga diferida salvo la imagen principal.

## Evidencias

Las capturas de `evidencias/` provienen de la URL pública:

- `vista-escritorio.jpg` e `inicio-escritorio.jpg`: vista inicial y página completa en escritorio.
- `vista-movil.jpg` e `inicio-movil.jpg`: vista inicial y página completa en móvil.
- `precios-tableta.jpg`: distribución de precios en tableta.
- `formulario-valido.jpg`: solicitud preparada con datos sintéticos en el sitio publicado.
- `responsive.json`: 25 comprobaciones locales finales; `publicacion.json`: 15 comprobaciones del sitio público.
- `formulario.json`, `interacciones.json`: casos de prueba de la vista previa.
- `interacciones-publicas.json`: casos repetidos sobre la publicación.
- `recursos-publicados.json`: disponibilidad y coincidencia de los 23 recursos.

## Alcance del contacto

No se recibió un teléfono real de BiciPoint. El visitante prepara el mensaje, revisa sus datos y abre WhatsApp para elegir un contacto. El envío y la confirmación de disponibilidad ocurren allí, por decisión del visitante. No hay servidor de reservas, base de datos, seguimiento comercial ni envío automático. Para un taller en operación se debe configurar y verificar su número real y actualizar los textos.

## Explicación de las decisiones

El servicio que se busca facilitar es identificar una reparación y preparar una solicitud sin crear una cuenta. Los títulos, los servicios con precios orientativos y los botones «Agendar revisión» comunican esa tarea. La separación en cinco páginas permite consultar detalles sin sobrecargar la portada. Bootstrap cambia las columnas según el espacio; el menú compacto mantiene accesibles las cinco páginas en móvil.

La validación explica qué corregir sin perder los datos escritos. El resumen permite revisar el texto antes de compartirlo y evita confundir una solicitud con una cita confirmada. No se añadieron testimonios ni cifras de clientes sin evidencia. Para un negocio real, las mejoras siguientes serían verificar su contacto y disponibilidad y medir visitas, clics para agendar y solicitudes efectivamente recibidas; esas mediciones no están implementadas ni se presentan como resultados.
