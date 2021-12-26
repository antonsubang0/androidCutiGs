import React from 'react';
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';
import axios from 'axios';
import URL from '../js/url';

const LoginFix = ({f7router}) => {
  const [input, setInput] = React.useState({
    uid : '',
    password : '',
  });
  const [peringatan, setPeringatan] = React.useState('');
  const typeHandle = (e) => {
    setInput({...input, [e.target.name] : e.target.value})
  };
  const LogingAct = (e) => {
    axios.post(URL + '/login',input).then(async (e)=>{
      if (e.data.status==='failed') {
        setPeringatan('UID dan Sandi tidak cocok...')
      } else {
        await localStorage.setItem('token', e.data.token);
        await localStorage.setItem('role', e.data.role);
        f7router.navigate('/homefix/');
      }
    }).catch((e)=>{console.log(e)});
  }
  const loginstate = async() => {
    const token = await localStorage.getItem('token');
    if (token) {
      axios.get(URL + '/user/profile', { headers: { authorization: 'AuthStr ' + token }}).then((res)=> {
        console.log(res.data.status);
        if (res.data.status !=='expired' || res.data.status !=='failed') {
          f7router.navigate('/homefix/');
        }
      })   
    }
  }
  React.useEffect(()=>{
    loginstate();
    const tabs = document.querySelector('.toolbar.tabbar.toolbar-bottom.tabbar-labels');
    tabs.style.display='none';
  }, []);
  return (
    <Page loginScreen>
      <div className='svgLogin0'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,320L24,277.3C48,235,96,149,144,122.7C192,96,240,128,288,138.7C336,149,384,139,432,128C480,117,528,107,576,112C624,117,672,139,720,154.7C768,171,816,181,864,176C912,171,960,149,1008,144C1056,139,1104,149,1152,160C1200,171,1248,181,1296,165.3C1344,149,1392,107,1416,85.3L1440,64L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
      </div>
      <LoginScreenTitle>Login</LoginScreenTitle>
      <List className='logincss'>
        <ListInput
          type="number"
          name="uid"
          placeholder="UID kamu"
          onChange={(e)=> {typeHandle(e)}}
        ></ListInput>
        <ListInput
          type="password"
          name="password"
          placeholder="Password kamu"
          onChange={(e)=> {typeHandle(e)}}
        ></ListInput>
      </List>
      <List>
        <ListButton title="Login" onClick={(e)=> LogingAct(e)} />
        {peringatan === '' ? 
          (<BlockFooter>
            Silahkan masuk untuk mendapatkan informasi dan pengajuan terkait dengan info karyawan.
          </BlockFooter>) :
          (<BlockFooter className='text-red'>
            {peringatan}
          </BlockFooter>) 
        }
      </List>
      <div className='svgLogin1'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,224L24,213.3C48,203,96,181,144,149.3C192,117,240,75,288,74.7C336,75,384,117,432,154.7C480,192,528,224,576,202.7C624,181,672,107,720,64C768,21,816,11,864,53.3C912,96,960,192,1008,213.3C1056,235,1104,181,1152,144C1200,107,1248,85,1296,80C1344,75,1392,85,1416,90.7L1440,96L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
      </div>
    </Page>
  )
};

export default LoginFix;
