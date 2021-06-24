import React, {useEffect, useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"
import ForumIcon from '@material-ui/icons/Forum';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function PitchItemRec({item, setPitch, user, setShowFav}) {
    // const [user, setUser] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const [comment, setComment] = useState({name: user.name, text: ""})

    const form = useRef(null)




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
    async function submitFav(e) {
        e.preventDefault(e)
        console.log("item id", item._id)
        if (item) {
            try {
                let res = await axios.put(`/api/user/edit/`, item, {
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



    async function getPitch() {
        console.log('YOUR FATHAR')
        let {data} = await axios.get(`/api/pitch`)
        setPitch(data.pitches)

    }

    function changeComment(e) {
        setComment(prevState => ({...prevState, [e.target.name]: e.target.value}))

        console.log("item", item)
    }

    async function postComment(e) {
        e.preventDefault()
        try{
            await axios.put(`/api/pitch/editcomment/${item._id}`, comment);
            setShowComment(false)
            getPitch()
        }catch (e) {
            console.log(e.response)
        }
    }


    return (

        <div>



            <Modal show={showComment} onHide={handleCloseComment}>
                <Form ref={form} id="form" onSubmit={postComment} method="post">
                    <Row className="justify-content-center mx-2">
                        <label>Title * </label>

                        <input onChange={changeComment}
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body>
                    <p>Self Intro: {item.selfintro}</p>
                    <p>USP: {item.usp}</p>
                    <p>Goals: {item.goals} </p>
                    <p>Comments:
                        { item.comments?.map(comment => (

                            <div>{comment.name} said: {comment.text}</div>
                        ))}
                    </p>
                    <Row>
                    <button className="btn border-dark bg-transparent text-dark" onClick={handleShowComment} ><ChatBubbleIcon /></button>
                    </Row>
                    </Modal.Body>
            </Modal>

            <div className={`${styles.makethishover}`}>
                <ul>
                    <li style={{background: `${item.color}`}}>


                            <h4>{item.title}</h4>
                        <span>  {item.selfintro}</span>
                        <span> {item.usp}, </span>

                            <Row className="justify-content-center"
                                 style={{
                                     position: "fixed",
                                     width: "100%",
                                     bottom: 0,
                                     paddingBottom: 0
                                 }}>
                                <Col md={4}>

                                    <Form ref={form} id="form" onSubmit={submitFav} method="post">
                                    <button type="submit" className="btn bg-transparent"><img src="https://img.icons8.com/offices/30/000000/filled-like.png"/> </button>
                                    </Form>
                                </Col>



                                <Col md={4}>
                                    <button className="btn bg-transparent text-dark" onClick={handleShow}> <VisibilityIcon /> </button>

                                </Col>
                            </Row>


                    </li>
                </ul>
            </div>


        </div>
    );
}

export default PitchItemRec;
