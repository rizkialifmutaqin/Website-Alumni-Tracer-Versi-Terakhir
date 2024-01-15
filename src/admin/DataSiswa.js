import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import Sidebar from "./Sidebar";
import "./DataSiswa.css"; // Impor file CSS

const DataSiswa = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Semua");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaWithLogin")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswa/editSiswa/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswa/tambahSiswa`);
  };

  const handleDelete = (id, pic_siswa) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data siswa ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswa/${id}`)
        .then(() => {
          if (pic_siswa) {
            axios
              .delete(`http://localhost:5000/api/images/${pic_siswa}`)
              .catch((err) => console.error(err));
          }
          fetchData();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    setSearchTerm("");
  };

  const exportDataToExcel = (rowData) => {
    const filename = `data_siswa_${rowData.nama}.xlsx`;

    const dataSiswa = {
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "NISN": rowData.nisn,
      "NIS": rowData.nis,
      "Nama Siswa": rowData.nama,
      "Kelas Terakhir": rowData.kelas_terakhir,
      "Tempat Lahir": rowData.tempat_lahir,
      "Tanggal Lahir": rowData.tanggal_lahir,
      "Email Siswa": rowData.email_siswa,
      "No Telepon Siswa": rowData.no_telp_siswa,
      "Alamat Tinggal Siswa": rowData.alamat,
      "Kota": rowData.kota,
      "Provinsi": rowData.provinsi,
      "Tahun Angkatan": rowData.angkatan,
      "Tahun Lulus": rowData.tahun_lulus,
      "Jurusan": rowData.jurusan,
      "Aktifitas Setelah Lulus": rowData.aktifitas_stlh_lulus,
    };

    const workbook = XLSX.utils.book_new();

    const siswaWorksheet = XLSX.utils.json_to_sheet([dataSiswa]);
    XLSX.utils.book_append_sheet(workbook, siswaWorksheet, "Data Siswa");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_all.xlsx";

    const dataSiswa = data.map((item) => ({
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "NISN": item.nisn,
      "NIS": item.nis,
      "Nama Siswa": item.nama,
      "Kelas Terakhir": item.kelas_terakhir,
      "Tempat Lahir": item.tempat_lahir,
      "Tanggal Lahir": item.tanggal_lahir,
      "Email Siswa": item.email_siswa,
      "No Telepon Siswa": item.no_telp_siswa,
      "Alamat Tinggal Siswa": item.alamat,
      "Kota": item.kota,
      "Provinsi": item.provinsi,
      "Tahun Angkatan": item.angkatan,
      "Tahun Lulus": item.tahun_lulus,
      "Jurusan": item.jurusan,
      "Aktifitas Setelah Lulus": item.aktifitas_stlh_lulus,
    }));

    const workbook = XLSX.utils.book_new();

    const siswaWorksheet = XLSX.utils.json_to_sheet(dataSiswa);
    XLSX.utils.book_append_sheet(workbook, siswaWorksheet, "Data Siswa");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_siswa.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.nisn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kelas_terakhir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tempat_lahir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggal_lahir.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.angkatan.toString().includes(searchTerm) ||
        item.tahun_lulus.toString().includes(searchTerm) ||
        item.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.aktifitas_stlh_lulus.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterOption === "Semua" || item.kelas_terakhir === filterOption || item.jurusan === filterOption || item.aktifitas_stlh_lulus === filterOption)
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content contentSiswa">
        <div className="text-center my-5">
          <h1>Data Siswa</h1>
          <Form.Control
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div>
          <Form.Group className="mt-2 mb-5 w-25" style={{ marginLeft: 'auto' }}>
            <Form.Label>Filter Data : </Form.Label>
            <Form.Select
              value={filterOption}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="Semua">Semua</option>
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
              <option value="XII TEL 13">XII TEL 13</option>
              <option value="RPL">Jurusan RPL</option>
              <option value="TKJ">Jurusan TKJ</option>
              <option value="TJA">Jurusan TJA</option>
              <option value="TR">Jurusan TR</option>
              <option value="Kuliah">Siswa Kuliah</option>
              <option value="Kerja">Siswa Kerja</option>
              <option value="Kuliah dan Kerja">Siswa Kuliah dan Kerja</option>
              <option value="Wirausaha">Siswa Wirausaha</option>
              <option value="Menganggur">Siswa Menganggur</option>
            </Form.Select>
          </Form.Group>
          {/* <Form.Group className="mt-2 mb-2 w-25" style={{ marginLeft: 'auto' }}>
            <Form.Select
              value={filterUmur}
              onChange={(e) => setFilterUmur(e.target.value)}
            >
              <option value="">Urutkan Umur</option>
              <option value="tertua">Umur Tertua</option>
              <option value="termuda">Umur Termuda</option>
            </Form.Select>
          </Form.Group> */}
        </div>

        <div className="d-flex justify-content-between mb-2">
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa
          </Button>

          <Button
            onClick={() => exportAllDataToExcel()}
            className="mb-2"
            variant="btn btn-success"
          >
            Export Semua Data ke Excel
          </Button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr className="text-center">
                <th>ID Siswa</th>
                <th>ID Login</th>
                <th>NISN</th>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Kelas Terakhir</th>
                <th>Username</th>
                <th>Foto Siswa</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir (Tahun - Bulan - Hari)</th>
                <th>Email Siswa</th>
                <th>No Telepon Siswa</th>
                <th>Alamat</th>
                <th>Kota</th>
                <th>Provinsi</th>
                <th>Angkatan</th>
                <th>Tahun Lulus</th>
                <th>Jurusan</th>
                <th>Aktifitas Setelah Lulus</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_siswa} className="text-center">
                  <td>{item.id_siswa}</td>
                  <td>{item.id_login}</td>
                  <td>{item.nisn}</td>
                  <td>{item.nis}</td>
                  <td>{item.nama}</td>
                  <td>{item.kelas_terakhir}</td>
                  <td>{item.username}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/images/${item.pic_siswa}`}
                      alt={item.nama}
                      style={{ width: 150 }}
                    />
                  </td>
                  <td>{item.tempat_lahir}</td>
                  <td>{item.tanggal_lahir}</td>
                  <td>{item.email_siswa}</td>
                  <td>{item.no_telp_siswa}</td>
                  <td>{item.alamat}</td>
                  <td>{item.kota}</td>
                  <td>{item.provinsi}</td>
                  <td>{item.angkatan}</td>
                  <td>{item.tahun_lulus}</td>
                  <td>{item.jurusan}</td>
                  <td>{item.aktifitas_stlh_lulus}</td>
                  <td>
                    <Button
                      onClick={() => handleEdit(item.id_siswa)}
                      className="btn btn-primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id_siswa, item.pic_siswa)}
                      className="btn btn-danger"
                    >
                      Hapus
                    </Button>
                    <Button
                      onClick={() => exportDataToExcel(item)}
                      className="btn btn-success  "
                    >
                      Export ke Excel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;
