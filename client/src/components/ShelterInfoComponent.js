import React, { useEffect, useState } from 'react'
import pic from '../assets/user.jpg';
import animalAPI from '../http/animalAPI'
import "../styles/ShelterInfoComponent.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimalCard from './AnimalCard';
import DonationApplication from './DonationApplication';
import VolunteerApplication from './VolunteerApplication';

export default function ShelterInfoComponent({shelter, onBackClick, volunteerId}) {
  const name = shelter.name || 'Имя не указано';
  const address = shelter.address || 'Не указан';
  const image = shelter.image || pic;
  const schedule = shelter.schedule || 'Не указано';
  const email = shelter.email || 'Не указано';
  const phoneNumber = shelter.phoneNumber || 'Не указано';
  const additionalInfo = shelter.additionalInfo || 'Не указано';
  const about = shelter.about || 'Не указано';
  const socials = shelter.social || 'Не указано';
  const [animals, setAnimals] = useState([]);
  const location = useLocation();
  const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);
  const [isModalVoulnteerOpen, setIsModalVolunteerOpen] = useState(false);

  const getAnimals = async () => {
    try {
      const response = await animalAPI.getAnimals(shelter.id);
      setAnimals(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  useEffect(() => {
    getAnimals();
  }, [])

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
    <div className='shelterInfoComponent'>
      <button className='second-button' onClick={onBackClick}><ArrowBackIcon/>Назад</button>
      <h2>{name}</h2>
      <div className='shelter-info'>
        <img src={image} alt={name}/>
        <div className='main-info'>
          <h3>Адрес: </h3><p>{address}</p>
          <h3>График работы: </h3><p>{schedule}</p>
          <h3>Email: </h3><p>{email}</p>
          <h3>Номер телефона: </h3><p>{phoneNumber}</p>
          <h3>Социальные сети: </h3><p>{socials}</p>
        </div>
      </div>
      <h3>О нас:  </h3><p>{about}</p>
      <h3>Дополнительная информация:</h3><p> {additionalInfo}</p>
      {location.pathname.startsWith('/volunteer') ? (
        <button onClick={openModalVolunteer}>Отправить заявку</button>
      ) :
      (
        <button onClick={openModalDonation}>Помочь приюту</button>
      )}
      <h2>Животные:</h2>
      <div className='animals'>
        {animals.map((animal, index) => (
          <AnimalCard volunteerId={volunteerId} animal={animal}/>
        ))}
      </div>
      <DonationApplication isOpen={isModalDonationOpen} onClose={closeModalDonation} shelter_id={shelter.id}/>
      <VolunteerApplication isOpen={isModalVoulnteerOpen} onClose={closeModalVolunteer} shelter_id={shelter.id} volunteerId={volunteerId}/>
    </div>
  )
}
