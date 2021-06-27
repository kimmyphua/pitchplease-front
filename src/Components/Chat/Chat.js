import {IconButton} from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, {useEffect, useState} from "react";
import "./Chat.css";
import Message from "./Message";
import FlipMove from "react-flip-move";
import axios from 'axios';
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function Chat({chatId, chatName, auth, setChat, chat}) {

    chatId = (chat.chatId)
    console.log(chat.chatName)
    console.log(auth)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const getConversation = (chatId) => {
        if (chatId) {
            axios.get(`/api/chat/get/conversation?id=${chatId}`)
                .then((res) => {
                    setMessages(res.data[0].conversation)

                })
            console.log('messages',messages)
        }
    }

    useEffect(() => {
        pusher.unsubscribe('messages')

        getConversation(chatId)
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getConversation(chatId)
        });
    }, [chatId]);


    const sendMessage = (e) => {
        e.preventDefault();

        console.log(auth)

        axios.post(`/api/chat/new/message?id=${chatId}`, {
            message: input,
            timestamp: Date.now(),
            user: auth
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>
                    To: <span className="chat__name">{chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>

            {/* chat messages */}
            <div className="chat__messages">
                <FlipMove>
                    {messages.map(({ user, _id, message, timestamp }) => (
                        <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp} auth={auth} />
                    ))}
                </FlipMove>
            </div>

            <div className="chat__input">
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="iMessage"
                        type="text"
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                    <MicNoneIcon className="chat__mic"/>
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;
