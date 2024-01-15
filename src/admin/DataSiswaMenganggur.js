import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import Sidebar from "./Sidebar";

const DataSiswaMenganggur = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filterKelas, setFilterKelas] = useState("Semua");
  // const [filterJurusan, setFilterJurusan] = useState("Semua");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaMenganggur")
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
      "Jika anda menghapus ini data pada data siswa juga ikut terhapus, anda yakin ingin tetap ingin menghapus data siswa ini?"
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

  // const handleFilterKelas = (kelas) => {
  //   setFilterKelas(kelas);
  //   setSearchTerm("");
  // };

  // const handleFilterJurusan = (jurusan) => {
  //   setFilterJurusan(jurusan);
  //   setSearchTerm("");
  // };

  const exportDataToExcel = (rowData) => {
    const filename = `data_siswa_menganggur_${rowData.nama}.xlsx`;

    const dataSiswaMenganggur = {
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "NISN": rowData.nisn,
      "NIS": rowData.nis,
      "Nama Siswa": rowData.nama,
      "Aktifitas Setelah Lulus": rowData.aktifitas_stlh_lulus,
    };

    const workbook = XLSX.utils.book_new();

    const siswaMenganggurWorksheet = XLSX.utils.json_to_sheet([dataSiswaMenganggur]);
    XLSX.utils.book_append_sheet(workbook, siswaMenganggurWorksheet, "Data Siswa Menganggur");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_menganggur_all.xlsx";

    const dataSiswaMenganggur = data.map((item) => ({
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "NISN": item.nisn,
      "NIS": item.nis,
      "Nama Siswa": item.nama,
      "Aktifitas Setelah Lulus": item.aktifitas_stlh_lulus,
    }));

    const workbook = XLSX.utils.book_new();

    const siswaMenganggurWorksheet = XLSX.utils.json_to_sheet(dataSiswaMenganggur);
    XLSX.utils.book_append_sheet(workbook, siswaMenganggurWorksheet, "Data Siswa Menganggur");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_siswa.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.nisn.toString().includes(searchTerm) ||
        item.nis.toString().includes(searchTerm) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())) 
      // (filterKelas === "Semua" || item.kelas === filterKelas) &&
      // (filterJurusan === "Semua" || item.jurusan === filterJurusan)
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content">
        <div className="text-center my-5">
          <h1>Data Siswa Tidak Kuliah / Kerja</h1>
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan ID Siswa, NISN, NIS, dan Nama"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div>
          {/* <Form.Group className="mt-2 mb-2 w-25" style={{ marginLeft: 'auto' }}>
            <Form.Label>Filter Data : </Form.Label>
            <Form.Select
              value={filterKelas}
              onChange={(e) => handleFilterKelas(e.target.value)}
            >
              <option value="Semua">Semua Kelas</option>
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2 mb-2 w-25" style={{ marginLeft: 'auto' }}>
            <Form.Select
              value={filterJurusan}
              onChange={(e) => handleFilterJurusan(e.target.value)}
            >
              <option value="Semua">Semua Jurusan</option>
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="TJA">TJA</option>
              <option value="TR">TR</option>
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

        <table className="table table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <th>ID Siswa</th>
              <th>ID Login</th>
              <th>NISN</th>
              <th>NIS</th>
              <th>Nama Lengkap</th>
              <th>Foto Siswa</th>
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
                <td>
                  <img
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    alt={item.nama}
                    style={{ width: 150 }}
                  />
                </td>
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
  );
};

export default DataSiswaMenganggur;
