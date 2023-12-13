import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { baseUrl, postReq, socketUrl } from '../utils/services';
import axios from 'axios';
export const Conetxt = createContext();

// ContextProvider
export const ContextProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [connectingServer, setConnectionServer] = useState(false);
    const [emergencyData, setEmergencyData] = useState();
    const [alertError, setAlertError] = useState()

    useEffect(() => {
        const newSocket = io(socketUrl)

        setSocket(newSocket)
        
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const notifyAlert = (emergencyData) => {
        
        if (!socket) return;
        
        socket.emit("alertFromClient", emergencyData);
    }

    const sendEmergencyAlert = useCallback(async (emergencyData) => {

        try {
            setAlertError(null)
            setConnectionServer(true)

            const response = await postReq(`${baseUrl}/api/disaster/emergency`, emergencyData);

            console.log(response);
            setConnectionServer(false)

            if (response.data.error) return setAlertError(response.data.error)

            setEmergencyData(emergencyData);

            notifyAlert(emergencyData)

            return response.data.insertedData

        }
        catch (error) {
            return setAlertError(error)
            console.log(error);
        }
    })

    return (
        <Conetxt.Provider
            value={{
                sendEmergencyAlert,
                socket,
                connectingServer,
                alertError
            }}
        >
            {children}
        </Conetxt.Provider>
    );
};
