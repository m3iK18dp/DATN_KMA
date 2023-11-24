import { useEffect, useState } from 'react';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';


function WebSocketComponent({ destination, func }) {
    const [stompClient, setStompClient] = useState(Stomp.over(new SockJS('http://localhost:8080/ws', null, { withCredentials: true })))
    useEffect(() => {
        const connectStompClient = async () => {
            try {
                await stompClient.connect({});
                stompClient.subscribe(destination, (response) => {
                    const message = response.body;
                    if (message === "refresh-trans-history")
                        func();
                });
            } catch (error) {
                console.error("Error connecting to stompClient:", error);
            }
        };

        connectStompClient();

        // return () => {
        //     stompClient.disconnect();
        // };
    }, [destination]);


    return <></>;
};

export default WebSocketComponent;
