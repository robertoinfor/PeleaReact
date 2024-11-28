import React, { useState } from 'react'
import './App.css'
import Character from "./Components/Personaje"
import Vidas from './Components/Vidas';
import winnerIcon from './assets/images/winner.png';

function App() {
  const agathaStats = [
    { label: "Magia", value: 90 },
    { label: "Poder", value: 75 },
    { label: "Sabiduría", value: 100 }
  ];

  const wandaStats = [
    { label: "Magia", value: 100 },
    { label: "Poder", value: 90 },
    { label: "Sabiduría", value: 30 }
  ];

  const [disciplina, disciplinaChoosen] = useState('')
  const [indice, indiceDisciplina] = useState('')

  const [isPeleaChosen, setIsPeleaChosen] = useState(false);
  const [isDisciplinaChosen, setIsDisciplinaChosen] = useState(true);

  const chooseDisciplina = () => {
    const random = Math.floor(Math.random() * 3)
    const dis = agathaStats[random].label
    disciplinaChoosen(dis)
    indiceDisciplina(random)
    setIsDisciplinaChosen(false)
    setIsPeleaChosen(true)
  }

  const [agatha, setAgatha] = useState('');
  const [wanda, setWanda] = useState('');


  const [wandalives, setWandaLives] = useState(3)
  const [agathalives, setAgathaLives] = useState(3)

  const getValue = () => {
    const ranAgatha = Math.floor(Math.random() * 101);
    const valAgatha = ranAgatha + agathaStats[indice].value;
    setAgatha("<i>Agatha</i> <br/>" + disciplina + ": " +
      agathaStats[indice].value + "<br/> Valor aleatorio: "
      + ranAgatha + "<br/> Total: " + valAgatha);

    const ranWanda = Math.floor(Math.random() * 101);
    const valWanda = ranWanda + wandaStats[indice].value;
    setWanda("<i>Wanda</i> <br/>" + disciplina + ": "
      + wandaStats[indice].value + "<br/> Valor aleatorio: "
      + ranWanda + "<br/> Total: " + valWanda);

    if (valAgatha > valWanda) {
      setWandaLives(wandalives - 1)
    }
    else if (valWanda > valAgatha) {
      setAgathaLives(agathalives - 1)
    }

    if (agathalives == 0 || wandalives == 0) {
      setIsDisciplinaChosen(true)
      setIsPeleaChosen(true)
    } else {
      setIsDisciplinaChosen(true)
      setIsPeleaChosen(false)
    }
  }

  let wandawin = null;

  if (agathalives == 0) {
    wandawin = <img src={winnerIcon} alt="Winner" className="winner-img wanda-winner" />
  }

  let agathawin = null;

  if (wandalives == 0) {
    agathawin = <img src={winnerIcon} alt="Winner" className="winner-img agatha-winner" />
  }

  const restartValues = () => {
    disciplinaChoosen()
    indiceDisciplina()
    setAgatha()
    setWanda()
    setWandaLives(3)
    setAgathaLives(3)
    setIsDisciplinaChosen(true)
    setIsPeleaChosen(false)
  }

  return (
    <div className="container">
      <div className="main-content">
        <div className="left-side">
          <Vidas lives={agathalives} character="Agatha" />
          <div className="winner">
            {agathawin}
          </div>
          <div className="character">
            <Character
              name="Agatha Harkness"
              image="./src/assets/images/agatha.png"
              stats={agathaStats}
            />
          </div>
        </div>

        <div className="center">
          <h2>Disciplina:
            <br />
            {disciplina}
          </h2>
          <div className="status-container">
            <div className='status-part'>
              <h3 dangerouslySetInnerHTML={{ __html: agatha }} />
            </div>
            <div className="status-part">
              <h3 dangerouslySetInnerHTML={{ __html: wanda }} />
            </div>
          </div>
          <div className="actions">
            <button className="action-btn" onClick={chooseDisciplina} disabled={isPeleaChosen}>
              Disciplina
            </button>
            <button className="action-btn" onClick={getValue} disabled={isDisciplinaChosen}>
              Pelea
            </button>
            <button className="action-btn" onClick={(restartValues)}>
              Reiniciar
            </button>
          </div>
        </div>

        <div className="right-side">
          <div className="life-container">
            <Vidas lives={wandalives} character="Agatha" />
            <div className="winner">
              {wandawin}
            </div>
          </div>
          <div className="character">
            <Character
              name="Wanda Maximoff"
              image="./src/assets/images/wanda.png"
              stats={wandaStats}
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;