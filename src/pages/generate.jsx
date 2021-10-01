import React, { useEffect, useState } from 'react';
import { Share } from '@capacitor/share';
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
import { interstitial } from '../admob';

const GenerateKodeList = ({f7router}) =>{
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
        interstitial();
      }
    });
  }
  const generateCutiAct = async(e) => {
    f7.dialog.progress();
    await axios.post(url + '/generatecuti', {uid : e.uid}, { headers: { authorization: 'AuthStr ' + token }})
    .then(async (res)=>{
      f7.dialog.close();
      if (res.data.status==='expired') {
        localStorage.removeItem('token');
        f7router.navigate('/catalog/');
      } else {
        await Share.share({
          title: 'Kode Cuti',
          text: `UID : ${res.data.uid}, Nama : ${e.nama}, Kode : ${res.data.code}. Data tersebut jangan disebarluaskan karena hanya berlaku 1x dan memiliki tenggang selama 12 jam.`,
          dialogTitle: 'Share Kode Cuti',
        });
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
      <Navbar title="Generate Kode" backLink="Back"></Navbar>
      <BlockTitle>Generate dari daftar</BlockTitle>
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
              onClick={()=>generateCutiAct(data)}
            ></ListItem>
          )
        }) : null }
      </List>
    </Page>
)};

export default GenerateKodeList;
