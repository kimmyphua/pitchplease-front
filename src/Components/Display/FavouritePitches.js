import React, {useRef, useState} from 'react';
import {Col, Row, Form, Modal} from "react-bootstrap";
import styles from "./PitchItem.module.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios";
import Message from "./Message";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

function FavouritePitches({item, user, setShowFav}) {
    const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [post, setPost] = useState({name: user.name, text: ""})
    const [pitch, setPitch] = useState([])


    async function getPitch() {
        console.log('YOUR FATHAR')
        let {data} = await axios.get(`/api/pitch`)
        setPitch(data.pitches.reverse())

    }

    async function getFavourites() {
        console.log('YOUR MATHER')
        let {data} = await axios.get(`/api/user/${user._id}`)

        if (data.user.favourites) {
            setShowFav(data.user.favourites.reverse())
        } else {
            setShowFav(null)
        }
        getPitch()
    }

    async function removeFav(e) {
        e.preventDefault(e)
        console.log("remove",item)
        if (item) {
            try {
                let res = await axios.put(`/api/user/editing/`, item, {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        getFavourites()

    }

    async function postComment(e) {
        e.preventDefault()
        try{
        await axios.put(`/api/pitch/editcomment/${item._id}`, post);
        alert('Commented!');
        setShowEdit(false)
        getPitch()
            getFavourites()

        }catch (e) {
            console.log(e.response)
        }
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(post)
        console.log("item", item)
    }


    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body className="text-dark">
                    <span> {item.selfintro}</span>
                    <p>Self Intro: {item.selfintro}</p>
                    <p>USP: {item.usp}</p>
                    <p>Goals: {item.goals} </p>
                    <p>Comments:
                        {
                            item?.comments?.map(comment => (
                                <div>{comment.name} said: {comment.text}</div>
                            ))}
                    </p>
                    <Row>
                    <button className="btn border-dark bg-transparent text-dark" onClick={handleShowEdit}> <ChatBubbleIcon /> </button>
                    </Row>
                    </Modal.Body>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Form ref={form} id="form" onSubmit={postComment} method="post">
                    <Row className="justify-content-center mx-2">
                        <label>Send your love * </label>

                        <input onChange={change}
                               type="text"
                               name="text"
                               rows="3"
                               cols="60"
                               className="form-control"
                               aria-describedby="Enter title"
                               placeholder="Enter comment"
                               />

                        <button onClick={postComment} className="btn border-dark text-center m-2">
                            <ChatBubbleIcon />
                        </button>

                    </Row>
                </Form>
            </Modal>


            <ul>
                <li style={{background: `${item.color}`}}>
                    <h4 className="font-monospace"> {item.title}</h4>
                    <span>Self Intro: {item.selfintro}</span>
                    <span>USP: {item.usp}</span>
                    <span>Goals: {item.goals} </span>

                    <Row className=" w-auto"
                         style={{
                             position: "fixed",
                             width: "100%",
                             bottom: 0,
                             paddingBottom: 0
                         }}>

                        <Col md={4}>
                        <Form ref={form} id="form" onSubmit={removeFav}>

                            <button className="btn bg-transparent" type="submit"><img src="https://img.icons8.com/offices/30/000000/dislike.png"/></button>
                            </Form>
                        </Col>
                        <Col md={4}>
                            {/*//hererererererererer*/}
                            <Message user={user} item={item}/>
                        </Col>
                        <Col md={4}>
                            <button className="btn bg-transparent text-dark" onClick={handleShow}> <VisibilityIcon/> </button>
                        </Col>

                    </Row>


                </li>
            </ul>
        </div>
    );
}

export default FavouritePitches;
