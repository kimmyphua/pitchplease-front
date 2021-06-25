import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Button, Modal} from "react-bootstrap";
import {NavLink, Redirect} from 'react-router-dom';
import axios from "axios";
import Reply from "./Display/Reply";


function Navigation({setAuth, setUser, user}) {
    const [myMsg, setMyMsg] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getMessage() {
        try{
            let {data} = await axios.get(`/api/user/${user._id}`);
            console.log(data.user.messages)
            setMyMsg(data.user.messages.reverse())

        }catch (e) {
            console.log(e.response)
        }
        handleShow()
    }


     function logout(e) {
        e.preventDefault()
        setAuth(false)
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <Navbar bg="transparent" expand="lg" className="text-center w-100">
            <h3 className="px-4">Pitch Please!</h3>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="bg-white">

                <Nav className="ml-auto">
                    <NavLink to="/" className="navButton font-monospace nav-link">Home</NavLink>
                    <NavLink to="/about" className="navButton font-monospace nav-link"> About</NavLink>
                </Nav>
                {user ? <>

                    <NavLink to="/dashboard" className="navButton font-monospace text-dark nav-link">{user.name}'s Page</NavLink>
                    <button onClick={getMessage} className="btn navButton text-dark mb-1 border-0"> Messages</button>
                    <NavLink to="/login" onClick={logout} className="navButton font-monospace text-dark nav-link">Logout</NavLink>


                </> :<>
                    <NavLink to="/login" className="navButton font-monospace text-dark nav-link">Login</NavLink>
                    <NavLink to="/register" className="navButton font-monospace text-dark nav-link">Register</NavLink>
                </> }


            </Navbar.Collapse>
            {user ?
            <Nav className=" align-self-end px-3">
                <h4>Welcome Back, {user.name}!</h4>
            </Nav> : null

            }

            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2`}>
                    My messages:
                    {myMsg.map(msg => (
                        <Reply
                            msg={msg}
                            user={user}/>

                    ))}

                </div>

            </Modal>
        </Navbar>
    );
}

export default Navigation;
