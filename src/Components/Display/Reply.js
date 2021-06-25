import React, {useRef, useState} from 'react';
import axios from "axios";
import {Form, Row, Col} from "react-bootstrap";
import Single from "./Single";

function Reply({msg, user}) {
    const [message, setMessage] = useState({sender: user._id, title: msg.title,  pitchId: msg.pitchId, name: user.name, text: "", time: Date.now()})
    const form = useRef(null)


    async function postMessage(e) {
        e.preventDefault()
        console.log(message)
        try{
            await axios.put(`/api/user/messages/${msg.sender}`, message);
            alert('Message Sent!');

        }catch (e) {
            console.log("errr", e.response)
        }
    }


    function changeMessage(e) {
        setMessage(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(message)

    }



    return (
        <div>


            <h5 className="px-3 text-dark">{msg.name} replied to
                <text className={"text-danger"}>"{msg.title}"
                    at {new Date(parseInt(msg.time,10)).toLocaleDateString()}, {new Date(parseInt(msg.time,10)).toLocaleTimeString()}</text>:
                <p className="text-success">{msg.text}</p>  </h5>

            <Single msg={msg} />
            <Form ref={form} id="form" onSubmit={postMessage} method="post">
                <Row className="justify-content-center mx-2">
                    <label>Message * </label>

                    <textarea onChange={changeMessage}
                              type="text"
                              name="text"
                              rows = "2"
                              cols = "30"
                              className="form-control"
                              aria-describedby="Enter title"
                              placeholder="Type Your Message Here"
                    />
                    <Row className="justify-content-end">
                    <button type="submit" className=" w-25 btn border text-center mt-2">
                        <h5>Send!</h5>
                    </button>
                    </Row>

                </Row>
            </Form>

        </div>
    );
}

export default Reply;
