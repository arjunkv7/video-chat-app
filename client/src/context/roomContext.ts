import socketIO from 'socket.io-client';
import { createContext } from 'react';

let socketUrl = 'http://localhost:8000';

const RoomContext = createContext<null | any>(null);

const ws = socketIO(socketUrl);

export const RoomProvider: React.FunctionComponent = ({children}) => {
    <RoomContext.Provider value={{ ws }}> {children} </RoomContext.Provider>
}