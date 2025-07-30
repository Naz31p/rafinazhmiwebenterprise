// File: src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MahasiswaList from './components/MahasiswaList';
import AddMahasiswa from './pages/AddMahasiswa';
import EditMahasiswa from './pages/EditMahasiswa';
import ViewMahasiswa from './pages/ViewMahasiswa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MahasiswaList />} />
        <Route path="/add" element={<AddMahasiswa />} />
        <Route path="/edit/:id" element={<EditMahasiswa />} />
        <Route path="/view/:id" element={<ViewMahasiswa />} />
      </Routes>
    </Router>
  );
}

export default App;
