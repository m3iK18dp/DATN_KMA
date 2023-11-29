import { useEffect, useState } from 'react';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';


function WebSocketComponent({ destination, func }) {
    // const [stompClient, setStompClient] = useState(Stomp.over(new SockJS('http://localhost:8080/ws', null, { withCredentials: true }))) 
    const stompClient = Stomp.over(new SockJS(import.meta.env.VITE_API_BACKEND_URL + '/ws', null, { withCredentials: true }))
    useEffect(() => {
        // console.log(destination)
        if (destination)
            connectStompClient();
        // return () => {
        //     stompClient.disconnect();
        // };
    }, [destination]);
    const connectStompClient = () => {
        try {
            // console.log("Connecting to WebSocket...");
            stompClient.connect({}, () => {
                // console.log("WebSocket connection successful!");
                stompClient.subscribe("/topic/" +
                    // "messages"
                    destination
                    , (response) => {
                        const message = response.body;
                        console.log(message);
                        if (message === "refresh-trans-history") {
                            func();
                        }
                    });
            });

        } catch (error) {
            console.error("Error connecting to stompClient:", error);
        }
    };

    return <></>;
};

export default WebSocketComponent;
