import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleEditData.css";

const EditSiswaKuliah = () => {
  const { id } = useParams();
  const history = useHistory();
  // const [kuliah, setKuliah] = useState({});
  const [kuliah, setKuliah] = useState({
    nama_perguruan_tinggi_tgl: "",
    alamat_perguruan_tinggi_tgl: "",
    kota_perguruan_tinggi_tgl: "",
    jurusan_perguruan_tinggi_tgl: "",
    jenjang_pendidikan_tgl: "",
    id_siswa: "",
  });
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswaKuliah/" + id)
      .then((res) => setKuliah(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKuliah((prevKuliah) => ({
      ...prevKuliah,
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
      const formData = {
        nama_perguruan_tinggi_tgl: kuliah.nama_perguruan_tinggi_tgl,
        alamat_perguruan_tinggi_tgl: kuliah.alamat_perguruan_tinggi_tgl,
        kota_perguruan_tinggi_tgl: kuliah.kota_perguruan_tinggi_tgl,
        jurusan_perguruan_tinggi_tgl: kuliah.jurusan_perguruan_tinggi_tgl,
        jenjang_pendidikan_tgl: kuliah.jenjang_pendidikan_tgl,
        id_siswa: kuliah.id_siswa,
      };
      const response = await axios.put(
        `http://localhost:5000/api/dataSiswaKuliah/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataSiswaKuliah");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleBack = () => {
    history.push("/dataSiswaKuliah");
  };

  return (
      <div className="p-3">
        <button className="back-button mb-2">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
        </button>
        <h1 className="page-title">Edit Data Siswa Kuliah</h1>
        <Form onSubmit={handleSubmit} className="row gy-3">
          <Form.Group controlId="formNamaPerguruanTinggi">
            <Form.Label>Nama Perguruan Tinggi</Form.Label>
            <Form.Control
              type="text"
              name="nama_perguruan_tinggi_tgl"
              value={kuliah.nama_perguruan_tinggi_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Perguruan Tinggi"
            />
          </Form.Group>
          <Form.Group controlId="formAlamatPerguruanTinggi">
            <Form.Label>Alamat Perguruan Tinggi</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="alamat_perguruan_tinggi_tgl"
              rows={3}
              value={kuliah.alamat_perguruan_tinggi_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Alamat Perguruan Tinggi"
            />
          </Form.Group>
          <Form.Group controlId="formKota">
            <Form.Label>Kota</Form.Label>
            <Form.Control
              type="text"
              name="kota_perguruan_tinggi_tgl"
              value={kuliah.kota_perguruan_tinggi_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Kota"
            />
          </Form.Group>
          <Form.Group controlId="formJurusan">
            <Form.Label>Jurusan</Form.Label>
            <Form.Control
              type="text"
              name="jurusan_perguruan_tinggi_tgl"
              value={kuliah.jurusan_perguruan_tinggi_tgl}
              onChange={handleInputChange}
              placeholder="Masukkan Jurusan"
            />
          </Form.Group>
          <Form.Group controlId="formJenjangPendidikan">
            <Form.Label>Jenjang Pendidikan</Form.Label>
            <Form.Control
              as="select"
              name="jenjang_pendidikan_tgl"
              value={kuliah.jenjang_pendidikan_tgl}
              onChange={handleInputChange}
            >
              <option value="">-- Jenjang Pendidikan --</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formIdSiswa">
            <Form.Label>Id Siswa</Form.Label>
            <Form.Control
              type="number"
              name="id_siswa"
              value={kuliah.id_siswa}
              onChange={handleInputChange}
              placeholder="Masukkan Id Siswa"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </div>
  );
};

export default EditSiswaKuliah;
