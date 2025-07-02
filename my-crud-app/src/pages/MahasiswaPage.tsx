import { useEffect, useState } from 'react';
import supabase from "../utils/supabase";

type Mahasiswa = {
  id: number;
  nama: string;
  nim: string;
  email: string;
};

export default function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);

  const fetchData = async () => {
    const { data } = await supabase.from('mahasiswa').select('*');
    setMahasiswa(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Mahasiswa</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIM</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs) => (
            <tr key={mhs.id}>
              <td className="border p-2">{mhs.nama}</td>
              <td className="border p-2">{mhs.nim}</td>
              <td className="border p-2">{mhs.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}