import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav id="sidebarMenu" className="sidebar sidebar-fixed">
      <div className="position-sticky">
        <h1 className="text-center">ADMIN</h1>
        <div className="list-group list-group-flush mx-3 mt-4">
          <NavLink
            to="/dataLogin"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Login</span>
          </NavLink>
          <NavLink
            to="/dataSiswa"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa</span>
          </NavLink>
          <NavLink
            to="/dataSiswaKuliah"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa Kuliah</span>
          </NavLink>
          <NavLink
            to="/dataSiswaKerja"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa Kerja</span>
          </NavLink>
          <NavLink
            to="/dataSiswaKuliahDanKerja"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa Kuliah & Kerja</span>
          </NavLink>
          <NavLink
            to="/dataSiswaWirausaha"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa Wirausaha</span>
          </NavLink>
          <NavLink
            to="/dataSiswaMenganggur"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Data Siswa Tidak Bekerja / Kuliah</span>
          </NavLink>

          {/* Add other menu items */}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
