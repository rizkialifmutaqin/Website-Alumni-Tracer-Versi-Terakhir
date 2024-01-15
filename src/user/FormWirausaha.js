import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleForm.css"; 

function FormWirausaha() {
  const [wirausaha, setWirausaha] = useState({
    nama_usaha: "",
    bidang_usaha: "",
    alamat_usaha: "",
    kota_usaha: "",
    no_telp_usaha: "",
    tahun_mulai_usaha: "",
    id_siswa: "",
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.id_siswa) {
      setWirausaha((prevWirausaha) => ({
        ...prevWirausaha,
        id_siswa: location.state.id_siswa,
      }));
      // console.log("id_siswa:", location.state.id_siswa);
      // Lakukan operasi lain dengan id_siswa yang diterima dari FormSiswa.js
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWirausaha({ ...wirausaha, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nama_usaha: wirausaha.nama_usaha,
        bidang_usaha: wirausaha.bidang_usaha,
        alamat_usaha: wirausaha.alamat_usaha,
        kota_usaha: wirausaha.kota_usaha,
        no_telp_usaha: wirausaha.no_telp_usaha,
        tahun_mulai_usaha: wirausaha.tahun_mulai_usaha,
        id_siswa: wirausaha.id_siswa,
      };
      const response = await axios.post(
        "http://localhost:5000/api/dataSiswaWirausaha",
        formData
      );
      if (response.data) {
        alert(response.data.message);
        setWirausaha({
          nama_usaha: "",
          bidang_usaha: "",
          alamat_usaha: "",
          kota_usaha: "",
          no_telp_usaha: "",
          tahun_mulai_usaha: "",
          id_siswa: "",
        });
        history.push("/");
        // history.push({
        //   pathname: "/testingPage",
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
      <h1 className="page-title">Tambah Data Siswa Wirausaha</h1>
      <Form onSubmit={handleSubmit} className="row gy-3">
        <Form.Group controlId="formNamaUsaha">
          <Form.Label>Nama Usaha</Form.Label>
          <Form.Control
            type="text"
            name="nama_usaha"
            value={wirausaha.nama_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan Nama Usaha"
          />
        </Form.Group>
        <Form.Group controlId="formBidangUsaha">
          <Form.Label>Bidang Usaha</Form.Label>
          <Form.Control
            type="text"
            name="bidang_usaha"
            value={wirausaha.bidang_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan Bidang Usaha"
          />
        </Form.Group>
        <Form.Group controlId="formAlamatUsaha">
          <Form.Label>Alamat Usaha</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="alamat_usaha"
            rows={3}
            value={wirausaha.alamat_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan Alamat Usaha"
          />
        </Form.Group>
        <Form.Group controlId="formKota">
          <Form.Label>Kota</Form.Label>
          <Form.Control
            type="text"
            name="kota_usaha"
            value={wirausaha.kota_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan Kota"
          />
        </Form.Group>
        <Form.Group controlId="formNoTelp">
          <Form.Label>No Telepon</Form.Label>
          <Form.Control
            type="text"
            name="no_telp_usaha"
            value={wirausaha.no_telp_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan No Telepon"
          />
        </Form.Group>
        <Form.Group controlId="formTahunMulaiUsaha">
          <Form.Label>Tahun Mulai Usaha</Form.Label>
          <Form.Control
            type="number"
            name="tahun_mulai_usaha"
            value={wirausaha.tahun_mulai_usaha}
            onChange={handleChange}
            required
            placeholder="Masukkan Tahun Mulai Usaha"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
}

export default FormWirausaha;