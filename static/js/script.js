// Animación de scroll para elementos
document.addEventListener('DOMContentLoaded', function() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase slide-up
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll para el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const fraseSection = document.querySelector('.frase-religiosa');
            if (fraseSection) {
                fraseSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Manejo del formulario de confirmación
    const form = document.getElementById('confirmacionForm');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                asistira: true
            };

            // Validación básica
            if (!formData.nombre) {
                mostrarMensaje('Por favor, ingresa tu nombre completo.', 'error');
                return;
            }

            // Deshabilitar botón durante el envío
            const submitBtn = form.querySelector('.btn-submit');
            const btnTextOriginal = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/confirmar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    mostrarMensaje(data.message, 'success');
                    form.reset();

                    // Celebración con confetti (si tienes la librería)
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                } else {
                    mostrarMensaje(data.message || 'Error al confirmar la asistencia.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarMensaje('Error al procesar tu solicitud. Por favor, intenta de nuevo.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.innerHTML = btnTextOriginal;
                submitBtn.disabled = false;
            }
        });
    }

    // Efecto parallax suave solo en el hero (sin afectar la imagen de perfil)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Contador regresivo (opcional)
    function actualizarContador() {
        const fechaEvento = new Date('2026-01-10T14:00:00');
        const ahora = new Date();
        const diferencia = fechaEvento - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            // Puedes agregar un elemento en el HTML para mostrar el contador
            const contadorElement = document.getElementById('contador');
            if (contadorElement) {
                contadorElement.innerHTML = `
                    <div class="countdown">
                        <div class="countdown-item">
                            <span class="countdown-value">${dias}</span>
                            <span class="countdown-label">Días</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value">${horas}</span>
                            <span class="countdown-label">Horas</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value">${minutos}</span>
                            <span class="countdown-label">Minutos</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value">${segundos}</span>
                            <span class="countdown-label">Segundos</span>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Actualizar contador cada segundo si existe el elemento
    if (document.getElementById('contador')) {
        actualizarContador();
        setInterval(actualizarContador, 1000);
    }

    // Animación de números para cantidad de invitados
    const cantidadInput = document.getElementById('cantidad_invitados');
    if (cantidadInput) {
        cantidadInput.addEventListener('change', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Efecto de hover en las tarjetas
    const cards = document.querySelectorAll('.info-card, .familia-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Prevenir zoom en inputs en móviles
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
    }

    // Easter egg: Doble click en la cruz del hero
    const crossIcon = document.querySelector('.cross-icon');
    if (crossIcon) {
        crossIcon.addEventListener('dblclick', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'glow 2s ease-in-out infinite';
            }, 10);
        });
    }
});

// Función para compartir por WhatsApp
function compartir(red) {
    const url = window.location.href;
    const texto = '🕊️ Te invito a mi Confirmación - Marcel Vladimir Pilaloa Ruiz\n\n📅 Sábado, 10 de enero - 2:00 p.m.\n📍 Machala, El Oro, Ecuador\n\n';

    if (red === 'whatsapp') {
        const mensajeCompleto = texto + url;
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeCompleto)}`;
        window.open(shareUrl, '_blank');
    }
}

// Función para agregar al calendario
function agregarAlCalendario() {
    // Datos del evento
    const evento = {
        titulo: 'Confirmación de Marcel Vladimir Pilaloa Ruiz',
        descripcion: 'Celebración de Mi Confirmación. No olvides traer tu traje de baño para pasar una tarde de piscina.',
        ubicacion: 'Paez y 8va C Norte Esq., Machala, El Oro, Ecuador',
        fechaInicio: '20260110T140000', // 10 de enero de 2026, 2:00 PM
        fechaFin: '20260110T180000',    // 10 de enero de 2026, 6:00 PM (duración estimada 4 horas)
        url: 'https://maps.app.goo.gl/oxqdnC5pCm4ic9D77'
    };

    // Crear contenido del archivo .ics
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Confirmación Marcel//ES',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${evento.fechaInicio}`,
        `DTEND:${evento.fechaFin}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `UID:${evento.fechaInicio}@confirmacion-marcel.com`,
        `SUMMARY:${evento.titulo}`,
        `DESCRIPTION:${evento.descripcion}`,
        `LOCATION:${evento.ubicacion}`,
        `URL:${evento.url}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-P1D', // Recordatorio 1 día antes
        'ACTION:DISPLAY',
        'DESCRIPTION:Recordatorio: Confirmación de Marcel mañana',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Crear blob y descargar
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'confirmacion-marcel.ics';

    // Simular click para descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensaje de confirmación
    alert('📅 Evento descargado. Abre el archivo para agregarlo a tu calendario.');
}

// Función para "No asistiré"
async function noAsistire() {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();

    if (!nombre) {
        mostrarMensaje('Por favor, ingresa tu nombre completo.', 'error');
        return;
    }

    // Confirmar que realmente no asistirá
    if (!confirm('¿Estás seguro de que no podrás asistir?')) {
        return;
    }

    const formData = {
        nombre: nombre,
        asistira: false
    };

    try {
        const response = await fetch('/confirmar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            mostrarMensaje('Gracias por informarnos. ¡Esperamos verte en otra ocasión!', 'success');
            document.getElementById('confirmacionForm').reset();
        } else {
            mostrarMensaje(data.message || 'Error al procesar tu respuesta.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al procesar tu solicitud. Por favor, intenta de nuevo.', 'error');
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');
    mensajeRespuesta.textContent = mensaje;
    mensajeRespuesta.className = `mensaje-respuesta ${tipo}`;
    mensajeRespuesta.style.display = 'block';

    // Scroll suave al mensaje
    mensajeRespuesta.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Ocultar mensaje después de 5 segundos si es éxito
    if (tipo === 'success') {
        setTimeout(() => {
            mensajeRespuesta.style.display = 'none';
        }, 5000);
    }
}
