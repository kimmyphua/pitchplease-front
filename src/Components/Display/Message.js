import React, {useRef, useState} from 'react';
import axios from "axios";
import styles from "./Dashboard.module.css";
import {Col, Form, Modal, Row} from "react-bootstrap";
import Reply from "./Reply";
import Single from "./Single";
import EmailIcon from '@material-ui/icons/Email';

function Message({user, item}) {
    const [message, setMessage] = useState({})
    const form = useRef(null)
    const [myMsg, setMyMsg] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showFav, setShowFav] = useState([])

    async function postMessage(e) {
        e.preventDefault()
        console.log(message)
        try{
            await axios.put(`/api/user/messages/${item.creator}`, message);
            console.log(item.creator)
            console.log(item.title)
            console.log("msg", message)
            alert('Message Sent! :D');
            handleClose()
            getFavourites()
        }catch (e) {
            console.log(e.response)
        }
    }

    function settingMsg() {
        setMessage({sender: user._id, title: item.title, pitchId: item._id, name: user.name, text: "", time: Date.now()})
    }




    function changeMessage(e) {
        setMessage(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(message)
        // console.log("item", item)
    }

    async function getMessage() {
        settingMsg()
        try{
            let {data} = await axios.get(`/api/user/${user._id}`);
            console.log(data.user.messages)
            setMyMsg(data.user.messages.reverse())

        }catch (e) {
            console.log(e.response)
        }
        handleShow()
        getFavourites()
    }

    async function getFavourites() {
        console.log('YOUR MATHER')
        let {data} = await axios.get(`/api/user/${user._id}`)
        // console.log("data",data)
        // console.log("fav", data.user.favourites)
        if (data.user.favourites) {
            setShowFav(data.user.favourites.reverse())
        } else {
            setShowFav(null)
        }
    }

    return (
        <div className="App">
            <button
                className="btn bg-transparent navButton"
                onClick={getMessage}>
                <EmailIcon />
            </button>

            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2 text-center`}>
                    <img style={{width:"20%"}} className="navButton" src="https://i.pinimg.com/originals/c4/cd/cc/c4cdccefc24e88ba6f4f1bbaeb817c2c.png" />


                        <Row className="justify-content-center mx-2 text-dark">

                            <label>Type Your Message Here * </label>

                            <textarea onChange={changeMessage}
                                      type="text"
                                      name="text"
                                      rows = "2"
                                      cols = "30"
                                      className="form-control"
                                      aria-describedby="Enter title"
                                      placeholder="Say something nice ......"
                                      required={true}
                            />
                            <Form ref={form} id="form" onSubmit={postMessage} method="post">
                            <Row  className="justify-content-end">
                            <button type="submit" style={{width:"20%"}} className="btn bg-info text-center navButton my-2">
                            Send
                            </button>
                            </Row>
                    </Form>



                        </Row>

                </div>


            </Modal>



        </div>
    );
}

export default Message;
