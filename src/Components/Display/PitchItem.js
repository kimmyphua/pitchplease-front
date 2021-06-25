import React, {useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form} from "react-bootstrap";
import axios from "axios"
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';




function PitchItem({item, user, setPitch}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const [post, setPost] = useState({})
    const [comment, setComment] = useState({name: user.name, text: ""})
    const form = useRef(null)


    async function deletePost() {
        await axios.delete(`/api/pitch/delete/${item._id}`);
        console.log('Delete successful');
        getPitch()
    }

    async function getPitch() {
        // console.log("YOUR MATHER")
        let {data} = await axios.get(`/api/user/${user._id}`)
        if(data.user.pitches){
            setPitch(data.user.pitches.reverse())
        }else {
            setPitch(null)
        }
    }



    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))

        console.log(post)
    }

    function changeComment(e) {
        setComment(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log("item", item)
    }

    async function editPost(e) {
        e.preventDefault()
        await axios.put(`/api/pitch/edit/${item._id}`, post);
        alert('Pitch Edited!');
        setShowEdit(false)
        getPitch()

    }

    async function postComment(e) {
        e.preventDefault()
        try{
            await axios.put(`/api/pitch/editcomment/${item._id}`, comment);
            setShowComment(false)

        }catch (e) {
            console.log(e.response)
        }
        getPitch()
    }

    // console.log(item.comments)
    return (

        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x</button>
                </Modal.Header>
                <Modal.Body className="text-dark">
                    <p>Self Intro: {item.selfintro}</p>
                    <p>USP: {item.usp}</p>
                    <p>Goals: {item.goals} </p>
                    <p>Comments:
                        { item.comments?.map(comment => (

                                <div>{comment.name} said: {comment.text}</div>
                            ))}
                    </p>
                    <Row className=" justify-content-end" >
                    <button
                        className=" btn border-dark bg-transparent px-2 " onClick={handleShowComment}> <ChatBubbleIcon /></button>
                    </Row>
                </Modal.Body>
            </Modal>

            <Modal show={showComment} onHide={handleCloseComment}>
                <Form ref={form} id="form" onSubmit={postComment} method="post">
                    <Row className="justify-content-center mx-2 text-dark">
                        <label>Comment * </label>

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



            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Form ref={form} id="form" onSubmit={editPost} method="post">
                    <Row className="justify-content-center mx-2 text-dark" >
                        <label>Title * </label>

                        <input onChange={change}
                               type="text"
                               name="title"
                               rows="3"
                               cols="60"
                               className="form-control"
                               aria-describedby="Enter title"
                               placeholder="Enter title"
                               defaultValue={item.title}
                               required={true}/>

                        <label>Self intro *</label>
                        <textarea onChange={change}
                                  rows="5"
                                  cols="60"
                                  type="text"
                                  name="selfintro"
                                  className="form-control"
                                  placeholder="Enter self Intro"
                                  defaultValue={item.selfintro}
                                  maxLength={200}/>


                        <label>USP *</label>
                        <textarea onChange={change}
                                  type="text"
                                  name="usp"
                                  rows="5"
                                  cols="60"
                                  className="form-control"
                                  aria-describedby="Enter usp "
                                  placeholder="Enter usp "
                                  defaultValue={item.usp}
                                  maxLength={200}/>

                        <label>Goals *</label>
                        <textarea onChange={change}
                                  type="text"
                                  name="goals"
                                  rows="5"
                                  cols="60"
                                  className="form-control"
                                  aria-describedby="Enter goals"
                                  placeholder="Enter goals"
                                  defaultValue={item.goals}
                                  maxLength={200}/>

                        <button type="submit" className="btn border-dark text-center m-2">
                            <h3>Edit pitch</h3>
                        </button>

                    </Row>
                </Form>
            </Modal>

            <Row>


                <ul>
                    <li style={{background: `${item.color}`}}>


                        <h4 className="font-monospace">{item.title}</h4>
                        <span>  {item.selfintro}</span>
                        <span> {item.usp}, </span>
                        <span>  {item.goals}, </span>

                        <Row className="justify-content-end"
                             style={{
                                 position: "fixed",
                                 width: "100%",
                                 bottom: 0,
                                 paddingBottom: 10
                             }}>
                            <Col md={12}>
                                <button className="btn   bg-transparent px-2 mx-1" onClick={handleShow}> <VisibilityIcon /></button>
                                <button className="btn   bg-transparent px-2 mx-1" onClick={handleShowEdit}> <EditIcon /></button>
                                <button className="btn   bg-transparent px-2" onClick={deletePost}> <DeleteIcon /></button>

                            </Col>
                        </Row>

                    </li>
                </ul>

            </Row>

        </div>
    );
}

export default PitchItem;
