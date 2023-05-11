import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/StartPage.css'

function StartPage() {
    const navigate = useNavigate();
    return (
        <div className='start-page'>
            <h1>Дайте им любовь и дом: наш веб-сервис поможет вам найти лучших друзей с хвостиком!</h1>
            <button onClick={() => {navigate('/shelter/login')}}>Начать как приют</button>
            <button onClick={() => {navigate('/volunteer/login')}}>Стать волонтером</button>
            <button onClick={() => {navigate('/animal-catalog')}}>Каталог животных</button>
        </div>
    )
}

export default StartPage