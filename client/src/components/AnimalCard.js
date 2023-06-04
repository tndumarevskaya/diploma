import React from 'react'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import "../styles/AnimalCard.css"
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AnimalCard({animal, volunteerId}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname.startsWith("/volunteer")) {
      navigate(`/volunteer/${volunteerId}/animal/${animal.animal_id}`);
    } else {
      navigate(`/animal/${animal.animal_id}`);
      localStorage.setItem("path", location.pathname);
    }
  };

  console.log(animal);
  return (
    <div className='animal-card' onClick={handleClick} style={{ backgroundImage: `url(${animal.image})`, backgroundSize: 'cover',  backgroundPosition: 'center'}}>
        <FavoriteIcon style={{ color: 'white', fontSize: 30 }}/>
        <h2>{animal.name}</h2>
        <div className='info'>
            <h2 className='age'>{animal.age} года</h2>
            {animal.gender_id === 1 ? (
                <MaleIcon sx={{ fontSize: 30, color: 'white' }}></MaleIcon>
            ) : 
            (
                <FemaleIcon sx={{ fontSize: 30, color: 'white' }}></FemaleIcon>
            )}
        </div>
    </div>
  )
}
