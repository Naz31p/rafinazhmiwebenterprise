import { useNavigate } from 'react-router-dom';
import MahasiswaForm from '../components/MahasiswaForm';
import supabase from '../utilis/supabase';
import type { Mahasiswa } from '../types/Mahasiswa';

const AddMahasiswa = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: Mahasiswa) => {
    const { error } = await supabase.from('mahasiswa').insert([data]);
    if (!error) navigate('/');
    else alert('Gagal menyimpan: ' + error.message);
  };

  return <MahasiswaForm onSubmit={handleSubmit} />;
};

export default AddMahasiswa;
