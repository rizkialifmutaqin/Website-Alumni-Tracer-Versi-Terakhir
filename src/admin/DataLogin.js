import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import bcrypt from 'bcryptjs';
import Sidebar from "./Sidebar";

const DataLogin = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Semua");
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataLogin")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    history.push(`/dataLogin/editLogin/${id}`);
  };

  const handleTambah = () => {
    history.push(`/dataLogin/tambahLogin`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dataLogin/${id}`)
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Remove the header row
        jsonData.shift();

        const formattedData = jsonData.map((row) => ({
          nama: row[0],
          tahun_lulus: row[1],
          username: row[2],
          password: row[3],
          role: row[4],
        }));

        importData(formattedData);
      };
      fileReader.readAsArrayBuffer(selectedFile);
      // Mengosongkan kembali inputan file setelah import selesai
      setSelectedFile(null);
    }
  };

  const importData = (data) => {
    const formattedData = data.map((row) => ({
      nama: row.nama,
      tahun_lulus: row.tahun_lulus,
      username: row.username,
      password: bcrypt.hashSync(row.password, 10),
      role: row.role,
    }));

    axios
      .get("http://localhost:5000/api/dataLogin")
      .then((response) => {
        const existingDataUsernames = response.data.map((item) => item.username);
        const duplicateUsernames = formattedData.filter((item) =>
          existingDataUsernames.includes(item.username)
        );

        if (duplicateUsernames.length > 0) {
          const duplicateUsernamesList = duplicateUsernames.map((item) => item.username).join(", ");
          alert(`Terjadi kesalahan: Data mengandung username yang sudah ada: ${duplicateUsernamesList}`);
          return;
        }

        axios
          .post("http://localhost:5000/api/dataLogin/batchImport", {
            data: formattedData,
          })
          .then((response) => {
            fetchData();
            alert(response.data.message);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const exportDataToExcel = (rowData) => {
    const filename = `data_login_${rowData.nama}.xlsx`;

    const dataLogin = {
      "ID Login": rowData.id_login,
      "Nama Siswa": rowData.nama,
      "Tahun Lulus": rowData.tahun_lulus,
      "Username": rowData.username,
      "Role": rowData.role,
    };

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

    const dataKuliah = {
      "ID Kuliah": rowData.id_kuliah,
      "ID Siswa": rowData.id_siswa,
      "ID Login": rowData.id_login,
      "Nama Siswa": rowData.nama,
      "Nama Perguruan Tinggi_": rowData.nama_perguruan_tinggi_tgl,
      "Alamat Perguruan Tinggi_": rowData.alamat_perguruan_tinggi_tgl,
      "Kota Perguruan Tinggi_": rowData.kota_perguruan_tinggi_tgl,
      "Jurusan Perguruan Tinggi_": rowData.jurusan_perguruan_tinggi_tgl,
      "Jenjang Pendidikan_": rowData.jenjang_pendidikan_tgl,
    };

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

    const loginWorksheet = XLSX.utils.json_to_sheet([dataLogin]);
    XLSX.utils.book_append_sheet(workbook, loginWorksheet, "Data Login");

    const siswaWorksheet = XLSX.utils.json_to_sheet([dataSiswa]);
    XLSX.utils.book_append_sheet(workbook, siswaWorksheet, "Data Siswa");

    const kuliahWorksheet = XLSX.utils.json_to_sheet([dataKuliah]);
    XLSX.utils.book_append_sheet(workbook, kuliahWorksheet, "Data Kuliah");

    const kerjaWorksheet = XLSX.utils.json_to_sheet([dataKerja]);
    XLSX.utils.book_append_sheet(workbook, kerjaWorksheet, "Data Kerja");

    const kuliahDanKerjaWorksheet = XLSX.utils.json_to_sheet([dataKuliahDanKerja]);
    XLSX.utils.book_append_sheet(workbook, kuliahDanKerjaWorksheet, "Data Kuliah dan Kerja");

    const wirausahaWorksheet = XLSX.utils.json_to_sheet([dataWirausaha]);
    XLSX.utils.book_append_sheet(workbook, wirausahaWorksheet, "Data Wirausaha");

    XLSX.writeFile(workbook, filename);
  };

  const exportAllDataToExcel = () => {
    const filename = "data_login_all.xlsx";
    const dataLogin = data.map((item) => ({
      "ID Login": item.id_login,
      "Nama Siswa": item.nama,
      "Tahun Lulus": item.tahun_lulus,
      "Username": item.username,
      "Role": item.role,
    }));

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

    const dataKuliah = data.map((item) => ({
      "ID Kuliah": item.id_kuliah,
      "ID Siswa": item.id_siswa,
      "ID Login": item.id_login,
      "Nama Siswa": item.nama,
      "Nama Perguruan Tinggi_": item.nama_perguruan_tinggi_tgl,
      "Alamat Perguruan Tinggi_": item.alamat_perguruan_tinggi_tgl,
      "Kota Perguruan Tinggi_": item.kota_perguruan_tinggi_tgl,
      "Jurusan Perguruan Tinggi_": item.jurusan_perguruan_tinggi_tgl,
      "Jenjang Pendidikan_": item.jenjang_pendidikan_tgl,
    }));

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

    const loginWorksheet = XLSX.utils.json_to_sheet(dataLogin);
    XLSX.utils.book_append_sheet(workbook, loginWorksheet, "Data Login");

    const siswaWorksheet = XLSX.utils.json_to_sheet(dataSiswa);
    XLSX.utils.book_append_sheet(workbook, siswaWorksheet, "Data Siswa");

    const kuliahWorksheet = XLSX.utils.json_to_sheet(dataKuliah);
    XLSX.utils.book_append_sheet(workbook, kuliahWorksheet, "Data Kuliah");

    const kerjaWorksheet = XLSX.utils.json_to_sheet(dataKerja);
    XLSX.utils.book_append_sheet(workbook, kerjaWorksheet, "Data Kerja");

    const kuliahDanKerjaWorksheet = XLSX.utils.json_to_sheet(dataKuliahDanKerja);
    XLSX.utils.book_append_sheet(workbook, kuliahDanKerjaWorksheet, "Data Kuliah dan Kerja");

    const wirausahaWorksheet = XLSX.utils.json_to_sheet(dataWirausaha);
    XLSX.utils.book_append_sheet(workbook, wirausahaWorksheet, "Data Wirausaha");

    XLSX.writeFile(workbook, filename);
  };

  const filteredData = data.filter(
    (item) =>
      (item.id_login.toString().includes(searchTerm) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tahun_lulus.toString().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterOption === "Semua" || item.role === filterOption || item.tahun_lulus.toString() === filterOption)
  );

  const uniqueTahunLulus = [...new Set(data.map((item) => item.tahun_lulus.toString()))].sort();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content">
        <div className="text-center mt-5 mb-4">
          <h1>Data Login</h1>
          <Form.Control
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Form.Group className="mb-5">
          <Form.Label>Import Data dari Excel</Form.Label>
          <Form.Control
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <Button className="mt-2" onClick={handleImport}>
              Import Data
            </Button>
          )}
        </Form.Group>

        <Form.Group className="mt-2 mb-5 w-25" style={{marginLeft: 'auto'}}>
          <Form.Label>Filter Data : </Form.Label>
          <Form.Select
            value={filterOption}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Admin">Admin Saja</option>
            <option value="User">User Saja</option>
            {uniqueTahunLulus.map((tahunLulus) => (
              <option key={tahunLulus} value={tahunLulus}>
                Tahun Lulus {tahunLulus}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between mb-2">
          <Button
            onClick={() => handleTambah()}
            className="mb-2"
            variant="outline-primary"
          >
            Tambah Data Login
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
              <th>ID Login</th>
              <th>Nama</th>
              <th>Tahun Lulus</th>
              <th>Username</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id_login} className="text-center">
                <td>{item.id_login}</td>
                <td>{item.nama}</td>
                <td>{item.tahun_lulus}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(item.id_login)}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id_login)}
                    className="btn btn-danger"
                  >
                    Delete
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

export default DataLogin;