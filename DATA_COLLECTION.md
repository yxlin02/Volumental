# 数据收集说明

## 在 Google Sheet 后台可以看到的数据

### 表格列说明

| 列名 | 说明 | 示例 |
|------|------|------|
| **timestamp** | 扫描完成的时间戳 | 2025-01-15 14:30:25 |
| **email** | 用户输入的邮箱地址 | user@example.com |
| **subject** | 传递给 Volumental 的用户标识（通常是 email） | user@example.com |
| **scanId** | Volumental 生成的唯一扫描 ID | abc123-def456-ghi789 |
| **userAgent** | 用户的浏览器/设备信息 | Mozilla/5.0 (iPhone; CPU iPhone OS 15_0) |
| **locale** | 用户的语言设置 | en-US, zh-CN, etc. |
| **extra** | Volumental SDK 返回的完整数据（JSON 格式） | 包含所有测量数据和 3D 模型信息 |

### extra 字段包含的详细数据

`extra` 字段是一个 JSON 字符串，包含 Volumental SDK 返回的完整数据，可能包括：

- **测量数据**：脚长、脚宽、脚高等尺寸信息
- **3D 模型文件链接**：脚的 3D 模型文件 URL
- **扫描元数据**：扫描时间、设备信息等
- **其他 Volumental 提供的字段**

### 如何查看 extra 字段的详细内容

1. 在 Google Sheet 中，点击 `extra` 列的单元格
2. 复制 JSON 字符串
3. 使用在线 JSON 格式化工具查看，或使用以下 Apps Script 函数解析：

```javascript
// 在 Apps Script 中解析 extra 字段
function parseExtraData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test1');
  const lastRow = sheet.getLastRow();
  const extraData = sheet.getRange(lastRow, 7).getValue(); // 第 7 列是 extra
  const parsed = JSON.parse(extraData);
  Logger.log(parsed);
}
```

## 获取更详细的测量数据

如果需要获取完整的测量数据和 3D 模型文件，需要使用 Volumental Online Scan API：

1. 使用你的 API key: `c9x74FDORTZOb9-lJenjodqHeFtH6EGhqONC0hFXHC8n6C9MA8ZFRvJyzgq7pZxq`
2. 使用 `scanId` 调用 API 获取详细信息
3. 参考文档: https://developer.volumental.com/docs/online-scan-api

## 数据流程

1. **用户输入 email** → 页面收集
2. **用户完成扫描** → Volumental SDK 生成 scanId
3. **数据发送到 Apps Script** → 包含 email, scanId, 用户信息
4. **Apps Script 写入 Google Sheet** → 所有数据保存到表格

## 隐私说明

- Email 作为用户标识存储在 Google Sheet 中
- 所有数据通过 HTTPS 传输
- 建议遵守 GDPR/隐私法规，告知用户数据用途

