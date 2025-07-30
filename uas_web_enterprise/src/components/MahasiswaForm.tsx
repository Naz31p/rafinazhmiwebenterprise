import { useState } from 'react';
import type { Mahasiswa } from '../types/Mahasiswa';

type Props = {
  initialData?: Mahasiswa;
  onSubmit: (data: Mahasiswa) => void;
};

const MahasiswaForm = ({ initialData, onSubmit }: Props) => {
  const [form, setForm] = useState<Mahasiswa>(
    initialData || {
      NIM: '',
      Name: '',
      Gender: 'L',
      BirthDate: '',
      Address: '',
      Contact: '',
      Status: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }) as Mahasiswa);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input name="NIM" value={form.NIM} onChange={handleChange} placeholder="NIM" required />
      <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" required />
      <select name="Gender" value={form.Gender} onChange={handleChange}>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
      <input type="date" name="BirthDate" value={form.BirthDate} onChange={handleChange} required />
      <input name="Address" value={form.Address} onChange={handleChange} placeholder="Address" />
      <input name="Contact" value={form.Contact} onChange={handleChange} placeholder="Contact" />

      <label>
        Aktif:{' '}
        <input
          type="checkbox"
          name="Status"       // <- perbaikan di sini
          checked={form.Status}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Simpan</button>
    </form>
  );
};

export default MahasiswaForm;