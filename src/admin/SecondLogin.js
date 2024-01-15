import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const SecondLogin = () => {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                login
            );
            if (response.data) {
                // console.log(response.data.role);
                const { id_login } = response.data;
                localStorage.setItem("id_login", id_login);
                alert(response.data.message);
                // if (response.data.role === "Admin") {
                //     history.push("/dataLogin");
                // } 
                
                
                if (response.data.role === "User" || response.data.role === "Admin") {
                    // history.push({
                    //     pathname: "/formSiswa",
                    //     state: { id_login: response.data.id_login }
                    // });
                    history.push({
                        pathname: "/formSiswa",
                        state: { id_login: response.data.id_login }
                    });
                    // console.log(response.data.id_login);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    const handleBack = () => {
        history.push("/");
    };

    return (
        <div className="containerForm">
            <button className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'white' }} />
            </button>
            <h1>Mengisi Data Diri</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={login.username}
                        onChange={handleChange}
                        placeholder="Masukkan username"
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-button">
                    Isi Data Diri
                </Button>
            </Form>
        </div>
    );
};

export default SecondLogin;
