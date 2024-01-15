-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2024 pada 01.53
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cadangan_wats`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kerja`
--

CREATE TABLE `kerja` (
  `id_kerja` int(11) NOT NULL,
  `nama_perusahaan_tgl` varchar(150) NOT NULL,
  `alamat_perusahaan_tgl` varchar(255) NOT NULL,
  `kota_perusahaan_tgl` varchar(150) NOT NULL,
  `nama_hrd_perusahaan_tgl` varchar(255) NOT NULL,
  `no_telp_hrd_perusahaan_tgl` varchar(15) NOT NULL,
  `tahun_mulai_bekerja_tgl` int(4) NOT NULL,
  `id_siswa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kuliah`
--

CREATE TABLE `kuliah` (
  `id_kuliah` int(11) NOT NULL,
  `nama_perguruan_tinggi_tgl` varchar(150) NOT NULL,
  `alamat_perguruan_tinggi_tgl` varchar(255) NOT NULL,
  `kota_perguruan_tinggi_tgl` varchar(150) NOT NULL,
  `jurusan_perguruan_tinggi_tgl` varchar(150) NOT NULL,
  `jenjang_pendidikan_tgl` varchar(5) NOT NULL,
  `id_siswa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kuliah`
--

INSERT INTO `kuliah` (`id_kuliah`, `nama_perguruan_tinggi_tgl`, `alamat_perguruan_tinggi_tgl`, `kota_perguruan_tinggi_tgl`, `jurusan_perguruan_tinggi_tgl`, `jenjang_pendidikan_tgl`, `id_siswa`) VALUES
(1, 'Bina Sarana Informatika (BSI)', 'Jl. Kramat Raya No. 98, RT/RW 02/09 Kel. Kwitang Kec. Senen', 'Jakarta Pusat', 'Teknologi Komputer', 'D3', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kuliah_dan_kerja`
--

CREATE TABLE `kuliah_dan_kerja` (
  `id_kuliah_kerja` int(11) NOT NULL,
  `nama_perguruan_tinggi` varchar(150) NOT NULL,
  `alamat_perguruan_tinggi` varchar(255) NOT NULL,
  `kota_perguruan_tinggi` varchar(150) NOT NULL,
  `jurusan_perguruan_tinggi` varchar(150) NOT NULL,
  `jenjang_pendidikan` varchar(5) NOT NULL,
  `nama_perusahaan` varchar(150) NOT NULL,
  `alamat_perusahaan` varchar(255) NOT NULL,
  `kota_perusahaan` varchar(150) NOT NULL,
  `nama_hrd` varchar(255) NOT NULL,
  `no_telp_hrd` varchar(15) NOT NULL,
  `tahun_mulai_bekerja` int(4) NOT NULL,
  `id_siswa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tahun_lulus` int(4) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `login`
--

INSERT INTO `login` (`id_login`, `nama`, `tahun_lulus`, `username`, `password`, `role`) VALUES
(1, 'ADMIN SATU', 0, 'adminsatu', '$2a$10$t8FxadxzsPUaENeq2bKmM.Fp1XO/77rqXM22Ekp5jM81iEphoUYp.', 'Admin'),
(2, 'User Satu ', 2022, 'usersatu', '$2a$10$dtU/iFF8J5QInWf0gmbkW.ZAZdUum.zMP2HJjopxDcf3eYQDMevW.', 'User');

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` int(11) NOT NULL,
  `nisn` varchar(11) NOT NULL,
  `nis` varchar(11) NOT NULL,
  `kelas_terakhir` varchar(15) NOT NULL,
  `pic_siswa` varchar(255) NOT NULL,
  `tempat_lahir` varchar(150) NOT NULL,
  `tanggal_lahir` varchar(11) NOT NULL,
  `email_siswa` varchar(255) NOT NULL,
  `no_telp_siswa` varchar(15) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kota` varchar(150) NOT NULL,
  `provinsi` varchar(150) NOT NULL,
  `angkatan` int(4) NOT NULL,
  `jurusan` varchar(5) NOT NULL,
  `aktifitas_stlh_lulus` varchar(50) NOT NULL,
  `id_login` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `nisn`, `nis`, `kelas_terakhir`, `pic_siswa`, `tempat_lahir`, `tanggal_lahir`, `email_siswa`, `no_telp_siswa`, `alamat`, `kota`, `provinsi`, `angkatan`, `jurusan`, `aktifitas_stlh_lulus`, `id_login`) VALUES
(1, '0066447754', '20134654', 'XII TEL 10', '1705127412184-profilevector.png', 'Jakarta', '2003-06-13', 'usersatu@gmail.com', '082123423423', 'Jl. Berkah No. 32A RT/RW 002/001 Kel. Asri Kec. Sehat', 'Jakarta Timur', 'DKI Jakarta', 2019, 'RPL', 'Kuliah', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wirausaha`
--

CREATE TABLE `wirausaha` (
  `id_wirausaha` int(11) NOT NULL,
  `nama_usaha` varchar(150) NOT NULL,
  `bidang_usaha` varchar(150) NOT NULL,
  `alamat_usaha` varchar(255) NOT NULL,
  `kota_usaha` varchar(150) NOT NULL,
  `no_telp_usaha` varchar(15) NOT NULL,
  `tahun_mulai_usaha` int(4) NOT NULL,
  `id_siswa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kerja`
--
ALTER TABLE `kerja`
  ADD PRIMARY KEY (`id_kerja`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indeks untuk tabel `kuliah`
--
ALTER TABLE `kuliah`
  ADD PRIMARY KEY (`id_kuliah`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indeks untuk tabel `kuliah_dan_kerja`
--
ALTER TABLE `kuliah_dan_kerja`
  ADD PRIMARY KEY (`id_kuliah_kerja`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indeks untuk tabel `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD KEY `id_login` (`id_login`);

--
-- Indeks untuk tabel `wirausaha`
--
ALTER TABLE `wirausaha`
  ADD PRIMARY KEY (`id_wirausaha`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kerja`
--
ALTER TABLE `kerja`
  MODIFY `id_kerja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kuliah`
--
ALTER TABLE `kuliah`
  MODIFY `id_kuliah` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kuliah_dan_kerja`
--
ALTER TABLE `kuliah_dan_kerja`
  MODIFY `id_kuliah_kerja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `wirausaha`
--
ALTER TABLE `wirausaha`
  MODIFY `id_wirausaha` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kerja`
--
ALTER TABLE `kerja`
  ADD CONSTRAINT `kerja_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`);

--
-- Ketidakleluasaan untuk tabel `kuliah`
--
ALTER TABLE `kuliah`
  ADD CONSTRAINT `kuliah_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`);

--
-- Ketidakleluasaan untuk tabel `kuliah_dan_kerja`
--
ALTER TABLE `kuliah_dan_kerja`
  ADD CONSTRAINT `kuliah_dan_kerja_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`);

--
-- Ketidakleluasaan untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_login`) REFERENCES `login` (`id_login`);

--
-- Ketidakleluasaan untuk tabel `wirausaha`
--
ALTER TABLE `wirausaha`
  ADD CONSTRAINT `wirausaha_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
