// ─────────────────────────────────────────────────────────────
//  Paste this entire file into Google Apps Script, then deploy
//  as a Web App (Execute as: Me, Access: Anyone)
// ─────────────────────────────────────────────────────────────

const NOTIFY_EMAIL = 'ugold888@gmail.com'

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    const name  = e.parameter.name  || ''
    const phone = e.parameter.phone || ''
    const event = e.parameter.event || ''
    const time  = new Date()

    // 1. Write to sheet
    sheet.appendRow([time, name, phone, event])

    // 2. Send notification email
    sendNotification(name, phone, event, time)

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function sendNotification(name, phone, event, time) {
  const subject = `【新報名】${name} · ${event}`

  const body = `
有新的報名！

────────────────
姓名：${name}
電話：${phone}
場次：${event}
時間：${time.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
────────────────

前往 Google Sheet 查看所有報名：
${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `.trim()

  MailApp.sendEmail({
    to:      NOTIFY_EMAIL,
    subject: subject,
    body:    body,
  })
}

// Health-check — lets you test the URL in a browser
function doGet() {
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT)
}
