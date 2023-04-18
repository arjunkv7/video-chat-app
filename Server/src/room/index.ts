import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

export const roomHandler = (socket: Socket) => {
    function createRoom () {
        let roomId = uuidV4();
        console.log('Room created',roomId);
        socket.emit('room-created', { roomId });
    }
    
    function joinRoom ( roomId:string) {
        console.log('user joined the room ',roomId);
        socket.join(roomId)
    }

    socket.on('create-room',createRoom );
    socket.on('join-room', joinRoom);

}