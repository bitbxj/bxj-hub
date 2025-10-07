const WebSocket = require('ws');

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8888 });

console.log('WebSocket服务器已启动在 ws://localhost:8888');

wss.on('connection', (ws) => {
    console.log('✓ 新客户端已连接');

    // 发送欢迎消息
    ws.send('欢迎连接到WebSocket服务器！');

    // 处理接收到的消息
    ws.on('message', (message) => {
        console.log('收到消息:', message.toString());
        
        // 回显消息给客户端
        ws.send(`服务器回复: ${message}`);
    });

    // 处理连接关闭
    ws.on('close', () => {
        console.log('✗ 客户端已断开连接');
    });

    // 处理错误
    ws.on('error', (error) => {
        console.error('连接错误:', error.message);
    });
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    wss.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});
