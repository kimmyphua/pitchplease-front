import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import "./DashboardChat.css";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar"
import Chat from "./Chat"

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function DashboardChat(auth) {
    let userID = (auth.user._id)
    const [user, setUser] = useState({})
    const [chatID, setChatID] = useState("")
    console.log(auth)
    console.log(userID)
    const [chat, setChat] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
            async function setUserStats() {
                try {
                    let {data} = await axios.get("/api/auth/user", {
                        headers: {
                            authorization: `Bearer ${localStorage.token}`
                        }
                    })
                    setUser(data.user)
                    // console.log(user._id)

                } catch (e) {
                    setUser({})
                    localStorage.removeItem("token")
                }
            }

            setUserStats()
        }, [])

    // const addChat = (e) => {
    //         e.preventDefault()
    //
    //         const chatName = prompt('Please enter a chat name')
    //         const firstMsg = prompt('Please enter a welcome message')
    //
    //         if (chatName && firstMsg) {
    //             let chatId = ''
    //
    //             axios.post('/api/chat/new/conversation', {
    //                 chatName: chatName
    //             }).then((res) => {
    //                 chatId = res.data._id
    //             }).then(() => {
    //                 axios.post(`/api/chat/new/message?id=${chatId}`, {
    //                     message: firstMsg,
    //                     timestamp: Date.now(),
    //                     user: user
    //                 })
    //             })
    //         }
    //     }

    return (
            <div className="DashboardChat">
                {/*<button onClick={getChat} disabled>*/}
                {/*    Get all Conversation*/}
                {/*</button>*/}
                {/*<button onClick={getConversation}>*/}
                {/*    Get Conversation*/}
                {/*</button>*/}
                {/*<button onClick={addMessage}>*/}
                {/*    Add Message*/}
                {/*</button>*/}
                {/*{*/}
                {/*    messages?.conversation?.map((item) => (*/}
                {/*        <div>{item.message}</div>*/}
                {/*    ))*/}
                {/*}*/}
                <Sidebar auth={auth} user={user} setChat={setChat} chat={chat}/>
                <Chat auth={auth} user={user} setChat={setChat} chat={chat}/>
            </div>
    );
}

export default DashboardChat;
