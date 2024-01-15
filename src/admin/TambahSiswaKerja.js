import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleTambahData.css";

const TambahSiswaKerja = () => {
    const [kerja, setKerja] = useState({
      nama_perusahaan_tgl: "",
      alamat_perusahaan_tgl: "",
      kota_perusahaan_tgl: "",
      nama_hrd_perusahaan_tgl: "",
      no_telp_hrd_perusahaan_tgl: "",
      tahun_mulai_bekerja_tgl: "",
      id_siswa: "",
    });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setKerja({ ...kerja, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const response = await axios.post(
                "http://localhost:5000/api/dataSiswaKerja",
                formData
            );
            if (response.data) {
                alert(response.data.message);
                setKerja({
                  nama_perusahaan_tgl: "",
                  alamat_perusahaan_tgl: "",
                  kota_perusahaan_tgl: "",
                  nama_hrd_perusahaan_tgl: "",
                  no_telp_hrd_perusahaan_tgl: "",
                  tahun_mulai_bekerja_tgl: "",
                  id_siswa: "",
                });
                history.push("/dataSiswaKerja");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        history.push("/dataSiswaKerja");
    };

    return (
        <div className="p-3">
            <button className="back-button mb-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
            </button>
            <h1 className="page-title">Tambah Data Siswa Kerja</h1>
            <Form onSubmit={handleSubmit} className="row gy-3">
                <Form.Group controlId="formNamaPerusahaan">
                    <Form.Label>Nama Perusahaan</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama_perusahaan_tgl"
                        value={kerja.nama_perusahaan_tgl}
                        onChange={handleChange}
                        required
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
                        onChange={handleChange}
                        required
                        placeholder="Masukkan Alamat Perusahaan"
                    />
                </Form.Group>
                <Form.Group controlId="formKota">
                    <Form.Label>Kota</Form.Label>
                    <Form.Control
                        type="text"
                        name="kota_perusahaan_tgl"
                        value={kerja.kota_perusahaan_tgl}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan Kota"
                    />
                </Form.Group>
                <Form.Group controlId="formNamaHrd">
                    <Form.Label>Nama HRD Perusahaan</Form.Label>
                    <Form.Control
                        type="text"
                        name="nama_hrd_perusahaan_tgl"
                        value={kerja.nama_hrd_perusahaan_tgl}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan Nama HRD Perusahaan"
                    />
                </Form.Group>
                <Form.Group controlId="formNoTelpHrd">
                    <Form.Label>No Telepon HRD Perusahaan</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_telp_hrd_perusahaan_tgl"
                        value={kerja.no_telp_hrd_perusahaan_tgl}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan Nomor Telepon HRD Perusahaan"
                    />
                </Form.Group>
                <Form.Group controlId="formTahunMulaiBekerja">
                    <Form.Label>Tahun Mulai Kerja</Form.Label>
                    <Form.Control
                        type="number"
                        name="tahun_mulai_bekerja_tgl"
                        value={kerja.tahun_mulai_bekerja_tgl}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan Tahun Mulai Kerja"
                    />
                </Form.Group>
                <Form.Group controlId="formIdSiswa">
                    <Form.Label>Id Siswa</Form.Label>
                    <Form.Control
                        type="number"
                        name="id_siswa"
                        value={kerja.id_siswa}
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

export default TambahSiswaKerja; 