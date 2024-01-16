import { useState } from 'react'
import './UserForm.css'

export default function UserApp({businessCards, setBusinessCards}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [interests, setInterests] = useState([]);
    const [linkedInLink, setLinkedInLink] = useState("");
    const [instagram, setInstagram] = useState("");

    const updateCards = async(payload) => {
        await setBusinessCards([...businessCards, payload]);
    }

    const saveUser = async () => {
        if(!name) return
        const payload = {}
        if(linkedInLink || instagram) payload.socials = []
        if(name) payload.name = name
        if(description) payload.description = description
        if(interests.length > 0) payload.interests = interests.split(',')
        if(linkedInLink) payload.socials.push({platform: 'LinkedIn', link: linkedInLink})
        if(instagram) payload.socials.push({platform: 'Instagram', link: instagram})
        
        fetch('http://localhost:3000/cards',{
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (response) => {
            try {
                const res = await response.json();
            } catch (error) {
                console.log('Something went wrong: ', error)
            }
        })

        await updateCards(payload)
    }

    return (
        <div className='userForm'>
            <div className="inputContainer">
                <label htmlFor="name">Name</label>
                <input autoFocus onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder='name' />
            </div>
            <div className="inputContainer">
                <label htmlFor="description">Description</label>
                <input onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" placeholder='description' />
            </div>
            <div className="inputContainer">
                <label htmlFor="interests">Interests</label>
                <input onChange={(e) => setInterests(e.target.value)} type="text" name="interests" id="interests" placeholder='Interests, comma separated'/>
            </div>
            <div className="inputContainer">
                <label htmlFor="linkedIn">LinkedIn Link</label>
                <input onChange={(e) => setLinkedInLink(e.target.value)} type="text" name='linkedIn' id='linkedIn' placeholder='LinkedIn Link' />
            </div>
            <div className="inputContainer">
                <label htmlFor="instagram">Instagram</label>
                <input onChange={(e) => setInstagram(e.target.value)} type="text" name='instagram' id='instagram' placeholder='Instagram Link' />
            </div>
            <button onClick={saveUser}>Add</button>
        </div>
    )
}