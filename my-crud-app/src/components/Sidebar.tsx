import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} style={{ fontSize: 24 }}>
        ☰
      </button>
      {isOpen && (
        <div style={{ marginTop: 10 }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/mahasiswa">Mahasiswa</Link></li>
            <li><Link to="/dosen">Dosen</Link></li>
            <li><Link to="/matakuliah">Mata Kuliah</Link></li>
            <li><Link to="/kelas">Kelas</Link></li>
            <li><Link to="/transaksi">Transaksi</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
