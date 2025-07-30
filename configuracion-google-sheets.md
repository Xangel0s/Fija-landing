# 📋 Guía Paso a Paso - Configuración Google Sheets

## 🎯 Objetivo
Configurar la integración completa entre el formulario de la landing page y Google Sheets para capturar automáticamente los leads.

## 📝 Paso 1: Crear Google Sheet

### 1.1 Crear la hoja de cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Haz clic en "Crear" o el botón "+"
3. Se abrirá una nueva hoja de cálculo
4. Renombra la hoja:
   - Haz clic en "Hoja de cálculo sin título"
   - Escribe: "Win Fibra Leads"

### 1.2 Obtener el ID de la hoja
1. Copia la URL de tu hoja (se ve algo así):
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   ```
2. El ID de la hoja es la parte entre `/d/` y `/edit`:
   ```
   1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```
3. **Guarda este ID**, lo necesitarás más adelante.

### 1.3 Configurar permisos (opcional para notificaciones)
1. Haz clic en "Compartir" (esquina superior derecha)
2. Si quieres que otros puedan ver los leads, agrega sus emails
3. Para el script, no es necesario cambiar permisos

## 🔧 Paso 2: Configurar Google Apps Script

### 2.1 Crear el proyecto Apps Script
1. Ve a [Google Apps Script](https://script.google.com)
2. Haz clic en "Nuevo proyecto"
3. Se abrirá el editor con un archivo `Code.gs`

### 2.2 Configurar el código
1. **Elimina todo** el código predeterminado en `Code.gs`
2. **Copia y pega** todo el contenido del archivo `google-apps-script.js`
3. **Modifica las siguientes líneas**:

   **Línea 9**: Reemplaza con tu Sheet ID
   ```javascript
   const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // Tu ID aquí
   ```

   **Línea 90**: Reemplaza con tu email (opcional)
   ```javascript
   const EMAIL_DESTINO = 'tu-email@gmail.com'; // Tu email para notificaciones
   ```

4. Renombra el proyecto:
   - Haz clic en "Proyecto sin título"
   - Escribe: "Win Fibra Lead Capture"

### 2.3 Ejecutar configuración inicial
1. En el menú de funciones (parte superior), selecciona `setupSheet`
2. Haz clic en el botón "Ejecutar" (▶️)
3. **Autoriza los permisos**:
   - Aparecerá "Autorización requerida"
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado"
   - Haz clic en "Ir a Win Fibra Lead Capture (no seguro)"
   - Haz clic en "Permitir"

4. Verifica que se ejecutó correctamente:
   - Revisa tu Google Sheet
   - Debe tener headers en la primera fila con formato naranja

## 🌐 Paso 3: Desplegar como Web App

### 3.1 Crear nueva implementación
1. En Apps Script, haz clic en "Implementar" > "Nueva implementación"
2. Haz clic en el ícono de configuración (⚙️) junto a "Seleccionar tipo"
3. Selecciona "Aplicación web"

### 3.2 Configurar la implementación
1. **Descripción**: "Win Fibra Lead Capture API"
2. **Ejecutar como**: "Yo (tu-email@gmail.com)"
3. **Quién puede acceder**: "Cualquier persona"
4. Haz clic en "Implementar"

### 3.3 Obtener la URL de implementación
1. Aparecerá un modal con la URL de implementación
2. **Copia esta URL completa** (se ve así):
   ```
   https://script.google.com/macros/s/AKfycbz-IV7bP2IaFajeMstSMitamddgZ4cAH_fA3ct3Db9NcbFVuWgL_t5lFXL_-fi5eDah/exec
   ```
3. **Guarda esta URL**, la necesitarás para el siguiente paso

## 💻 Paso 4: Configurar el JavaScript de la Landing Page

### 4.1 Actualizar la URL en script.js
1. Abre el archivo `script.js`
2. Busca la línea 3:
   ```javascript
   const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-IV7bP2IaFajeMstSMitamddgZ4cAH_fA3ct3Db9NcbFVuWgL_t5lFXL_-fi5eDah/exec';
   ```
3. **Reemplaza la URL** con la que obtuviste en el Paso 3.3

### 4.2 Guardar los cambios
1. Guarda el archivo `script.js`
2. Si estás usando un servidor local, reinícialo

## 🧪 Paso 5: Probar la Integración

### 5.1 Prueba desde la landing page
1. Abre tu landing page en el navegador
2. Haz clic en cualquier botón "¡Lo Quiero!"
3. Completa el formulario con datos de prueba:
   - **Nombre**: Juan Pérez Test
   - **Celular**: 987654321
   - **DNI**: 12345678
   - **Email**: test@email.com
4. Haz clic en "Enviar mis datos"

### 5.2 Verificar en Google Sheets
1. Ve a tu Google Sheet
2. Debe aparecer una nueva fila con:
   - Fecha y hora actual
   - Los datos que ingresaste
   - Formato correcto

### 5.3 Verificar notificación por email (si configuraste email)
1. Revisa tu bandeja de entrada
2. Debe llegar un email con el asunto "🚀 Nuevo Lead - Win Fibra"

## ⚠️ Solución de Problemas Comunes

### Problema 1: "Error al enviar los datos"
**Causas posibles**:
- URL de Apps Script incorrecta
- Permisos no configurados
- Sheet ID incorrecto

**Solución**:
1. Verifica que la URL en `script.js` sea exactamente la de tu implementación
2. Asegúrate de haber ejecutado `setupSheet` en Apps Script
3. Verifica que el Sheet ID sea correcto

### Problema 2: Los datos no aparecen en Google Sheets
**Causas posibles**:
- Sheet ID incorrecto
- Nombre de hoja incorrecto
- Permisos insuficientes

**Solución**:
1. Verifica el Sheet ID en `google-apps-script.js`
2. Asegúrate de que la hoja se llame exactamente "Leads"
3. Ejecuta la función `testFunction` en Apps Script para probar

### Problema 3: No llegan emails de notificación
**Causas posibles**:
- Email de destino incorrecto
- Función de email comentada

**Solución**:
1. Verifica que el email en `EMAIL_DESTINO` sea correcto
2. Asegúrate de que la función `sendNotificationEmail` no esté comentada

### Problema 4: "Script function not found"
**Causas posibles**:
- No se guardó el código en Apps Script
- No se desplegó correctamente

**Solución**:
1. Guarda el proyecto en Apps Script (Ctrl+S)
2. Crea una nueva implementación
3. Usa la nueva URL generada

## 🔄 Paso 6: Mantenimiento

### 6.1 Actualizar la implementación (si cambias el código)
1. Ve a Apps Script
2. Haz clic en "Implementar" > "Administrar implementaciones"
3. Haz clic en el ícono de lápiz de tu implementación
4. Cambia la versión a "Nueva versión"
5. Haz clic en "Implementar"

### 6.2 Monitorear el Google Sheet
1. Revisa regularmente los leads capturados
2. Exporta datos periódicamente para backup
3. Organiza los datos según necesites

### 6.3 Optimizar según uso
1. Si recibes muchos leads, considera usar Google Forms también
2. Puedes agregar más campos al formulario modificando tanto el HTML como el Apps Script
3. Considera implementar un CRM para mejor seguimiento

## ✅ Checklist Final

- [ ] Google Sheet creado con ID copiado
- [ ] Google Apps Script configurado con Sheet ID correcto
- [ ] Función `setupSheet` ejecutada exitosamente
- [ ] Apps Script desplegado como Web App con permisos correctos
- [ ] URL de implementación copiada y configurada en `script.js`
- [ ] Email de notificación configurado (opcional)
- [ ] Prueba completa realizada exitosamente
- [ ] Datos aparecen correctamente en Google Sheet
- [ ] Mensaje de confirmación funciona en la landing page

## 📞 ¿Necesitas Ayuda?

Si tienes problemas con algún paso:

1. **Revisa los logs en Apps Script**:
   - Ve a "Ejecuciones" en Apps Script para ver errores

2. **Verifica la consola del navegador**:
   - Presiona F12 y revisa la pestaña "Console" para errores

3. **Prueba paso a paso**:
   - Ejecuta `testFunction` en Apps Script primero
   - Luego prueba desde la landing page

¡Con estos pasos tendrás tu sistema de captura de leads completamente funcional! 🚀
