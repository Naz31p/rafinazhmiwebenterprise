import { useEffect, useState } from 'react';
import supabase from "../utils/supabase";

type Modul = {
  id: number;
  nama: string;
  kode: string;
};

export default function ModulPage() {
  const [modul, setModul] = useState<Modul[]>([]);

  useEffect(() => {
    supabase.from('modul').select('*').then(({ data }) => {
      setModul(data || []);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Mata Kuliah</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kode</th>
          </tr>
        </thead>
        <tbody>
          {modul.map((mk) => (
            <tr key={mk.id}>
              <td className="border p-2">{mk.nama}</td>
              <td className="border p-2">{mk.kode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}