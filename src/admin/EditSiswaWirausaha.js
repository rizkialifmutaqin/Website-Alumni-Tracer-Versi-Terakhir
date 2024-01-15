import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleEditData.css";

const EditSiswaWirausaha = () => {
  const { id } = useParams();
  const history = useHistory();
  // const [wirausaha, setWirausaha] = useState({});
  const [wirausaha, setWirausaha] = useState({
    nama_usaha: "",
    bidang_usaha: "",
    alamat_usaha: "",
    kota_usaha: "",
    no_telp_usaha: "",
    tahun_mulai_usaha: "",
    id_siswa: "",
  });
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswaWirausaha/" + id)
      .then((res) => setWirausaha(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWirausaha((prevWirausaha) => ({
      ...prevWirausaha,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      const response = await axios.put(
        `http://localhost:5000/api/dataSiswaWirausaha/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataSiswaWirausaha");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleBack = () => {
    history.push("/dataSiswaWirausaha");
  };

  return (
      <div className="p-3">
        <button className="back-button mb-2">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
        </button>
        <h1 className="page-title">Edit Data Siswa Wirausaha</h1>
        <Form onSubmit={handleSubmit} className="row gy-3">
          <Form.Group controlId="formNamaUsaha">
            <Form.Label>Nama Usaha</Form.Label>
            <Form.Control
              type="text"
              name="nama_usaha"
              value={wirausaha.nama_usaha}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Usaha"
            />
          </Form.Group>
          <Form.Group controlId="formBidangUsaha">
            <Form.Label>Bidang Usaha</Form.Label>
            <Form.Control
              type="text"
              name="bidang_usaha"
              value={wirausaha.bidang_usaha}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              placeholder="Masukkan Alamat Usaha"
            />
          </Form.Group>
          <Form.Group controlId="formKota">
            <Form.Label>Kota</Form.Label>
            <Form.Control
              type="text"
              name="kota_usaha"
              value={wirausaha.kota_usaha}
              onChange={handleInputChange}
              placeholder="Masukkan Kota"
            />
          </Form.Group>
          <Form.Group controlId="formNoTelp">
            <Form.Label>No Telepon</Form.Label>
            <Form.Control
              type="text"
              name="no_telp_usaha"
              value={wirausaha.no_telp_usaha}
              onChange={handleInputChange}
              placeholder="Masukkan No Telepon"
            />
          </Form.Group>
          <Form.Group controlId="formTahunMulaiUsaha">
            <Form.Label>Tahun Mulai Usaha</Form.Label>
            <Form.Control
              type="number"
              name="tahun_mulai_usaha"
              value={wirausaha.tahun_mulai_usaha}
              onChange={handleInputChange}
              placeholder="Masukkan Tahun Mulai Usaha"
            />
          </Form.Group>
          <Form.Group controlId="formIdSiswa">
            <Form.Label>Id Siswa</Form.Label>
            <Form.Control
              type="number"
              name="id_siswa"
              value={wirausaha.id_siswa}
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

export default EditSiswaWirausaha;
