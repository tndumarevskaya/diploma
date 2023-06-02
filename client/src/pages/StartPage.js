import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/StartPage.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

function StartPage() {
    const navigate = useNavigate();
    return (
        <div className='start-page'>
            <Header />
            <h1>Дайте им любовь и дом: наш веб-сервис поможет вам найти лучших друзей с хвостиком!</h1>
            <div className='buttons'>
                <button onClick={() => {navigate('/shelter/login')}}>Начать как приют</button>
                <button onClick={() => {navigate('/volunteer/login')}}>Стать волонтером</button>
                <button onClick={() => {navigate('/animal-catalog')}}>Каталог животных</button>
            </div>
            <div className='description'>
                <h2>
                    Мы Нижегородский Благотворительный проект Защиты Животных 
                    «Ушастый Друг» — организация, чья деятельность направлена на помощь бездомным 
                    животным и приютам. Проект сотрудничает с приютами и спасает жизни животных.
                </h2>
            </div>
            {/* <div className='news'>
                <div className='new'></div>
                <div className='new'></div>
                <button>Читать больше</button>
            </div> */}
            <Footer />
        </div>
    )
}

export default StartPage