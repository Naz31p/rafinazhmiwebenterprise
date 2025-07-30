import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utilis/supabase';
import type { Mahasiswa } from '../types/Mahasiswa';

const MahasiswaList = () => {
  const [data, setData] = useState<Mahasiswa[]>([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('mahasiswa').select('*');
    if (!error && data) setData(data);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await supabase.from('mahasiswa').delete().eq('id', id);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h2>List Mahasiswa</h2>
      <Link to="/add">Tambah Mahasiswa</Link>
      <table>
        <thead>
          <tr>
            <th>NIM</th><th>Name</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((m) => (
            <tr key={m.id}>
              <td>{m.NIM}</td><td>{m.Name}</td>
              <td>
                <Link to={`/view/${m.id}`}>Detail</Link> |{' '}
                <Link to={`/edit/${m.id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(m.id)}>Hapus</button>
              </td>
            </tr>
          )) : <tr><td colSpan={3}>Belum ada data</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaList;
