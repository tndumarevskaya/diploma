import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileMenu from '../../components/ProfileMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import animalAPI from '../../http/animalAPI';

export default function AnimalVolunteerPage() {
  const {id, animal_id} = useParams();
  const [volunteer, setVolunteer] = useState({});
  const [animal, setAnimal] = useState({});
  const navigate = useNavigate();
  
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
    setVolunteer(JSON.parse(localStorage.getItem('volunteer')))
  }, [animal_id]);
  
  console.log(animal_id);

  return (
    <div className='animal-page'>
      <Header />
      <ProfileHeader
        name={volunteer.name}
        image={volunteer.image}
      />
      <ProfileMenu />
      <div className='animal-profile'>
        <button className='second-button' onClick={() => {navigate(`/volunteer/${id}/shelter`); localStorage.removeItem('animal')}}><ArrowBackIcon/>Назад</button>
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
    <Footer />
  </div>
  )
}
