import './App.css'
import Profile from './components/Profile'
import ProfileForm from './components/ProfileForm'
import {useState} from 'react'

function App() {
  const [name, setName] = useState("Lorem Ipsum")
  const [age, setAge] = useState(18)
  const [location, setLocation] = useState("Mars")
  return (
    <>
      <Profile
        name={name} 
        age={age} 
        location={location}  
      />
      <ProfileForm
        setName={setName}
        setAge={setAge}
        setLocation={setLocation}
      />
    </>
  )
}

export default App
