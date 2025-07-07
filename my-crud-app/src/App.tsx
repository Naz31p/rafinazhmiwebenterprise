// File: src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UserRegister from "./pages/UserRegister";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mahasiswa from "./pages/Mahasiswa";
import Dosen from "./pages/Dosen";
import MataKuliah from "./pages/Matakuliah";
import Kelas from "./pages/Kelas";
import Transaksi from "./pages/Transaksi";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/home" element={<Home />} />
           <Route path="/mahasiswa" element={<Mahasiswa />} />
        <Route path="/dosen" element={<Dosen />} />
        <Route path="/matakuliah" element={<MataKuliah />} />
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/transaksi" element={<Transaksi/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
