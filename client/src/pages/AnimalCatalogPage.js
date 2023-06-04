import React, { useEffect, useState } from 'react'
import SearchComponent from '../components/SearchComponent'
import Header from '../components/Header'
import AnimalCard from '../components/AnimalCard'
import animalAPI from '../http/animalAPI';
import "../styles/AnimalCatalogPage.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

export default function AnimalCatalogPage() {
    const [availableAnimals, setAvailableAnimals] = useState([]);
    const [adoptedAnimals, setAdoptedAnimals] = useState([]);
    const [pageAvailable, setPageAvailable] = useState(0);
    const [pageAdopted, setPageAdopted] = useState(0);
    const perPage = 4;
    const navigate = useNavigate();

    const getAvailableAnimals = async () => {
        try {
            const response = await animalAPI.getAnimals({status_id: 1});
            setAvailableAnimals(response);
        } catch (error) {
            const _content = error.response;
            console.log(_content);
        }
    };

    const getAdoptedAnimals = async () => {
        try {
            const response = await animalAPI.getAnimals({status_id: 2});
            setAdoptedAnimals(response);
        } catch (error) {
            const _content = error.response;
            console.log(_content);
        }
    };

    const handlePageAvailablebAnimalsChange = (direction) => {
        if (direction === "next" && pageAvailable < Math.ceil(availableAnimals.length / perPage) - 1) {
            setAvailableAnimals((prev) => prev + 1);
        } else if (direction === "previous" && pageAvailable > 0) {
            setAvailableAnimals((prev) => prev - 1);
        }
    };

    const handlePageAdoptedAnimalsChange = (direction) => {
        if (direction === "next" && pageAdopted < Math.ceil(adoptedAnimals.length / perPage) - 1) {
            setAdoptedAnimals((prev) => prev + 1);
        } else if (direction === "previous" && pageAdopted > 0) {
            setAdoptedAnimals((prev) => prev - 1);
        }
    };

    useEffect(() => {
        getAvailableAnimals();
        getAdoptedAnimals();
    }, [])
    
    return (
        <div className='animal-catalog'>
            <Header />
            <h1>Найди нового лучшего друга!</h1>
            <div className='buttons'>
                <button onClick={() => {navigate('/cats')}}>Кошки</button>
                <button onClick={() => {navigate('/dogs')}}>Собаки</button>
                <button onClick={() => {navigate('/shelters')}}>Приюты</button>
            </div>
            <h2>Они ищут свой дом:</h2>
            <div className='animals-list'>
                <button onClick={() => handlePageAvailablebAnimalsChange("previous")} disabled={pageAvailable <= 0}>
                    <ArrowBackIosIcon sx={{ fontSize: 40 }}/>
                </button>
                <div className='animals'>
                    {availableAnimals.slice(pageAvailable * perPage, (pageAvailable + 1) * perPage).map((animal, index) => (
                    <AnimalCard key={index} animal={animal}/>
                    ))}
                </div>
                <button onClick={() => handlePageAvailablebAnimalsChange("next")} disabled={pageAvailable >= Math.ceil(availableAnimals.length / perPage) - 1}>
                    <ArrowForwardIosIcon sx={{ fontSize: 40 }}/>
                </button>
            </div>
            <h2>Наш сайт уже помог этим ребятам:</h2>
            <div className='animals-list'>
                <button onClick={() => handlePageAdoptedAnimalsChange("previous")} disabled={pageAdopted <= 0}>
                    <ArrowBackIosIcon sx={{ fontSize: 40 }}/>
                </button>
                <div className='animals'>
                    {adoptedAnimals.slice(pageAdopted * perPage, (pageAdopted + 1) * perPage).map((animal, index) => (
                    <AnimalCard key={index} animal={animal}/>
                    ))}
                </div>
                <button onClick={() => handlePageAdoptedAnimalsChange("next")} disabled={pageAdopted >= Math.ceil(adoptedAnimals.length / perPage) - 1}>
                    <ArrowForwardIosIcon sx={{ fontSize: 40 }}/>
                </button>
            </div>
        </div>
    )
}