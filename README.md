# bxj-hub
Find what you're looking for.

## Node.js WebSocket客户端项目

这是一个基于Node.js开发的WebSocket客户端项目，提供简单易用的WebSocket连接和通信功能。

### 功能特性

- ✅ WebSocket客户端连接
- ✅ 消息发送和接收
- ✅ 自动重连支持
- ✅ 错误处理
- ✅ 测试服务器

### 安装

```bash
npm install
```

### 使用方法

#### 1. 启动WebSocket服务器（用于测试）

```bash
npm run server
```

服务器将在 `ws://localhost:8888` 上运行。

#### 2. 运行客户端示例

在另一个终端窗口中运行：

```bash
npm run client
```

或者：

```bash
npm start
```

### 代码示例

```javascript
const WebSocketClient = require('./client');

// 创建客户端实例
const client = new WebSocketClient('ws://localhost:8888');

// 连接到服务器
async function main() {
    await client.connect();
    
    // 设置消息接收处理
    client.onMessage((data) => {
        console.log('收到消息:', data.toString());
    });
    
    // 发送消息
    client.send('Hello, Server!');
}

main();
```

### API文档

#### WebSocketClient

**构造函数**
```javascript
const client = new WebSocketClient(url);
```
- `url` (可选): WebSocket服务器地址，默认为 `ws://localhost:8888`

**方法**

- `connect()`: 连接到WebSocket服务器（返回Promise）
- `send(message)`: 发送消息到服务器
- `close()`: 关闭连接
- `onMessage(callback)`: 设置消息接收回调函数

### 文件结构

```
bxj-hub/
├── client.js       # WebSocket客户端类
├── server.js       # 测试用WebSocket服务器
├── example.js      # 使用示例
├── index.html      # Web界面
├── package.json    # 项目配置
└── README.md       # 项目文档
```

### 依赖项

- [ws](https://github.com/websockets/ws) - WebSocket客户端和服务器库

### License

ISC
