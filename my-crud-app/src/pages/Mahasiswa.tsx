import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

type MahasiswaData = {
  id: number;
  nama: string;
  nim: number;
  prodi: string;
};

const Mahasiswa = () => {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [message, setMessage] = useState<string>('');

  const [searchNama, setSearchNama] = useState('');
  const [searchResult, setSearchResult] = useState<MahasiswaData | null>(null);
  const [searchMessage, setSearchMessage] = useState('');

  const [editNama, setEditNama] = useState('');
  const [editNim, setEditNim] = useState('');
  const [editProdi, setEditProdi] = useState('');

  const navigate = useNavigate();

  const inputStyle = {
    display: 'block',
    marginBottom: '1rem',
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#6200ee',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '14px'
  };

  const handleTambah = async () => {
    if (!nama || !nim || !prodi) {
      setMessage('❌ Semua field harus diisi.');
      return;
    }

    const { error } = await supabase.from('mahasiswa').insert([
      { nama, nim: parseInt(nim), prodi }
    ]);

    if (error) {
      console.error(error);
      setMessage('❌ Gagal menambahkan data.');
    } else {
      setMessage('✅ Data berhasil ditambahkan.');
      setNama('');
      setNim('');
      setProdi('');
    }
  };

  const handleHapus = () => {
    setNama('');
    setNim('');
    setProdi('');
    setMessage('');
  };

  const handleCari = async () => {
    if (!searchNama) {
      setSearchMessage('❌ Masukkan Nama Mahasiswa.');
      return;
    }

    const { data, error } = await supabase
      .from('mahasiswa')
      .select('*')
      .ilike('nama', `%${searchNama}%`)
      .single();

    if (error || !data) {
      console.error(error);
      setSearchMessage('❌ Data tidak ditemukan.');
      setSearchResult(null);
    } else {
      setSearchResult(data);
      setSearchMessage('');
      setEditNama(data.nama);
      setEditNim(data.nim.toString());
      setEditProdi(data.prodi);
    }
  };

  const handleHapusPencarian = () => {
    setSearchNama('');
    setSearchResult(null);
    setSearchMessage('');
  };

  const handleUpdate = async () => {
    if (!searchResult) return;

    const { error } = await supabase
      .from('mahasiswa')
      .update({
        nama: editNama,
        nim: parseInt(editNim),
        prodi: editProdi
      })
      .eq('id', searchResult.id);

    if (error) {
      console.error(error);
      setSearchMessage('❌ Gagal update data.');
    } else {
      setSearchMessage('✅ Data berhasil diupdate.');
      setSearchResult({
        id: searchResult.id,
        nama: editNama,
        nim: parseInt(editNim),
        prodi: editProdi
      });
    }
  };

  const handleDelete = async () => {
    if (!searchResult) return;

    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus data mahasiswa "${searchResult.nama}"?`);
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('mahasiswa')
      .delete()
      .eq('id', searchResult.id);

    if (error) {
      console.error(error);
      setSearchMessage('❌ Gagal menghapus data.');
    } else {
      setSearchMessage('✅ Data berhasil dihapus.');
      setSearchResult(null);
      setSearchNama('');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      {/* Title + Back icon */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            fontSize: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          ←
        </button>
        <h1 style={{ margin: 0 }}>Mahasiswa</h1>
      </div>

      {/* Layout 2 kolom */}
      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        {/* Form Tambah Mahasiswa */}
        <div>
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value.replace(/\D/g, ''))}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Program Studi"
            value={prodi}
            onChange={(e) => setProdi(e.target.value)}
            style={inputStyle}
          />
          <div>
            <button onClick={handleTambah} style={buttonStyle}>Tambah</button>
            <button
              onClick={handleHapus}
              style={{ ...buttonStyle, backgroundColor: '#ccc', color: '#333' }}
            >
              Hapus
            </button>
          </div>
          {message && (
            <p style={{ color: message.includes('berhasil') ? 'green' : 'red', marginTop: '1rem' }}>
              {message}
            </p>
          )}
        </div>

        {/* Pencarian dan Edit Mahasiswa */}
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Cari Mahasiswa</h2>
          <input
            type="text"
            placeholder="Masukkan Nama Mahasiswa"
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
            style={inputStyle}
          />
          <div>
            <button onClick={handleCari} style={buttonStyle}>Cari</button>
            <button
              onClick={handleHapusPencarian}
              style={{ ...buttonStyle, backgroundColor: '#ccc', color: '#333' }}
            >
              Hapus
            </button>
          </div>

          {searchMessage && (
            <p style={{ color: searchMessage.includes('berhasil') ? 'green' : 'red', marginTop: '1rem' }}>
              {searchMessage}
            </p>
          )}

          {searchResult && (
            <div style={{ marginTop: '1.5rem' }}>
              <p><strong>ID:</strong> {searchResult.id}</p>
              <p><strong>Nama:</strong> {searchResult.nama}</p>
              <p><strong>NIM:</strong> {searchResult.nim}</p>
              <p><strong>Program Studi:</strong> {searchResult.prodi}</p>

              <h3 style={{ marginTop: '1rem' }}>Edit Data</h3>
              <input
                type="text"
                value={editNama}
                onChange={(e) => setEditNama(e.target.value)}
                style={inputStyle}
                placeholder="Nama"
              />
              <input
                type="text"
                value={editNim}
                onChange={(e) => setEditNim(e.target.value.replace(/\D/g, ''))}
                style={inputStyle}
                placeholder="NIM"
              />
              <input
                type="text"
                value={editProdi}
                onChange={(e) => setEditProdi(e.target.value)}
                style={inputStyle}
                placeholder="Program Studi"
              />
              <div>
                <button
                  onClick={handleUpdate}
                  style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={handleDelete}
                  style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                >
                  Hapus Data Mahasiswa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mahasiswa;
