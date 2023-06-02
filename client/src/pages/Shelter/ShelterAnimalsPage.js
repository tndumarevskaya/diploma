import React, { useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import '../../styles/ShelterAnimalsPage.css'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import SearchComponent from '../../components/SearchComponent'
import AnimalApplication from '../../components/AnimalApplication'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ShelterAnimalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const shelter = useSelector(state => state.shelter);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTableRowClick = (animalId) => {
    navigate(`/animal/${animalId}`);
  };

  return (
    <div className='shelter-animal'>
      <Header />
      <ProfileHeader
        name={shelter.name}
        image={shelter.image}
      />
      <ProfileMenu />
      <div className='first-line'>
        <SearchComponent />
        <button onClick={openModal}>Добавить</button>
      </div>
      <h2>Фильтры:</h2>
      <div className='tags'>
        <div className='tag'><h3>Тип</h3></div>
        <div className='tag'><h3>Гендер</h3></div>
        <div className='tag'><h3>Статус</h3></div>
        <div className='tag'><h3>Возраст</h3></div>
      </div>
      <div className='table-container'>
        <table className="animal-table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>id</th>
              <th>Имя</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Возраст</th>
              <th>Цвет</th>
              <th>Гендер</th>
              <th>Размер</th>
              <th>Шерсть</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleTableRowClick(25)}>
              <td><img src=""/></td>
              <td>25</td>
              <td>Барсик</td>
              <td>Кот</td>
              <td>В приюте</td>
              <td>4 года</td>
              <td>Рыжий</td>
              <td>Мальчик</td>
              <td>30 см</td>
              <td>Гладкошерстный</td>
            </tr>
          </tbody>
        </table>
      </div>
      <AnimalApplication isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </div>
  )
}
