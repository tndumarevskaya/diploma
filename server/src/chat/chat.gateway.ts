import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = Number(client.handshake.query.userId);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      client.disconnect(true);
    } else {
      client.join(user.id.toString());
    }
  }

  handleDisconnect(client: Socket) {
    client.leave(client.id);
  }
}



