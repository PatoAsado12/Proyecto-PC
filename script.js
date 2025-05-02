document.addEventListener('DOMContentLoaded', () => {
    // Existing search filtering for itemList (if present)
    const searchInput = document.getElementById('searchInput');

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Toggle icon
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
        } else {
            darkModeToggle.textContent = '🌙';
        }
    });

    // Product data for innovative page
    const products = [
        { id: 1, name: 'Procesador Intel i7', category: 'componentes', price: 320, image: 'https://via.placeholder.com/200x150?text=Procesador+i7', description: 'Procesador de alto rendimiento para gaming y trabajo.' },
        { id: 2, name: 'Memoria RAM 16GB', category: 'componentes', price: 120, image: 'https://via.placeholder.com/200x150?text=RAM+16GB', description: 'Memoria rápida y confiable para multitarea.' },
        { id: 3, name: 'Teclado Mecánico', category: 'perifericos', price: 80, image: 'https://via.placeholder.com/200x150?text=Teclado+Mecánico', description: 'Teclado con retroiluminación y teclas programables.' },
        { id: 4, name: 'Mouse Gamer', category: 'perifericos', price: 50, image: 'https://via.placeholder.com/200x150?text=Mouse+Gamer', description: 'Mouse ergonómico con alta precisión.' },
        { id: 5, name: 'Monitor 24"', category: 'accesorios', price: 200, image: 'https://via.placeholder.com/200x150?text=Monitor+24"', description: 'Monitor Full HD con colores vibrantes.' },
        { id: 6, name: 'Auriculares Bluetooth', category: 'accesorios', price: 70, image: 'https://via.placeholder.com/200x150?text=Auriculares+Bluetooth', description: 'Auriculares inalámbricos con cancelación de ruido.' },
        { id: 7, name: 'Disco SSD 1TB', category: 'componentes', price: 150, image: 'https://via.placeholder.com/200x150?text=SSD+1TB', description: 'Almacenamiento rápido y confiable.' },
        { id: 8, name: 'Webcam HD', category: 'perifericos', price: 60, image: 'https://via.placeholder.com/200x150?text=Webcam+HD', description: 'Cámara para videollamadas con alta definición.' },
        { id: 9, name: 'Tarjeta de Video RTX4060', category: 'componentes', price: 1099, image: 'https://via.placeholder.com/200x150?text=Webcam+HD', description: 'Tarjeta de video apto para juegos de alta gama' }
    ];

    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');

    let currentCategory = 'all';
    let currentSearch = '';

    // Render products based on filters and sorting
    function renderProducts() {
        let filteredProducts = products.filter(product => {
            const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        productGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Filter button click
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            renderProducts();
        });
    });

    // Sort select change
    sortSelect.addEventListener('change', () => {
        renderProducts();
    });

    // Search input filtering
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        renderProducts();
    });

    // Initial render
    renderProducts();

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (email === '') {
            newsletterMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
            newsletterMessage.style.color = 'red';
            return;
        }
        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterMessage.textContent = 'Correo electrónico no válido.';
            newsletterMessage.style.color = 'red';
            return;
        }
        newsletterMessage.textContent = '¡Gracias por suscribirte!';
        newsletterMessage.style.color = 'green';
        newsletterForm.reset();
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            contactMessage.textContent = 'Por favor, completa todos los campos.';
            contactMessage.style.color = 'red';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            contactMessage.textContent = 'Correo electrónico no válido.';
            contactMessage.style.color = 'red';
            return;
        }

        contactMessage.textContent = 'Mensaje enviado. ¡Gracias por contactarnos!';
        contactMessage.style.color = 'green';
        contactForm.reset();
    });

    // Sticky navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Chatbox functionality
    const chatbox = document.getElementById('chatbox');
    const chatboxOpenBtn = document.getElementById('chatboxOpenBtn');
    const chatboxToggleBtn = document.getElementById('chatboxToggle');
    const chatboxForm = document.getElementById('chatboxForm');
    const chatboxInput = document.getElementById('chatboxInput');
    const chatboxMessages = document.getElementById('chatboxMessages');

    // Toggle chatbox open/close
    function toggleChatbox() {
        const isClosed = chatbox.classList.contains('closed');
        if (isClosed) {
            chatbox.classList.remove('closed');
            chatboxToggleBtn.setAttribute('aria-label', 'Cerrar chat');
            chatboxToggleBtn.parentElement.setAttribute('aria-expanded', 'true');
            chatboxInput.focus();
        } else {
            chatbox.classList.add('closed');
            chatboxToggleBtn.setAttribute('aria-label', 'Abrir chat');
            chatboxToggleBtn.parentElement.setAttribute('aria-expanded', 'false');
        }
    }

    chatboxOpenBtn.addEventListener('click', () => {
        toggleChatbox();
    });

    chatboxToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChatbox();
    });

    chatboxToggleBtn.parentElement.addEventListener('click', () => {
        toggleChatbox();
    });

    // Predefined responses for peripherals and components
    const responses = [
        { keywords: ['procesador', 'cpu'], answer: 'El procesador es el cerebro de la computadora, encargado de ejecutar instrucciones.' },
        { keywords: ['ram', 'memoria'], answer: 'La memoria RAM es la memoria de acceso rápido que usa la computadora para ejecutar programas.' },
        { keywords: ['disco', 'ssd', 'almacenamiento'], answer: 'El disco SSD es un dispositivo de almacenamiento rápido y confiable para guardar datos.' },
        { keywords: ['tarjeta de video', 'gpu', 'gráfica'], answer: 'La tarjeta de video procesa los gráficos y es esencial para juegos y diseño.' },
        { keywords: ['teclado'], answer: 'El teclado es un periférico de entrada para escribir y controlar la computadora.' },
        { keywords: ['mouse', 'ratón'], answer: 'El mouse es un periférico de entrada que permite controlar el cursor en la pantalla.' },
        { keywords: ['monitor', 'pantalla'], answer: 'El monitor es el dispositivo de salida que muestra la imagen generada por la computadora.' },
        { keywords: ['auriculares', 'audífonos'], answer: 'Los auriculares permiten escuchar audio de la computadora de forma privada.' },
        { keywords: ['webcam', 'cámara'], answer: 'La webcam es una cámara para videollamadas y grabación de video.' },
        { keywords: ['periféricos'], answer: 'Los periféricos son dispositivos externos como teclado, mouse, impresoras, etc.' },
        { keywords: ['componentes'], answer: 'Los componentes son partes internas como procesador, memoria, disco, tarjeta gráfica, etc.' },
        { keywords: ['ayuda', 'hola', 'hola'], answer: 'Hola! Puedes preguntarme sobre periféricos y componentes para computadoras.' }
    ];

    // Function to add message to chatbox
    function addMessage(text, sender) {
        const messageElem = document.createElement('div');
        messageElem.classList.add('chat-message', sender);
        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = text;
        messageElem.appendChild(messageText);
        chatboxMessages.appendChild(messageElem);
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }

    // Function to get response based on user input
    function getResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const resp of responses) {
            for (const keyword of resp.keywords) {
                if (lowerInput.includes(keyword)) {
                    return resp.answer;
                }
            }
        }
        return 'Lo siento, no tengo información sobre eso. Por favor, pregunta sobre periféricos o componentes para computadoras.';
    }

    // Handle chatbox form submission
    chatboxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatboxInput.value.trim();
        if (userInput === '') return;
        addMessage(userInput, 'user');
        chatboxInput.value = '';
        const botResponse = getResponse(userInput);
        setTimeout(() => {
            addMessage(botResponse, 'bot');
        }, 500);
    });
});
