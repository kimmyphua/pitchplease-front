import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink, Redirect} from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import {Form} from "react-bootstrap";


function Login({auth, setAuth}) {


    const [data, setData] = useState({})
    const form = useRef(null)


    async function submitForm(e) {
        e.preventDefault()
        try {
            let {data: {token}} = await axios.post("/api/auth/login", data)
            console.log(token)
            localStorage.setItem("token", token)
            setAuth(true)

        } catch (e) {
            console.log(e)
            alert('try again!')
        }
    }

    function change(e) {
        setData(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(data)
    }

    if(auth){
        return < Redirect to="/dashboard" />
    }



    return (
        <div>
            <div className={`${styles.container} text-center container-fluid d-flex align-items-center justify-content-center`}>
                <div className={styles.loginFormContainer}>

                    <fieldset className="border p-3 rounded">
                        <legend
                            className={`${styles.loginFormLegend} border rounded p-1 text-center text-dark`}
                        >
                            Login Form
                        </legend>
                        <Form ref={form} onSubmit={submitForm} method="post">
                            <div className="form-group">
                                <label htmlFor="inputForEmail">Email address *</label>

                                <input onChange={change}
                                       type="email"
                                       name="email"
                                       className={`${styles.inputStyle} form-control`}
                                       aria-describedby="Enter email address"
                                       placeholder="Enter email address"
                                       required="true"
                                       minLength={6}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="inputForPassword">Password *</label>
                                <input onChange={change}
                                       type="password"
                                       name="password"
                                       className={`${styles.inputStyle} form-control`}
                                       id="inputForPassword"
                                       placeholder="Enter password"
                                       required="true"
                                       minLength={6}
                                />

                            </div>
                            <div className=" align-items-center">
                                <button type="submit" className="btn border-dark text-center mx-2">
                                    Login
                                </button>

                                <button className="btn border-dark text-dark text-center mx-2">
                                    <NavLink to="/register">New User</NavLink>
                                </button>
                            </div>
                        </Form>
                    </fieldset>

                </div>
            </div>



        </div>
    );
}

export default Login
