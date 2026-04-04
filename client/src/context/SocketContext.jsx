import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
            const newSocket = io(socketUrl);

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
                newSocket.emit('join', user.id);
            });

            newSocket.on('new_notification', (data) => {
                toast(data.message, {
                    icon: data.type === 'match' ? '🚨' : '🔔',
                    duration: 5000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
                
                // You could also trigger a data refresh here
                // We'll expose the notification event for components to listen to
                const event = new CustomEvent('socket_notification', { detail: data });
                window.dispatchEvent(event);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
