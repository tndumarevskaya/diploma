import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import shelterAPI from '../http/shelterAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import animalAPI from '../http/animalAPI';
import AnimalCard from '../components/AnimalCard';
import DonationApplication from '../components/DonationApplication';
import pic from '../assets/user.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ShelterPage() {
    const {shelter_id} = useParams();
    const [shelter, setShelter] = useState("");
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
    const navigate = useNavigate();
    const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);
  
    const getAnimals = async () => {
      try {
        const response = await animalAPI.getAnimals(shelter.id);
        setAnimals(response);
      } catch (error) {
        const _content = error.response;
        console.log(_content);
      }
    };
  
    const getShelter = async () => {
        try {
          const response = await shelterAPI.getShelterInfo(shelter_id);
          setShelter(response);
        } catch (error) {
          const _content = error.response;
          console.log(_content);
        }
    };

    useEffect(() => {
        getShelter();
        getAnimals();
    }, [])
  
    const openModalDonation = (e) => {
      e.stopPropagation()
      setIsModalDonationOpen(true);
    };
  
    const closeModalDonation = () => {
      setIsModalDonationOpen(false);
    };
  
    return (
      <div className='shelter-page'>
        <Header />
        <div className='shelterInfoComponent'>
            <button className='second-button' onClick={() => {navigate(localStorage.getItem('shelter-path')); localStorage.removeItem('shelter-path');}}><ArrowBackIcon/>Назад</button>
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
            <button onClick={openModalDonation}>Помочь приюту</button>
            <h2>Животные:</h2>
            <div className='animals'>
            {animals.map((animal, index) => (
                <AnimalCard animal={animal}/>
            ))}
            </div>
            <DonationApplication isOpen={isModalDonationOpen} onClose={closeModalDonation} shelter_id={shelter.id}/>
        </div>
      </div>
    )
}
