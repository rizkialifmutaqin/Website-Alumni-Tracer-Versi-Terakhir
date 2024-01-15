const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "src/images")));

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
  connection.release();
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});


// menghapus file gambar
app.delete("/api/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const path = `./src/images/${filename}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal menghapus file." });
    } else {
      res.json({ message: "File berhasil dihapus." });
    }
  });
});

// CODE DATA LOGIN

// memeriksa apakah user terautentikasi saat melakukan login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM login WHERE username = ?";
  pool.query(sql, [username], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if (isPasswordMatched) {
        res.json({ role: result[0].role, id_login: result[0].id_login, message: `Berhasil login. Selamat datang ${username}!` });
      } else {
        res.status(401).json({ message: "Password salah." });
      }
    } else {
      res.status(404).json({ message: "Username tidak ditemukan." });
    }
  });
});

// mengambil data pada tabel login
app.get("/api/dataLogin", (req, res) => {
  const sql = "SELECT login.*, siswa.id_siswa, siswa.nisn, siswa.nis, siswa.kelas_terakhir, siswa.tempat_lahir, siswa.tanggal_lahir, siswa.email_siswa, siswa.no_telp_siswa, siswa.alamat, siswa.kota, siswa.provinsi, siswa.angkatan, siswa.jurusan, siswa.aktifitas_stlh_lulus, kuliah.id_siswa AS kuliah_id_siswa, kuliah.id_kuliah, kuliah.nama_perguruan_tinggi_tgl, kuliah.alamat_perguruan_tinggi_tgl, kuliah.kota_perguruan_tinggi_tgl, kuliah.jurusan_perguruan_tinggi_tgl, kuliah.jenjang_pendidikan_tgl, kerja.id_siswa AS kerja_id_siswa, kerja.id_kerja, kerja.nama_perusahaan_tgl, kerja.alamat_perusahaan_tgl, kerja.kota_perusahaan_tgl, kerja.nama_hrd_perusahaan_tgl, kerja.no_telp_hrd_perusahaan_tgl, kerja.tahun_mulai_bekerja_tgl, kuliah_dan_kerja.id_siswa AS kuliah_dan_kerja_id_siswa, kuliah_dan_kerja.id_kuliah_kerja, kuliah_dan_kerja.nama_perguruan_tinggi, kuliah_dan_kerja.alamat_perguruan_tinggi, kuliah_dan_kerja.kota_perguruan_tinggi, kuliah_dan_kerja.jurusan_perguruan_tinggi, kuliah_dan_kerja.jenjang_pendidikan, kuliah_dan_kerja.nama_perusahaan, kuliah_dan_kerja.alamat_perusahaan, kuliah_dan_kerja.kota_perusahaan, kuliah_dan_kerja.nama_hrd, kuliah_dan_kerja.no_telp_hrd, kuliah_dan_kerja.tahun_mulai_bekerja, wirausaha.id_siswa AS wirausaha_id_siswa, wirausaha.id_wirausaha, wirausaha.nama_usaha, wirausaha.bidang_usaha, wirausaha.alamat_usaha, wirausaha.kota_usaha, wirausaha.no_telp_usaha, wirausaha.tahun_mulai_usaha FROM login LEFT JOIN siswa ON login.id_login = siswa.id_login LEFT JOIN kuliah ON siswa.id_siswa = kuliah.id_siswa LEFT JOIN kerja ON siswa.id_siswa = kerja.id_siswa LEFT JOIN kuliah_dan_kerja ON siswa.id_siswa = kuliah_dan_kerja.id_siswa LEFT JOIN wirausaha ON siswa.id_siswa = wirausaha.id_siswa";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel login berdasarkan ID
app.get("/api/dataLogin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM login WHERE id_login = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel login
// app.post("/api/dataLogin", (req, res) => {
//   const { nama, tahun_lulus, username, password, role } = req.body;
//   const sql = `INSERT INTO login (id_login , nama, tahun_lulus, username, password, role) VALUES ('', '${nama}', '${tahun_lulus}', '${username}', '${password}', '${role}')`;
//   pool.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json({ message: "Data berhasil ditambahkan." });
//   });
// });

// menambahkan data pada tabel login
app.post("/api/dataLogin", (req, res) => {
  const { nama, tahun_lulus, username, password, role } = req.body;

  // Periksa apakah username sudah ada sebelumnya
  const checkUsernameQuery = `SELECT COUNT(*) AS count FROM login WHERE username = '${username}'`;
  pool.query(checkUsernameQuery, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
      return;
    }

    const existingUserCount = result[0].count;
    if (existingUserCount > 0) {
      res.status(400).json({ message: "Username sudah ada sebelumnya, coba username yang lain." });
      return;
    }

    // Jika username belum ada, lakukan INSERT
    const insertQuery = `INSERT INTO login (nama, tahun_lulus, username, password, role) VALUES ('${nama}', '${tahun_lulus}', '${username}', '${password}', '${role}')`;
    pool.query(insertQuery, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
        return;
      }
      res.json({ message: "Data berhasil ditambahkan." });
    });
  });
});


// Mengimpor data dari Excel ke tabel login
// app.post("/api/dataLogin/batchImport", (req, res) => {
//   const { data } = req.body;
//   const values = data
//     .map((item) => `('', '${item.nama}', '${item.tahun_lulus}', '${item.username}', '${item.password}', '${item.role}')`)
//     .join(", ");
//   const sql = `INSERT INTO login (id_login, nama, tahun_lulus, username, password, role) VALUES ${values}`;
//   pool.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json({ message: "Data berhasil diimpor." });
//   });
// });

// Mengimpor data dari Excel ke tabel login
app.post("/api/dataLogin/batchImport", (req, res) => {
  const { data } = req.body;

  // Extract existing usernames from the database
  const existingUsernames = [];
  pool.query("SELECT username FROM login", (err, result) => {
    if (err) throw err;
    result.forEach((row) => {
      existingUsernames.push(row.username);
    });

    const values = data
      .map((item) => {
        if (existingUsernames.includes(item.username)) {
          return null; // Skip duplicate usernames
        } else {
          return `('', '${item.nama}', '${item.tahun_lulus}', '${item.username}', '${item.password}', '${item.role}')`;
        }
      })
      .filter((value) => value !== null) // Remove null values (duplicates)
      .join(", ");

    if (values.length === 0) {
      res.status(400).json({ message: "All imported data has duplicate usernames." });
      return;
    }

    const sql = `INSERT INTO login (id_login, nama, tahun_lulus, username, password, role) VALUES ${values}`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.json({ message: "Data berhasil diimpor." });
    });
  });
});


// memperbarui data tabel Login berdasarkan ID
// app.put("/api/dataLogin/:id", (req, res) => {
//   const id = req.params.id;
//   const { nama, tahun_lulus, username, password, role } = req.body;
//   const sql =
//     "UPDATE login SET nama= ?, tahun_lulus= ?, username= ?, password = ?, role = ? WHERE id_login = ?";
//   pool.query(sql, [nama, tahun_lulus, username, password, role, id], (err, result) => {
//     if (err) throw err;
//     res.json({ message: "Data berhasil diperbarui." });
//   });
// });

// memperbarui data tabel Login berdasarkan ID
app.put("/api/dataLogin/:id", async (req, res) => {
  const id = req.params.id;
  const { nama, tahun_lulus, username, password, role } = req.body;

  // Periksa apakah password sudah di-hash
  const isPasswordHashed = password.startsWith("$2");

  // Jika password belum di-hash, maka hash password tersebut
  const hashedPassword = isPasswordHashed ? password : await hash(password, 10);

  const sql =
    "UPDATE login SET nama= ?, tahun_lulus= ?, username= ?, password = ?, role = ? WHERE id_login = ?";
  pool.query(
    sql,
    [nama, tahun_lulus, username, hashedPassword, role, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui data." });
      } else {
        res.json({ message: "Data berhasil diperbarui." });
      }
    }
  );
});


// memperbarui password pada tabel Login berdasarkan ID
app.put("/api/dataLogin/ubahPassword/:id", (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const sql =
    "UPDATE login SET password = ? WHERE id_login = ?";
  pool.query(sql, [password, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Password berhasil diubah. Jangan lupa untuk mengingat passwordnya. Silahkan login kembali" });
  });
});

// menghapus data tabel login berdasarkan ID
app.delete("/api/dataLogin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login WHERE id_login = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});   


// CODE DATA SISWA

app.get("/api/dataSiswaLengkap", (req, res) => {
  const sql = "SELECT siswa.*, login.nama, login.tahun_lulus, login.id_login, kuliah.id_siswa AS kuliah_id_siswa, kuliah.id_kuliah, kuliah.nama_perguruan_tinggi_tgl, kuliah.alamat_perguruan_tinggi_tgl, kuliah.kota_perguruan_tinggi_tgl, kuliah.jurusan_perguruan_tinggi_tgl, kuliah.jenjang_pendidikan_tgl, kerja.id_siswa AS kerja_id_siswa, kerja.id_kerja, kerja.nama_perusahaan_tgl, kerja.alamat_perusahaan_tgl, kerja.kota_perusahaan_tgl, kerja.nama_hrd_perusahaan_tgl, kerja.no_telp_hrd_perusahaan_tgl, kerja.tahun_mulai_bekerja_tgl, kuliah_dan_kerja.id_siswa AS kuliah_dan_kerja_id_siswa, kuliah_dan_kerja.id_kuliah_kerja, kuliah_dan_kerja.nama_perguruan_tinggi, kuliah_dan_kerja.alamat_perguruan_tinggi, kuliah_dan_kerja.kota_perguruan_tinggi, kuliah_dan_kerja.jurusan_perguruan_tinggi, kuliah_dan_kerja.jenjang_pendidikan, kuliah_dan_kerja.nama_perusahaan, kuliah_dan_kerja.alamat_perusahaan, kuliah_dan_kerja.kota_perusahaan, kuliah_dan_kerja.nama_hrd, kuliah_dan_kerja.no_telp_hrd, kuliah_dan_kerja.tahun_mulai_bekerja, wirausaha.id_siswa AS wirausaha_id_siswa, wirausaha.id_wirausaha, wirausaha.nama_usaha, wirausaha.bidang_usaha, wirausaha.alamat_usaha, wirausaha.kota_usaha, wirausaha.no_telp_usaha, wirausaha.tahun_mulai_usaha FROM siswa LEFT JOIN login ON siswa.id_login = login.id_login LEFT JOIN kuliah ON siswa.id_siswa = kuliah.id_siswa LEFT JOIN kerja ON siswa.id_siswa = kerja.id_siswa LEFT JOIN kuliah_dan_kerja ON siswa.id_siswa = kuliah_dan_kerja.id_siswa LEFT JOIN wirausaha ON siswa.id_siswa = wirausaha.id_siswa";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data pada tabel Siswa
app.get("/api/dataSiswa", (req, res) => {
  const sql = "SELECT * FROM siswa";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel siswa berdasarkan ID
app.get("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data siswa beserta informasi login yang terkait
app.get("/api/dataSiswaWithLogin", (req, res) => {
  const sql = "SELECT siswa.*, login.username, login.nama, login.tahun_lulus FROM siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel siswa
app.post("/api/dataSiswa", upload.single("foto"), (req, res) => {
  const { nisn, nis, kelas_terakhir, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login } = req.body;
  const pic_siswa = req.file.filename;
  const sql = `INSERT INTO siswa (id_siswa , nisn, nis, kelas_terakhir, pic_siswa, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login) VALUES ('', '${nisn}', '${nis}', '${kelas_terakhir}', '${pic_siswa}', '${tempat_lahir}', '${tanggal_lahir}', '${email_siswa}', '${no_telp_siswa}', '${alamat}', '${kota}', '${provinsi}', '${angkatan}', '${jurusan}', '${aktifitas_stlh_lulus}', '${id_login}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan.", id_siswa: result.insertId });
  });
});

// memperbarui data tabel siswa berdasarkan ID
// app.put("/api/dataSiswa/:id", upload.single("foto"), (req, res) => {
//   const id = req.params.id;
//   const { nisn, nis, kelas_terakhir, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login } = req.body;

//   // Mendapatkan data siswa berdasarkan ID
//   const getPicQuerySiswa = "SELECT pic_siswa FROM siswa WHERE id_siswa = ?";
//   pool.query(getPicQuerySiswa, id, (err, result) => {
//     if (err) throw err;
//     const oldPicSiswa = result[0].pic_siswa;
//     const oldPicPathSiswa = path.join(__dirname, "src/images", oldPicSiswa);

//     // Mengecek apakah ada gambar baru yang diunggah
//     if (req.file) {
//       // Menghapus gambar lama
//       fs.unlink(oldPicPathSiswa, (err) => {
//         if (err) console.log(err);
//       });
//       const pic_siswa = req.file.filename;

//       // Memperbarui data siswa dengan gambar baru
//       const sql =
//         "UPDATE siswa SET nisn = ?, nis = ?, kelas_terakhir = ?, pic_siswa = ?, tempat_lahir = ?, tanggal_lahir = ?, email_siswa = ?, no_telp_siswa = ?, alamat = ?, kota = ?, provinsi = ?, angkatan = ?, jurusan = ?, aktifitas_stlh_lulus = ?, id_login = ? WHERE id_siswa = ?";
//       pool.query(sql, [nisn, nis, kelas_terakhir, pic_siswa, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login, id], (err, result) => {
//         if (err) throw err;
//         res.json({ message: "Data berhasil diperbarui, silahkan log out dan masuk kembali." });
//       });
//     } else {
//       // Memperbarui data siswa tanpa mengubah gambar
//       const sql =
//         "UPDATE siswa SET nisn = ?, nis = ?, kelas_terakhir = ?, tempat_lahir = ?, tanggal_lahir = ?, email_siswa = ?, no_telp_siswa = ?, alamat = ?, kota = ?, provinsi = ?, angkatan = ?, jurusan = ?, aktifitas_stlh_lulus = ?, id_login = ? WHERE id_siswa = ?";
//       pool.query(sql, [nisn, nis, kelas_terakhir, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login, id], (err, result) => {
//         if (err) throw err;
//         res.json({ message: "Data berhasil diperbarui." });
//       });
//     }
//   });
// });

// // memperbarui data tabel siswa berdasarkan ID
// app.put("/api/dataSiswa/:id", upload.single("foto"), (req, res) => {
//   const id = req.params.id;
//   const { nisn, nis, kelas_terakhir, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login } = req.body;

//   // Mendapatkan data siswa berdasarkan ID
//   const getPicQuerySiswa = "SELECT pic_siswa FROM siswa WHERE id_siswa = ?";
//   pool.query(getPicQuerySiswa, id, (err, result) => {
//     if (err) throw err;
//     const oldPicSiswa = result[0].pic_siswa;
//     const oldPicPathSiswa = path.join(__dirname, "src/images", oldPicSiswa);

//     // Mengecek apakah ada gambar baru yang diunggah
//     if (req.file) {
//       // Menghapus gambar lama
//       fs.unlink(oldPicPathSiswa, (err) => {
//         if (err) console.log(err);
//       });
//     }

//     // Delete related data in other tables based on previous aktifitas_stlh_lulus
//     const deleteQuery = "DELETE FROM ?? WHERE id_siswa = ?";
//     const tablesToDeleteFrom = ["kuliah", "kerja", "kuliah_dan_kerja", "wirausaha"];

//     tablesToDeleteFrom.forEach(table => {
//       if (aktifitas_stlh_lulus !== result[0].aktifitas_stlh_lulus) {
//         pool.query(deleteQuery, [table, id], (err, result) => {
//           if (err) console.log(err);
//         });
//       }
//     });

//     // Update student data
//     const pic_siswa = req.file ? req.file.filename : oldPicSiswa;
//     const updateQuery =
//       "UPDATE siswa SET nisn = ?, nis = ?, kelas_terakhir = ?, pic_siswa = ?, tempat_lahir = ?, tanggal_lahir = ?, email_siswa = ?, no_telp_siswa = ?, alamat = ?, kota = ?, provinsi = ?, angkatan = ?, jurusan = ?, aktifitas_stlh_lulus = ?, id_login = ? WHERE id_siswa = ?";
//     pool.query(updateQuery, [nisn, nis, kelas_terakhir, pic_siswa, tempat_lahir, tanggal_lahir, email_siswa, no_telp_siswa, alamat, kota, provinsi, angkatan, jurusan, aktifitas_stlh_lulus, id_login, id], (err, result) => {
//       if (err) throw err;
//       res.json({ message: "Data berhasil diperbarui." });
//     });
//   });
// });

// // Menghapus data terkait sesuai dengan id_siswa dan aktifitas_stlh_lulus yang lama
// app.delete("/api/deleteRelatedData/:id", (req, res) => {
//   const id = req.params.id;

//   // Mendapatkan aktifitas_stlh_lulus yang lama
//   const getAktifitasQuery = "SELECT aktifitas_stlh_lulus FROM siswa WHERE id_siswa = ?";
//   pool.query(getAktifitasQuery, id, (err, result) => {
//     if (err) throw err;
//     const aktifitas_stlh_lulus = result[0].aktifitas_stlh_lulus;

//     // Delete related data based on the old aktifitas_stlh_lulus value
//     const deleteQuery = "DELETE FROM ?? WHERE id_siswa = ?";
//     const tablesToDeleteFrom = ["kuliah", "kerja", "kuliah_dan_kerja", "wirausaha"];

//     tablesToDeleteFrom.forEach(table => {
//       if (aktifitas_stlh_lulus !== null) {
//         pool.query(deleteQuery, [table, id], (err, result) => {
//           if (err) console.log(err);
//         });
//       }
//     });

//     res.json({ message: "Related data berhasil dihapus." });
//   });
// });

app.put("/api/dataSiswa/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const {
    nisn,
    nis,
    kelas_terakhir,
    tempat_lahir,
    tanggal_lahir,
    email_siswa,
    no_telp_siswa,
    alamat,
    kota,
    provinsi,
    angkatan,
    jurusan,
    aktifitas_stlh_lulus,
    id_login,
  } = req.body;

  // Dapatkan data siswa sebelumnya dari database
  const getPreviousAktifitasQuery = "SELECT aktifitas_stlh_lulus FROM siswa WHERE id_siswa = ?";
  pool.query(getPreviousAktifitasQuery, id, (err, result) => {
    if (err) throw err;
    const previousAktifitas = result[0].aktifitas_stlh_lulus;

    // Periksa apakah aktifitas_stlh_lulus telah berubah
    if (previousAktifitas !== aktifitas_stlh_lulus) {
      // Lakukan penghapusan data terkait berdasarkan nilai aktifitas_stlh_lulus sebelumnya
      const deleteQuery = "DELETE FROM ?? WHERE id_siswa = ?";
      const tablesToDeleteFrom = ["kuliah", "kerja", "kuliah_dan_kerja", "wirausaha"];

      tablesToDeleteFrom.forEach((table) => {
        pool.query(deleteQuery, [table, id], (err, result) => {
          if (err) console.log(err);
        });
      });
    }

    // Dapatkan nama gambar siswa sebelumnya dari database
    const getPicQuerySiswa = "SELECT pic_siswa FROM siswa WHERE id_siswa = ?";
    pool.query(getPicQuerySiswa, id, (err, result) => {
      if (err) throw err;
      const oldPicSiswa = result[0].pic_siswa;
      const oldPicPathSiswa = path.join(__dirname, "src/images", oldPicSiswa);

      // Periksa apakah ada gambar baru yang diunggah
      if (req.file) {
        // Hapus gambar siswa lama
        fs.unlink(oldPicPathSiswa, (err) => {
          if (err) console.log(err);
        });
      }

      // Hapus data terkait berdasarkan nilai aktifitas_stlh_lulus sebelumnya
      // ...

      // Perbarui data siswa
      const pic_siswa = req.file ? req.file.filename : oldPicSiswa;
      const updateQuery =
        "UPDATE siswa SET nisn = ?, nis = ?, kelas_terakhir = ?, pic_siswa = ?, tempat_lahir = ?, tanggal_lahir = ?, email_siswa = ?, no_telp_siswa = ?, alamat = ?, kota = ?, provinsi = ?, angkatan = ?, jurusan = ?, aktifitas_stlh_lulus = ?, id_login = ? WHERE id_siswa = ?";
      pool.query(
        updateQuery,
        [
          nisn,
          nis,
          kelas_terakhir,
          pic_siswa,
          tempat_lahir,
          tanggal_lahir,
          email_siswa,
          no_telp_siswa,
          alamat,
          kota,
          provinsi,
          angkatan,
          jurusan,
          aktifitas_stlh_lulus,
          id_login,
          id,
        ],
        (err, result) => {
          if (err) throw err;
          res.json({ message: "Data berhasil diperbarui." });
        }
      );
    });
  });
});


// Menghapus data terkait sesuai dengan id_siswa dan aktifitas_stlh_lulus yang lama
app.delete("/api/deleteRelatedData/:id", (req, res) => {
  const id = req.params.id;

  // Mendapatkan aktifitas_stlh_lulus yang lama
  const getAktifitasQuery = "SELECT aktifitas_stlh_lulus FROM siswa WHERE id_siswa = ?";
  pool.query(getAktifitasQuery, id, (err, result) => {
    if (err) throw err;
    const aktifitas_stlh_lulus = result[0].aktifitas_stlh_lulus;

    // Delete related data based on the old aktifitas_stlh_lulus value
    const deleteQuery = "DELETE FROM ?? WHERE id_siswa = ?";
    const tablesToDeleteFrom = ["kuliah", "kerja", "kuliah_dan_kerja", "wirausaha"];

    tablesToDeleteFrom.forEach(table => {
      if (aktifitas_stlh_lulus !== null) {
        pool.query(deleteQuery, [table, id], (err, result) => {
          if (err) console.log(err);
        });
      }
    });

    res.json({ message: "Related data berhasil dihapus." });
  });
});

// menghapus data tabel siswa berdasarkan ID
app.delete("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});


// CODE DATA SISWA KULIAH

// mengambil data pada tabel kuliah
app.get("/api/dataSiswaKuliah", (req, res) => {
  const sql = "SELECT * FROM kuliah";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel kuliah berdasarkan ID
app.get("/api/dataSiswaKuliah/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM kuliah WHERE id_kuliah = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data kuliah beserta informasi login yang terkait
app.get("/api/dataSiswaKuliahWithNamaSiswa", (req, res) => {
  const sql = "SELECT * FROM kuliah INNER JOIN siswa ON kuliah.id_siswa = siswa.id_siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel kuliah
app.post("/api/dataSiswaKuliah", (req, res) => {
  const { nama_perguruan_tinggi_tgl, alamat_perguruan_tinggi_tgl, kota_perguruan_tinggi_tgl, jurusan_perguruan_tinggi_tgl, jenjang_pendidikan_tgl, id_siswa } = req.body;
  const sql = `INSERT INTO kuliah (id_kuliah , nama_perguruan_tinggi_tgl, alamat_perguruan_tinggi_tgl, kota_perguruan_tinggi_tgl, jurusan_perguruan_tinggi_tgl, jenjang_pendidikan_tgl, id_siswa) VALUES ('', '${nama_perguruan_tinggi_tgl}', '${alamat_perguruan_tinggi_tgl}', '${kota_perguruan_tinggi_tgl}', '${jurusan_perguruan_tinggi_tgl}', '${jenjang_pendidikan_tgl}', '${id_siswa}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel kuliah berdasarkan ID
app.put("/api/dataSiswaKuliah/:id", (req, res) => {
  const id = req.params.id;
  const { nama_perguruan_tinggi_tgl, alamat_perguruan_tinggi_tgl, kota_perguruan_tinggi_tgl, jurusan_perguruan_tinggi_tgl, jenjang_pendidikan_tgl, id_siswa } = req.body;
  const sql =
    "UPDATE kuliah SET nama_perguruan_tinggi_tgl = ?, alamat_perguruan_tinggi_tgl = ?, kota_perguruan_tinggi_tgl = ?, jurusan_perguruan_tinggi_tgl = ?, jenjang_pendidikan_tgl = ?, id_siswa = ? WHERE id_kuliah = ?";
  pool.query(sql, [nama_perguruan_tinggi_tgl, alamat_perguruan_tinggi_tgl, kota_perguruan_tinggi_tgl, jurusan_perguruan_tinggi_tgl, jenjang_pendidikan_tgl, id_siswa, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// menghapus data tabel kuliah berdasarkan ID
app.delete("/api/dataSiswaKuliah/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM kuliah WHERE id_kuliah = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});

// mengambil data pada tabel kerja
app.get("/api/dataSiswaKerja", (req, res) => {
  const sql = "SELECT * FROM kerja";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// CODE DATA SISWA KERJA

// mengambil data tabel kerja berdasarkan ID
app.get("/api/dataSiswaKerja/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM kerja WHERE id_kerja = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data kerja beserta informasi siswa yang terkait
app.get("/api/dataSiswaKerjaWithNamaSiswa", (req, res) => {
  const sql = "SELECT * FROM kerja INNER JOIN siswa ON kerja.id_siswa = siswa.id_siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel kerja
app.post("/api/dataSiswaKerja", (req, res) => {
  const { nama_perusahaan_tgl, alamat_perusahaan_tgl, kota_perusahaan_tgl, nama_hrd_perusahaan_tgl, no_telp_hrd_perusahaan_tgl, tahun_mulai_bekerja_tgl, id_siswa } = req.body;
  const sql = `INSERT INTO kerja (id_kerja , nama_perusahaan_tgl, alamat_perusahaan_tgl, kota_perusahaan_tgl, nama_hrd_perusahaan_tgl, no_telp_hrd_perusahaan_tgl, tahun_mulai_bekerja_tgl, id_siswa) VALUES ('', '${nama_perusahaan_tgl}', '${alamat_perusahaan_tgl}', '${kota_perusahaan_tgl}', '${nama_hrd_perusahaan_tgl}', '${no_telp_hrd_perusahaan_tgl}', '${tahun_mulai_bekerja_tgl}', '${id_siswa}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel kerja berdasarkan ID
app.put("/api/dataSiswaKerja/:id", (req, res) => {
  const id = req.params.id;
  const { nama_perusahaan_tgl, alamat_perusahaan_tgl, kota_perusahaan_tgl, nama_hrd_perusahaan_tgl, no_telp_hrd_perusahaan_tgl, tahun_mulai_bekerja_tgl, id_siswa } = req.body;
  const sql =
    "UPDATE kerja SET nama_perusahaan_tgl = ?, alamat_perusahaan_tgl = ?, kota_perusahaan_tgl = ?, nama_hrd_perusahaan_tgl = ?, no_telp_hrd_perusahaan_tgl = ?, tahun_mulai_bekerja_tgl = ?, id_siswa = ? WHERE id_kerja = ?";
  pool.query(sql, [nama_perusahaan_tgl, alamat_perusahaan_tgl, kota_perusahaan_tgl, nama_hrd_perusahaan_tgl, no_telp_hrd_perusahaan_tgl, tahun_mulai_bekerja_tgl, id_siswa, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui, silahkan log out dan masuk kembali." });
  });
});

// menghapus data tabel kerja berdasarkan ID
app.delete("/api/dataSiswaKerja/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM kerja WHERE id_kerja = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});


// CODE DATA SISWA KULIAH DAN KERJA

// mengambil data pada tabel kuliah dan kerja
app.get("/api/dataSiswaKuliahDanKerja", (req, res) => {
  const sql = "SELECT * FROM kuliah_dan_kerja";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel kuliah dan kerja berdasarkan ID
app.get("/api/dataSiswaKuliahDanKerja/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM kuliah_dan_kerja WHERE id_kuliah_kerja = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data kuliah dan kerja beserta informasi login yang terkait
app.get("/api/dataSiswaKuliahDanKerjaWithNamaSiswa", (req, res) => {
  const sql = "SELECT * FROM kuliah_dan_kerja INNER JOIN siswa ON kuliah_dan_kerja.id_siswa = siswa.id_siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel kuliah dan kerja
app.post("/api/dataSiswaKuliahDanKerja", (req, res) => {
  const { nama_perguruan_tinggi, alamat_perguruan_tinggi, kota_perguruan_tinggi, jurusan_perguruan_tinggi, jenjang_pendidikan, nama_perusahaan, alamat_perusahaan, kota_perusahaan, nama_hrd, no_telp_hrd, tahun_mulai_bekerja, id_siswa } = req.body;
  const sql = `INSERT INTO kuliah_dan_kerja (id_kuliah_kerja , nama_perguruan_tinggi, alamat_perguruan_tinggi, kota_perguruan_tinggi, jurusan_perguruan_tinggi, jenjang_pendidikan, nama_perusahaan, alamat_perusahaan, kota_perusahaan, nama_hrd, no_telp_hrd, tahun_mulai_bekerja, id_siswa) VALUES ('', '${nama_perguruan_tinggi}', '${alamat_perguruan_tinggi}', '${kota_perguruan_tinggi}', '${jurusan_perguruan_tinggi}', '${jenjang_pendidikan}', '${nama_perusahaan}', '${alamat_perusahaan}', '${kota_perusahaan}', '${nama_hrd}', '${no_telp_hrd}', '${tahun_mulai_bekerja}', '${id_siswa}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel kuliah dan kerja berdasarkan ID
app.put("/api/dataSiswaKuliahDanKerja/:id", (req, res) => {
  const id = req.params.id;
  const { nama_perguruan_tinggi, alamat_perguruan_tinggi, kota_perguruan_tinggi, jurusan_perguruan_tinggi, jenjang_pendidikan, nama_perusahaan, alamat_perusahaan, kota_perusahaan, nama_hrd, no_telp_hrd, tahun_mulai_bekerja, id_siswa } = req.body;
  const sql =
    "UPDATE kuliah_dan_kerja SET nama_perguruan_tinggi = ?, alamat_perguruan_tinggi = ?, kota_perguruan_tinggi = ?, jurusan_perguruan_tinggi = ?, jenjang_pendidikan = ?, nama_perusahaan = ?, alamat_perusahaan = ?, kota_perusahaan = ?, nama_hrd = ?, no_telp_hrd = ?, tahun_mulai_bekerja = ?, id_siswa = ? WHERE id_kuliah_kerja = ?";
  pool.query(sql, [nama_perguruan_tinggi, alamat_perguruan_tinggi, kota_perguruan_tinggi, jurusan_perguruan_tinggi, jenjang_pendidikan, nama_perusahaan, alamat_perusahaan, kota_perusahaan, nama_hrd, no_telp_hrd, tahun_mulai_bekerja, id_siswa, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui, silahkan log out dan masuk kembali." });
  });
});

// menghapus data tabel kuliah berdasarkan ID
app.delete("/api/dataSiswaKuliahDanKerja/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM kuliah_dan_kerja WHERE id_kuliah_kerja = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});


// CODE DATA SISWA WIRAUSAHA

// mengambil data pada tabel wirausaha
app.get("/api/dataSiswaWirausaha", (req, res) => {
  const sql = "SELECT * FROM wirausaha";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data tabel wirausaha berdasarkan ID
app.get("/api/dataSiswaWirausaha/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM wirausaha WHERE id_wirausaha = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// mengambil data wirausaha beserta informasi siswa yang terkait
app.get("/api/dataSiswaWirausahaWithNamaSiswa", (req, res) => {
  const sql = "SELECT * FROM wirausaha INNER JOIN siswa ON wirausaha.id_siswa = siswa.id_siswa INNER JOIN login ON siswa.id_login = login.id_login";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tabel wirausaha
app.post("/api/dataSiswaWirausaha", (req, res) => {
  const { nama_usaha, bidang_usaha, alamat_usaha, kota_usaha, no_telp_usaha, tahun_mulai_usaha, id_siswa } = req.body;
  const sql = `INSERT INTO wirausaha (id_wirausaha , nama_usaha, bidang_usaha, alamat_usaha, kota_usaha, no_telp_usaha, tahun_mulai_usaha, id_siswa) VALUES ('', '${nama_usaha}', '${bidang_usaha}', '${alamat_usaha}', '${kota_usaha}', '${no_telp_usaha}', '${tahun_mulai_usaha}', '${id_siswa}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// memperbarui data tabel wirausaha berdasarkan ID
app.put("/api/dataSiswaWirausaha/:id", (req, res) => {
  const id = req.params.id;
  const { nama_usaha, bidang_usaha, alamat_usaha, kota_usaha, no_telp_usaha, tahun_mulai_usaha, id_siswa } = req.body;
  const sql =
    "UPDATE wirausaha SET nama_usaha = ?, bidang_usaha = ?, alamat_usaha = ?, kota_usaha = ?, no_telp_usaha = ?, tahun_mulai_usaha = ?, id_siswa = ? WHERE id_wirausaha = ?";
  pool.query(sql, [nama_usaha, bidang_usaha, alamat_usaha, kota_usaha, no_telp_usaha, tahun_mulai_usaha, id_siswa, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// menghapus data tabel wirausaha berdasarkan ID
app.delete("/api/dataSiswaWirausaha/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM wirausaha WHERE id_wirausaha = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});


// CODE DATA SISWA TIDAK KULIAH / KERJA

// mengambil data menganggur beserta informasi login yang terkait
app.get("/api/dataSiswaMenganggur", (req, res) => {
  const sql = "SELECT siswa.id_siswa, siswa.nisn, siswa.nis, siswa.pic_siswa, siswa.aktifitas_stlh_lulus, login.nama, login.id_login FROM siswa INNER JOIN login ON siswa.id_login = login.id_login where aktifitas_stlh_lulus = 'Menganggur'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
