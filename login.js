const container = document.querySelector('.container');

const registerBtn = document.querySelector('.register-btn');

const loginBtn = document.querySelector('.login-btn');



registerBtn.addEventListener('click', () => {

    container.classList.add('active');

})



loginBtn.addEventListener('click', () => {

    container.classList.remove('active');

})



document.addEventListener('DOMContentLoaded', function () {

    // Obtener referencias a elementos del DOM

    const container = document.querySelector('.container');



    // Seleccionar los formularios

    const loginForm = document.getElementById('loginForm') || document.querySelector('.login form');

    const registerForm = document.getElementById('registerForm') || document.querySelector('.register form');



    // URL base de la API

    const API_URL = 'http://localhost:3000/api';







    // Manejar el envío del formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Obtener valores del formulario

        const nombre_usuario = registerForm.querySelector('input[type="text"]').value;
        const correo = registerForm.querySelector('input[type="email"]').value;
        const contraseña = registerForm.querySelector('input[type="password"]').value;
        try {

            // Enviar solicitud al servidor

            const response = await fetch(`${API_URL}/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({
                    nombre_usuario,
                    correo,
                    contraseña

                })

            });



            if (response.ok) {
                alert('Usuario registrado correctamente');
                // Limpiar formulario
                registerForm.reset();
                // Cambiar a formulario de login
                container.classList.remove('active');
            } else {
                const errorData = await response.text();
                alert(`Error: ${errorData} `);
            }

        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error de conexión al servidor');
        }

    });



    //LOGIN DE LA PAGINA

     // Manejar el envío del formulario de registro
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Obtener valores del formulario

        const nombre_usuario = loginForm.querySelector('input[type="text"]').value;
        const contraseña = loginForm.querySelector('input[type="password"]').value;
        try {

            // Enviar solicitud al servidor

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({
                    nombre_usuario,
                    contraseña

                })

            });



            if (response.ok) {
                alert('Login exitoso');
                window.location.href = 'innovative.html';
                // Limpiar formulario
                loginForm.reset();
                // Cambiar a formulario de login
                container.classList.remove('active');
            } else {
                const errorData = await response.text();
                alert(`Error: ${errorData} `);
            }

        } catch (error) {
            console.error('Error al iniciar sesion:', error);
            alert('Error de conexión al servidor');
        }

    });

});

