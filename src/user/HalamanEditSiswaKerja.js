import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleHalamanEdit.css";

const HalamanEditSiswaKerja = () => {
  const { id } = useParams();
  const history = useHistory();
  const [kerja, setKerja] = useState({
    nama_perusahaan_tgl: "",
    alamat_perusahaan_tgl: "",
    kota_perusahaan_tgl: "",
    nama_hrd_perusahaan_tgl: "",
    no_telp_hrd_perusahaan_tgl: "",
    tahun_mulai_bekerja_tgl: "",
    id_siswa: "",

  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswaKerja/" + id)
      .then((res) => setKerja(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKerja((prevKerja) => ({
      ...prevKerja,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        nama_perusahaan_tgl: kerja.nama_perusahaan_tgl,
        alamat_perusahaan_tgl: kerja.alamat_perusahaan_tgl,
        kota_perusahaan_tgl: kerja.kota_perusahaan_tgl,
        nama_hrd_perusahaan_tgl: kerja.nama_hrd_perusahaan_tgl,
        no_telp_hrd_perusahaan_tgl: kerja.no_telp_hrd_perusahaan_tgl,
        tahun_mulai_bekerja_tgl: kerja.tahun_mulai_bekerja_tgl,
        id_siswa: kerja.id_siswa,
      };
      const response = await axios.put(
        `http://localhost:5000/api/dataSiswaKerja/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/mainPage");
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
    <div className="p-3">
      <button className="back-button mt-5 mb-2">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
      </button>
      <h1 className="page-title">Edit Data Siswa Kerja</h1>
      <Form onSubmit={handleSubmit} className="row gy-3">
        <Form.Group controlId="formNamaPerusahaan">
          <Form.Label>Nama Perusahaan</Form.Label>
          <Form.Control
            type="text"
            name="nama_perusahaan_tgl"
            value={kerja.nama_perusahaan_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Nama Perusahaan"
          />
        </Form.Group>
        <Form.Group controlId="formAlamatPerusahaan">
          <Form.Label>Alamat Perusahaan</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="alamat_perusahaan_tgl"
            rows={3}
            value={kerja.alamat_perusahaan_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Alamat Perusahaan"
          />
        </Form.Group>
        <Form.Group controlId="formKota">
          <Form.Label>Kota</Form.Label>
          <Form.Control
            type="text"
            name="kota_perusahaan_tgl"
            value={kerja.kota_perusahaan_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Kota"
          />
        </Form.Group>
        <Form.Group controlId="formNamaHrd">
          <Form.Label>Nama HRD Perusahaan</Form.Label>
          <Form.Control
            type="text"
            name="nama_hrd_perusahaan_tgl"
            value={kerja.nama_hrd_perusahaan_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Nama HRD Perusahaan"
          />
        </Form.Group>
        <Form.Group controlId="formNoTelpHrd">
          <Form.Label>No Telepon HRD Perusahaan</Form.Label>
          <Form.Control
            type="text"
            name="no_telp_hrd_perusahaan_tgl"
            value={kerja.no_telp_hrd_perusahaan_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Nomor Telepon HRD Perusahaan"
          />
        </Form.Group>
        <Form.Group controlId="formTahunMulaiBekerja">
          <Form.Label>Tahun Mulai Kerja</Form.Label>
          <Form.Control
            type="number"
            name="tahun_mulai_bekerja_tgl"
            value={kerja.tahun_mulai_bekerja_tgl}
            onChange={handleInputChange}
            placeholder="Masukkan Tahun Mulai Kerja"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default HalamanEditSiswaKerja;
