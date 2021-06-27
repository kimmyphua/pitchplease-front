import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import "./SidebarChat.css";
import axios from 'axios';
import Pusher from "pusher-js";

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function SidebarChat({ id, chatName, auth , chat, setChat}) {
    const [chatInfo, setChatInfo] = useState([]);

    const [lastMsg, setLastMsg] = useState([]);
    // const [lastPhoto, setLastPhoto] = useState();
    const [lastTimestamp, setLastTimestamp] = useState([]);

    const getSidebarElement = () => {
        axios.get(`/api/chat/get/lastMessage/?id=${id}`)
            .then((res) => {
                setLastMsg(res.data.message)
                // setLastPhoto(res.data.user.photo)
                setLastTimestamp(res.data.timestamp)
            })
    }

    console.log(chat)


    useEffect(() => {
        getSidebarElement()

        //realtime stuff
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getSidebarElement()
        });
    }, [id]);

    return (
        <div onClick={() => setChat({chatId: id, chatName: chatName})} className="sidebarChat">
            {/*<Avatar src={lastPhoto} />*/}
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{lastMsg}</p>
                <small>
                    {new Date(parseInt(lastTimestamp,10)).toLocaleTimeString()}
                </small>
            </div>
        </div>
    );
}

export default SidebarChat;
