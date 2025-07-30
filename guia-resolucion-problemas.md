# 🔧 GUÍA DE RESOLUCIÓN: Google Apps Script no funciona

## 🚨 **Problema Identificado**
Los datos del formulario no llegan a Google Sheets. Vamos a diagnosticar y solucionar paso a paso.

## 📋 **PASOS OBLIGATORIOS (EN ORDEN)**

### **PASO 1: Verificar la Configuración en Google Apps Script**

1. **Ve a [script.google.com](https://script.google.com)**
2. **Abre tu proyecto** (o crea uno nuevo si no existe)
3. **Reemplaza TODO el código** con el nuevo código del archivo `google-apps-script.js`
4. **GUARDA el proyecto** (Ctrl+S)

### **PASO 2: Verificar las Constantes**

En tu código, asegúrate de que estas líneas sean EXACTAMENTE así:
```javascript
const SHEET_NAME = "Clientes/Appweb";
const SPREADSHEET_ID = "1aPh-iIgKtaiM0VEiVBQ94cSY3G0CUGlhwkM09tuGvTc";
```

### **PASO 3: Ejecutar Función de Verificación**

1. En Apps Script, selecciona la función `checkConfiguration`
2. Haz clic en **Ejecutar** (▶️)
3. **Autoriza los permisos** si te los pide
4. **Revisa los logs** (Ver > Logs o Ver > Stackdriver Logging)

**¿Qué debe mostrar?**
- ✅ Spreadsheet accesible
- ✅ Hoja encontrada
- Si dice "Hoja NO encontrada", ve al PASO 4

### **PASO 4: Configurar la Hoja (SI NO EXISTE)**

1. Selecciona la función `setupSheet`
2. Haz clic en **Ejecutar** (▶️)
3. **Revisa los logs** - debe decir "Configuración completada"

### **PASO 5: Probar el Script Internamente**

1. Selecciona la función `testFormSubmission`
2. Haz clic en **Ejecutar** (▶️)
3. **Debe decir "TEST EXITOSO"**
4. **Ve a tu Google Sheet** - debe aparecer una fila con "Juan Pérez Test"

**¿No funciona el test?** → Revisa los logs para ver el error específico

### **PASO 6: Desplegar como Web App**

1. Haz clic en **Implementar** > **Nueva implementación**
2. **Tipo**: Aplicación web
3. **Descripción**: "Win Fibra Leads"
4. **Ejecutar como**: Yo (tu-email)
5. **Quién puede acceder**: **Cualquier persona** ⚠️ IMPORTANTE
6. Haz clic en **Implementar**
7. **COPIA LA URL COMPLETA** (algo como):
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

### **PASO 7: Configurar la URL en el JavaScript**

1. **Abre el archivo `script.js`**
2. **En la línea 3**, reemplaza la URL:
   ```javascript
   const GOOGLE_APP_SCRIPT_URL = 'PEGA_AQUI_TU_URL_COMPLETA_DEL_PASO_6';
   ```
3. **GUARDA el archivo**

### **PASO 8: Probar desde la Landing Page**

1. **Abre tu `index.html`** en el navegador
2. **Completa el formulario** con datos de prueba
3. **Haz clic en enviar**
4. **Ve a tu Google Sheet** - debe aparecer la nueva fila

## 🔍 **DIAGNÓSTICO DE PROBLEMAS COMUNES**

### ❌ **Error: "Hoja no encontrada"**

**Solución:**
1. Ve a tu Google Sheet: `https://docs.google.com/spreadsheets/d/1aPh-iIgKtaiM0VEiVBQ94cSY3G0CUGlhwkM09tuGvTc/edit`
2. Verifica que existe una hoja llamada **exactamente** `Clientes/Appweb`
3. Si no existe, créala o cambia el nombre en el código

### ❌ **Error: "Script function not found"**

**Solución:**
1. El código no se guardó correctamente
2. Guarda el proyecto en Apps Script (Ctrl+S)
3. Crea una nueva implementación

### ❌ **Error: "Unauthorized"**

**Solución:**
1. Los permisos no están configurados
2. En Apps Script, ejecuta cualquier función manualmente primero
3. Autoriza todos los permisos solicitados

### ❌ **El formulario se envía pero no aparece en Google Sheets**

**Solución:**
1. Revisa los logs en Apps Script (Ver > Logs)
2. La URL del Web App puede estar incorrecta
3. El modo `no-cors` impide ver errores específicos

## 🧪 **TESTING PASO A PASO**

### **Test 1: Verificar acceso a Google Sheet**
```javascript
// Ejecuta en Apps Script:
checkConfiguration()
```

### **Test 2: Probar inserción de datos**
```javascript
// Ejecuta en Apps Script:
testFormSubmission()
```

### **Test 3: Probar Web App externamente**
1. Ve a la URL de tu Web App en el navegador
2. Debe mostrar: `{"success":true,"message":"Win Fibra Lead Capture API está funcionando correctamente",...}`

### **Test 4: Probar desde formulario**
1. Abre F12 en el navegador (Developer Tools)
2. Ve a la pestaña "Console"
3. Envía el formulario
4. Revisa si hay errores en la consola

## 📝 **LOGS QUE DEBES REVISAR**

### **En Google Apps Script:**
1. Ve a **Ver** > **Logs** (o **Stackdriver Logging**)
2. Busca mensajes como:
   - `=== INICIO DE SOLICITUD POST ===`
   - `✅ Datos insertados exitosamente`
   - Cualquier mensaje de ERROR

### **En el navegador (F12):**
1. Pestaña **Console**: errores de JavaScript
2. Pestaña **Network**: estado de la solicitud HTTP

## 🎯 **CHECKLIST FINAL**

- [ ] Código copiado completamente en Apps Script
- [ ] Proyecto guardado (Ctrl+S)
- [ ] Función `checkConfiguration` ejecutada exitosamente
- [ ] Función `setupSheet` ejecutada (si era necesaria)
- [ ] Función `testFormSubmission` ejecutada exitosamente
- [ ] Fila de prueba visible en Google Sheet
- [ ] Web App desplegado con permisos "Cualquier persona"
- [ ] URL del Web App copiada al `script.js`
- [ ] Archivo `script.js` guardado
- [ ] Formulario probado desde el navegador
- [ ] Nueva fila aparece en Google Sheet

## 🆘 **SI NADA FUNCIONA**

### **Opción 1: Crear nuevo proyecto desde cero**
1. Crea un nuevo proyecto en Apps Script
2. Copia el código nuevamente
3. Crea una nueva implementación

### **Opción 2: Verificar permisos de Google Sheet**
1. Ve a tu Google Sheet
2. Clic en "Compartir"
3. Asegúrate de que tu cuenta tenga permisos de edición

### **Opción 3: Usar un Google Sheet nuevo**
1. Crea un nuevo Google Sheet
2. Copia el nuevo ID
3. Actualiza `SPREADSHEET_ID` en el código

## 📞 **¿Sigues teniendo problemas?**

**Envíame:**
1. Los logs de Google Apps Script
2. Los errores en la consola del navegador (F12)
3. La URL de tu Web App
4. Captura de pantalla de tu Google Sheet

**Con esta información podremos identificar exactamente qué está fallando.** 🚀
