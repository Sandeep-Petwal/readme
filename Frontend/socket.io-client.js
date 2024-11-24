import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER_URL = "http://localhost:3005";
const SocketContext = createContext();

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);


    useEffect(() => {
        // Get token from localStorage
        const token = localStorage.getItem("instabook_token");
        if (!token) return;
        const socketInstance = io(SERVER_URL, {
            transports: ['websocket'],
            autoConnect: true,
            auth: { token },
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to WS server');
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from socket server');
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        // Set up event listeners for socket messages and notifications
        socketInstance.on('message', (data) => {
            console.log('Message:', data.message);
        });

        socketInstance.on('notification', (data) => {
            console.log('Notification:', data.message);
        });

        setSocket(socketInstance);

        // Cleanup socket connection on component unmount
        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);

    // Custom emit function
    const emitEvent = (event, data) => {
        if (socket && isConnected) {
            console.log("Sending event to server:", event, data);
            socket.emit(event, data);
        } else {
            console.warn('Socket is not connected');
        }
    };

    // Value to be passed through context
    const value = {
        socket,
        isConnected,
        emitEvent,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContext };
