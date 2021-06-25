import React, {useRef, useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Container, Form, Row, Col, Modal} from "react-bootstrap";
import PitchItem from "./PitchItem";
import styles from "./Dashboard.module.css"



const Dashboard = () => {
    const [user, setUser] = useState({})
    const [pitch, setPitch] = useState([])
    const [post, setPost] = useState({})

    const form = useRef(null)

    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/api/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setUser(data.user)

            } catch (e) {
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])



    useEffect(() =>{
        setPost({creator : user._id})
        // console.log(post)
    },[user])



        async function getPitch() {
            console.log("YOUR MATHER")
            let {data} = await axios.get(`/api/user/${user._id}`)
            if(data.user.pitches){
            setPitch(data.user.pitches.reverse())
            }else {
                setPitch(null)
            }
        }

    useEffect(() => {
        getPitch()
    }, [user])


    async function submitPost(e) {
        e.preventDefault(e)
        try {
            let res = await axios.post(`/api/pitch/create`, post, {
            })
            console.log(res)
            //get response
        } catch (e) {
            console.log(e)
        }

        getPitch()
        form.current.reset()


    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(post)
    }




if(user.role === "recruiter"){
   return < Redirect to="/recruiter" />
}

//////////this part is for jobseeker//////////

    return (
        <Container fluid>

            <Row>
                        <Col md={3} className={`${styles.sidebar} border border-dark border-2 text-dark`}>
                    <h3 className="text-center mt-4"> Create New Pitch:</h3>
                    <Form ref={form} id="form" onSubmit={submitPost} method="post">
                        <Row className="justify-content-center mx-2">
                            <label>Title * </label>

                            <textarea
                                    onChange={change}
                                   type="text"
                                   name="title"
                                   rows = "2"
                                   cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter title"
                                   placeholder="Enter title"
                                   required={true}
                             />

                            <label>Self intro *</label>
                            <textarea onChange={change}
                                      rows = "3"
                                      cols = "30"
                                      type="text"
                                      name="selfintro"
                                      className="form-control"
                                      placeholder="Enter self Intro"
                                      required={true}
                                      maxLength={200} />



                            <label>USP *</label>
                            <textarea onChange={change}
                                   type="text"
                                   name="usp"
                                      rows = "3"
                                      cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter usp "
                                   placeholder="Enter usp "
                                   required={true}
                                      maxLength={200}/>

                            <label>Goals *</label>
                            <textarea onChange={change}
                                   type="text"
                                   name="goals"
                                      rows = "3"
                                      cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter goals"
                                   placeholder="Enter goals"
                                   required={true}
                            maxLength={200}/>
                            <label>Select Colour *</label>
                            <select onChange={change}
                                    required={true}
                                    placeholder="select colour!"
                                    name="color"
                                    type="text"
                                    className="py-2"
                                    >
                                <option value={""}>Please Choose A Colour</option>
                                <option value={"beige"}>Beige</option>
                                <option value={"lightpink"}>Light Pink</option>
                                <option value={"lightblue"}>Light blue</option>
                                <option value={"violet"}>Violet</option>
                                <option value={"lightgreen"}>Light Green</option>
                            </select>

                            <button type="submit" className="btn border-dark text-dark text-center m-2">
                                <h3>CREATE PITCH</h3>
                            </button>

                        </Row>
                    </Form>
                        </Col>
                    {/*</div>*/}
                {/*</Col>*/}

                <Col md={9} className={`${styles.makeThisScroll} border border-2 border-dark`} >
                    <div className="dashboardcontainer">
                    {pitch.map((item,i) => (
                        <PitchItem
                            item={item}
                            key ={i}
                            user={user}
                            setPitch={setPitch}/>
                    )) }
                    </div>
                </Col>

            </Row>


        </Container>
    )

 }

export default Dashboard;
