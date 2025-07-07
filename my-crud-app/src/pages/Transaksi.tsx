import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

type Mahasiswa = {
  id: string;
  nama: string;
  nim: number;
  prodi: string;
};

type MataKuliah = {
  id: string;
  nama: string;
};

const Transaksi = () => {
  const [namaCari, setNamaCari] = useState('');
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
  const [mataKuliahList, setMataKuliahList] = useState<MataKuliah[]>([]);
  const [selectedMatkulId, setSelectedMatkulId] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Ambil semua mata kuliah saat halaman dimuat
  useEffect(() => {
    const fetchMataKuliah = async () => {
      const { data, error } = await supabase.from('mata_kuliah').select('*');
      if (error) {
        console.error('Gagal mengambil data mata kuliah:', error);
      } else {
        setMataKuliahList(data);
      }
    };

    fetchMataKuliah();
  }, []);

  const handleCariMahasiswa = async () => {
    if (!namaCari) {
      setMessage('❌ Masukkan nama mahasiswa.');
      return;
    }

    const { data, error } = await supabase
      .from('mahasiswa')
      .select('*')
      .ilike('nama', `%${namaCari}%`)
      .single();

    if (error || !data) {
      console.error(error);
      setMahasiswa(null);
      setMessage('❌ Mahasiswa tidak ditemukan.');
    } else {
      setMahasiswa(data);
      setMessage('');
    }
  };

  const handleTambahMataKuliah = async () => {
    if (!mahasiswa || !selectedMatkulId) {
      setMessage('❌ Pilih mahasiswa dan mata kuliah terlebih dahulu.');
      return;
    }

    const { error } = await supabase.from('enrollments').insert([
      {
        mahasiswa_id: mahasiswa.id,
        mata_kuliah_id: selectedMatkulId,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage('❌ Gagal menambahkan mata kuliah.');
    } else {
      setMessage('✅ Mata kuliah berhasil ditambahkan untuk mahasiswa.');
      setSelectedMatkulId('');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            fontSize: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          ←
        </button>
        <h1 style={{ margin: 0 }}>Transaksi</h1>
      </div>

      {/* Cari Mahasiswa */}
      <input
        type="text"
        placeholder="Cari nama mahasiswa"
        value={namaCari}
        onChange={(e) => setNamaCari(e.target.value)}
        style={{
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '300px',
          marginBottom: '1rem',
        }}
      />
      <button
        onClick={handleCariMahasiswa}
        style={{
          marginLeft: '10px',
          padding: '0.75rem 1.2rem',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
        }}
      >
        Cari
      </button>

      {/* Hasil Mahasiswa */}
      {mahasiswa && (
        <div style={{ marginTop: '1.5rem' }}>
          <p><strong>Nama:</strong> {mahasiswa.nama}</p>
          <p><strong>NIM:</strong> {mahasiswa.nim}</p>
          <p><strong>Prodi:</strong> {mahasiswa.prodi}</p>

          {/* Pilih Mata Kuliah */}
          <div style={{ marginTop: '1rem' }}>
            <select
              value={selectedMatkulId}
              onChange={(e) => setSelectedMatkulId(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '300px',
                marginBottom: '1rem',
              }}
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliahList.map((matkul) => (
                <option key={matkul.id} value={matkul.id}>
                  {matkul.nama}
                </option>
              ))}
            </select>

            <button
              onClick={handleTambahMataKuliah}
              style={{
                marginLeft: '10px',
                padding: '0.75rem 1.2rem',
                borderRadius: '8px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
              }}
            >
              Tambah
            </button>
          </div>
        </div>
      )}

      {message && (
        <p style={{ color: message.includes('berhasil') ? 'green' : 'red', marginTop: '1rem' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Transaksi;