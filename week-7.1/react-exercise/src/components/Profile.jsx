import './Profile.css'
import coverImage from '../assets/cover.avif'
import displayImage from '../assets/display.webp'

const Profile = ({age, name, location}) => {
    return <>
        <div className="profile">
            <div className="cover">
                <img src={coverImage} alt="" />
            </div>
            
            <div className="details">
                <div className="picture">
                    <img src={displayImage} alt="" />
                </div>
                <div className="personal">
                    <div className="title">
                        <div className="name">{name}</div>
                        <div className="age">{age}</div>
                    </div>
                    <div className="subtitle">
                        <div className="location">{location}</div>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="details-container followers">
                        <div className="details-count">80K</div>
                        <div className="details-title">Followers</div>
                    </div>
                    <div className="details-container likes">
                        <div className="details-count">803K</div>
                        <div className="details-title">Likes</div>
                    </div>
                    <div className="details-container photos">
                        <div className="details-count">1.4K</div>
                        <div className="details-title">Photos</div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Profile