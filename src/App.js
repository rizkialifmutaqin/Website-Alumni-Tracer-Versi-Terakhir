import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./admin/Login";
import SecondLogin from "./admin/SecondLogin";

import DataLogin from "./admin/DataLogin";
import TambahLogin from "./admin/TambahLogin";
import EditLogin from "./admin/EditLogin";

import DataSiswa from "./admin/DataSiswa";
import TambahSiswa from "./admin/TambahSiswa";
import EditSiswa from "./admin/EditSiswa";
import UbahPassword from "./admin/UbahPassword";

import DataSiswaKuliah from "./admin/DataSiswaKuliah";
import TambahSiswaKuliah from "./admin/TambahSiswaKuliah";
import TambahSiswaKuliahSecond from "./admin/TambahSiswaKuliahSecond";
import TambahSiswaKuliahThird from "./admin/TambahSiswaKuliahThird";
import EditSiswaKuliah from "./admin/EditSiswaKuliah";

import DataSiswaKerja from "./admin/DataSiswaKerja";
import TambahSiswaKerja from "./admin/TambahSiswaKerja";
import TambahSiswaKerjaSecond from "./admin/TambahSiswaKerjaSecond";
import TambahSiswaKerjaThird from "./admin/TambahSiswaKerjaThird";
import EditSiswaKerja from "./admin/EditSiswaKerja";

import DataSiswaKuliahDanKerja from "./admin/DataSiswaKuliahDanKerja";
import TambahSiswaKuliahDanKerja from "./admin/TambahSiswaKuliahDankerja";
import TambahSiswaKuliahDanKerjaSecond from "./admin/TambahSiswaKuliahDankerjaSecond";
import TambahSiswaKuliahDanKerjaThird from "./admin/TambahSiswaKuliahDankerjaThird";
import EditSiswaKuliahDanKerja from "./admin/EditSiswaKuliahDanKerja";

import DataSiswaWirausaha from "./admin/DataSiswaWirausaha";
import TambahSiswaWirausaha from "./admin/TambahSiswaWirausaha";
import TambahSiswaWirausahaSecond from "./admin/TambahSiswaWirausahaSecond";
import TambahSiswaWirausahaThird from "./admin/TambahSiswaWirausahaThird";
import EditSiswaWirausaha from "./admin/EditSiswaWirausaha";

import DataSiswaMenganggur from "./admin/DataSiswaMenganggur";

import Template from "./template/Template";

import FormSiswa from "./user/FormSiswa"
import FormKuliah from "./user/FormKuliah";
import FormKuliahSecond from "./user/FormKuliahSecond";
import FormKerja from "./user/FormKerja";
import FormKerjaSecond from "./user/FormKerjaSecond";
import FormWirausaha from "./user/FormWirausaha";
import FormWirausahaSecond from "./user/FormWirausahaSecond";
import FormKuliahDanKerja from "./user/FormKuliahDanKerja";
import FormKuliahDanKerjaSecond from "./user/FormKuliahDanKerjaSecond";

import MainPage from "./user/MainPage";
import HalamanEditSiswa from "./user/HalamanEditSiswa";
import HalamanEditSiswaKuliah from "./user/HalamanEditSiswaKuliah";
import HalamanEditSiswaKerja from "./user/HalamanEditSiswaKerja";
import HalamanEditSiswaKuliahDanKerja from "./user/HalamanEditSiswaKuliahDanKerja";
import HalamanEditSiswaWirausaha from "./user/HalamanEditSiswaWirausaha";


function App() {
  return (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/isiDataDiri" exact>
          <SecondLogin />
        </Route>
        <Route path="/dataLogin" exact>
          <DataLogin />
        </Route>
        <Route path="/dataLogin/tambahLogin" exact>
          <TambahLogin />
        </Route>
        <Route path="/dataLogin/editLogin/:id" exact>
          <EditLogin />
        </Route>

        <Route path="/dataSiswa" exact>
          <DataSiswa />
        </Route>
        <Route path="/dataSiswa/tambahSiswa" exact>
          <TambahSiswa />
        </Route>
        <Route path="/dataSiswa/editSiswa/:id" exact>
          <EditSiswa />
        </Route>

        <Route path="/dataSiswaKuliah" exact>
          <DataSiswaKuliah />
        </Route>
        <Route path="/dataSiswaKuliah/tambahSiswaKuliah" exact>
          <TambahSiswaKuliah />
        </Route>
        <Route path="/tambahSiswaKuliah/:id" exact>
          <TambahSiswaKuliahSecond />
        </Route>
        <Route path="/dataSiswa/tambahSiswa/tambahSiswaKuliah" exact>
          <TambahSiswaKuliahThird />
        </Route>
        <Route path="/dataSiswaKuliah/editSiswaKuliah/:id" exact>
          <EditSiswaKuliah />
        </Route>

        <Route path="/dataSiswaKerja" exact>
          <DataSiswaKerja />
        </Route>
        <Route path="/dataSiswaKerja/tambahSiswaKerja" exact>
          <TambahSiswaKerja />
        </Route>
        <Route path="/tambahSiswaKerja/:id" exact>
          <TambahSiswaKerjaSecond />
        </Route>
        <Route path="/dataSiswa/tambahSiswa/tambahSiswaKerja" exact>
          <TambahSiswaKerjaThird />
        </Route>
        <Route path="/dataSiswaKerja/editSiswaKerja/:id" exact>
          <EditSiswaKerja />
        </Route>

        <Route path="/dataSiswaKuliahDanKerja" exact>
          <DataSiswaKuliahDanKerja />
        </Route>
        <Route path="/dataSiswaKuliahDanKerja/tambahSiswaKuliahDanKerja" exact>
          <TambahSiswaKuliahDanKerja />
        </Route>
        <Route path="/tambahSiswaKuliahDanKerja/:id" exact>
          <TambahSiswaKuliahDanKerjaSecond />
        </Route>
        <Route path="/dataSiswa/tambahSiswa/tambahSiswaKuliahDanKerja" exact>
          <TambahSiswaKuliahDanKerjaThird />
        </Route>
        <Route path="/dataSiswaKuliahDanKerja/editSiswaKuliahDanKerja/:id" exact>
          <EditSiswaKuliahDanKerja />
        </Route>

        <Route path="/dataSiswaWirausaha" exact>
          <DataSiswaWirausaha />
        </Route>
        <Route path="/dataSiswaWirausaha/tambahSiswaWirausaha" exact>
          <TambahSiswaWirausaha />
        </Route>
        <Route path="/tambahSiswaWirausaha/:id" exact>
          <TambahSiswaWirausahaSecond />
        </Route>
        <Route path="/dataSiswa/tambahSiswa/tambahSiswaWirausaha">
          <TambahSiswaWirausahaThird />
        </Route>
        <Route path="/dataSiswaWirausaha/editSiswaWirausaha/:id" exact>
          <EditSiswaWirausaha />
        </Route>

        <Route path="/dataSiswaMenganggur" exact>
          <DataSiswaMenganggur />
        </Route>

        <Route path="/formSiswa">
          <FormSiswa />
        </Route>
        <Route path="/formKuliah">
          <FormKuliah />
        </Route>
        <Route path="/halamanEditSiswa/formKuliah/:id" exact>
          <FormKuliahSecond />
        </Route>
        <Route path="/formKerja">
          <FormKerja />
        </Route>
        <Route path="/halamanEditSiswa/formKerja/:id" exact>
          <FormKerjaSecond />
        </Route>
        <Route path="/formWirausaha">
          <FormWirausaha />
        </Route>
        <Route path="/halamanEditSiswa/formWirausaha/:id" exact>
          <FormWirausahaSecond />
        </Route>
        <Route path="/formKuliahDanKerja">
          <FormKuliahDanKerja />
        </Route>
        <Route path="/halamanEditSiswa/formKuliahDanKerja/:id" exact>
          <FormKuliahDanKerjaSecond />
        </Route>
        
        <Route>
          <Template>
            <Switch>
              <Route path="/mainPage">
                <MainPage />
              </Route>
              <Route path="/halamanEditSiswa/:id">
                <HalamanEditSiswa />
              </Route>
              <Route path="/halamanEditSiswaKuliah/:id">
                <HalamanEditSiswaKuliah />
              </Route>
              <Route path="/halamanEditSiswaKerja/:id">
                <HalamanEditSiswaKerja />
              </Route>
              <Route path="/halamanEditSiswaKuliahDanKerja/:id">
                <HalamanEditSiswaKuliahDanKerja />
              </Route>
              <Route path="/halamanEditSiswaWirausaha/:id">
                <HalamanEditSiswaWirausaha />
              </Route>
              <Route path="/ubahPassword/:id" exact>
                <UbahPassword />
              </Route>
            </Switch>
          </Template>
        </Route>
     </Switch>
  );
}

export default App;
