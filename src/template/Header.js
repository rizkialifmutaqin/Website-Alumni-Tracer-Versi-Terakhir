import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./Header.css";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const id_login = location.state?.id_login; // Mengambil id_login dari state location
    const storedUserData = JSON.parse(localStorage.getItem("userData")); // Mengambil userData dari localStorage

    if (id_login) {
      axios
        .get(`http://localhost:5000/api/dataSiswa?id_login=${id_login}`)
        .then((response) => {
          const filteredData = response.data.filter(
            (item) => item.id_login === id_login
          );
          setUserData(filteredData);

          // Simpan userData di localStorage
          localStorage.setItem("userData", JSON.stringify(filteredData));
        })
        .catch((err) => console.error(err));
    } else if (storedUserData) {
      setUserData(storedUserData);
    } 
  }, [location.state]);


  // const changePassword = (id) => {
  //   history.push(`/ubahPassword/${id}`);
  // };
  // const fetchData = () => {
  //   axios
  //     .get(`http://localhost:5000/api/dataUsers/` + userID)
  //     .then((response) => setData(response.data))
  //     .catch((err) => console.error(err));
  // };
  // const [data, setData] = useState([]);
  // const idUser = localStorage.getItem('id_user');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:5000/api/dataUsers/")
  //     .then((response) => setData(response.data))
  //     .catch((err) => console.error(err));
  // };

  const handleLogout = () => {
    // Hapus data pengguna dari localStorage
    localStorage.removeItem("userData");

    // localStorage.removeItem("formSiswaSubmitted");

    // Mengatur ulang state userData dan loading
    setUserData([]);

    // Redirect ke halaman login atau halaman lain yang Anda tentukan
    history.push("/");
  };

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  return (
    <>
      {userData.map((item) => (
    <header key={item.id_login}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand navbar-style" to="/mainPage" onClick={changeNav}>
            {/* <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            /> */}
            {/* <span className="ms-2 h5">SMK Telkom Jakarta</span> */}
            <img
              src="https://smktelkom-jkt.sch.id/wp-content/uploads/2020/03/smktelkomjkt.png"
              alt="SMK Telkom Jakarta Logo"
            />
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    // className="card-img-top bg-dark cover"
                    alt=""
                    src={`http://localhost:5000/images/${item.pic_siswa}`}
                    style={{borderRadius: 100, width: 30}}
                  />
                  {/* <FontAwesomeIcon icon={["fas", "user-alt"]} /> */}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to={`/ubahPassword/${item.id_login}`} className="dropdown-item" onClick={changeNav}>
                      Ubah Password
                    </Link>
                  </li>
                  <li>
                    {/* <Link to="/" className="dropdown-item" onClick={changeNav}>
                      Log Out
                    </Link> */}
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            {/* <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button> */}
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
      ))
      }
    </>
  );
}

export default Header;
