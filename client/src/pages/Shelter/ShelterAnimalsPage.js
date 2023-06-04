import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import '../../styles/ShelterAnimalsPage.css'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import SearchComponent from '../../components/SearchComponent'
import AnimalApplication from '../../components/AnimalApplication'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import animalAPI from '../../http/animalAPI'
import DropdownMenu from '../../components/DropdownMenu'

export default function ShelterAnimalsPage() {
  const {id} = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [shelter, setShelter] = useState({});
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [furs, setFurs] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [selectedTags, setSelectedTags] = useState({
    name: null,
    type_id: null,
    status_id: null,
    gender_id: null,
    color_id: null,
    communication_id: null,
    behavior_id: null,
    fur_id: null,
    shelter_id: null
  });

  const getAnimals = async () => {
    try {
      const response = await animalAPI.getAnimals(selectedTags);
      setAnimals(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getTypes = async () => {
    try {
      const response = await animalAPI.getTypes();
      setTypes(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getStatuses = async () => {
    try {
      const response = await animalAPI.getStatuses();
      setStatuses(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getGenders = async () => {
    try {
      const response = await animalAPI.getGenders();
      setGenders(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getColors = async () => {
    try {
      const response = await animalAPI.getColors();
      setColors(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getCommunications = async () => {
    try {
      const response = await animalAPI.getCommunications();
      setCommunications(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getFurs = async () => {
    try {
      const response = await animalAPI.getFurs();
      setFurs(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getBehaviors = async () => {
    try {
      const response = await animalAPI.getBehaviors();
      setBehaviors(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };
  
  useEffect(() => {
    setShelter(JSON.parse(localStorage.getItem('shelter')))
    setSelectedTags(prev => ({ ...prev, shelter_id: shelter.id }))
    getAnimals();
    getTypes();
    getStatuses();
    getGenders();
    getColors();
    getCommunications();
    getFurs();
    getBehaviors();
  }, [])

  useEffect(() => {
    getAnimals();
  }, [selectedTags])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleTableRowClick = (animal) => {
    localStorage.setItem('animal', JSON.stringify(animal));
    navigate(`/shelter/${shelter.id}/animal/${animal.animal_id}`);
  };

  const handleSearch = async (searchTerm) => {
    setSelectedTags(prev => ({ ...prev, name: searchTerm }));
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
        <SearchComponent onSearch={handleSearch} text="Шарик"/>
        <button onClick={openModal}>Добавить</button>
      </div>
      <h2>Фильтры:</h2>
      <div className='tags'>
        <DropdownMenu header={'Тип'} options={types} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, type_id: id }))}/>
        <DropdownMenu header={'Статус'} options={statuses} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, status_id: id }))}/>
        <DropdownMenu header={'Гендер'} options={genders} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, gender_id: id }))}/>
        <DropdownMenu header={'Цвет'} options={colors} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, color_id: id }))}/>
        <DropdownMenu header={'Ладит'} options={communications} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, communication_id: id }))}/>
        <DropdownMenu header={'Характер'} options={behaviors} 
        onChange={(id) => setSelectedTags(prev => ({ ...prev, behavior_id: id }))}/>
        <DropdownMenu header={'Шерсть'} options={furs}
        onChange={(id) => setSelectedTags(prev => ({ ...prev, fur_id: id }))}/>
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
              <th>Характер</th>
              <th>Ладит</th>
              <th>Шерсть</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
            <tr onClick={() => handleTableRowClick(animal)}>
              <td><img src={animal.image}/></td>
              <td>{animal.animal_id}</td>
              <td>{animal.name}</td>
              <td>{animal.type.value}</td>
              <td>{animal.status.value}</td>
              <td>{animal.age}</td>
              <td>{animal.color.value}</td>
              <td>{animal.gender.value}</td>
              <td>{animal.size} см</td>
              <td>{animal.behavior.value}</td>
              <td>{animal.communication.value}</td>
              <td>{animal.fur.value}</td>
            </tr>
            ))}
         </tbody>
        </table>
      </div>
      <AnimalApplication shelter_id={id} types={types} 
      colors={colors} statuses={statuses} 
      genders={genders} communicattions={communications}
      furs={furs} behaviors={behaviors}
      isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </div>
  )
}