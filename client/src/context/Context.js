import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { baseUrl, postReq, socketUrl } from '../utils/services';
import axios from 'axios';
export const Conetxt = createContext();
export const Context = createContext();

// ContextProvider
export const ContextProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [connectingServer, setConnectionServer] = useState(false);
    const [emergencyData, setEmergencyData] = useState();
    const [alertError, setAlertError] = useState();

    useEffect(() => {
        try {
            const newSocket = io("http://localhost:5000");

            newSocket.on("connect", () => {
            console.log("Socket connected");
            });
            newSocket.on("disconnect", () => {
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        } catch (error) {
            console.log("Error connecting to socket:", error);
        }
    }, []);

    const notifyAlert = (emergencyData) => {
        if (socket) {
            try {
                // Use the local socket instance to emit the event
                socket.emit("alertFromClient", emergencyData);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Socket not found");
        }
    };


    const sendEmergencyAlert = useCallback(async (emergencyData) => {
        try {

            // Make sure socket is available before emitting
            if (socket) {
                notifyAlert(emergencyData);
            } else {
                console.log("Socket not found");
            }

            setAlertError(null);
            setConnectionServer(true);

            const response = await postReq(`${baseUrl}/api/disaster/emergency`, emergencyData);

            setConnectionServer(false);

            if (response.data.error) {
                console.log(response.data.error);
                return setAlertError(response.data.error);
            }

            setEmergencyData(emergencyData);

            return response.data.insertedData;
        } catch (error) {
            setAlertError(error);
            console.error(error);
        }
    }, [socket]); // Make sure to include socket as a dependency


    return (
        <Context.Provider
            value={{
                sendEmergencyAlert,
                socket,
                connectingServer,
                alertError
            }}
        >
            {children}
        </Context.Provider>
    );
};
