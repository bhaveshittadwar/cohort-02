import './BusinessCard.css'
export default function BusinessCard({card}) {
    return (
        <div className='card'>
            <h1>{card.name}</h1>
            <p>{card.description}</p>
            <h2>Interests</h2>
            <ul>
            {card.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
            ))}
            </ul>
            <div className="socials">
                {card.socials.map((social, index) => (
                    <a href={social.link}>{social.platform}</a>
                ))}
            </div>
        </div>
    )
}