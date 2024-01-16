import './App.css'
import BusinessCard from './components/BusinessCard'
import UserForm from './components/UserForm'
import {useEffect, useState} from 'react'

function App() {
  const [businessCards, setBusinessCards] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/cards')
      .then(async (response) => {
        const res = await response.json();
        await setBusinessCards([...res.cards])
      })
  }, [])

  return (
    <div className='container'>
      <div className='form'>
        <UserForm businessCards={businessCards} setBusinessCards={setBusinessCards} />
      </div>
      <div className='cards'>
        {businessCards && businessCards.map((businessCard, index) => (
          <BusinessCard key={index} card={businessCard}/>
        ))}
      </div>
    </div>
  )
}

export default App
