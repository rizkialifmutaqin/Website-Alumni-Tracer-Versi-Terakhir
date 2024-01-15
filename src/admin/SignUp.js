import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { hash } from "bcryptjs";
import { useHistory, Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const [user, setUser] = useState({
        nama: "",
        username: "",
        foto: null,
        email: "",
        password: "",
        no_telp: "",
        alamat: "",
        role: "User",
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "foto") {
            setUser({ ...user, foto: files[0] });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await hash(user.password, 10);
            const formData = new FormData();
            formData.append("nama", user.nama);
            formData.append("username", user.username);
            formData.append("foto", user.foto);
            formData.append("email", user.email);
            formData.append("password", hashedPassword);
            formData.append("no_telp", user.no_telp);
            formData.append("alamat", user.alamat);
            formData.append("role", user.role);
            const response = await axios.post(
                "http://localhost:5000/api/dataUsers",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data) {
                alert(response.data.message);
                setUser({ nama: "", username: "", foto: null, email: "", password: "", no_telp: "", alamat: "", role: "" });
                history.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="containerFormSignUp">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNama" className="form-group">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama"
                        value={user.nama}
                        onChange={handleChange}
                        placeholder="Masukkan Nama User"
                    />
                </Form.Group>
                <Form.Group controlId="formUsername" className="form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Masukkan Username"
                    />
                </Form.Group>
                <Form.Group controlId="formGambarProfil" className="form-group">
                    <Form.Label>Foto Profil</Form.Label>
                    <Form.Control
                        type="file"
                        name="foto"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Masukkan Email User"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Masukkan Password"
                    />
                </Form.Group>
                <Form.Group controlId="formNoTelepon" className="form-group">
                    <Form.Label>No Telepon</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_telp"
                        value={user.no_telp}
                        onChange={handleChange}
                        placeholder="Masukkan No Telepon"
                    />
                </Form.Group>
                <Form.Group controlId="formAlamat" className="form-group">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                        type="text"
                        name="alamat"
                        value={user.alamat}
                        onChange={handleChange}
                        placeholder="Masukkan Alamat"
                    />
                </Form.Group>
                {/* <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                    >
                        <option value="">-- Pilih Role --</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Form.Control>
                </Form.Group> */}
                <Button variant="primary" type="submit" className="signup-button">
                    Sign Up
                </Button>
                <Link to="/" className="login">Log In</Link>
            </Form>
        </div>
    );
}

export default SignUp;