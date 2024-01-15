import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import Sidebar from "./Sidebar";
import "./DataSiswaKuliahDanKerja.css"; // Impor file CSS

const DataSiswaKuliahDanKerja = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Semua");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaKuliahDanKerjaWithNamaSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaKuliahDanKerja/editSiswaKuliahDanKerja/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaKuliahDanKerja/tambahSiswaKuliahDanKerja`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaKuliahDanKerja/${id}`)
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
    const filename = `data_siswa_kuliah_dan_kerja_${rowData.nama}.xlsx`;

    const dataKuliahDanKerja = {
      "ID Kuliah dan Kerja": rowData.id_kuliah_kerja,
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "Nama Siswa": rowData.nama,
      "Nama Perguruan Tinggi": rowData.nama_perguruan_tinggi,
      "Alamat Perguruan Tinggi": rowData.alamat_perguruan_tinggi,
      "Kota Perguruan Tinggi": rowData.kota_perguruan_tinggi,
      "Jurusan Perguruan Tinggi": rowData.jurusan_perguruan_tinggi,
      "Jenjang Pendidikan": rowData.jenjang_pendidikan,
      "Nama Perusahaan": rowData.nama_perusahaan,
      "Alamat Perusahaan": rowData.alamat_perusahaan,
      "Kota Perusahaan": rowData.kota_perusahaan,
      "Nama HRD Perusahaan": rowData.nama_hrd,
      "No Telepon HRD": rowData.no_telp_hrd,
      "Tahun Mulai Kerja": rowData.tahun_mulai_bekerja,
    };

    const workbook = XLSX.utils.book_new();

    const kuliahDanKerjaWorksheet = XLSX.utils.json_to_sheet([dataKuliahDanKerja]);
    XLSX.utils.book_append_sheet(workbook, kuliahDanKerjaWorksheet, "Data Siswa Kuliah dan Kerja");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_kuliah_dan_kerja_all.xlsx";

    const dataKuliahDanKerja = data.map((item) => ({
      "ID Kuliah dan Kerja": item.id_kuliah_kerja,
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "Nama Siswa": item.nama,
      "Nama Perguruan Tinggi": item.nama_perguruan_tinggi,
      "Alamat Perguruan Tinggi": item.alamat_perguruan_tinggi,
      "Kota Perguruan Tinggi": item.kota_perguruan_tinggi,
      "Jurusan Perguruan Tinggi": item.jurusan_perguruan_tinggi,
      "Jenjang Pendidikan": item.jenjang_pendidikan,
      "Nama Perusahaan": item.nama_perusahaan,
      "Alamat Perusahaan": item.alamat_perusahaan,
      "Kota Perusahaan": item.kota_perusahaan,
      "Nama HRD Perusahaan": item.nama_hrd,
      "No Telepon HRD": item.no_telp_hrd,
      "Tahun Mulai Kerja": item.tahun_mulai_bekerja,
    }));

    const workbook = XLSX.utils.book_new();

    const kuliahDanKerjaWorksheet = XLSX.utils.json_to_sheet(dataKuliahDanKerja);
    XLSX.utils.book_append_sheet(workbook, kuliahDanKerjaWorksheet, "Data Siswa Kuliah dan Kerja");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_kuliah_kerja.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_perguruan_tinggi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_perguruan_tinggi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_perguruan_tinggi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jurusan_perguruan_tinggi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenjang_pendidikan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_hrd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_hrd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tahun_mulai_bekerja.toString().includes(searchTerm)) &&
      (filterOption === "Semua" || item.jenjang_pendidikan === filterOption || item.tahun_mulai_bekerja.toString() === filterOption) 
  );

  const uniqueTahunMulaiBekerja = [...new Set(data.map((item) => item.tahun_mulai_bekerja.toString()))].sort();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content contentKuliahDanKerja">
        <div className="text-center my-5">
          <h1>Data Siswa Kuliah dan Kerja</h1>
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
              <option value="D3">Jenjang Pendidikan D3</option>
              <option value="D4">Jenjang Pendidikan D4</option>
              <option value="S1">Jenjang Pendidikan S1</option>
              <option value="S2">Jenjang Pendidikan S2</option>
              {uniqueTahunMulaiBekerja.map((tahunMulaiBekerja) => (
                <option key={tahunMulaiBekerja} value={tahunMulaiBekerja}>
                  Tahun Mulai Kerja {tahunMulaiBekerja}
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
            Tambah Data Siswa Kuliah dan Kerja
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
                <th>ID Kuliah dan Kerja</th>
                <th>ID Siswa</th>
                <th>ID Login</th>
                <th>Nama Siswa</th>
                <th>Nama Perguruan Tinggi</th>
                <th>Alamat Perguruan Tinggi</th>
                <th>Kota Perguruan Tinggi</th>
                <th>Jurusan</th>
                <th>Jenjang Pendidikan</th>
                <th>Nama Perusahaan</th>
                <th>Alamat Perusahaan</th>
                <th>Kota Perusahaan</th>
                <th>Nama HRD Perusahaan</th>
                <th>No Telepon HRD Perusahaan</th>
                <th>Tahun Mulai Kerja</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_kuliah_kerja} className="text-center">
                  <td>{item.id_kuliah_kerja}</td>
                  <td>{item.id_siswa}</td>
                  <td>{item.id_login}</td>
                  <td>{item.nama}</td>
                  <td>{item.nama_perguruan_tinggi}</td>
                  <td>{item.alamat_perguruan_tinggi}</td>
                  <td>{item.kota_perguruan_tinggi}</td>
                  <td>{item.jurusan_perguruan_tinggi}</td>
                  {/* <td>
                  <img
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    alt={item.nama}
                    style={{ width: 150 }}
                  />
                </td> */}
                  <td>{item.jenjang_pendidikan}</td>
                  <td>{item.nama_perusahaan}</td>
                  <td>{item.alamat_perusahaan}</td>
                  <td>{item.kota_perusahaan}</td>
                  <td>{item.nama_hrd}</td>
                  <td>{item.no_telp_hrd}</td>
                  <td>{item.tahun_mulai_bekerja}</td>
                  <td>
                    <Button
                      onClick={() => handleEdit(item.id_kuliah_kerja)}
                      className="btn btn-primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id_kuliah_kerja)}
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

export default DataSiswaKuliahDanKerja;