import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  List,
  Row,
  Col,
  Button,
  ListInput,
  f7
} from 'framework7-react';
import axios from 'axios';
const DaftarKaryawan = ({f7router}) => {
  const url = 'https://cuti-express-js-mongo-atlas.vercel.app';
  const token = localStorage.getItem('token');
  const [DataX, setDataX] = useState({
    uid : 0,
    nama : '',
    bagian : '',
    cuti : 0
  });
  const inputCodeUid = (e) => {
    const { name, value} = e.target;
    if (name =='uid' | name =='cuti') {
      setDataX(DataX => ({...DataX, [name] : parseInt(value)}));
    } else {
      setDataX(DataX => ({...DataX, [name] : value}));
    }
  }
  const kirim = () => {
    if (DataX.uid.toString().split('').length < 6 || DataX.nama == ''|| DataX.bagian=='') {
      return f7.dialog.alert('Cek From');
    }
    f7.dialog.confirm('Benar kamu mau mengirim?', async function () {
      f7.dialog.progress();
      await axios.post(url + '/tambahkaryawan', DataX, { headers: { authorization: 'AuthStr ' + token }})
      .then((res)=>{
        f7.dialog.close();
        if (res.data.status==='expired') {
          localStorage.removeItem('token');
          f7router.navigate('/catalog/');
        } else {
          f7.dialog.alert('Berhasil ditambahkan.');
          setTimeout(()=>{
            f7router.navigate('/catalog/');
          }, 2000);
        }
      })
      .catch(()=>{
        f7.dialog.alert('Gagal Tambah Karyawan')
      }); 
    })
  }
  return(
    <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false} backLink='Back'>
        <NavTitle sliding>Tambah Karyawan</NavTitle>
      </Navbar>
      <List noHairlinesMd>
      <ListInput
          label="UID"
          type="number"
          name='uid'
          placeholder="Masukkan UID anda"
          onChange={inputCodeUid}
        ></ListInput>
        <ListInput
          label="Nama"
          type="text"
          name='nama'
          placeholder='Masukkan Nama'
          onChange={inputCodeUid}
        ></ListInput>
        <ListInput
          label="Bagian"
          type="text"
          name='bagian'
          placeholder='Masukkan Bagian'
          onChange={inputCodeUid}
        ></ListInput>
        <ListInput
          label="Cuti"
          type="number"
          name='cuti'
          placeholder='Masukan Cuti'
          onChange={inputCodeUid}
        ></ListInput>
      </List>
      <Row className='mbr-1'>
        <Col></Col>
        <Col><Button raised round bgColor='blue' color='white' onClick={kirim}>Send</Button></Col>
        <Col></Col>
      </Row>
    </Page>
  )
};
export default DaftarKaryawan;