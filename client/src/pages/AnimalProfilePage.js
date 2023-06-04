import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import animalAPI from '../http/animalAPI';
import Footer from '../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import "../styles/AnimalProfilePage.css"
import ShelterProfileComponent from '../components/ShelterProfileComponent';
import AdopterApplication from '../components/AdopterApplication';

export default function AnimalProfilePage() {
    const {id, animal_id} = useParams();
    const [animal, setAnimal] = useState({});
    const [shelterId, setShelterId] = useState("");
    const navigate = useNavigate();
    const [isModalAdopterOpen, setIsModalAdopterOpen] = useState(false);
    
    useEffect(() => {
      const fetchAnimalData = async () => {
        try {
          const response = await animalAPI.getAnimal(animal_id);
          setAnimal(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAnimalData();
      setShelterId(animal.shelter_id)
    }, [animal_id]);
    
    console.log(animal.shelter);
  
    const openModalAdoption = (e) => {
      e.stopPropagation()
      setIsModalAdopterOpen(true);
    };
  
    const closeModalAdoption = () => {
      setIsModalAdopterOpen(false);
    };

    return (
      <div className='animal-profile-page'>
        <Header/>
        <div className='animal-profile'>
          <button className='second-button' onClick={() => {navigate(localStorage.getItem('path')); localStorage.removeItem('animal'); localStorage.removeItem('path');}}><ArrowBackIcon/>Назад</button>
          <img className="animal-picture" src={animal.image}/>
          <div className='animal-characteristics'>
              <h2 className='name'>
              {animal.name}
              </h2>
            <div className='characteristics-block'>
              <div className='type'>
                <h3>Тип:</h3>
                  <p>{animal.type?.value}</p>
              </div>
              <div className='status'>
                <h3>Статус:</h3>
                <p>{animal.status?.value}</p>
              </div>
              <div className='age'>
                <h3>Возраст:</h3>
                <p>{animal.age} года</p>
              </div>
              <div className='gender'>
                <h3>Гендер:</h3>
                <p>{animal.gender?.value}</p>
              </div>
              <div className='behavior'>
                <h3>Характер:</h3>
                <p>{animal.behavior?.value}</p>
              </div>
              <div className='color'>
                <h3>Цвет:</h3>
                <p>{animal.color?.value}</p>
              </div>
              <div className='size'>
                <h3>Размер:</h3>
                <p>{animal.size} см</p>
              </div>
              <div className='fur'>
                <h3>Шерсть:</h3>
                <p>{animal.fur?.value}</p>
              </div>
              <div className='communication'>
                <h3>Ладит:</h3>
                <p>{animal.communication?.value}</p>
              </div>
            </div>
            <div className='animal-description'>
              <h3>История животного:</h3>
              <p>{animal.about}</p>
            </div>
          </div>
      </div>
      <div className='adoption-buttons'>
        <button className='adoption-button' onClick={openModalAdoption}>Хочу усыновить</button>
        <button className='adoption-button'>Добавить в избранное</button>
      </div>
      <div className='animal-shelter'>
        <h2>Приют:</h2>
        <ShelterProfileComponent shelter={animal?.shelter || null}/>
      </div>
      <AdopterApplication isOpen={isModalAdopterOpen} onClose={closeModalAdoption} shelterId={shelterId}/>
      <Footer />
    </div>
    )
}
