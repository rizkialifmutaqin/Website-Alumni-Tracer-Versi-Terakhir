import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { hash } from "bcryptjs";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleTambahData.css";

const TambahLogin = () => {
    const [login, setLogin] = useState({
        nama: "",
        tahun_lulus: "",
        username: "",
        password: "",
        role: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // Menambah state untuk pesan kesalahan
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await hash(login.password, 10);
            const formData = {
                nama: login.nama,
                tahun_lulus: login.tahun_lulus,
                username: login.username,
                password: hashedPassword,
                role: login.role,
            };
            const response = await axios.post(
                "http://localhost:5000/api/dataLogin",
                formData
            );
            if (response.data) {
                alert(response.data.message);
                setLogin({ nama: "", tahun_lulus: "", username: "", password: "", role: "" });
                history.push("/dataLogin");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            }else {
                console.error(error);
            }
        }
    };

    const handleBack = () => {
        history.push("/dataLogin");
    };

    return (
        <div className="p-3">
            <button className="back-button mb-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
            </button>
            <h1 className="page-title">Tambah Data Login</h1>
            {errorMessage && <p className="error-message" style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</p>} {/* Menampilkan pesan kesalahan */}
            <Form onSubmit={handleSubmit} className="row gy-3">
                <Form.Group controlId="formNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={login.nama}
                        onChange={handleChange}
                        placeholder="Masukkan Nama"
                    />
                </Form.Group>
                <Form.Group controlId="formTahunLulus">
                    <Form.Label>Tahun Lulus</Form.Label>
                    <Form.Control
                        type="number"
                        name="tahun_lulus"
                        value={login.tahun_lulus}
                        onChange={handleChange}
                        placeholder="Masukkan Tahun Lulus"
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={login.username}
                        onChange={handleChange}
                        placeholder="Masukkan Username"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                        placeholder="Masukkan Password"
                    />
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={login.role}
                        onChange={handleChange}
                    >
                        <option value="">-- Pilih Role --</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-button">
                    Simpan
                </Button>
            </Form>
        </div>
    );
};

export default TambahLogin; 