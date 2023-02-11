import { collection, doc, getDoc, getDocFromCache, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { linkSync } from 'fs';
import React, { useState } from "react";
import { db } from '../config/firebase';
import CardC from './CardC';
import Select, { SingleValue } from 'react-select';
import uuid from 'react-uuid';

interface BioProps {
  venit: string,
  open: boolean,
}

const options = [
  { value: 'mancare', label: 'Mancare' },
  { value: 'bautura', label: 'Bautura' },
  { value: 'taxe', label: 'Taxe' },
  { value: 'cadouri', label: 'Cadouri' },
  { value: 'ingrijire', label: 'Ingrijire' },
  { value: 'transport', label: 'Transport' },
  { value: 'sanatate', label: 'Sanatate' },
  { value: 'altele', label: 'Altele' },
];

const Cheltuieli = () => {
  const u = localStorage.getItem('id');
  const [suma, setSuma] = useState('');
  const [observatii, setObservatii] = useState('');
  const [error, setError] = useState(0);
  const [categr, setCategr] = useState('');
  const [l, setl] = useState<string[]>([]);
  const list: any[] = []
  const veni: any[] = [];
  const list2: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | JSX.Element[] | null | undefined = []
  const [selectedOption, setSelectedOption] = useState(null);


  const q = query(collection(db, "cheltuieli"), where("idUser", "==", u));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      veni.push(doc.data());
    });
    for (var i = 0; i < veni.length; i++) {
      list.push([veni[i]['suma'].toString(), veni[i]['observatii'].toString(), veni[i]['categorie'].toString()])
    }

    setl(list)
  });


  const handleChange = (e: any) => {
    setCategr(e?.value)
  }

  const postCard = l.map((list1) => <CardC suma={list1[0].toString()} obs={list1[1].toString()} categorie={list1[2].toString()} culoare="red"/>)

  const addVenit = async (e: {
    [x: string]: any; preventDefault: () => void;
  }) => {
    e.preventDefault();
    e.target.reset();
    if(suma == '' || observatii == '' || categr == ''){
      setError(1);
    }else{
    setSelectedOption(null)
    await setDoc(doc(db, "cheltuieli", uuid()), {
      categorie: categr,
      idUser: u,
      observatii: observatii,
      suma: suma
    });
  }
  };


  return (
    <div className="center">
      <div className='formRegisterLogin'>
        <h5>Adaugare cheltuiala</h5>
        <form onSubmit={addVenit} id='formvenit'>
          <input
            type="text"
            placeholder="Suma"
            onChange={(e) => setSuma(e.target.value)}
          />
          <input
            type="text"
            placeholder="Observatii"
            onChange={(e) => setObservatii(e.target.value)}
          />
          <div className='select'>
            <Select onChange={(e) => handleChange(e)}
              defaultValue={selectedOption}
              placeholder='Selectati categorie'
              options={options}
            />
          </div>
          <br></br>
          <div className='center'>
            <button type="submit" className="btn red lighten-1 z-depth-0">Adauga cheltuiala</button>
            <br></br>
            {error == 1? <p>Va rugam completati toate datele!</p>:<p></p>}
          </div>
        </form>
      </div>
      <br></br>
      {
        postCard
      }
    </div>

  )
}

export default Cheltuieli