import { createServer } from 'node:http';
import app from 'src/app';
import { appLogger } from './utils';
import { Server } from 'socket.io';
import { envConfig } from './config';

const main = (): void => {
  const PORT = app.get('port');

  const httpServer = createServer(app);
  const socketServer = new Server(httpServer, {
    cors: {
      origin: envConfig.WEB_CLIENT_URL,
    },
  });

  socketServer.on('connection', (socket) => {
    socket.on('join-market', () => {
      socket.join('market');
    });

    socket.on('notification', (data) => {
      socketServer.to('market').emit('notification-from-server', data);
    });
  });

  socketServer.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  httpServer.listen(PORT, () => {
    appLogger.info(`Server running on port ${PORT}`);
  });
};

main();
