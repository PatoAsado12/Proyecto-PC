document.addEventListener("DOMContentLoaded", function () {
    const estrellas = document.querySelectorAll("#estrellas span");
    const mensaje = document.getElementById("mensaje-valoracion");
    const botonEnviar = document.getElementById("enviarValoracion");
    const comentario = document.getElementById("comentario");
    let valorSeleccionado = 0;
  
    estrellas.forEach((estrella, index) => {
      estrella.addEventListener("click", () => {
        valorSeleccionado = index + 1;
        actualizarEstrellas(valorSeleccionado);
      });
  
      estrella.addEventListener("mouseover", () => {
        actualizarEstrellas(index + 1);
      });
  
      estrella.addEventListener("mouseout", () => {
        actualizarEstrellas(valorSeleccionado);
      });
    });
  
    function actualizarEstrellas(valor) {
      estrellas.forEach((estrella, i) => {
        estrella.classList.toggle("activa", i < valor);
      });
    }
  
    botonEnviar.addEventListener("click", () => {
      if (valorSeleccionado === 0 || comentario.value.trim() === "") {
        mensaje.textContent = "Por favor, selecciona una puntuación y escribe un comentario.";
        mensaje.style.color = "red";
      } else {
        mensaje.textContent = `Gracias por tu reseña de ${valorSeleccionado} estrella${valorSeleccionado > 1 ? 's' : ''}.`;
        mensaje.style.color = "green";
        comentario.value = "";
        actualizarEstrellas(0);
        valorSeleccionado = 0;
      }
    });
  });
  