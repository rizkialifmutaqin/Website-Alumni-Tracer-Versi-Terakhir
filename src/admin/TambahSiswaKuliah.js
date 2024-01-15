import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleTambahData.css";

const TambahSiswaKuliah = () => {
    const [kuliah, setKuliah] = useState({
        nama_perguruan_tinggi_tgl: "",
        alamat_perguruan_tinggi_tgl: "",
        kota_perguruan_tinggi_tgl: "",
        jurusan_perguruan_tinggi_tgl: "",
        jenjang_pendidikan_tgl: "",
        id_siswa: "",
    });
    const history = useHistory();

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
                history.push("/dataSiswaKuliah");
            }
        } catch (error) {
            console.error(error);
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
            <h1 className="page-title">Tambah Data Siswa Kuliah</h1>
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
                <Form.Group controlId="formIdSiswa">
                    <Form.Label>Id Siswa</Form.Label>
                    <Form.Control
                        type="number"
                        name="id_siswa"
                        value={kuliah.id_siswa}
                        onChange={handleChange}
                        required
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

export default TambahSiswaKuliah; 