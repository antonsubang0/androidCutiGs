import React, { useEffect, useState } from 'react';
import { Page, Navbar, Link, Card, f7 } from 'framework7-react';
import axios from 'axios';
import Login from '../components/login';
import MenuAdmin from '../components/menuAdmin';

const CatalogPage = () => {
  const url = 'https://cuti-express-js-mongo-atlas.vercel.app';
  // FormLogin
  const [halamanLogin, sethalamanLogin] = useState(true);
  const [notifikasi, setnotifikasi] = useState('');
  const [nilaiInput, setnilaiInput] = useState({
    email : '',
    password : '',
  });
  const eventInput = (e) => {
    const { name , value } = e.target;
    setnilaiInput({...nilaiInput, [name] : value});
  }
  const login = () => {
    f7.dialog.preloader();
    axios.post(url + '/login',nilaiInput).then((res) => {
      f7.dialog.close();
      if (res.data.status=='success') {
        localStorage.setItem('token', res.data.token);
        sethalamanLogin(false);
      } else {
        setnotifikasi('Gagal Login');
      }
    }).catch(()=>{
      f7.dialog.close();
      setnotifikasi('Periksa Jaringan');
    })
  }
  useEffect(()=>{
    if(localStorage.getItem('token')) {
      sethalamanLogin(false);
    }
  }, []);

  return (
    <Page name="catalog">
      <Navbar title="Administrator" />
      {halamanLogin ? <Login notif={notifikasi} inputUP={eventInput} sumbitX={login}  /> : <MenuAdmin />}
      
    </Page>
  );
}

export default CatalogPage;
