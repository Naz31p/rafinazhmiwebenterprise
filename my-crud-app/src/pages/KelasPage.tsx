import { useEffect, useState } from 'react';
import supabase from "../utils/supabase";

type Kelas = {
  id: number;
  nama: string;
  ruangan: string;
};

export default function KelasPage() {
  const [kelas, setKelas] = useState<Kelas[]>([]);

  useEffect(() => {
    supabase.from('kelas').select('*').then(({ data }) => {
      setKelas(data || []);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Kelas</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Ruangan</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((kls) => (
            <tr key={kls.id}>
              <td className="border p-2">{kls.nama}</td>
              <td className="border p-2">{kls.ruangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}