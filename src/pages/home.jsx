import React, { useState, useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';
import {
  Page,
  Navbar,
  NavTitle,
  List,
  Row,
  Col,
  Button,
  ListInput,
  f7,
} from 'framework7-react';
import axios from 'axios';
import { pdf } from '../pdf';

const HomePage = ({ f7router }) => {
  const url = 'https://cuti-express-js-mongo-atlas.vercel.app';
  const [cetak, setcetak] = useState(false);
  const [datacetak, setdatacetak] = useState({});
  const [codeUid, setCodeUid] = useState({
    code : 0,
    uid : 0,
    keperluan : '',
    dateStr : '',
    date: 0,
  });
  const [hasil, setHasil] = useState({ data : {
    nama: '',
    bagian : '',
    cuti : 0
  }
  });
  const inputCodeUid = (e) => {
    const { name, value} = e.target;
    setCodeUid(codeUid => ({...codeUid, [name] : value}));
  }
  const inputTanggal = (e) => {
    const data = e.toString().split(' ');
    setCodeUid(codeUid => ({...codeUid, dateStr : `${data[2]}-${data[1]}-${data[3]}`}));
  }
  const kirim = () => {
    f7.dialog.preloader();
    if (codeUid.keperluan=='' || codeUid.dateStr===''){
      f7.dialog.close();
      return f7.dialog.alert('Cek form cuti');
    }
    const date1 = new Date();
    const data = {
      uid: codeUid.uid, 
      token: codeUid.code, 
      cuti : hasil.data.cuti,
      nama: hasil.data.nama, 
      bagian: hasil.data.bagian, 
      keperluan: codeUid.keperluan, 
      dateStr: codeUid.dateStr, 
      date: date1.getTime()
    }
    axios.post(url + '/tambahcuti', data)
    .then(async res => {
      f7.dialog.close();
      if (res.data.status==='Nocuti') {
        f7.dialog.alert('Cuti Habis')
      } else {
        setdatacetak(await res.data);
        setcetak(true);
      }
    })
    .catch(() => f7.dialog.alert('Cek Ulang'));
  }
  const [cantChange, setcantChange] = useState(false);
  const api = async () =>{
    await axios.get(url +'/datakaryawan/'+ codeUid.uid + '/' + codeUid.code)
    .then(async function (res) {
      f7.dialog.close();
      if (res.data.status=='failed') {
        setcantChange(false);
        f7.dialog.alert('Tidak ada data, silahkan minta ke admin');
      } else {
        setHasil(await res);
        setcantChange(true);
      }
    })
    .catch(function () {
      f7.dialog.close();
      setcantChange(false);
      // handle error
      f7.dialog.alert('Data salah atau Cek Koneksi');
    })
  }
  const cetakx = () => {
    pdf(datacetak);
  }
  useEffect(() => {
    if (codeUid.code.toString().split('').length == 4 && codeUid.uid.toString().split('').length > 5) {
      if (!cantChange) {
        setcantChange(true);
        f7.dialog.preloader();
        api(); 
      }
    }
  }, [codeUid]);
  const setStatusBarStyleLight = async () => {
    const plt = await Device.getInfo();
    if (plt.platform!=='web') {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({color : '#ffffff'}); 
    }
  };
  useEffect(() => {
    setStatusBarStyleLight();
  }, []);
  return(
    <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavTitle sliding>ACPIGS</NavTitle>
      </Navbar>
      {!cetak ?
      <>
        <List noHairlinesMd>
          <ListInput
              label="UID"
              type="number"
              name='uid'
              placeholder="Masukkan UID anda"
              onChange={inputCodeUid}
              disabled={cantChange}
          ></ListInput>
          <ListInput
            label="Kode"
            type="number"
            name='code'
            placeholder="Masukan kode 4 angka"
            onChange={inputCodeUid}
            disabled={cantChange}
          ></ListInput>
          <ListInput
            label="Nama"
            type="text"
            disabled={true}
            value={hasil.data.nama}
          ></ListInput>
          <ListInput
            label="Bagian"
            type="text"
            disabled={true}
            value={hasil.data.bagian}
          ></ListInput>
          <ListInput
            label="Tanggal"
            type="datepicker"
            placeholder="Tanggal cuti"
            name = 'dateStr'
            onCalendarChange={inputTanggal}
            calendarParams={{ dateFormat: 'dd M yyyy'}}
          ></ListInput>
          <ListInput
            label="Keperluan"
            name='keperluan'
            type="textarea"
            onChange={inputCodeUid}
            placeholder="Masukkan Keperluan Anda"
          ></ListInput>
          <ListInput
            label="Cuti ke"
            type="number"
            disabled={true}
            value={hasil.data.cuti + 1}
          ></ListInput>
        </List>
        <Row className='mbr-1'>
          <Col></Col>
          <Col><Button raised round bgColor='blue' color='white' onClick={kirim}>Send</Button></Col>
          <Col></Col>
        </Row>
      </> : 
      <>
        <Row className='mbr-1'>
          <Col className='successTC'>Sukses Kirim Form Cuti</Col>
        </Row>
        <Row className='mbr-1'>
          <Col></Col>
          <Col><Button raised round bgColor='blue' color='white' onClick={cetakx}>Cetak</Button></Col>
          <Col></Col>
        </Row>
      </> }
    </Page>
  )
};
export default HomePage;