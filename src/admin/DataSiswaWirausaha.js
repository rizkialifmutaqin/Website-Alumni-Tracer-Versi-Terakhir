import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import Sidebar from "./Sidebar";

const DataSiswaWirausaha = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Semua");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswaWirausahaWithNamaSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataSiswaWirausaha/editSiswaWirausaha/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataSiswaWirausaha/tambahSiswaWirausaha`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataSiswaWirausaha/${id}`)
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
    const filename = `data_siswa_wirausaha_${rowData.nama}.xlsx`;

    const dataWirausaha = {
      "ID Wirausaha": rowData.id_wirausaha,
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "Nama Siswa": rowData.nama,
      "Nama Usaha": rowData.nama_usaha,
      "Bidang Usaha": rowData.bidang_usaha,
      "Alamat Usaha": rowData.alamat_usaha,
      "Kota Usaha": rowData.kota_usaha,
      "No Telepon Usaha": rowData.no_telp_usaha,
      "Tahun Mulai Usaha": rowData.tahun_mulai_usaha,
    };

    const workbook = XLSX.utils.book_new();

    const wirausahaWorksheet = XLSX.utils.json_to_sheet([dataWirausaha]);
    XLSX.utils.book_append_sheet(workbook, wirausahaWorksheet, "Data Siswa Wirausaha");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_siswa_wirausaha_all.xlsx";

    const dataWirausaha = data.map((item) => ({
      "ID Wirausaha": item.id_wirausaha,
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "Nama Siswa": item.nama,
      "Nama Usaha": item.nama_usaha,
      "Bidang Usaha": item.bidang_usaha,
      "Alamat Usaha": item.alamat_usaha,
      "Kota Usaha": item.kota_usaha,
      "No Telepon Usaha": item.no_telp_usaha,
      "Tahun Mulai Usaha": item.tahun_mulai_usaha,
    }));

    const workbook = XLSX.utils.book_new();

    const wirausahaWorksheet = XLSX.utils.json_to_sheet(dataWirausaha);
    XLSX.utils.book_append_sheet(workbook, wirausahaWorksheet, "Data Siswa Wirausaha");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_wirausaha.toString().includes(searchTerm) ||
        item.id_login.toString().includes(searchTerm) ||
        item.id_siswa.toString().includes(searchTerm) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bidang_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamat_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kota_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.no_telp_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tahun_mulai_usaha.toString().includes(searchTerm)) &&
      (filterOption === "Semua" || item.tahun_mulai_usaha.toString() === filterOption)
  );

  const uniqueTahunMulaiUsaha = [...new Set(data.map((item) => item.tahun_mulai_usaha.toString()))].sort();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content">
        <div className="text-center my-5">
          <h1>Data Siswa Wirausaha</h1>
          {/* <div className="text-center my-3">
            <Button
              onClick={() => exportAllDataToExcel()}
              className="btn btn-success"
            >
              Export Semua Data ke Excel
            </Button>
          </div> */}
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
              {uniqueTahunMulaiUsaha.map((tahunMulaiUsaha) => (
                <option key={tahunMulaiUsaha} value={tahunMulaiUsaha}>
                  Tahun Mulai Usaha {tahunMulaiUsaha}
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
            Tambah Data Siswa Wirausaha
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
              <th>ID Wirausaha</th>
              <th>ID Login</th>
              <th>ID Siswa</th>
              <th>Nama Siswa</th>
              <th>Nama Usaha</th>
              <th>Bidang Usaha</th>
              <th>Alamat Usaha</th>
              <th>Kota</th>
              <th>No Telepon</th>
              <th>Tahun Mulai Usaha</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_wirausaha} className="text-center">
                <td>{item.id_wirausaha}</td>
                <td>{item.id_login}</td>
                <td>{item.id_siswa}</td>
                <td>{item.nama}</td>
                <td>{item.nama_usaha}</td>
                <td>{item.bidang_usaha}</td>
                <td>{item.alamat_usaha}</td>
                <td>{item.kota_usaha}</td>
                <td>{item.no_telp_usaha}</td>
                <td>{item.tahun_mulai_usaha}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_wirausaha)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id_wirausaha)}
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

export default DataSiswaWirausaha;
