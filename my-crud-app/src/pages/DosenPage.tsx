import { useEffect, useState } from 'react';
import supabase from "../utils/supabase";

type Dosen = {
  id: number;
  nama: string;
  nidn: string;
  email: string;
};

export default function DosenPage() {
  const [dosen, setDosen] = useState<Dosen[]>([]);

  useEffect(() => {
    supabase.from('dosen').select('*').then(({ data }) => {
      setDosen(data || []);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Dosen</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIDN</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {dosen.map((ds) => (
            <tr key={ds.id}>
              <td className="border p-2">{ds.nama}</td>
              <td className="border p-2">{ds.nidn}</td>
              <td className="border p-2">{ds.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}