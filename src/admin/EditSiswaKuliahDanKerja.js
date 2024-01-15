import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./StyleEditData.css";

const EditSiswaKuliahDanKerja = () => {
  const { id } = useParams();
  const history = useHistory();
  // const [kuliahDanKerja, setKuliahDanKerja] = useState({});
  const [kuliahDanKerja, setKuliahDanKerja] = useState({
    nama_perguruan_tinggi: "",
    alamat_perguruan_tinggi: "",
    kota_perguruan_tinggi: "",
    jurusan_perguruan_tinggi: "",
    jenjang_pendidikan: "",
    nama_perusahaan: "",
    alamat_perusahaan: "",
    kota_perusahaan: "",
    nama_hrd: "",
    no_telp_hrd: "",
    tahun_mulai_bekerja: "",
    id_siswa: "",
  });
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswaKuliahDanKerja/" + id)
      .then((res) => setKuliahDanKerja(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKuliahDanKerja((prevKuliahDanKerja) => ({
      ...prevKuliahDanKerja,
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
        nama_perguruan_tinggi: kuliahDanKerja.nama_perguruan_tinggi,
        alamat_perguruan_tinggi: kuliahDanKerja.alamat_perguruan_tinggi,
        kota_perguruan_tinggi: kuliahDanKerja.kota_perguruan_tinggi,
        jurusan_perguruan_tinggi: kuliahDanKerja.jurusan_perguruan_tinggi,
        jenjang_pendidikan: kuliahDanKerja.jenjang_pendidikan,
        nama_perusahaan: kuliahDanKerja.nama_perusahaan,
        alamat_perusahaan: kuliahDanKerja.alamat_perusahaan,
        kota_perusahaan: kuliahDanKerja.kota_perusahaan,
        nama_hrd: kuliahDanKerja.nama_hrd,
        no_telp_hrd: kuliahDanKerja.no_telp_hrd,
        tahun_mulai_bekerja: kuliahDanKerja.tahun_mulai_bekerja,
        id_siswa: kuliahDanKerja.id_siswa,
      };
      const response = await axios.put(
        `http://localhost:5000/api/dataSiswaKuliahDanKerja/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(response.data.message);
        history.push("/dataSiswaKuliahDanKerja");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleBack = () => {
    history.push("/dataSiswaKuliahDanKerja");
  };

  return (
      <div className="p-3">
        <button className="back-button mb-2">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} style={{ color: 'black' }} />
        </button>
        <h1 className="page-title">Edit Data Siswa Kuliah dan Kerja</h1>
        <Form onSubmit={handleSubmit} className="row gy-3">
          <Form.Group controlId="formNamaPerguruanTinggi">
            <h4 className="mt-3 mb-3">Kuliah</h4>
            <Form.Label>Nama Perguruan Tinggi</Form.Label>
            <Form.Control
              type="text"
              name="nama_perguruan_tinggi"
              value={kuliahDanKerja.nama_perguruan_tinggi}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Perguruan Tinggi"
            />
          </Form.Group>
          <Form.Group controlId="formAlamatPerguruanTinggi">
            <Form.Label>Alamat Perguruan Tinggi</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="alamat_perguruan_tinggi"
              rows={3}
              value={kuliahDanKerja.alamat_perguruan_tinggi}
              onChange={handleInputChange}
              placeholder="Masukkan Alamat Perguruan Tinggi"
            />
          </Form.Group>
          <Form.Group controlId="formKotaPerguruanTinggi">
            <Form.Label>Kota Perguruan Tinggi</Form.Label>
            <Form.Control
              type="text"
              name="kota_perguruan_tinggi"
              value={kuliahDanKerja.kota_perguruan_tinggi}
              onChange={handleInputChange}
              placeholder="Masukkan Kota Perguruan Tinggi"
            />
          </Form.Group>
          <Form.Group controlId="formJurusan">
            <Form.Label>Jurusan</Form.Label>
            <Form.Control
              type="text"
              name="jurusan_perguruan_tinggi"
              value={kuliahDanKerja.jurusan_perguruan_tinggi}
              onChange={handleInputChange}
              placeholder="Masukkan Jurusan"
            />
          </Form.Group>
          <Form.Group controlId="formJenjangPendidikan">
            <Form.Label>Jenjang Pendidikan</Form.Label>
            <Form.Control
              as="select"
              name="jenjang_pendidikan"
              value={kuliahDanKerja.jenjang_pendidikan}
              onChange={handleInputChange}
            >
              <option value="">-- Jenjang Pendidikan --</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
            </Form.Control>
          </Form.Group>
          <h4 className="mt-5 mb-3">Kerja</h4>
          <Form.Group controlId="formNamaPerusahaan">
            <Form.Label>Nama Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="nama_perusahaan"
              value={kuliahDanKerja.nama_perusahaan}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formAlamatPerusahaan">
            <Form.Label>Alamat Perusahaan</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="alamat_perusahaan"
              rows={3}
              value={kuliahDanKerja.alamat_perusahaan}
              onChange={handleInputChange}
              placeholder="Masukkan Alamat Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formKotaPerusahaan">
            <Form.Label>Kota Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="kota_perusahaan"
              value={kuliahDanKerja.kota_perusahaan}
              onChange={handleInputChange}
              placeholder="Masukkan Kota Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formNamaHrd">
            <Form.Label>Nama HRD Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="nama_hrd"
              value={kuliahDanKerja.nama_hrd}
              onChange={handleInputChange}
              placeholder="Masukkan Nama HRD Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formNoTelpHrd">
            <Form.Label>No Telepon HRD Perusahaan</Form.Label>
            <Form.Control
              type="text"
              name="no_telp_hrd"
              value={kuliahDanKerja.no_telp_hrd}
              onChange={handleInputChange}
              placeholder="Masukkan Nomor Telepon HRD Perusahaan"
            />
          </Form.Group>
          <Form.Group controlId="formTahunMulaiBekerja">
            <Form.Label>Tahun Mulai Kerja</Form.Label>
            <Form.Control
              type="number"
              name="tahun_mulai_bekerja"
              value={kuliahDanKerja.tahun_mulai_bekerja}
              onChange={handleInputChange}
              placeholder="Masukkan Tahun Mulai Kerja"
            />
          </Form.Group>
          <Form.Group controlId="formIdSiswa">
            <Form.Label>Id Siswa</Form.Label>
            <Form.Control
              type="number"
              name="id_siswa"
              value={kuliahDanKerja.id_siswa}
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

export default EditSiswaKuliahDanKerja;
