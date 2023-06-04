import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProfileHeader from '../components/ProfileHeader'
import ProfileMenu from '../components/ProfileMenu'
import Footer from '../components/Footer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/AnimalPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import AnimalApplication from '../components/AnimalApplication'
import DropdownMenu from '../components/DropdownMenu'
import animalAPI from '../http/animalAPI'
import { updateAnimal } from '../actions/animal'
import { useDispatch } from 'react-redux'

export default function AnimalPage() {
  const {id, animal_id} = useParams();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [shelter, setShelter] = useState({});
  const [animal, setAnimal] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [typeId, setTypeId] = useState('');
  const [genderId, setGenderId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [behaviorId, setBehaviorId] = useState('');
  const [furId, setFurId] = useState('');
  const [colorId, setColorId] = useState('');
  const [communicationId, setCommunicationId] = useState('');
  const [image, setImage] = useState('');
  const [about, setAbout] = useState('');
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [furs, setFurs] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const dispatch = useDispatch();
  
  const [previewImage, setPreviewImage] = useState('');
  
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
    const fetchAnimalData = async () => {
      try {
        const response = await animalAPI.getAnimal(animal_id);
        setAnimal(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimalData();
    setShelter(JSON.parse(localStorage.getItem('shelter')));
    getTypes();
    getStatuses();
    getGenders();
    getColors();
    getCommunications();
    getFurs();
    getBehaviors();
  }, [animal_id]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async() => {
    setEditMode(!editMode);
    const animalData = {
      "name": name,
      "type_id": typeId,
      "gender_id": genderId,
      "size": size,
      "status_id": statusId,
      "behavior_id": behaviorId,
      "fur_id": furId,
      "age": age,
      "color_id": colorId,
      "communication_id": communicationId,
      "about": about,
    };
    animalAPI.updateAnimal(animal.animal_id, animalData, image)
    .then(() => window.location.reload());
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setPreviewImage(URL.createObjectURL(img));
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Вы уверены что хотите удалить это животное?");
    if (confirmDelete) {
      try {
        await animalAPI.deleteAnimal(animal.animal_id);
        navigate(`/shelter/${id}/animal`);
        localStorage.removeItem('animal');
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  console.log(animal);

  return (
    <div className='animal-page'>
      <Header />
      <ProfileHeader
        name={shelter.name}
        image={shelter.image}
      />
      <ProfileMenu />
      <div className='animal-profile'>
        <button className='second-button' onClick={() => {navigate(`/shelter/${id}/animal`); localStorage.removeItem('animal')}}><ArrowBackIcon/>Назад</button>
        {editMode ? 
        (
          <>
            <input
            id='myImage'
            className='profile-picture-input'
            type='file'
            name='myImage'
            accept='image/*'
            onChange={onImageChange}
            style={{ display: 'none' }}
          />
            <label htmlFor='myImage' className='animal-picture-label'>
              {previewImage ? (
                <img className='animal-prev-picture' src={previewImage} alt='profile' />
              ) : (
                'Выберите файл'
              )}
            </label>
          </>
        ) : 
        (
          <img className="animal-picture" src={animal.image}/>
        )}
        <div className='animal-characteristics'>
            <h2 className='name'>
            {editMode ? (
              <input
                type='text'
                value={name || animal.name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h2>{animal.name}</h2>
            )}
          </h2>
          <div className='characteristics-block'>
            <div className='type'>
              <h3>Тип:</h3>
              {editMode ? (
                <DropdownMenu header={animal.type?.value} options={types}
                  onChange={(id) => setTypeId(id)}/>
              ) 
              : (
                <p>{animal.type?.value}</p>
              )}
            </div>
            <div className='status'>
              <h3>Статус:</h3>
              {editMode ? (
                <DropdownMenu header={animal.status?.value} options={statuses}
                onChange={(id) => setStatusId(id)}/>
              ) 
              : (
                <p>{animal.status?.value}</p>
              )}
            </div>
            <div className='age'>
              <h3>Возраст:</h3>
              {editMode ? (
              <input
                type='number'
                value={age || animal.age}
                onChange={(e) => setAge(e.target.value)}
                />
              ) : (
                <p>{animal.age} года</p>
              )}
            </div>
            <div className='gender'>
              <h3>Гендер:</h3>
              {editMode ? (
                <DropdownMenu header={animal.gender?.value} options={genders}
                onChange={(id) => setGenderId(id)}/>
              ) 
              : (
                <p>{animal.gender?.value}</p>
              )}
            </div>
            <div className='behavior'>
              <h3>Характер:</h3>
              {editMode ? (
                <DropdownMenu header={animal.behavior?.value} options={behaviors}
                onChange={(id) => setBehaviorId(id)}/>
              ) 
              : (
                <p>{animal.behavior?.value}</p>
              )}
            </div>
            <div className='color'>
              <h3>Цвет:</h3>
              {editMode ? (
                <DropdownMenu header={animal.color?.value} options={colors}
                onChange={(id) => setColorId(id)}/>
              ) 
              : (
                <p>{animal.color?.value}</p>
              )}
            </div>
            <div className='size'>
              <h3>Размер:</h3>
              {editMode ? (
              <input
                type='number'
                value={size || animal.size}
                onChange={(e) => setSize(e.target.value)}
                />
              ) : (
                <p>{animal.size} см</p>
              )}
            </div>
            <div className='fur'>
              <h3>Шерсть:</h3>
              {editMode ? (
                <DropdownMenu header={animal.fur?.value} options={furs}
                onChange={(id) => setFurId(id)}/>
              ) 
              : (
                <p>{animal.fur?.value}</p>
              )}
            </div>
            <div className='communication'>
              <h3>Ладит:</h3>
              {editMode ? (
                <DropdownMenu header={animal.communication?.value} options={communications}
                onChange={(id) => setCommunicationId(id)}/>
              ) 
              : (
                <p>{animal.communication?.value}</p>
              )}
            </div>
          </div>
          <div className='animal-description'>
            <h3>История животного:</h3>
            {editMode ? (
              <textarea 
              value={about || animal.about}
              onChange={e => {
                  setAbout(e.target.value)
              }}/>)
              : (
              <p>{animal.about}</p>
              )}
          </div>
        </div>
        {!editMode ?
        <div className='buttons'>
          <button onClick={toggleEditMode}>Изменить</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
        :
        <div className='buttons'>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={toggleEditMode}>Отменить</button>
        </div>
        }
    </div>
    <Footer />
  </div>
  )
}
