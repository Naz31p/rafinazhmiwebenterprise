import { useEffect, useState } from 'react';
import supabase from "../utils/supabase";

type Relasi = {
  id: number;
  mahasiswa_id: number;
  module_id: number;
};

export default function MahasiswaModulPage() {
  const [relasi, setRelasi] = useState<Relasi[]>([]);

  useEffect(() => {
    supabase.from('mahasiswa_module').select('*').then(({ data }) => {
      setRelasi(data || []);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Relasi Mahasiswa - Modul</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Mahasiswa ID</th>
            <th className="border p-2">Module ID</th>
          </tr>
        </thead>
        <tbody>
          {relasi.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.mahasiswa_id}</td>
              <td className="border p-2">{item.module_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}