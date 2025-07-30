document.addEventListener('DOMContentLoaded', () => {
    // URLs y configuración
    // ⚠️ IMPORTANTE: Reemplaza esta URL con la de tu Web App desplegado
    const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYxZjqdvLSnhraHL9xrkCEqKt3Lgj6OHFsXsLpgYzOWO36j35vYdpad392ZXVSPQT-Hw/exec'; // Pega aquí la URL que obtienes al desplegar
    
    // Elementos del DOM
    const leadForm = document.getElementById('leadForm');
    const modalForm = document.getElementById('modalForm');
    const modalConfirmacion = document.getElementById('modalConfirmacion');
    const speedTestBtn = document.getElementById('startSpeedTest');
    
    // Botones para abrir modal
    const openModalButtons = document.querySelectorAll('.open-modal-button');
    
    // Elementos del countdown
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Configuración del countdown (7 días desde ahora)
    const countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    
    // Función para abrir modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Función para cerrar modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Si es el modal dinámico, removerlo del DOM
            if (modalId === 'planModal') {
                setTimeout(() => {
                    if (modal && modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
        }
    }
    
    // Hacer la función closeModal global para uso en HTML
    window.closeModal = closeModal;
    
    // Event listeners para abrir modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal('modalForm');
        });
    });

    // Event listeners para cerrar modales principales
    document.addEventListener('DOMContentLoaded', () => {
        // Modal principal
        const modalForm = document.getElementById('modalForm');
        const modalConfirmacion = document.getElementById('modalConfirmacion');
        
        // Event listeners para cerrar modal principal
        if (modalForm) {
            const closeBtn = modalForm.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal('modalForm');
                });
            }
            
            // Cerrar modal principal al hacer clic fuera
            modalForm.addEventListener('click', (e) => {
                if (e.target === modalForm) {
                    closeModal('modalForm');
                }
            });
        }
        
        // Event listeners para cerrar modal de confirmación
        if (modalConfirmacion) {
            const closeBtn = modalConfirmacion.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal('modalConfirmacion');
                });
            }
            
            // Cerrar modal de confirmación al hacer clic fuera
            modalConfirmacion.addEventListener('click', (e) => {
                if (e.target === modalConfirmacion) {
                    closeModal('modalConfirmacion');
                }
            });
        }
        
        // Cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (modalForm && modalForm.style.display === 'flex') {
                    closeModal('modalForm');
                }
                if (modalConfirmacion && modalConfirmacion.style.display === 'flex') {
                    closeModal('modalConfirmacion');
                }
                const planModal = document.getElementById('planModal');
                if (planModal && planModal.style.display === 'flex') {
                    closeModal('planModal');
                }
            }
        });
    });

    // Event listeners para botones con diferentes acciones
    const contactButtons = document.querySelectorAll('.btn-contact');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');

    // Botón de contacto - Abre WhatsApp
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const phoneNumber = '51999999999'; // Reemplaza con tu número
            const message = 'Hola, me interesa el servicio de internet de Claro. ¿Podrían darme más información?';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Botón secundario - Muestra información de planes
    secondaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Verificar si ya existe un modal de planes
            const existingModal = document.getElementById('planModal');
            if (existingModal) {
                existingModal.remove();
            }
            
            // Crear modal de información de planes
            const planInfo = `
                <div class="modal-content">
                    <button class="modal-close" onclick="closeModal('planModal')">&times;</button>
                    <h3>📋 Nuestros Planes de Internet</h3>
                    <div class="plan-info">
                        <div class="plan-item">
                            <h4>🚀 Plan Básico</h4>
                            <p>• 50 Mbps de velocidad</p>
                            <p>• Instalación gratuita</p>
                            <p>• Router WiFi incluido</p>
                        </div>
                        <div class="plan-item">
                            <h4>⚡ Plan Premium</h4>
                            <p>• 200 Mbps de velocidad</p>
                            <p>• Instalación gratuita</p>
                            <p>• Soporte técnico 24/7</p>
                        </div>
                        <div class="plan-item">
                            <h4>🔥 Plan Gaming</h4>
                            <p>• 500 Mbps de velocidad</p>
                            <p>• Latencia ultra baja</p>
                            <p>• Prioridad en gaming</p>
                        </div>
                    </div>
                    <div class="modal-buttons">
                        <button class="btn-modal primary open-modal-button">¡Quiero contratar!</button>
                        <button class="btn-modal secondary close-plan-modal">Cerrar</button>
                    </div>
                </div>
            `;
            
            // Crear modal dinámicamente
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay show';
            modalOverlay.id = 'planModal';
            modalOverlay.innerHTML = planInfo;
            modalOverlay.style.display = 'flex';
            
            document.body.appendChild(modalOverlay);
            document.body.style.overflow = 'hidden';
            
            // Event listeners para cerrar modal
            const closeButtons = modalOverlay.querySelectorAll('.modal-close, .close-plan-modal');
            closeButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal('planModal');
                });
            });
            
            // Event listener para el botón "¡Quiero contratar!"
            const contractButton = modalOverlay.querySelector('.open-modal-button');
            if (contractButton) {
                contractButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal('planModal');
                    setTimeout(() => {
                        openModal('modalForm');
                    }, 300);
                });
            }
            
            // Cerrar modal al hacer clic fuera
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal('planModal');
                }
            });
            
            // Cerrar modal con ESC
            const handleEscKey = (e) => {
                if (e.key === 'Escape') {
                    closeModal('planModal');
                    document.removeEventListener('keydown', handleEscKey);
                }
            };
            document.addEventListener('keydown', handleEscKey);
        });
    });

    // Animaciones adicionales para las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Agregar atributos de accesibilidad
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        card.style.setProperty('--card-index', index);
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Agregar navegación por teclado
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = card.querySelector('.btn-service');
                if (button) {
                    button.click();
                }
            }
        });

        // Agregar animación de entrada con delay escalonado
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Mejorar SEO con datos estructurados dinámicos
    const serviceData = [
        {
            name: "Internet Hogar Premium",
            description: "Plan de internet de alta velocidad con velocidades de 20 Mbps a 1000 Mbps, instalación gratuita y soporte técnico 24/7",
            category: "Residencial",
            features: ["Alta velocidad", "Instalación gratuita", "Soporte 24/7", "Velocidad simétrica", "Datos ilimitados"]
        },
        {
            name: "Fibra Óptica + TV Digital",
            description: "Plan combinado de internet ultra rápido y TV digital con más de 300 canales HD, streaming incluido y grabación en la nube",
            category: "Entretenimiento",
            features: ["Internet ultra rápido", "300 canales HD", "Streaming incluido", "Grabación en la nube"]
        },
        {
            name: "Internet Empresarial",
            description: "Soluciones profesionales de internet para negocios con SLA 99.9% garantizado, IP fija y soporte técnico prioritario especializado",
            category: "Empresarial",
            features: ["SLA 99.9%", "IP fija", "Soporte prioritario", "Ancho de banda dedicado"]
        },
        {
            name: "Internet Gaming Ultra",
            description: "Internet optimizado para gaming profesional con latencia ultra baja, ping menor a 10ms y priorización de tráfico gaming automática",
            category: "Gaming",
            features: ["Latencia ultra baja", "Ping < 10ms", "Priorización gaming", "Servidores dedicados"]
        },
        {
            name: "Soporte Técnico 24/7 y Garantía de Servicio",
            description: "Servicio de soporte técnico disponible 24/7 con garantía de visita técnica en menos de 48 horas y servicio sin costo dentro del periodo de garantía",
            category: "Soporte",
            features: ["Atención 24/7", "Visita en 48h", "Servicio sin costo", "Múltiples canales"]
        },
        {
            name: "Instalación Profesional y Rápida",
            description: "Instalación rápida en 24 a 72 horas con técnicos certificados, equipos WiFi modernos incluidos y configuración profesional",
            category: "Instalación",
            features: ["Instalación 24-72h", "Técnicos certificados", "Equipos WiFi incluidos", "Configuración profesional"]
        }
    ];

    // Agregar datos estructurados dinámicos
    serviceCards.forEach((card, index) => {
        const serviceInfo = serviceData[index];
        if (serviceInfo) {
            // Agregar atributos de datos para SEO
            card.setAttribute('data-service-category', serviceInfo.category);
            card.setAttribute('data-service-features', serviceInfo.features.join(', '));
            
            // Agregar microdata adicional
            const title = card.querySelector('h3');
            if (title) {
                title.setAttribute('data-service-name', serviceInfo.name);
            }
        }
    });

    // Tracking de interacciones para analytics
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3')?.textContent || 'Servicio';
            // Aquí se puede agregar tracking de Google Analytics
            console.log(`Usuario interactuó con: ${serviceName}`);
        });
    });

    // Animación para los botones de servicio
    const serviceButtons = document.querySelectorAll('.btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target.id);
        }
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            // Reiniciar countdown a 7 días
            countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
        }
    }
    
    // Actualizar countdown cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Ejecutar inmediatamente
    
    // Speed Test Simulation
    if (speedTestBtn) {
        speedTestBtn.addEventListener('click', () => {
            simulateSpeedTest();
        });
    }
    
    function simulateSpeedTest() {
        const pingCircle = document.querySelector('[data-metric="ping"] .progress-ring-circle');
        const downloadCircle = document.querySelector('[data-metric="download"] .progress-ring-circle');
        const uploadCircle = document.querySelector('[data-metric="upload"] .progress-ring-circle');
        
        const pingValue = document.getElementById('pingValue');
        const downloadValue = document.getElementById('downloadValue');
        const uploadValue = document.getElementById('uploadValue');
        
        // Deshabilitar botón durante la prueba
        speedTestBtn.disabled = true;
        speedTestBtn.textContent = 'Analizando... ⚡';
        
        // Reset valores con animación de fadeOut
        [pingValue, downloadValue, uploadValue].forEach(element => {
            if (element) {
                element.style.transition = 'opacity 0.3s ease';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = '--';
                    element.style.opacity = '1';
                }, 150);
            }
        });
        
        // Reset círculos con animación suave
        [pingCircle, downloadCircle, uploadCircle].forEach(circle => {
            if (circle) {
                circle.style.transition = 'stroke-dashoffset 0.5s ease';
                circle.style.strokeDashoffset = '339.292';
                circle.classList.remove('active');
            }
        });
        
        // Generar datos ficticios impresionantes pero realistas
        const generateAwesomePing = () => Math.floor(Math.random() * 6) + 1; // 1-6ms (excelente)
        const generateAwesomeDownload = () => Math.floor(Math.random() * 401) + 600; // 600-1000 Mbps (increíble)
        const generateAwesomeUpload = () => Math.floor(Math.random() * 301) + 500; // 500-800 Mbps (excelente)
        
        // Animación del ping - primero el círculo, luego el número
        setTimeout(() => {
            speedTestBtn.textContent = 'Midiendo latencia... 📡';
            const ping = generateAwesomePing();
            
            // Llenar el círculo de manera irregular y natural
            animateProgressNatural(pingCircle, 100, 100, () => {
                // Después de llenar el círculo, mostrar el número real
                setTimeout(() => {
                    animateNumber(pingValue, 0, ping, 400);
                    // Ajustar el círculo al valor real con fluctuación natural
                    setTimeout(() => {
                        animateProgressNatural(pingCircle, ping, 50, null);
                    }, 150);
                }, 300);
            });
        }, 200);
        
        // Animación de descarga - primero el círculo, luego el número
        setTimeout(() => {
            speedTestBtn.textContent = 'Probando descarga... ⬇️';
            const download = generateAwesomeDownload();
            
            // Llenar el círculo de manera irregular
            animateProgressNatural(downloadCircle, 100, 100, () => {
                // Después de llenar el círculo, mostrar el número real
                setTimeout(() => {
                    animateNumber(downloadValue, 0, download, 600);
                    // Ajustar el círculo al valor real
                    setTimeout(() => {
                        animateProgressNatural(downloadCircle, download, 1000, null);
                    }, 200);
                }, 350);
            });
        }, 1200);
        
        // Animación de subida - primero el círculo, luego el número
        setTimeout(() => {
            speedTestBtn.textContent = 'Probando subida... ⬆️';
            const upload = generateAwesomeUpload();
            
            // Llenar el círculo de manera irregular
            animateProgressNatural(uploadCircle, 100, 100, () => {
                // Después de llenar el círculo, mostrar el número real
                setTimeout(() => {
                    animateNumber(uploadValue, 0, upload, 650);
                    // Ajustar el círculo al valor real
                    setTimeout(() => {
                        animateProgressNatural(uploadCircle, upload, 800, () => {
                            // Efecto final espectacular
                            setTimeout(() => {
                                speedTestBtn.textContent = '¡Increíble velocidad! 🔥';
                                // Efecto de pulso muy sutil en todos los círculos
                                [pingCircle, downloadCircle, uploadCircle].forEach(circle => {
                                    if (circle) {
                                                                                                                            circle.style.filter = 'drop-shadow(0 0 6px rgba(230, 0, 0, 0.3))'; // Muy reducido
                                        circle.style.transform = 'scale(1.02)'; // Muy sutil
                                        circle.style.transition = 'all 0.3s ease';
                                        setTimeout(() => {
                                            circle.style.filter = 'none';
                                            circle.style.transform = 'scale(1)';
                                        }, 800); // Más rápido
                                    }
                                });
                                
                                // Restaurar botón después del efecto
                                setTimeout(() => {
                                    speedTestBtn.disabled = false;
                                    speedTestBtn.textContent = 'Probar Velocidad 🚀';
                                }, 1500);
                            }, 250);
                        });
                    }, 180);
                }, 320);
            });
        }, 2100);
    }
    
    // Nueva función para animaciones naturales e irregulares
    function animateProgressNatural(circle, value, maxValue, callback) {
        if (!circle) return;
        
        circle.classList.add('active');
        const circumference = 339.292;
        const progress = Math.min((value / maxValue) * 100, 100);
        const targetOffset = circumference - (progress / 100) * circumference;
        
        // Animación con fluctuaciones naturales
        let currentOffset = circumference;
        const duration = 1200; // Más tiempo para permitir fluctuaciones
        const steps = 80; // Más pasos para suavidad
        const startTime = performance.now();
        
        function animateStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            
            // Agregar fluctuaciones naturales usando múltiples ondas senoidales
            const baseEasing = 1 - Math.pow(1 - progressRatio, 2.5); // Easing más suave
            
            // Fluctuaciones naturales que simulan conexión real
            const fluctuation1 = Math.sin(progressRatio * Math.PI * 8) * 0.03; // Micro fluctuaciones
            const fluctuation2 = Math.sin(progressRatio * Math.PI * 3) * 0.08; // Fluctuaciones medianas
            const fluctuation3 = Math.sin(progressRatio * Math.PI * 1.5) * 0.05; // Fluctuaciones grandes
            
            // Solo aplicar fluctuaciones durante el 80% del progreso
            const fluctuationIntensity = progressRatio < 0.8 ? 1 : (1 - progressRatio) * 5;
            const totalFluctuation = (fluctuation1 + fluctuation2 + fluctuation3) * fluctuationIntensity;
            
            const naturalProgress = Math.max(0, Math.min(1, baseEasing + totalFluctuation));
            const naturalOffset = circumference - (naturalProgress * (circumference - targetOffset));
            
            circle.style.strokeDashoffset = naturalOffset;
            
            // Efecto de brillo que varía con las fluctuaciones (más sutil)
            const glowIntensity = 1 + Math.abs(totalFluctuation) * 4; // Reducido de 15 a 4
            circle.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(230, 0, 0, 0.15))`; // Reducido opacidad de 0.4 a 0.15
            
            if (progressRatio < 1) {
                requestAnimationFrame(animateStep);
            } else {
                // Terminar en la posición exacta
                circle.style.strokeDashoffset = targetOffset;
                circle.style.filter = 'none';
                if (callback) {
                    setTimeout(callback, 100);
                }
            }
        }
        
        requestAnimationFrame(animateStep);
    }
    
    // Función para animar números de forma natural con variaciones
    function animateNumber(element, start, end, duration) {
        if (!element) return;
        
        // Efecto de aparición dramática del número
        element.style.transform = 'scale(0.7)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.4s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
            
            const startTime = performance.now();
            const difference = end - start;
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing natural con pequeñas variaciones
                const baseEasing = 1 - Math.pow(1 - progress, 2.8);
                
                // Agregar fluctuaciones realistas durante la animación
                let fluctuation = 0;
                if (progress < 0.9) {
                    fluctuation = Math.sin(progress * Math.PI * 12) * 0.1 + 
                                Math.sin(progress * Math.PI * 5) * 0.05;
                }
                
                const naturalProgress = Math.max(0, Math.min(1, baseEasing + fluctuation));
                const current = Math.floor(start + (difference * naturalProgress));
                
                element.textContent = current;
                
                // Efecto de brillo variable durante la animación (más sutil)
                if (progress < 1) {
                    const baseGlow = Math.sin(progress * Math.PI) * 3 + 2; // Reducido de 8+4 a 3+2
                    const fluctuatingGlow = baseGlow + Math.abs(fluctuation) * 4; // Reducido de 10 a 4
                    element.style.textShadow = `0 0 ${fluctuatingGlow}px rgba(230, 0, 0, 0.6)`; // Simplificado y reducido opacidad
                    
                    // Color que varía muy sutilmente
                    const hueVariation = Math.sin(progress * Math.PI * 6) * 3; // Reducido de 8 a 3
                    const brightnessVariation = Math.sin(progress * Math.PI * 4) * 8; // Reducido de 15 a 8
                    element.style.color = `hsl(${22 + hueVariation}, 100%, ${55 + brightnessVariation}%)`;
                    
                    requestAnimationFrame(updateNumber);
                } else {
                    // Mostrar el número final exacto con efecto muy sutil
                    element.textContent = end;
                                                                                                        element.style.textShadow = '0 0 4px rgba(230, 0, 0, 0.2)'; // Muy reducido
                                    element.style.color = '#E60000';                    // Efecto final de celebración muy suave que se desvanece gradualmente
                    let fadeIntensity = 1;
                    function fadeEffect() {
                        fadeIntensity -= 0.03; // Más rápido
                        if (fadeIntensity > 0) {
                            const currentGlow = 4 * fadeIntensity; // Reducido de 12 a 4
                            element.style.textShadow = `0 0 ${currentGlow}px rgba(230, 0, 0, ${0.5 * fadeIntensity})`; // Reducido opacidad
                            requestAnimationFrame(fadeEffect);
                        } else {
                            element.style.textShadow = 'none';
                            element.style.color = '';
                        }
                    }
                    setTimeout(fadeEffect, 500); // Más rápido
                }
            }
            
            requestAnimationFrame(updateNumber);
        }, 120);
    }
    
    // Función de animación original (mantenida para compatibilidad)
    function animateProgress(circle, value, maxValue, callback) {
        if (!circle) return;
        
        circle.classList.add('active');
        const circumference = 339.292;
        const progress = (value / maxValue) * 100;
        const offset = circumference - (progress / 100) * circumference;
        
        // Animar el llenado del círculo con transición CSS más suave
        circle.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        circle.style.strokeDashoffset = offset;
        
        if (callback) {
            setTimeout(callback, 300);
        }
    }
    
    // Validación de formulario
    function validateForm() {
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const dniCe = document.getElementById('dniCe').value.trim();
        const correoElectronico = document.getElementById('correoElectronico').value.trim();
        
        let isValid = true;
        let errors = [];
        
        // Validar nombre completo
        if (!nombreCompleto) {
            errors.push('El campo "Nombre Completo" es obligatorio');
            isValid = false;
        } else if (nombreCompleto.length < 3) {
            errors.push('El nombre completo debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        // Validar celular (9 dígitos)
        if (!celular) {
            errors.push('El campo "Celular" es obligatorio');
            isValid = false;
        } else {
            const celularRegex = /^[0-9]{9}$/;
            if (!celularRegex.test(celular)) {
                errors.push('El celular debe tener exactamente 9 dígitos (solo números)');
                isValid = false;
            }
        }
        
        // Validar DNI/CE
        if (!dniCe) {
            errors.push('El campo "DNI / CE" es obligatorio');
            isValid = false;
        } else if (dniCe.length < 8) {
            errors.push('El DNI/CE debe tener al menos 8 caracteres');
            isValid = false;
        }
        
        // Validar email (opcional pero si se llena debe ser válido)
        if (correoElectronico) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correoElectronico)) {
                errors.push('El correo electrónico no tiene un formato válido (ejemplo: tu@email.com)');
                isValid = false;
            }
        }
        
        return { isValid, errors };
    }
    
    // Función para mostrar modal de error personalizado
    function showErrorModal(errors) {
        if (modalConfirmacion) {
            modalConfirmacion.innerHTML = `
                <div class="modal-content">
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 80px; margin-bottom: 20px;">⚠️</div>
                        <h3 style="color: #E60000; margin-bottom: 16px;">Por favor revisa los siguientes campos:</h3>
                        <div style="text-align: left; margin: 20px 0;">
                            ${errors.map(error => `
                                <div style="display: flex; align-items: center; margin: 10px 0; padding: 10px; 
                                           background: #fff5f5; border-left: 4px solid #E60000; border-radius: 4px;">
                                    <span style="color: #E60000; margin-right: 8px;">•</span>
                                    <span style="color: #666; font-size: 0.95rem;">${error}</span>
                                </div>
                            `).join('')}
                        </div>
                        <button onclick="closeModal('modalConfirmacion')" 
                                style="background: linear-gradient(135deg, #E60000 0%, #C70000 100%); 
                                       color: white; border: none; padding: 12px 24px; 
                                       border-radius: 50px; font-weight: 600; 
                                       cursor: pointer; transition: all 0.3s ease; margin-top: 10px;">
                            Entendido
                        </button>
                    </div>
                </div>
            `;
            openModal('modalConfirmacion');
        }
    }

    // Manejo del formulario de leads
    if (leadForm) {
        leadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Validar formulario
            const validation = validateForm();
            if (!validation.isValid) {
                showErrorModal(validation.errors);
                return;
            }
            
            // Obtener datos del formulario
            const formData = {
                nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
                celular: document.getElementById('celular').value.trim(),
                dniCe: document.getElementById('dniCe').value.trim(),
                correoElectronico: document.getElementById('correoElectronico').value.trim() || 'No proporcionado'
            };
            
            // Deshabilitar botón de envío
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando... ⏳';
            
            try {
                console.log('Enviando datos:', formData);
                
                // Usar fetch con no-cors para evitar problemas de CORS pero sin redirección
                fetch(GOOGLE_APP_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams(formData)
                }).then(() => {
                    // La petición se completó (aunque no podemos leer la respuesta)
                    console.log('Formulario enviado con método no-cors');
                }).catch(error => {
                    console.log('Error en el envío:', error);
                });
                
                // Mostrar confirmación inmediatamente
                setTimeout(() => {
                    // Cerrar modal de formulario
                    closeModal('modalForm');
                    
                    // Mostrar modal de confirmación
                    if (modalConfirmacion) {
                        modalConfirmacion.innerHTML = `
                            <div class="modal-content">
                                <div style="text-align: center; padding: 20px;">
                                    <div style="font-size: 80px; margin-bottom: 20px;">🎉</div>
                                    <h3 style="color: #E60000; margin-bottom: 16px;">¡Excelente!</h3>
                                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
                                        Tus datos han sido enviados exitosamente. Un asesor se pondrá en contacto contigo muy pronto para ofrecerte las mejores opciones. ¡Prepárate para la ultravelocidad!
                                    </p>
                                    <button onclick="closeModal('modalConfirmacion')" 
                                            style="background: linear-gradient(135deg, #E60000 0%, #C70000 100%); 
                                                   color: white; border: none; padding: 12px 24px; 
                                                   border-radius: 50px; font-weight: 600; 
                                                   cursor: pointer; transition: all 0.3s ease;">
                                        Entendido ✨
                                    </button>
                                </div>
                            </div>
                        `;
                        openModal('modalConfirmacion');
                    }
                    
                    // Limpiar formulario
                    leadForm.reset();
                    
                }, 1000); // Pequeño delay para que el envío se procese
                
            } catch (error) {
                console.error('Error al enviar los datos:', error);
                
                // Mostrar error en modal
                if (modalConfirmacion) {
                    modalConfirmacion.innerHTML = `
                        <div class="modal-content">
                            <div style="text-align: center; padding: 20px;">
                                <div style="font-size: 80px; margin-bottom: 20px;">⚠️</div>
                                <h3 style="color: #E60000; margin-bottom: 16px;">Error al enviar</h3>
                                <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
                                    ${error.message || 'Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo más tarde.'}
                                </p>
                                <button onclick="closeModal('modalConfirmacion')" 
                                        style="background: linear-gradient(135deg, #E60000 0%, #C70000 100%); 
                                               color: white; border: none; padding: 12px 24px; 
                                               border-radius: 50px; font-weight: 600; 
                                               cursor: pointer; transition: all 0.3s ease;">
                                    Entendido
                                </button>
                            </div>
                        </div>
                    `;
                    openModal('modalConfirmacion');
                }
            } finally {
                // Reactivar botón
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefit-card, .indicator, .timer-unit');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar elementos para animación
    const animatedElements = document.querySelectorAll('.benefit-card, .indicator, .timer-unit');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animaciones al scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header-fixed');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Preloader (opcional)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Manejo de errores globales
    window.addEventListener('error', (event) => {
        console.error('Error capturado:', event.error);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.now();
                console.log(`Página cargada en ${Math.round(loadTime)}ms`);
            }, 0);
        });
    }
});

// Funciones de utilidad globales
window.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar texto: ', err);
    });
};

// Detección de dispositivo móvil
window.isMobile = function() {
    return window.innerWidth <= 768;
};

// Google Analytics (si se requiere)
window.trackEvent = function(action, category = 'Landing Page', label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log(`Event tracked: ${action} - ${category} - ${label}`);
};
