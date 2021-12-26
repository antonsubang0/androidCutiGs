import React from 'react';
import { Page, Icon } from 'framework7-react';
import axios from 'axios';
import URL from '../js/url';
import { data } from 'dom7';

const HomeFix = ({f7router}) => {
    const [dataUser, setDataUser] = React.useState({
        nama: 'Tunggu...',
        uid : 0,
        role: 0,
        bagian: 'tunggu...',
        cuti: 0,
    });
    const [gajian , setGajian] = React.useState([]);
    const convertToRupiah = (angka) => {
        let rupiah = '';		
        let angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
    const fetching = async() => {
        const token = await localStorage.getItem('token');
        if (token) {
            axios.get(URL + '/user/profile', { headers: { authorization: 'AuthStr ' + token }}).then(async(res)=> {
                console.log(res.data);
                if (res.data.status==='expired') {
                    await localStorage.removeItem('token');
                    await localStorage.removeItem('role');
                    f7router.navigate('/');
                } else if (res.data.status==='failed') {
                    await localStorage.removeItem('token');
                    await localStorage.removeItem('role');
                    f7router.navigate('/');
                } else {
                    await setDataUser(res.data);
                    axios.get(URL + '/user/dgaji', { headers: { authorization: 'AuthStr ' + token }}).then(async(res1)=> {
                        setGajian(res1.data);
                    })
                    // nanti dihapus
                    axios.get(URL + '/user/dcuti', { headers: { authorization: 'AuthStr ' + token }}).then(async(res)=> {
                        console.log(res);
                    })
                }
            }).catch(async()=>{
                await localStorage.removeItem('token');
                await localStorage.removeItem('role');
                f7router.navigate('/');
            });   
        } else {
            await localStorage.removeItem('token');
            await localStorage.removeItem('role');
            f7router.navigate('/');
        }
    }
    React.useEffect(()=>{
        fetching();
        document.querySelector('.toolbar.tabbar.toolbar-bottom.tabbar-labels').style.display='block';
    },[]);
    return (
        <Page>
            <div className='svgLogin'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#258" fillOpacity="1" d="M0,320L24,277.3C48,235,96,149,144,122.7C192,96,240,128,288,138.7C336,149,384,139,432,128C480,117,528,107,576,112C624,117,672,139,720,154.7C768,171,816,181,864,176C912,171,960,149,1008,144C1056,139,1104,149,1152,160C1200,171,1248,181,1296,165.3C1344,149,1392,107,1416,85.3L1440,64L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
            </div>
            <div className='contenthome'>
                <div className='cardHomeInfo'>
                    <div className='Infonama'>{dataUser.nama}</div>
                    <div className='Infodetail'>UID : <span>{dataUser.uid}</span></div>
                    <div className='Infodetail'>Status : <span>{dataUser.role === 0 ? 'User' : 'Admin'}</span></div>
                    <div className='Infodetail'>Bagian : <span>{dataUser.bagian}</span></div>
                    <div className='Infodetail'>Jumlah Cuti : <span>{dataUser.cuti}</span></div>
                </div>
            </div>
            <div className='cutiHome'>
                <div className='cardHomeInfo1'>
                    <Icon f7="text_badge_plus" size="50px" color="white"></Icon>
                    <div className='subjudulhome'>Form Cuti</div>
                </div>
                <div className='cardHomeInfo1'>
                    <Icon f7="text_badge_checkmark" size="50px" color="white"></Icon>
                    <div className='subjudulhome'>Daftar Cuti</div>
                </div>
            </div>
            <div className='cardHomeInfo2'>
                <div className='cardGaji'>Daftar Gaji</div>
                {gajian.length > 0 ? gajian.map((data, index) => 
                (<div className='flexlisthome' key={index}><div className='Infodetail'>{data.blngaji} :</div><div className='Infodetail'>{convertToRupiah(data.gaji)}</div></div>)) : 
                (<div className='flexlisthome'><div className='Infodetail'>Tidak ada data...</div></div>) }
            </div>
        </Page>
    )
};

export default HomeFix;
