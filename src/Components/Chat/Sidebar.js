import {Avatar, IconButton} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import axios from "axios";
import Pusher from "pusher-js";

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function Sidebar({user, auth , setChat, chat}) {
    const [chats, setChats] = useState([]);
    console.log(auth)
    // useEffect(() => {
    //     pusher.unsubscribe('messages')
    //
    //     getConversation()
    //     const channel = pusher.subscribe('messages');
    //     channel.bind('newMessage', function (data) {
    //         getConversation()
    //     });
    // }, []);
    //
    //
    // useEffect(() => {
    //     async function setUserStats() {
    //         try {
    //             let {data} = await axios.get("/auth/user", {
    //                 headers: {
    //                     authorization: `Bearer ${localStorage.token}`
    //                 }
    //             })
    //             setUser(data.user)
    //             // console.log(user._id)
    //
    //         } catch (e) {
    //             setUser({})
    //             localStorage.removeItem("token")
    //         }
    //     }
    //
    //     setUserStats()
    // }, [])
    //
    //
    // async function getChat() {
    //     let {data} = await axios.get(`/apichat/get/conversationFromRC?id=${userID}`)
    //     console.log(data)
    //     console.log("message:",data[0]?.conversation[0]?.message)
    //     if (data[0]){
    //         setChat(data[0].conversation[0])
    //     }
    // }
    //
    // async function getConversation() {
    //        await axios.get(`/apichat/get/conversation?id=60d401e927522d0988147a8b`)
    //             .then((res) => {
    //                 setMessages(res.data[0])
    //
    //             })
    //     console.log(messages?.conversation?.[0].message)
    // }
    //
    // function addMessage() {
    //     axios.post(`/api/chat/new/message?id=60d401e927522d0988147a8b`, {
    //         message: "This is a test!",
    //         timestamp: Date.now(),
    //         user: user
    //     })
    // }



    // useEffect( () => {
    //     getChat()
    // }, [])


    const getChats = () => {
        axios.get('/api/chat/get/conversationList')
            .then((res) => {
                setChats(res.data)
            })
    }

    useEffect(() => {
        getChats()

        const channel = pusher.subscribe('chats');
        channel.bind('newChat', function (data) {
            getChats()
        });
    }, []);

    const addChat = (e) => {
        e.preventDefault()

        const chatName = prompt('Please enter a chat name')
        const firstMsg = prompt('Please enter a welcome message')

        if (chatName && firstMsg) {
            let chatId = ''

            axios.post('/apichat/new/conversation', {
                chatName: chatName
            }).then((res) => {
                chatId = res.data._id
            }).then(() => {
                axios.get(`/api/chat/new/message?id=${chatId}`, {
                    message: firstMsg,
                    timestamp: Date.now(),
                    user: user
                })
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar
                    // onClick={() => auth.signOut()}
                    // src={user.photo}
                    className="sidebar__avatar"
                />
                <div className="sidebar__input">
                    <SearchIcon/>
                    <input placeholder="Search"/>
                </div>
                {/*<div className="font-icon-wrapper" onClick={addChat}>*/}
                {/*    <IconButton variant="outlined" className="sidebar__inputButton">*/}
                {/*        <RateReviewOutlinedIcon />*/}
                {/*    </IconButton>*/}
                {/*</div>*/}

            </div>

            <div className="sidebar__chats">
                {chats.map(({ id, name, timestamp }) => (
                    <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp} auth={auth} setChat={setChat} chat={chat}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
