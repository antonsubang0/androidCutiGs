import React, { useEffect, useState } from 'react';
import { Page, Navbar, List, ListItem, Icon, ListInput, Button, Row, Col, f7 } from 'framework7-react';
import axios from 'axios';

const KaryawanD = ({f7router}) => {
  const url = 'https://cuti-express-js-mongo-atlas.vercel.app';
  const token = localStorage.getItem('token');
  const [dataApi, setdataApi] = useState({});
  const [daftarKaryawan, setdaftarKaryawan] = useState({});
  const api = async () => {
    await axios.get(url + '/data', { headers: { authorization: 'AuthStr ' + token }})
    .then((res)=>{
      f7.dialog.close();
      if (res.data.status=='expired') {
        localStorage.removeItem('token');
        f7router.navigate('/catalog/');
      } else {
        const dataxxx= res.data.sort((a,b)=> {
          if (a.nama < b.nama)
            return -1;
          if (a.nama > b.nama)
            return 1;
          return 0;
        });
        setdaftarKaryawan(dataxxx); setdataApi(dataxxx);
      }
    });
  }
  const editxxx = (e) => {
    const dataxxx = e;
    f7.dialog.prompt('Bagian :', async function (bagian) {
      f7.dialog.progress();
      await axios.post(url + '/updatebagian', {uid : dataxxx.uid , bagian: bagian}, { headers: { authorization: 'AuthStr ' + token }})
      .then((res)=>{
        if (res.data.status==='expired') {
          f7.dialog.close();
          localStorage.removeItem('token');
          f7router.navigate('/catalog/');
        } else {
          api();
        }
      })
      .catch(()=>{
        f7.dialog.close();
        f7.dialog.alert('Gagal Menghapus.');
      });
    });
  }
  const deleteXXX = (e) => {
    const dataxxx = e;
    f7.dialog.confirm('Benar kamu mau menghapus?', async function () {
      f7.dialog.progress();
      await axios.post(url + '/deletekar', dataxxx, { headers: { authorization: 'AuthStr ' + token }})
      .then((res)=>{
        if (res.data.status==='expired') {
          localStorage.removeItem('token');
          f7router.navigate('/catalog/');
        } else {
          api();
        }
      })
      .catch(()=>{
        f7.dialog.close();
        f7.dialog.alert('Gagal Menghapus.');
      });
    });
  }
  const inputHandle = (e) =>{
    setdaftarKaryawan(dataApi.filter((data)=> {return data.nama.toLowerCase().includes(e.target.value.toLowerCase())}));
  }
  useEffect(()=>{
    f7.dialog.progress();
    if (!localStorage.getItem('token')) {
      f7router.navigate('/catalog/');
    }
    api();
  },[]);
  return (
    <Page name="form">
      <Navbar title="Daftar Karyawan" backLink="Back"></Navbar>
      <Row className='rownam'><Col></Col><Col><Button onClick={() => f7router.navigate('/tkaryawan/')} bgColor='blue' color='white'>Tambah</Button></Col><Col></Col></Row>
      <List noHairlinesMd className='inputCs'>
        <ListInput
          type="text"
          placeholder="Masukkan Nama Karyawan"
          clearButton
          onChange={(e)=> inputHandle(e)}
        />
      </List>
      <List mediaList className='listGM'>
        {daftarKaryawan.length > 0 ? daftarKaryawan.map((data, index)=>{
          return (
            <ListItem
              key={index}
              title={data.nama}
              after={data.uid}
              subtitle={data.bagian}
              text={`Cuti ${data.cuti}`}
            >
              <div className='updateXX' onClick={()=>editxxx(data)}><Icon f7="square_pencil" size="24px"></Icon></div>
              <div className='deleteXX' onClick={()=>deleteXXX(data)}><Icon f7="trash" size="24px"></Icon></div>
            </ListItem>
          )
        }) : null }
      </List>
    </Page>
  );
}

export default KaryawanD;
