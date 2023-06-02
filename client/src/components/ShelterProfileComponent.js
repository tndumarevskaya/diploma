import React from 'react'
import { useNavigate } from 'react-router-dom'
import pic from '../assets/user.jpg';
import "../styles/ShelterProfileComponent.css"

export default function ShelterProfileComponent({shelter,  onSelect}) {
  const name = shelter.name || 'Имя не указано';
  const address = shelter.address || 'Не указан';
  const image = shelter.image || pic;
  
  console.log(shelter);
  
  const handleClick = () => {
    onSelect(shelter);
  };

  return (
    <div className='shelter-profile-component' onClick={handleClick}>
      <div className='first-block'>
        <img src={image} alt={name}/>
          <div className='shelter-info'>
            <h3>{name}</h3>
            <p>Адрес: {address}</p>
          </div>
      </div>
        <button>Отправить заявку</button>
    </div>
  )
}