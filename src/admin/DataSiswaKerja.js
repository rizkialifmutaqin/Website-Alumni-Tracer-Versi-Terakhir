import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import Sidebar from "./Sidebar";

const DataSiswaKerja = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Semua");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaKerjaWithNamaSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaKerja/editSiswaKerja/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaKerja/tambahSiswaKerja`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaKerja/${id}`)
        .then(() => {
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
    const filename = `data_siswa_kerja_${rowData.nama}.xlsx`;

    const dataKerja = {
      "ID Kerja": rowData.id_kerja,
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "Nama Siswa": rowData.nama,
      "Nama Perusahaan_": rowData.nama_perusahaan_tgl,
      "Alamat Perusahaan_": rowData.alamat_perusahaan_tgl,
      "Kota Perusahaan_": rowData.kota_perusahaan_tgl,
      "Nama HRD Perusahaan_": rowData.nama_hrd_perusahaan_tgl,
      "No Telepon HRD_": rowData.no_telp_hrd_perusahaan_tgl,
      "Tahun Mulai Kerja_": rowData.tahun_mulai_bekerja_tgl,
    };

    const workbook = XLSX.utils.book_new();

    const kerjaWorksheet = XLSX.utils.json_to_sheet([dataKerja]);
    XLSX.utils.book_append_sheet(workbook, kerjaWorksheet, "Data Siswa Kerja");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_kerja_all.xlsx";

    const dataKerja = data.map((item) => ({
      "ID Kerja": item.id_kerja,
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "Nama Siswa": item.nama,
      "Nama Perusahaan_": item.nama_perusahaan_tgl,
      "Alamat Perusahaan_": item.alamat_perusahaan_tgl,
      "Kota Perusahaan_": item.kota_perusahaan_tgl,
      "Nama HRD Perusahaan_": item.nama_hrd_perusahaan_tgl,
      "No Telepon HRD_": item.no_telp_hrd_perusahaan_tgl,
      "Tahun Mulai Kerja_": item.tahun_mulai_bekerja_tgl,
    }));

    const workbook = XLSX.utils.book_new();

    const kerjaWorksheet = XLSX.utils.json_to_sheet(dataKerja);
    XLSX.utils.book_append_sheet(workbook, kerjaWorksheet, "Data Siswa Kerja");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_kerja.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_hrd_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_hrd_perusahaan_tgl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tahun_mulai_bekerja_tgl.toString().includes(searchTerm)) &&
      (filterOption === "Semua" || item.tahun_mulai_bekerja_tgl.toString() === filterOption)
  );

  const uniqueTahunMulaiBekerjaTgl = [...new Set(data.map((item) => item.tahun_mulai_bekerja_tgl.toString()))].sort();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content">
        <div className="text-center my-5">
          <h1>Data Siswa Kerja</h1>
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
              {uniqueTahunMulaiBekerjaTgl.map((tahunMulaiBekerjaTgl) => (
                <option key={tahunMulaiBekerjaTgl} value={tahunMulaiBekerjaTgl}>
                  Tahun Mulai Kerja {tahunMulaiBekerjaTgl}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Siswa Kerja
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
              <th>ID Kerja</th>
              <th>ID Siswa</th>
              <th>ID Login</th>
              <th>Nama Siswa</th>
              <th>Nama Perusahaan</th>
              <th>Alamat Perusahaan</th>
              <th>Kota</th>
              <th>Nama HRD Perusahaan</th>
              <th>No Telepon HRD Perusahaan</th>
              <th>Tahun Mulai Kerja</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_kerja} className="text-center">
                <td>{item.id_kerja}</td>
                <td>{item.id_siswa}</td>
                <td>{item.id_login}</td>
                <td>{item.nama}</td>
                <td>{item.nama_perusahaan_tgl}</td>
                <td>{item.alamat_perusahaan_tgl}</td>
                <td>{item.kota_perusahaan_tgl}</td>
                <td>{item.nama_hrd_perusahaan_tgl}</td>
                <td>{item.no_telp_hrd_perusahaan_tgl}</td>
                <td>{item.tahun_mulai_bekerja_tgl}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_kerja)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id_kerja)}
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

export default DataSiswaKerja;
