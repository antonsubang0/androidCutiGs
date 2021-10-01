import React from 'react';
import { Link, Card } from 'framework7-react';

export default function MenuAdmin() {
  return (
    <>
    <Link href='/generate/' color='red'>
        <Card
        title="Generate Kode"
        content="Jika kita mengenerate sebuah kode pada daftar karyawan, maka kita sudah mengizinkan karyawan untuk cuti."
        ></Card>
      </Link>
      <Link href='/daftarcuti/'>
        <Card
        title="Daftar Cuti"
        content="Melihat semua daftar cuti karyawan mulai dari yang terdekat dengan tanggal sekarang."
        ></Card>
      </Link>
      <Link href='/karyawan/' color='teal'>
        <Card
        title="Karyawan"
        content="Menambah dan menghapus daftar Karyawan PT. Agape."
        ></Card>
      </Link>
    </>
  );
}
