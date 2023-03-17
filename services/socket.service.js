import { io } from 'socket.io-client'

class SocketService {
    socket;
    constructor() {}
  
    setupSocketConnection() {
      this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
      this.socket.emit('my message', 'setupSocketConnection');
    }

    disconnect() {
        if (this.socket) this.socket.disconnect();
    }

}
export default new SocketService();