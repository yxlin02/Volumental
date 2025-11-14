// 更新后的 Apps Script 代码
// 复制这段代码到你的 Google Apps Script 编辑器

const SHEET_NAME = "Test1"; // 改为你的工作表标签名

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Volumental logger alive" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const { subject, scanId, userAgent, locale, extra } = body;

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // 如果表头不存在，先创建表头
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "subject",
        "scanId",
        "userAgent",
        "locale",
        "extra",
      ]);
    }

    sheet.appendRow([
      new Date(),
      subject || "",
      scanId || "",
      userAgent || "",
      locale || "",
      JSON.stringify(extra || {}),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
