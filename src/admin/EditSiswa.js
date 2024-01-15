import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleEditData.css";

const EditSiswa = () => {
    const { id } = useParams();
    const history = useHistory();
    // const [siswa, setSiswa] = useState({});
    const [siswa, setSiswa] = useState({
        nisn: "",
        nis: "",
        kelas_terakhir: "",
        foto: null,
        tempat_lahir: "",
        tanggal_lahir: "",
        email_siswa: "",
        no_telp_siswa: "",
        alamat: "",
        kota: "",
        provinsi: "",
        angkatan: "",
        jurusan: "",
        aktifitas_stlh_lulus: "",
        id_login: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [aktifitas_stlh_lulus_awal, setAktifitasStlhLulusAwal] = useState("");

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:5000/api/dataSiswa/" + id)
    //         .then((res) => setSiswa(res.data[0]))
    //         .catch((err) => console.log(err));
    // }, [id]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/dataSiswa/" + id)
            .then((res) => {
                setSiswa(res.data[0]);
                setAktifitasStlhLulusAwal(res.data[0].aktifitas_stlh_lulus);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if aktifitas_stlh_lulus value has changed
        if (name === 'aktifitas_stlh_lulus' && value !== siswa.aktifitas_stlh_lulus) {
            // Perform data deletion request for related activities
            axios.delete(`http://localhost:5000/api/deleteRelatedData/${id}`)
                .then(response => {
                    // Do something after successful deletion if needed
                })
                .catch(error => {
                    console.error(error);
                });
        }

        setSiswa((prevSiswa) => ({
            ...prevSiswa,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("nisn", siswa.nisn);
        formData.append("nis", siswa.nis);
        formData.append("kelas_terakhir", siswa.kelas_terakhir);
        formData.append("foto", selectedFile);
        formData.append("tempat_lahir", siswa.tempat_lahir);
        formData.append("tanggal_lahir", siswa.tanggal_lahir);
        formData.append("email_siswa", siswa.email_siswa);
        formData.append("no_telp_siswa", siswa.no_telp_siswa);
        formData.append("alamat", siswa.alamat);
        formData.append("kota", siswa.kota);
        formData.append("provinsi", siswa.provinsi);
        formData.append("angkatan", siswa.angkatan);
        formData.append("jurusan", siswa.jurusan);
        formData.append("aktifitas_stlh_lulus", siswa.aktifitas_stlh_lulus);
        formData.append("id_login", siswa.id_login);
        try {
            const response = await axios.put(
                `http://localhost:5000/api/dataSiswa/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // if (response.data) {
            //     alert(response.data.message);
            //     history.push("/dataSiswa");
            //     return;
            // }

            if (response.data) {
                alert(response.data.message);
                if (siswa.aktifitas_stlh_lulus !== aktifitas_stlh_lulus_awal) {
                    switch (siswa.aktifitas_stlh_lulus) {
                        case "Kerja":
                            history.push(`/tambahSiswaKerja/${siswa.id_siswa}`);
                            break;
                        case "Kuliah":
                            history.push(`/tambahSiswaKuliah/${siswa.id_siswa}`);
                            break;
                        case "Kuliah dan Kerja":
                            history.push(`/tambahSiswaKuliahDanKerja/${siswa.id_siswa}`);
                            break;
                        case "Wirausaha":
                            history.push(`/tambahSiswaWirausaha/${siswa.id_siswa}`);
                            break;
                        default:
                            history.push("/dataSiswa");
                            break;
                    }
                } else {
                    history.push("/dataSiswa");
                }
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleBack = () => {
        history.push("/dataSiswa");
    };

    return (
        <div className="p-3">
            <button className="back-button mb-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
            </button>
            <h1 className="page-title">Edit Data Siswa</h1>
            <Form onSubmit={handleSubmit} className="row gy-3">
                <Form.Group controlId="formNisn">
                    <Form.Label>NISN</Form.Label>
                    <Form.Control
                        type="text"
                        name="nisn"
                        maxLength={10}
                        value={siswa.nisn}
                        onChange={handleInputChange}
                        placeholder="Masukkan NISN"
                    />
                </Form.Group>
                <Form.Group controlId="formNis">
                    <Form.Label>NIS</Form.Label>
                    <Form.Control
                        type="text"
                        name="nis"
                        value={siswa.nis}
                        onChange={handleInputChange}
                        placeholder="Masukkan NIS"
                    />
                </Form.Group>
                <Form.Group controlId="formKelasTerakhir">
                    <Form.Label>Kelas Terakhir</Form.Label>
                    <Form.Control
                        as="select"
                        name="kelas_terakhir"
                        value={siswa.kelas_terakhir}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Kelas Terakhir --</option>
                        <option value="XII TEL 01">XII TEL 01</option>
                        <option value="XII TEL 02">XII TEL 02</option>
                        <option value="XII TEL 03">XII TEL 03</option>
                        <option value="XII TEL 04">XII TEL 04</option>
                        <option value="XII TEL 05">XII TEL 05</option>
                        <option value="XII TEL 06">XII TEL 06</option>
                        <option value="XII TEL 07">XII TEL 07</option>
                        <option value="XII TEL 08">XII TEL 08</option>
                        <option value="XII TEL 09">XII TEL 09</option>
                        <option value="XII TEL 10">XII TEL 10</option>
                        <option value="XII TEL 11">XII TEL 11</option>
                        <option value="XII TEL 12">XII TEL 12</option>
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group controlId="formKelasTerakhir">
                    <Form.Label>Kelas Terakhir</Form.Label>
                    <Form.Control
                        type="text"
                        name="kelas_terakhir"
                        value={siswa.kelas_terakhir}
                        onChange={handleInputChange}
                        placeholder="Masukkan Kelas Terakhir Siswa"
                    />
                </Form.Group> */}
                <Form.Group controlId="formFotoSiswa">
                    <Form.Label>Foto Siswa</Form.Label>
                    <Form.Control
                        type="file"
                        name="foto"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Form.Group controlId="formTempatLahir">
                    <Form.Label>Tempat Lahir</Form.Label>
                    <Form.Control
                        type="text"
                        name="tempat_lahir"
                        value={siswa.tempat_lahir}
                        onChange={handleInputChange}
                        placeholder="Masukkan Tempat Lahir"
                    />
                </Form.Group>
                <Form.Group controlId="formTanggalLahir">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                        type="date"
                        name="tanggal_lahir"
                        value={siswa.tanggal_lahir}
                        onChange={handleInputChange}
                        placeholder="Masukkan Tanggal Lahir"
                    />
                </Form.Group>
                <Form.Group controlId="formEmailSiswa">
                    <Form.Label>Email Siswa</Form.Label>
                    <Form.Control
                        type="email"
                        name="email_siswa"
                        value={siswa.email_siswa}
                        onChange={handleInputChange}
                        placeholder="Masukkan Email Siswa"
                    />
                </Form.Group>
                <Form.Group controlId="formNoTelpSiswa">
                    <Form.Label>No Telepon Siswa</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_telp_siswa"
                        value={siswa.no_telp_siswa}
                        onChange={handleInputChange}
                        placeholder="Masukkan No Telepon Siswa"
                    />
                </Form.Group>
                <Form.Group controlId="formAlamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        name="alamat"
                        rows={3}
                        value={siswa.alamat}
                        onChange={handleInputChange}
                        placeholder="Masukkan Alamat Tempat Tinggal"
                    />
                </Form.Group>
                <Form.Group controlId="formKota">
                    <Form.Label>Kota</Form.Label>
                    <Form.Control
                        type="text"
                        name="kota"
                        value={siswa.kota}
                        onChange={handleInputChange}
                        placeholder="Masukkan Kota"
                    />
                </Form.Group>
                <Form.Group controlId="formProvinsi">
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Control
                        type="text"
                        name="provinsi"
                        value={siswa.provinsi}
                        onChange={handleInputChange}
                        placeholder="Masukkan Provinsi"
                    />
                </Form.Group>
                <Form.Group controlId="formAngkatan">
                    <Form.Label>Tahun Angkatan</Form.Label>
                    <Form.Control
                        type="number"
                        name="angkatan"
                        value={siswa.angkatan}
                        onChange={handleInputChange}
                        placeholder="Masukkan Tahun Angkatan"
                    />
                </Form.Group>
                <Form.Group controlId="formJurusan">
                    <Form.Label>Jurusan</Form.Label>
                    <Form.Control
                        as="select"
                        name="jurusan"
                        value={siswa.jurusan}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Pilih Jurusan --</option>
                        <option value="TKJ">TKJ</option>
                        <option value="RPL">RPL</option>
                        <option value="TJA">TJA</option>
                        <option value="TR">TR</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAktifitasSetelahLulus">
                    <Form.Label>Aktifitas Setelah Lulus</Form.Label>
                    <Form.Control
                        as="select"
                        name="aktifitas_stlh_lulus"
                        value={siswa.aktifitas_stlh_lulus}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Aktifitas Setelah Lulus --</option>
                        <option value="Kuliah">Kuliah</option>
                        <option value="Kerja">Kerja</option>
                        <option value="Kuliah dan Kerja">Kuliah dan Kerja</option>
                        <option value="Wirausaha">Wirausaha</option>
                        <option value="Menganggur">Menganggur</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
            </Form>
        </div>
    );
};

export default EditSiswa;
