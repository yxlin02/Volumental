# 如何获取详细的扫描数据

## 概述

你已经有了 `scanId`，现在可以通过 Volumental Online Scan API 获取详细的扫描数据，包括：
- 脚部测量数据（长度、宽度、高度等）
- 3D 模型文件链接
- 其他扫描元数据

## 步骤 1: 确认 API Endpoint

**重要**：你需要先查看 Volumental API 文档确认实际的 API endpoint：
- 文档地址：https://developer.volumental.com/docs/online-scan-api
- 确认 API 的 base URL 和 endpoint 路径
- 确认认证方式（Bearer token 或其他）

## 步骤 2: 更新 Apps Script 代码

1. 打开 Google Apps Script：https://script.google.com
2. 找到你的项目
3. 将 `apps-script-code.js` 中的代码复制粘贴进去
4. **根据实际 API 文档调整以下内容**：
   - `VOLUMENTAL_API_BASE` - API 的基础 URL
   - `getScanDetails()` 函数中的 endpoint 路径
   - 认证方式（如果需要不同的 header）

## 步骤 3: 测试单个 scanId

1. 在 Apps Script 编辑器中，找到 `testGetScanDetails()` 函数
2. 修改 `testScanId` 为你的实际 scanId
3. 点击运行
4. 查看执行日志（查看 → 执行日志）

## 步骤 4: 批量获取所有扫描详情

1. 在 Apps Script 编辑器中，运行 `fetchAllScanDetails()` 函数
2. 这个函数会：
   - 读取 Google Sheet 中的所有 scanId
   - 为每个 scanId 调用 API 获取详情
   - 将详情保存到新的 "scanDetails" 列
   - 跳过已经有详情的行（避免重复请求）

## 使用方式

### 方式 1: 手动运行函数

1. 在 Apps Script 编辑器中选择 `fetchAllScanDetails`
2. 点击运行按钮
3. 查看执行日志了解进度

### 方式 2: 设置定时触发器（自动获取）

1. 在 Apps Script 编辑器中，点击左侧的"触发器"（时钟图标）
2. 点击"添加触发器"
3. 设置：
   - 选择要运行的函数：`fetchAllScanDetails`
   - 选择事件来源：时间驱动
   - 选择触发器类型：定时器（例如每小时）
4. 保存

### 方式 3: 在 doPost 中自动获取（推荐）

如果你想在收到扫描数据时自动获取详情，可以修改 `doPost` 函数：

```javascript
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const { subject, scanId, userAgent, locale, extra } = body;

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // ... 现有的保存代码 ...

    // 自动获取扫描详情
    if (scanId) {
      try {
        const scanDetails = getScanDetails(scanId);
        if (scanDetails.success) {
          // 将详情添加到 extra 列或新列
          // 根据你的需求调整
        }
      } catch (err) {
        Logger.log("获取扫描详情失败: " + err);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // ...
  }
}
```

## API 认证说明

当前代码使用 Bearer token 认证：
```javascript
"Authorization": `Bearer ${VOLUMENTAL_API_KEY}`
```

如果 Volumental API 使用不同的认证方式（如 API key header），需要调整 `getScanDetails()` 函数中的 headers。

## 常见问题

### Q: API 返回 401 未授权错误
A: 检查 API key 是否正确，以及认证方式是否匹配 API 文档要求

### Q: API 返回 404 未找到
A: 检查 endpoint URL 是否正确，确认 scanId 是否有效

### Q: 如何查看返回的详细数据？
A: 数据会以 JSON 格式保存在 "scanDetails" 列中，你可以：
- 在 Google Sheet 中查看（可能需要格式化）
- 使用 Apps Script 的 `Logger.log()` 查看
- 使用在线 JSON 格式化工具查看

## 注意事项

1. **API 限制**：注意 Volumental API 的请求频率限制
2. **数据大小**：详细的扫描数据可能很大，确保 Google Sheet 单元格可以容纳
3. **错误处理**：如果 API 调用失败，错误信息会保存在 "scanDetails" 列中
4. **API 文档**：务必参考官方 API 文档确认 endpoint 和参数格式

