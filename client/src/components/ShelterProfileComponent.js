import React, { useState } from 'react'
import pic from '../assets/user.jpg';
import "../styles/ShelterProfileComponent.css"
import { useLocation, useNavigate } from 'react-router-dom';
import DonationApplication from './DonationApplication';
import VolunteerApplication from './VolunteerApplication';

export default function ShelterProfileComponent({shelter,  onSelect, volunteerId}) {
  const name = shelter?.name || 'Имя не указано';
  const address = shelter?.address || 'Не указан';
  const image = shelter?.image || pic;
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);
  const [isModalVoulnteerOpen, setIsModalVolunteerOpen] = useState(false);

  console.log(shelter);
  
  const handleClick = () => {
    if (location.pathname.startsWith('/animal')) {
      navigate(`/shelters/${shelter.id}`);
      localStorage.setItem('shelter-path', location.pathname);
    } else {
      onSelect(shelter);
    }
  };

  const openModalDonation = (e) => {
    e.stopPropagation()
    setIsModalDonationOpen(true);
  };

  const closeModalDonation = () => {
    setIsModalDonationOpen(false);
  };

  const openModalVolunteer = (e) => {
    e.stopPropagation()
    setIsModalVolunteerOpen(true);
  };

  const closeModalVolunteer = () => {
    setIsModalVolunteerOpen(false);
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
      {location.pathname.startsWith('/volunteer') ? (
        <button onClick={openModalVolunteer}>Отправить заявку</button>
      ) :
      (
        <button onClick={openModalDonation}>Помочь приюту</button>
      )}
      <DonationApplication isOpen={isModalDonationOpen} onClose={closeModalDonation} shelter_id={shelter?.id}/>
      <VolunteerApplication isOpen={isModalVoulnteerOpen} onClose={closeModalVolunteer} shelter_id={shelter?.id} volunteerId={volunteerId}/>
    </div>
  )
}