# 🚀 Claro Fibra - Landing Page

Landing page completa y funcional para la generación de leads de internet de fibra óptica, con integración a Google Sheets para el almacenamiento automático de datos.

## 👨‍💻 Desarrollador
- **Autor**: Xangel0s
- **Email**: zastuto5@gmail.com
- **GitHub**: [@Xangel0s](https://github.com/Xangel0s)

## 📋 Características Principales

### ✨ Funcionalidades
- **Header fijo** con navegación fluida
- **Hero section** con animaciones atractivas
- **Sección de beneficios** con 4 tarjetas interactivas
- **Simulador de velocidad** con animaciones de progreso circular
- **Oferta exclusiva** con contador regresivo en tiempo real
- **Modal de captura de leads** con validación completa
- **Integración con Google Sheets** para almacenamiento automático
- **Diseño completamente responsivo**
- **Animaciones suaves** y micro-interacciones
- **Optimización SEO** completa

### 🎨 Diseño
- Color principal: `#E60000` (Rojo Claro)
- Tipografía: Inter (Google Fonts)
- Iconos: Font Awesome 6
- Diseño moderno y profesional
- Totalmente responsivo (móvil, tablet, desktop)

## 🛠️ Configuración del Proyecto

### 1. Archivos del Proyecto
```
landingpageclaro-fibramain/
├── index.html                    # Página principal
├── styles.css                    # Estilos CSS
├── script.js                     # JavaScript funcional
├── google-apps-script.js         # Código para Google Apps Script
├── package.json                  # Configuración npm
├── assets/                       # Imágenes y recursos
│   ├── claro-logo.svg
│   └── logoclaro-removebg-preview.png
├── configuracion-google-sheets.md # Guía de configuración
├── confirmacion-codigo.md        # Documentación adicional
├── guia-resolucion-problemas.md  # Solución de problemas
└── README.md                     # Este archivo
```

### 2. Instalación y Desarrollo

#### Requisitos
- Node.js (opcional, para desarrollo)
- Navegador web moderno

#### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Xangel0s/Fija-landing.git
cd Fija-landing

# Instalar dependencias (opcional)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

#### Comandos disponibles
- `npm run dev` - Inicia servidor de desarrollo y abre navegador
- `npm start` - Mismo que dev
- `npm run serve` - Solo inicia el servidor
- `npm run preview` - Vista previa del proyecto

### 3. Configuración de Google Sheets

#### Paso 1: Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Claro Fibra Leads" (o el nombre que prefieras)
4. Copia el ID de la hoja desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

#### Paso 2: Configurar Google Apps Script
1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Reemplaza el código predeterminado con el contenido de `google-apps-script.js`
4. **IMPORTANTE**: Modifica las siguientes variables en el código:
   ```javascript
   const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Reemplaza con tu Sheet ID real
   const EMAIL_DESTINO = 'zastuto5@gmail.com'; // Email para notificaciones
   ```

#### Paso 3: Desplegar como Web App
1. En Google Apps Script, haz clic en "Desplegar" > "Nueva implementación"
2. Selecciona tipo: "Aplicación web"
3. Configuración:
   - **Ejecutar como**: Yo (propietario del script)
   - **Quién puede acceder**: Cualquier persona
4. Haz clic en "Implementar"
5. **Copia la URL de implementación** (se ve como):
   ```
   https://script.google.com/macros/s/[APP_SCRIPT_ID]/exec
   ```

#### Paso 4: Configurar la URL en el JavaScript
1. Abre `script.js`
2. Reemplaza la URL en la línea 3:
   ```javascript
   const GOOGLE_APP_SCRIPT_URL = 'TU_URL_DE_APPS_SCRIPT_AQUI';
   ```

#### Paso 5: Ejecutar función de configuración inicial
1. En Google Apps Script, ejecuta la función `setupSheet()` manualmente una vez
2. Esto creará la estructura inicial de la hoja con los headers correctos

## 🔧 Personalización

### Cambiar colores
Modifica las variables CSS en `styles.css`:
```css
:root {
  --primary-color: #E60000;
  --primary-gradient: linear-gradient(135deg, #E60000 0%, #FF4444 100%);
}
```

### Modificar textos
Edita directamente el contenido en `index.html` manteniendo la estructura HTML.

### Ajustar validaciones
Modifica las reglas de validación en la función `validateForm()` en `script.js`.

### Personalizar countdown
Cambia la duración del countdown en `script.js`:
```javascript
// 7 días por defecto, cambia el número para modificar
const countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
```

## 📊 Funcionalidades del Formulario

### Campos del formulario:
- **Nombre Completo**: Obligatorio, mínimo 3 caracteres
- **Celular**: Obligatorio, exactamente 9 dígitos
- **DNI/CE**: Obligatorio, mínimo 8 caracteres
- **Correo Electrónico**: Opcional, validación de formato

### Validaciones implementadas:
- ✅ Validación en tiempo real
- ✅ Mensajes de error descriptivos
- ✅ Prevención de envíos duplicados
- ✅ Sanitización de datos

### Datos almacenados en Google Sheets:
1. Fecha y Hora
2. Nombre Completo
3. Celular
4. DNI/CE
5. Correo Electrónico

## 🚀 Optimizaciones SEO

### Meta tags implementados:
- Title optimizado
- Meta description
- Keywords relevantes
- Open Graph tags (opcional)

### Estructura semántica:
- Headers jerárquicos (H1, H2, H3)
- Alt text en imágenes
- Estructura semántica HTML5

### Performance:
- CSS y JS optimizados
- Imágenes optimizadas
- Carga asíncrona de recursos

## 📱 Responsividad

La landing page está completamente optimizada para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Puntos de quiebre principales:
```css
@media (max-width: 768px) {
  /* Estilos móvil */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Estilos tablet */
}

@media (min-width: 1025px) {
  /* Estilos desktop */
}
```

## 🧪 Testing

### Probar el formulario:
1. Completa el formulario con datos de prueba
2. Verifica que los datos lleguen a Google Sheets
3. Confirma que se muestre el mensaje de éxito

### Probar el simulador de velocidad:
1. Haz clic en "Probar Velocidad"
2. Verifica las animaciones de los círculos
3. Confirma que se muestren valores realistas

### Probar el countdown:
1. Verifica que el contador se actualice cada segundo
2. Confirma que se reinicie automáticamente

## 🔒 Seguridad

### Medidas implementadas:
- Validación tanto en frontend como backend
- Sanitización de datos de entrada
- Protección contra inyección de código
- Uso de HTTPS (recomendado para producción)

## 📈 Analytics y Tracking

### Eventos que se pueden trackear:
- Apertura de modal
- Envío de formulario
- Clic en botones CTA
- Tiempo en página
- Interacciones con simulador

### Integración con Google Analytics:
Agrega el siguiente código antes del cierre de `</head>`:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚀 Despliegue en Producción

### Opciones de hosting:
1. **Netlify** (Recomendado)
2. **Vercel**
3. **GitHub Pages**
4. **Servidor propio**

### Checklist pre-lanzamiento:
- [ ] URL de Google Apps Script configurada
- [ ] Google Sheet creado y configurado
- [ ] Formulario probado completamente
- [ ] Todos los textos revisados
- [ ] Imágenes optimizadas
- [ ] Meta tags configurados
- [ ] Analytics configurado
- [ ] SSL habilitado

## 📞 Contacto y Soporte

- **Desarrollador**: Xangel0s
- **Email**: zastuto5@gmail.com
- **GitHub**: [@Xangel0s](https://github.com/Xangel0s)

Para soporte técnico o personalizaciones adicionales, no dudes en contactar.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Versión**: 1.0.0  
**Última actualización**: Julio 2025  
**Compatibilidad**: Todos los navegadores modernos  
**Desarrollado por**: Xangel0s
