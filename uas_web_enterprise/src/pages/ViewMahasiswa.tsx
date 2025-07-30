// File: src/pages/ViewMahasiswa.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../utilis/supabase';
import type { Mahasiswa } from '../types/Mahasiswa';

const ViewMahasiswa = () => {
  const { id } = useParams();
  const [data, setData] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      const { data, error } = await supabase.from('mahasiswa').select('*').eq('id', id).single();
      if (data) setData(data);
    };
    fetchMahasiswa();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="list-container">
      <h2>Detail Mahasiswa</h2>
      <p><strong>NIM:</strong> {data.NIM}</p>
      <p><strong>Nama:</strong> {data.Name}</p>
      <p><strong>Gender:</strong> {data.Gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
      <p><strong>Tanggal Lahir:</strong> {data.BirthDate}</p>
      <p><strong>Alamat:</strong> {data.Address}</p>
      <p><strong>Kontak:</strong> {data.Contact}</p>
      <p><strong>Status:</strong> {data.Status ? 'Aktif' : 'Tidak Aktif'}</p>
      <Link to="/">Kembali</Link>
    </div>
  );
};

export default ViewMahasiswa;
