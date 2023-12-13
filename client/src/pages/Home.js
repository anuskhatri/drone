import { useContext, useEffect } from 'react';
import NavBar from '../components/NavBar'
import { Conetxt } from '../context/Context';

const Home = () => {
    const { sendEmergencyAlert, socket } = useContext(Conetxt)
    useEffect(() => {
        console.log("sending alert");
        sendEmergencyAlert({
            "name": "test",
            "email": "test",
            "contact": 8696074241,
            "longitude": 72.877655,
            "latitude": 19.075983
        })
    }, [socket])
    return (
        <>
            <button onClick={() => sendEmergencyAlert({
                "name": "test",
                "email": "test",
                "contact": 8696074241,
                "longitude": 72.877655,
                "latitude": 19.075983
            })}>Click</button>
        </>
    );
}

export default Home;