// ─────────────────────────────────────────────────────────────
//  Paste this entire file into Google Apps Script, then deploy
//  as a Web App (Execute as: Me, Access: Anyone)
// ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    sheet.appendRow([
      new Date(),
      e.parameter.name  || '',
      e.parameter.phone || '',
      e.parameter.event || '',
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Health-check — lets you test the URL in a browser
function doGet() {
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT)
}
