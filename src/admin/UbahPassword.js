import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { hash } from "bcryptjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import "./UbahPassword.css";

const UbahPassword = () => {
    const { id } = useParams();
    const history = useHistory();
    const [login, setLogin] = useState({});
    // const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/dataLogin/" + id)
            .then((res) => setLogin(res.data[0]))
            .catch((err) => console.log(err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    // const handleImageChange = (e) => {
    //   setSelectedFile(e.target.files[0]);
    // };

    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const response = await axios.put(
    //       `http://localhost:5000/api/dataSiswa/${id}`, siswa
    //     );
    //     if (response.data) {
    //       alert(response.data.message);
    //       history("/dataSiswa");
    //       return;
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     alert(err.message);
    //   }
    // };
    // const handleSubmit = async (event) => {
    //   e.preventDefault();
    //   try {
    //     const hashedPassword = await hash(login.password, 10);
    //     const formData = {
    //       username: login.username,
    //       password: hashedPassword,
    //       role: login.role,
    //     };
    //     const response = await axios.post(
    //       `http://localhost:5000/api/dataLogin/${id}`, 
    //       formData
    //     );
    //     if (response.data) {
    //       alert(response.data.message);
    //       setLogin({ username: "", password: "", role: "" });
    //       history.push("/dataLogin");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const hashedPassword = await hash(login.password, 10);
            const formData = {
                // username: login.username,
                password: hashedPassword,
                // role: login.role,
            };
            const response = await axios.put(
                `http://localhost:5000/api/dataLogin/ubahPassword/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data) {
                alert(response.data.message);
                history.push("/");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleBack = () => {
        history.push("/mainPage");
    };


    return (
        <div className="containerForm">
            <button className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{color: 'white'}}/>
            </button>
            <h1>Ubah Password</h1>
            <h6 className="username">Username : {login.username}</h6>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPassword" className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        placeholder="Masukkan Password Baru"
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="save-button">
                    Simpan
                </Button>
            </Form>
        </div>
    );
};

export default UbahPassword;

