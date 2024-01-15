import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { hash } from "bcryptjs";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleEditData.css";

const EditLogin = () => {
  const { id } = useParams();
  const history = useHistory();
  const [login, setLogin] = useState({
    nama: "",
    tahun_lulus: "",
    username: "",
    password: "",
    role: "",
  });

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


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const hashedPassword = await hash(login.password, 10);
  //     const formData = {
  //       nama: login.nama,
  //       tahun_lulus: login.tahun_lulus,
  //       username: login.username,
  //       password: hashedPassword,
  //       role: login.role,
  //     };
  //     const response = await axios.put(
  //       `http://localhost:5000/api/dataLogin/${id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       history.push("/dataLogin");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isPasswordHashed = login.password.startsWith("$2");

      // Jika password belum di-hash, maka hash password tersebut
      const hashedPassword = isPasswordHashed
        ? login.password // Gunakan password yang sudah di-hash
        : await hash(login.password, 10); // Hash password

      const formData = {
        nama: login.nama,
        tahun_lulus: login.tahun_lulus,
        username: login.username,
        password: hashedPassword,
        role: login.role,
      };

      const response = await axios.put(
        `http://localhost:5000/api/dataLogin/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        alert(response.data.message);
        history.push("/dataLogin");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
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
        <h1 className="page-title">Edit Data Login</h1>
        {/* <p className="mb-3" style={{color: 'red', fontStyle: 'italic'}}>note : Jika mengedit sesuatu pada data login, tolong perbarui juga passwordnya. Jika tidak, user tidak akan bisa login.</p> */}
      <Form onSubmit={handleSubmit} className="row gy-3">
          <Form.Group controlId="formNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={login.nama}
              onChange={handleInputChange}
              placeholder="Masukkan Nama"
            />
          </Form.Group>
          <Form.Group controlId="formTahunLulus">
            <Form.Label>Tahun Lulus</Form.Label>
            <Form.Control
              type="number"
              name="tahun_lulus"
              value={login.tahun_lulus}
              onChange={handleInputChange}
              placeholder="Masukkan Tahun Lulus"
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={login.username}
              onChange={handleInputChange}
              placeholder="Masukkan Username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              // value={login.password}
              onChange={handleInputChange}
              placeholder="Masukkan Password Baru Jika Ingin Memperbarui Password"
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={login.role}
              onChange={handleInputChange}
            >
              <option value="">-- Pilih Role --</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </div>
  );
};

export default EditLogin;
