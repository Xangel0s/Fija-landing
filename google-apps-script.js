/**
 * Google Apps Script para manejar leads de Win Fibra
 * Este script debe ser desplegado como Web App con los siguientes permisos:
 * - Ejecutar como: Yo (propietario del script)
 * - Quién puede acceder: Cualquier persona
 */

// ¡IMPORTANTE! Configuración de tu Google Sheet
const SHEET_NAME = "Clientes/Appweb"; // ¡IMPORTANTE! Cambia esto al nombre de tu hoja si es diferente (ej. "Leads")
const SPREADSHEET_ID = "1aPh-iIgKtaiM0VEiVBQ94cSY3G0CUGlhwkM09tuGvTc"; // ¡IMPORTANTE! Reemplaza con el ID de tu Google Sheet

function doPost(e) {
  // LOG: Registrar que se recibió una solicitud
  console.log('=== INICIO DE SOLICITUD POST ===');
  console.log('Timestamp:', new Date().toISOString());
  
  // Verificar si el parámetro e existe y tiene postData
  if (!e || !e.postData) {
    console.log('ERROR: No se recibió el objeto de evento o postData');
    console.log('NOTA: Si estás ejecutando esta función manualmente, usa testFormSubmission() en su lugar');
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: "Error: Datos de solicitud no encontrados. Usa testFormSubmission() para probar." 
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // 1. Obtener los datos enviados por el formulario (POST request)
  // Los datos pueden venir como JSON o como parámetros de formulario.
  // Asumimos que la landing page enviará los datos como JSON en el cuerpo de la solicitud.
  let data = {};
  
  try {
    // LOG: Verificar si hay postData
    console.log('postData existe:', !!e.postData);
    if (e.postData) {
      console.log('postData.type:', e.postData.type);
      console.log('postData.contents:', e.postData.contents);
    }
    
    if (e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
      console.log('Datos JSON parseados:', data);
    } else if (e.postData.type === "application/x-www-form-urlencoded") {
      // Si el formulario envía como form-urlencoded, los datos están en e.parameter
      data = e.parameter;
      console.log('Datos form-urlencoded:', data);
    } else {
        // Manejar otros tipos de contenido o usar e.parameter como fallback
        console.log('Tipo de contenido:', e.postData.type);
        console.log('Intentando usar e.parameter como fallback...');
        data = e.parameter || {};
        console.log('Datos del fallback:', data);
    }
  } catch (error) {
    console.log('ERROR al parsear datos:', error.message);
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Error al parsear los datos: " + error.message }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // Validaciones básicas (opcional pero recomendado)
  console.log('Validando campos obligatorios...');
  console.log('nombreCompleto:', data["nombreCompleto"]);
  console.log('celular:', data["celular"]);
  console.log('dniCe:', data["dniCe"]);
  
  if (!data["nombreCompleto"] || !data["celular"] || !data["dniCe"]) {
    console.log('ERROR: Campos obligatorios faltantes');
    return ContentService.createTextOutput('ERROR: Campos obligatorios faltantes')
                         .setMimeType(ContentService.MimeType.TEXT);
  }

  // 2. Acceder a la Google Sheet
  console.log('Intentando acceder a Google Sheet...');
  console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
  console.log('SHEET_NAME:', SHEET_NAME);
  
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet abierto exitosamente');
    
    const sheet = ss.getSheetByName(SHEET_NAME);
    console.log('Hoja encontrada:', !!sheet);

    if (!sheet) {
      console.log('ERROR: Hoja no encontrada');
      return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Hoja no encontrada con el nombre especificado: " + SHEET_NAME }))
                           .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Preparar la fila de datos
    console.log('Preparando datos para insertar...');
    const timestamp = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });
    const newRow = [
      data["nombreCompleto"] || "", // Asume que las claves del JSON coinciden con los encabezados del formulario (camelCase)
      data["celular"] || "",
      data["dniCe"] || "",
      data["correoElectronico"] || "",
      timestamp, // Fecha y hora actual en Lima, Perú
      "Nuevo", // Estado inicial del lead
      "No Asignado" // Asesor inicial
    ];
    
    console.log('Datos preparados:', newRow);

    // 4. Añadir la fila a la hoja
    console.log('Insertando datos en la hoja...');
    sheet.appendRow(newRow);
    console.log('✅ Datos insertados exitosamente en la hoja');

    // 5. Opcional: Enviar notificación por correo a los asesores
    // descomenta y configura esto si quieres notificaciones por email
    /*
    const RECIPIENT_EMAIL = "asesor@tudominio.com"; // Cambia esto al correo del asesor o grupo
    const SUBJECT = "¡Nuevo Lead de Win Fibra Óptica!";
    const BODY = `
      Se ha registrado un nuevo lead en la landing page:
      Nombre: ${data["nombreCompleto"]}
      Celular: ${data["celular"]}
      DNI/CE: ${data["dniCe"]}
      Correo: ${data["correoElectronico"] || "N/A"}
      Fecha: ${timestamp}
      Por favor, ponte en contacto lo antes posible.
    `;
    MailApp.sendEmail(RECIPIENT_EMAIL, SUBJECT, BODY);
    */

    // 6. Devolver una respuesta exitosa a la landing page
    console.log('Enviando respuesta exitosa');
    console.log('=== FIN DE SOLICITUD POST (EXITOSA) ===');
    
    // Para evitar redirecciones, devolver una respuesta simple
    return ContentService.createTextOutput('OK')
                         .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.log('ERROR al procesar la hoja:', error.message);
    console.log('Error completo:', error);
    console.log('=== FIN DE SOLICITUD POST (ERROR) ===');
    return ContentService.createTextOutput('ERROR')
                         .setMimeType(ContentService.MimeType.TEXT);
  }
}

// ===========================================
// FUNCIONES AUXILIARES Y DE TESTING
// ===========================================

/**
 * Función GET para testing - puedes llamar la URL en el navegador para probar
 */
function doGet(e) {
  console.log('=== SOLICITUD GET RECIBIDA ===');
  
  const response = {
    success: true,
    message: 'Win Fibra Lead Capture API está funcionando correctamente',
    timestamp: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
    sheetId: SPREADSHEET_ID,
    sheetName: SHEET_NAME
  };
  
  console.log('Respuesta GET:', response);
  
  return ContentService.createTextOutput(JSON.stringify(response))
                       .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Función para configurar la hoja inicialmente
 * EJECUTA ESTA FUNCIÓN MANUALMENTE UNA VEZ ANTES DE USAR EL SCRIPT
 */
function setupSheet() {
  console.log('=== CONFIGURANDO HOJA ===');
  
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet abierto:', ss.getName());
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      console.log('Hoja no existe, creando nueva...');
      sheet = ss.insertSheet(SHEET_NAME);
      console.log('Nueva hoja creada:', SHEET_NAME);
    } else {
      console.log('Hoja existente encontrada:', SHEET_NAME);
    }
    
    // Verificar si ya tiene headers
    const firstRow = sheet.getRange(1, 1, 1, 7).getValues()[0];
    const hasHeaders = firstRow.some(cell => cell && cell.toString().trim() !== '');
    
    if (!hasHeaders) {
      console.log('Agregando headers...');
      
      // Agregar headers
      const headers = [
        'Nombre Completo', 
        'Celular', 
        'DNI/CE', 
        'Correo Electrónico', 
        'Fecha y Hora',
        'Estado',
        'Asesor Asignado'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Formatear headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#FF5F00')
        .setFontColor('white')
        .setFontSize(11);
      
      // Ajustar ancho de columnas
      sheet.setColumnWidth(1, 200); // Nombre Completo
      sheet.setColumnWidth(2, 100); // Celular
      sheet.setColumnWidth(3, 100); // DNI/CE
      sheet.setColumnWidth(4, 250); // Correo Electrónico
      sheet.setColumnWidth(5, 150); // Fecha y Hora
      sheet.setColumnWidth(6, 100); // Estado
      sheet.setColumnWidth(7, 150); // Asesor Asignado
      
      console.log('✅ Headers configurados correctamente');
    } else {
      console.log('Headers ya existen, omitiendo configuración');
    }
    
    console.log('=== CONFIGURACIÓN COMPLETADA ===');
    return 'Configuración completada exitosamente. La hoja está lista para recibir leads.';
    
  } catch (error) {
    console.log('ERROR en setupSheet:', error.message);
    console.log('Error completo:', error);
    throw error;
  }
}

/**
 * Función de prueba para simular un envío desde el formulario
 * EJECUTA ESTA FUNCIÓN PARA PROBAR QUE TODO FUNCIONA
 */
function testFormSubmission() {
  console.log('=== INICIANDO TEST DE ENVÍO ===');
  
  const testData = {
    nombreCompleto: 'Juan Pérez Test',
    celular: '987654321',
    dniCe: '12345678',
    correoElectronico: 'test@email.com'
  };
  
  console.log('Datos de prueba:', testData);
  
  try {
    // Simular request POST
    const mockEvent = {
      postData: {
        type: "application/json",
        contents: JSON.stringify(testData)
      }
    };
    
    console.log('Simulando llamada a doPost...');
    const result = doPost(mockEvent);
    const response = JSON.parse(result.getContent());
    
    console.log('Resultado del test:', response);
    
    if (response.success) {
      console.log('✅ TEST EXITOSO: Los datos se guardaron correctamente');
      return 'TEST EXITOSO: ' + response.message;
    } else {
      console.log('❌ TEST FALLÓ:', response.message);
      return 'TEST FALLÓ: ' + response.message;
    }
    
  } catch (error) {
    console.log('❌ ERROR EN TEST:', error.message);
    console.log('Error completo:', error);
    return 'ERROR EN TEST: ' + error.message;
  }
}

/**
 * Función para verificar la configuración actual
 */
function checkConfiguration() {
  console.log('=== VERIFICANDO CONFIGURACIÓN ===');
  
  try {
    console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
    console.log('SHEET_NAME:', SHEET_NAME);
    
    // Verificar acceso al spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ Spreadsheet accesible:', ss.getName());
    
    // Verificar acceso a la hoja
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) {
      console.log('✅ Hoja encontrada:', SHEET_NAME);
      
      const lastRow = sheet.getLastRow();
      console.log('Última fila con datos:', lastRow);
      
      if (lastRow > 0) {
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        console.log('Headers encontrados:', headers);
      }
      
    } else {
      console.log('❌ Hoja NO encontrada:', SHEET_NAME);
      console.log('Hojas disponibles:', ss.getSheets().map(s => s.getName()));
    }
    
    console.log('=== VERIFICACIÓN COMPLETADA ===');
    return 'Configuración verificada correctamente';
    
  } catch (error) {
    console.log('❌ ERROR EN VERIFICACIÓN:', error.message);
    console.log('Error completo:', error);
    return 'ERROR: ' + error.message;
  }
}

/**
 * Función para obtener estadísticas
 */
function getStats() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return 'Hoja no encontrada: ' + SHEET_NAME;
    }
    
    const lastRow = sheet.getLastRow();
    const totalLeads = Math.max(0, lastRow - 1); // Restar header
    
    const stats = {
      totalLeads: totalLeads,
      ultimaActualizacion: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
      nombreHoja: SHEET_NAME,
      spreadsheetId: SPREADSHEET_ID
    };
    
    console.log('Estadísticas:', stats);
    return stats;
    
  } catch (error) {
    console.log('Error al obtener estadísticas:', error);
    return 'Error: ' + error.message;
  }
}
