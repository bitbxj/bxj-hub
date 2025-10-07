const WebSocket = require('ws');

class WebSocketClient {
    constructor(url) {
        this.url = url || 'ws://localhost:8888';
        this.ws = null;
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url);

                this.ws.on('open', () => {
                    console.log(`✓ 连接成功: ${this.url}`);
                    this.isConnected = true;
                    resolve();
                });

                this.ws.on('message', (data) => {
                    console.log('收到消息:', data.toString());
                });

                this.ws.on('error', (error) => {
                    console.error('连接错误:', error.message);
                    this.isConnected = false;
                    reject(error);
                });

                this.ws.on('close', () => {
                    console.log('✗ 连接已关闭');
                    this.isConnected = false;
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    send(message) {
        if (!this.isConnected || !this.ws) {
            console.error('未连接到服务器');
            return false;
        }

        try {
            this.ws.send(message);
            console.log('发送消息:', message);
            return true;
        } catch (error) {
            console.error('发送消息失败:', error.message);
            return false;
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
            this.isConnected = false;
        }
    }

    onMessage(callback) {
        if (this.ws) {
            this.ws.on('message', callback);
        }
    }
}

module.exports = WebSocketClient;
