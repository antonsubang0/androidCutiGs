import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  BlockTitle,
  ListInput,
  f7
} from 'framework7-react';
import axios from 'axios';

const DaftarCuti = ({f7router}) =>{
  const url = 'https://cuti-express-js-mongo-atlas.vercel.app';
  const token = localStorage.getItem('token');
  const [dataApi, setdataApi] = useState({});
  const [daftarKaryawan, setdaftarKaryawan] = useState({});
  const api = async () => {
    await axios.get(url + '/', { headers: { authorization: 'AuthStr ' + token }})
    .then((res)=>{
      f7.dialog.close();
      if (res.data.status=='expired') {
        localStorage.removeItem('token');
        f7router.navigate('/catalog/');
      } else {
        const data = res.data.sort(function(a, b) { return b.date - a.date })
        setdaftarKaryawan(data); setdataApi(data);
      }
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
      <Navbar title="Daftar Cuti" backLink="Back"></Navbar>
      <BlockTitle>Daftar Cuti</BlockTitle>
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
              text={`Cuti ${data.cuti} (${data.dateStr})`}
            ></ListItem>
          )
        }) : null }
      </List>
    </Page>
)};

export default DaftarCuti;
