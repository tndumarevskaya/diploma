import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header';
import animalAPI from '../http/animalAPI';
import SearchComponent from '../components/SearchComponent';
import AnimalCard from '../components/AnimalCard';
import DropdownMenu from '../components/DropdownMenu';
import "../styles/AnimalsSearch.css"

export default function AnimalsSearch() {
    const location = useLocation();
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
      status_id: 1,
      gender_id: null,
      color_id: null,
      communication_id: null,
      behavior_id: null,
      fur_id: null,
      shelter_id: null
    });
    const [animals, setAnimals] = useState([]);

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
        getTypes();
        getStatuses();
        getGenders();
        getColors();
        getCommunications();
        getFurs();
        getBehaviors();
    }, [])

    useEffect(() => {
        if (location.pathname.startsWith("/cats")) {
            setSelectedTags((prev) => ({...prev, type_id: 1}))
        }
        if (location.pathname.startsWith("/dogs")) {
            setSelectedTags((prev) => ({...prev, type_id: 2}))
        }
    }, [])

    useEffect(() => {
        getAnimals();
    }, [selectedTags])

    const handleSearch = async (searchTerm) => {
        setSelectedTags(prev => ({ ...prev, name: searchTerm }));
    };

    console.log(animals)
    return (
        <div className='animal-search'>
            <Header />
            {location.pathname.startsWith("/cats") && (
                <h1>Кошки</h1>
            )}
            {location.pathname.startsWith("/dgos") && (
                <h1>Собаки</h1>
            )}
            <SearchComponent onSearch={handleSearch} text="Шарик"/>
            <div className='container'>
                <div className='filters-sidebar'>
                <h2>Фильтры:</h2>
                <div className='tags'>
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
                </div>
                <div className='animals-grid'>
                    {animals.map((animal, index) => (
                        <AnimalCard key={index} animal={animal} />
                    ))}
                </div>
            </div>
        </div>
    )
}