import './ProfileForm.css'

const ProfileForm = ({setName, setAge, setLocation}) => {
    return <>
        <div className="form">
            <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="" placeholder="Full Name" />
            <input onChange={(e) => setAge(e.target.value)} type="text" name="age" id="" placeholder="Age" />
            <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location"/>
        </div>
    </>
}

export default ProfileForm