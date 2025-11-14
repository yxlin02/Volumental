# OAuth 认证设置说明

## 问题说明

你遇到的 401 错误是因为 **SDK Client ID 和 OAuth Client ID 是不同的**。

### 当前使用的凭证

- **SDK Client ID**: `f5b24fb9-1881-4998-a641-9f840056dcdd` - 用于前端 SDK
- **API Key**: `c9x74FDORTZOb9-lJenjodqHeFtH6EGhqONC0hFXHC8n6C9MA8ZFRvJyzgq7pZxq` - 可能不是 OAuth Client Secret

### 需要的凭证

根据 [Volumental Online Scan API 文档](https://developer.volumental.com/docs/online-scan-api)，你需要：

- **OAuth Client ID**: 用于 API 认证的客户端 ID
- **OAuth Client Secret**: 用于 API 认证的客户端密钥

⚠️ **重要**：SDK Client ID ≠ OAuth Client ID

## 如何获取 OAuth Credentials

### 步骤 1: 联系 Volumental 支持

你需要联系 Volumental 技术支持，请求获取 **OAuth Client Credentials**，用于访问 Online Scan API。

**邮件模板**：

```
主题：请求 OAuth Client Credentials 用于 Online Scan API

你好，

我需要获取 OAuth Client Credentials 来访问 Volumental Online Scan API。

我的 SDK Client ID 是: f5b24fb9-1881-4998-a641-9f840056dcdd

请提供：
1. OAuth Client ID
2. OAuth Client Secret

用途：通过 API 获取扫描详情数据（测量数据、3D 模型等）

谢谢！
```

### 步骤 2: 更新 Apps Script 代码

获取到 OAuth credentials 后，更新 `apps-script-code.js` 中的：

```javascript
const VOLUMENTAL_CLIENT_ID = "你的OAuth_Client_ID";
const VOLUMENTAL_CLIENT_SECRET = "你的OAuth_Client_Secret";
```

### 步骤 3: 测试认证

运行 `testOAuthAuth()` 函数来验证 credentials 是否正确：

1. 在 Apps Script 编辑器中选择 `testOAuthAuth`
2. 点击运行
3. 查看执行日志

如果成功，你会看到：
```
✅ OAuth 认证成功！
Access Token: ...
```

## 测试函数

### testOAuthAuth()

测试 OAuth 认证是否成功。运行此函数来验证你的 credentials。

### testGetScanDetails()

测试获取扫描详情。只有在 OAuth 认证成功后才能使用。

## 常见问题

### Q: 为什么 SDK Client ID 不能用于 API？

A: SDK Client ID 是用于前端 SDK 的公开标识符，而 OAuth Client ID 是用于后端 API 认证的凭证。它们是不同的系统，需要不同的凭证。

### Q: API Key 是 OAuth Client Secret 吗？

A: 可能不是。API Key 通常用于其他类型的认证，而 OAuth 需要专门的 Client Secret。需要联系 Volumental 确认。

### Q: 如何知道我的 credentials 是否正确？

A: 运行 `testOAuthAuth()` 函数。如果返回 401 错误，说明 credentials 不正确。

## 参考文档

- [Volumental Online Scan API 文档](https://developer.volumental.com/docs/online-scan-api)
- OAuth 2.0 Client Credentials Flow

