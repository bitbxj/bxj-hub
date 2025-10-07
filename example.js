const WebSocketClient = require('./client');

// 创建WebSocket客户端实例
const client = new WebSocketClient('ws://localhost:8888');

// 连接到服务器
async function main() {
    try {
        console.log('正在连接到WebSocket服务器...');
        await client.connect();

        // 设置消息接收处理
        client.onMessage((data) => {
            console.log('处理接收的消息:', data.toString());
        });

        // 发送测试消息
        setTimeout(() => {
            client.send('你好，服务器！');
        }, 1000);

        setTimeout(() => {
            client.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
        }, 2000);

        // 保持连接一段时间后关闭
        setTimeout(() => {
            console.log('\n关闭连接...');
            client.close();
            process.exit(0);
        }, 5000);

    } catch (error) {
        console.error('连接失败:', error.message);
        console.log('\n提示: 请确保WebSocket服务器正在运行在 ws://localhost:8888');
        process.exit(1);
    }
}

// 优雅处理进程退出
process.on('SIGINT', () => {
    console.log('\n收到中断信号，正在关闭...');
    client.close();
    process.exit(0);
});

main();
