import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocFromCache, onSnapshot, query, where } from 'firebase/firestore';
import { PieChart } from 'react-minimal-pie-chart';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';
import store from '../stateManager/store';

const Home = () => {
  const [error, setError] = useState(false);
  const [nume, setNume] = useState(false);
  const [prenume, setPrenume] = useState(false);

  const [venitBursa, setVenitBursa] = useState(0);
  const [v, setV] = useState<any>([]);
  const [c, setC] = useState<any>([]);
  const [venitSalariu, setVenitSalariu] = useState(0);
  const [venitBonusuri, setVenitBonusuri] = useState(0);
  const [venitInvestitii, setVenitInvestitii] = useState(0);
  const [venitAltele, setVenitAltele] = useState(0);

  const [cheltuialaMancare, setCheltuialaMancare] = useState(0);
  const [cheltuialaBautura, setCheltuialaBautura] = useState(0);
  const [cheltuialaCadouri, setCheltuialaCadouri] = useState(0);
  const [cheltuialaTaxe, setCheltuialaTaxe] = useState(0);
  const [cheltuialaSanatate, setCheltuialaSanatate] = useState(0);
  const [cheltuialaTransport, setCheltuialaTransport] = useState(0);
  const [cheltuialaAltele, setCheltuialaAltele] = useState(0);
  const [cheltuialaIngrijire, setCheltuialaIngrijire] = useState(0);

  const navitage = useNavigate();
  const userLogat = auth.currentUser?.email;
  const id = auth.currentUser?.uid.toString();
  const venitUser: any[] = [];
  const cheltuieliUser: any[] = [];

  const user: any[] = [];
  const u = localStorage.getItem('email');
  const id_us = localStorage.getItem('id');
  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  const venit_data: any[]= [];
  const cheltuieli_data: any[]= [];

  const q1 = query(collection(db, "venituri"), where("idUser", "==", id_us));
  const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      venitUser.push(doc.data())
    });
    var sal = 0, bur = 0, inv = 0, alt = 0, bon = 0;
    for (var i = 0; i < venitUser.length; i++) {
       switch(venitUser[i]['categorie']){
        case 'salariu':
          sal = sal + parseInt(venitUser[i]['suma']);
          break;
        case 'bursa':
          bur = bur + parseInt(venitUser[i]['suma']);
          break;
        case 'investitii':
          inv = inv + parseInt(venitUser[i]['suma']);
          break;
        case 'altele':
          alt = alt + parseInt(venitUser[i]['suma']);
          break;
        case 'bonusuri':
          bon = bon + parseInt(venitUser[i]['suma']);
          break;
        default:
          break;
       }

    }
    setVenitSalariu(sal);
    setVenitAltele(alt);
    setVenitBonusuri(bon);
    setVenitBursa(bur);
    setVenitInvestitii(inv);
    if(sal != 0)
    {
      venit_data.push({ title: 'Salariu', value: venitSalariu, color: '#187d1a' });
    }
    if(alt != 0)
    {
      venit_data.push({ title: 'Altele', value: venitAltele, color: '#a4eba6' });
    }
    if(bon != 0)
    {
      venit_data.push({ title: 'Bonusuri', value: venitBonusuri, color: '#083b09' });
    }
    if(bur != 0)
    {
      venit_data.push({ title: 'Bursa', value: venitBursa, color: '#58a65a' });
    }
    if(inv != 0)
    {
      venit_data.push({ title: 'Investitii', value: venitInvestitii, color: '#7fd474' });
    }
    setV(venit_data)

  });


  const q11 = query(collection(db, "cheltuieli"), where("idUser", "==", id_us));
  const unsubscribe11 = onSnapshot(q11, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      cheltuieliUser.push(doc.data())
    });
    var man = 0, bau = 0, taxe = 0, cad = 0, altele = 0, ing = 0, trans = 0, san = 0;
    for (var i = 0; i < cheltuieliUser.length; i++) {
       switch(cheltuieliUser[i]['categorie']){
        case 'mancare':
          man = man + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'bautura':
          bau = bau + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'taxe':
          taxe = taxe + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'cadouri':
          cad = cad + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'altele':
          altele = altele + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'ingrijire':
          ing = ing + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'transport':
          trans = trans + parseInt(cheltuieliUser[i]['suma']);
          break;
        case 'sanatate':
          san = san + parseInt(cheltuieliUser[i]['suma']);
          break;
        default:
          break;
       }
    }
    setCheltuialaAltele(altele);
    setCheltuialaBautura(bau);
    setCheltuialaCadouri(cad);
    setCheltuialaIngrijire(ing);
    setCheltuialaMancare(man);
    setCheltuialaSanatate(san);
    setCheltuialaTaxe(taxe);
    setCheltuialaTransport(trans);
    if(altele != 0)
    {
      cheltuieli_data.push({ title: 'Altele', value: cheltuialaAltele, color: '#873a3a' });
    }
    if(bau != 0)
    {
      cheltuieli_data.push({ title: 'Bautura', value: cheltuialaBautura, color: '#de6262' });
    }
    if(cad != 0)
    {
      cheltuieli_data.push({ title: 'Cadouri', value: cheltuialaCadouri, color: '#eb3f3f' });
    }
    if(ing != 0)
    {
      cheltuieli_data.push({ title: 'Ingrijire', value: cheltuialaIngrijire, color: '#4ab53c' });
    }
    if(man != 0)
    {
      cheltuieli_data.push({ title: 'Mancare', value: cheltuialaMancare, color: '#b50e0e' });
    }
    if(san != 0)
    {
      cheltuieli_data.push({ title: 'Sanatate', value: cheltuialaSanatate, color: '#c92424' });
    }
    if(taxe != 0)
    {
      cheltuieli_data.push({ title: 'Taxe', value: cheltuialaTaxe, color: '#d64545' });
    }
    if(trans != 0)
    {
      cheltuieli_data.push({ title: 'Transport', value: cheltuialaTransport, color: '#801d1d' });
    }
    setC(cheltuieli_data);

  });


  const q = query(collection(db, "users"), where("email", "==", userLogat == undefined ? u : userLogat));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const user: any[] = [];
    querySnapshot.forEach((doc) => {
      user.push(doc.data());
    });
    if(user.length > 0){
      setNume(user[0]['nume']);
      setPrenume(user[0]['prenume']);
      localStorage.setItem("email", user[0]['email']);

    }
    
  });


  const functieLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      navitage("/")
      console.log('Signed Out');
      window.location.reload();

    }).catch((error) => {
      // An error happened.
      setError(true);
    });
  };


  return (
    <div className="center">

      <br></br>
      <div className='bine'>
        Bine ai venit, {nume} {prenume}!
      </div><br></br>
      <button onClick={functieLogout} className="btn green lighten-1 z-depth-0">Logout</button>
      <p>Statisticile contului tau:</p>
      {venitAltele == 0 && venitBonusuri == 0 && venitInvestitii == 0 && venitSalariu == 0 && venitBursa == 0 &&
      cheltuialaAltele == 0 && cheltuialaBautura == 0 && cheltuialaCadouri == 0 && cheltuialaIngrijire == 0
      && cheltuialaMancare == 0 && cheltuialaSanatate == 0 && cheltuialaTaxe == 0 && cheltuialaTransport == 0?
     <p>Nu aveti statistici de afisat!</p>:
      <div >
        <table className='center'>
          <tr>
          {venitAltele == 0 && venitBonusuri == 0 && venitInvestitii == 0 && venitSalariu == 0 && venitBursa == 0 ? <td id='pie'></td>:
            <td id='pie'>
              <PieChart
                data={v}
                style={
                  {
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                  }
                }
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              />
            </td>}
            {cheltuialaAltele == 0 && cheltuialaBautura == 0 && cheltuialaCadouri == 0 && cheltuialaIngrijire == 0
         && cheltuialaMancare == 0 && cheltuialaSanatate == 0 && cheltuialaTaxe == 0 && cheltuialaTransport == 0? <td id='pie'></td>:
            <td id='pie'>
              <PieChart
                data={c}
                style={
                  {
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                  }
                }
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              />
            </td>}
          </tr>
          <tr>
            <td className='center'>Venituri</td>
            <td className='center'>Cheltuieli</td>
          </tr>
        </table>
      </div>}

    </div>

  )
}

export default Home


