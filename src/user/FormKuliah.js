import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "./StyleForm.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function FormKuliah() {
  const [kuliah, setKuliah] = useState({
    nama_perguruan_tinggi_tgl: "",
    alamat_perguruan_tinggi_tgl: "",
    kota_perguruan_tinggi_tgl: "",
    jurusan_perguruan_tinggi_tgl: "",
    jenjang_pendidikan_tgl: "",
    id_siswa: "",
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.id_siswa) {
      setKuliah((prevKuliah) => ({
        ...prevKuliah,
        id_siswa: location.state.id_siswa,
      }));
      // console.log("id_siswa:", location.state.id_siswa);
      // Lakukan operasi lain dengan id_siswa yang diterima dari FormSiswa.js
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setKuliah({ ...kuliah, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nama_perguruan_tinggi_tgl: kuliah.nama_perguruan_tinggi_tgl,
        alamat_perguruan_tinggi_tgl: kuliah.alamat_perguruan_tinggi_tgl,
        kota_perguruan_tinggi_tgl: kuliah.kota_perguruan_tinggi_tgl,
        jurusan_perguruan_tinggi_tgl: kuliah.jurusan_perguruan_tinggi_tgl,
        jenjang_pendidikan_tgl: kuliah.jenjang_pendidikan_tgl,
        id_siswa: kuliah.id_siswa,
      };
      const response = await axios.post(
        "http://localhost:5000/api/dataSiswaKuliah",
        formData
      );
      if (response.data) {
        alert(response.data.message);
        setKuliah({
          nama_perguruan_tinggi_tgl: "",
          alamat_perguruan_tinggi_tgl: "",
          kota_perguruan_tinggi_tgl: "",
          jurusan_perguruan_tinggi_tgl: "",
          jenjang_pendidikan_tgl: "",
          id_siswa: "",
        });
        // history.push("/testingPage");
        history.push("/");
        // history.push({
        //   pathname: "/mainPage",
        //   state: { id_siswa: response.data.id_siswa }, // Menyimpan id_siswa yang diterima dari server
        // });
        // console.log(response.data.id_siswa);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleBack = () => {
  //   history.push("/dataLogin");
  // };

  return (
    <div className="p-3">
      {/* <button className="back-button mb-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={handleBack}
          style={{ color: "black" }}
        />
      </button> */}
      <h1 className="page-title">Siswa Kuliah</h1>
      <Form onSubmit={handleSubmit} className="row gy-3">
        <Form.Group controlId="formNamaPerguruanTinggi">
          <Form.Label>Nama Perguruan Tinggi</Form.Label>
          <Form.Control
            type="text"
            name="nama_perguruan_tinggi_tgl"
            value={kuliah.nama_perguruan_tinggi_tgl}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
            placeholder="Masukkan Alamat Perguruan Tinggi"
          />
        </Form.Group>
        <Form.Group controlId="formKota">
          <Form.Label>Kota</Form.Label>
          <Form.Control
            type="text"
            name="kota_perguruan_tinggi_tgl"
            value={kuliah.kota_perguruan_tinggi_tgl}
            onChange={handleChange}
            required
            placeholder="Masukkan Kota"
          />
        </Form.Group>
        <Form.Group controlId="formJurusan">
          <Form.Label>Jurusan</Form.Label>
          <Form.Control
            type="text"
            name="jurusan_perguruan_tinggi_tgl"
            value={kuliah.jurusan_perguruan_tinggi_tgl}
            onChange={handleChange}
            required
            placeholder="Masukkan Jurusan"
          />
        </Form.Group>
        <Form.Group controlId="formJenjangPendidikan">
          <Form.Label>Jenjang Pendidikan</Form.Label>
          <Form.Control
            as="select"
            name="jenjang_pendidikan_tgl"
            value={kuliah.jenjang_pendidikan_tgl}
            onChange={handleChange}
            required
          >
            <option value="">-- Jenjang Pendidikan --</option>
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
}

export default FormKuliah;