import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

let allRooms: Record<string, string[]> = {};

interface IroomParams {
    roomId: string;
    peerId: string;
}

export const roomHandler = (socket: Socket) => {
    function createRoom() {
        let roomId1 = uuidV4();
        let roomId = "firstRoom"
        allRooms[roomId] = [];
        console.log('Room created', roomId);
        socket.emit('room-created', { roomId });
    }

    function joinRoom({ roomId, peerId }: IroomParams) {
        console.log('user joined the room ', roomId, peerId);
        if(allRooms[roomId]) {
            socket.join(roomId);
            allRooms[roomId].push(peerId);
            socket.to(roomId).emit('user-joined', { peerId});
            socket.emit('get-users', {
                peerId,
                participants: allRooms[roomId]
            });
        }

        socket.on('disconnect', () => {
            console.log('User leaved from the room.');
            leaveRoom({roomId, peerId})
            socket.to(roomId).emit('user-disconnected', peerId);
        })
    }

    const leaveRoom = ({ roomId, peerId }: IroomParams) => {
        console.log('peerid', peerId)
        allRooms[roomId] = allRooms[roomId].filter((e) => e != peerId );
        console.log(allRooms[roomId])
    }

    socket.on('create-room', createRoom);
    socket.on('join-room', joinRoom);

}