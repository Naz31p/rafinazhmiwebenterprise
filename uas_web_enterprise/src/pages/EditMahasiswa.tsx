// File: src/pages/EditMahasiswa.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MahasiswaForm from '../components/MahasiswaForm';
import supabase from '../utilis/supabase';
import  type { Mahasiswa } from '../types/Mahasiswa';

const EditMahasiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      const { data, error } = await supabase.from('mahasiswa').select('*').eq('id', id).single();
      if (data) setInitialData(data);
    };
    fetchMahasiswa();
  }, [id]);

  const handleSubmit = async (data: Mahasiswa) => {
    await supabase.from('mahasiswa').update(data).eq('id', id);
    navigate('/');
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <MahasiswaForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditMahasiswa;
