import React, { useState } from 'react'
import Header from '../components/Header'
import ProfileHeader from '../components/ProfileHeader'
import ProfileMenu from '../components/ProfileMenu'
import Footer from '../components/Footer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/AnimalPage.css"
import { useNavigate } from 'react-router-dom'
import AnimalApplication from '../components/AnimalApplication'

export default function AnimalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='animal-page'>
      <Header />
      <ProfileHeader name="Сострадание-НН" />
      <ProfileMenu />
      <div className='animal-profile'>
        <button className='second-button' onClick={() => navigate('/shelter/animal')}><ArrowBackIcon/>Назад</button>
        <img className="animal-picture" src=""/>
        <div className='animal-characteristics'>
          <h2 className='name'>Барсик</h2>
          <div className='characteristics-block'>
            <div className='type'>
              <h3>Тип:</h3>
              <p>Кот</p>
            </div>
            <div className='status'>
              <h3>Статус:</h3>
              <p>В приюте</p>
            </div>
            <div className='age'>
              <h3>Возраст:</h3>
              <p>2 года</p>
            </div>
            <div className='gender'>
              <h3>Гендер:</h3>
              <p>Мальчик</p>
            </div>
            <div className='behavior'>
              <h3>Характер:</h3>
              <p>Ласковый</p>
            </div>
            <div className='color'>
              <h3>Цвет:</h3>
              <p>Рыжий</p>
            </div>
            <div className='size'>
              <h3>Размер:</h3>
              <p>30 см</p>
            </div>
            <div className='fur'>
              <h3>Шерсть:</h3>
              <p>Гладкошерстный</p>
            </div>
            <div className='communication'>
              <h3>Коммуникация с другими:</h3>
              <p>Ладит с детьми</p>
            </div>
          </div>
          <div className='animal-description'>
            <h3>История животного</h3>
            <p>Гордый и самодостаточный кот по кличке Хулиган ищет новый дом!
                Хулиган знает себе цену и не позволит фамильярности по отношению к себе. С другими кошками поддерживать дружеские отношения также не намерен, хочет быть единственным домашним любимцем и без зазрения совести может обидеть сородичей, если те не угодят ему. В связи с этим пристраивается единственным животным в семью. 
                Хулиган не любит нежностей, только если совсем чуть-чуть. Зато никогда не откажется от игр с человеком и вкусной еды. Котик очень разговорчивый, если с ним заговорить, он начнет мяукать в ответ.
                Он ждет хозяина под стать себе. Надежного, любящего и уважающего личные границы. 
                Если котик выберет вас, то вы обретете самого преданного друга.Хулиган обучен хорошим манерам, пользуется лоточком. Кастрирован, привит, чипирован и готов к переезду в новый дом!Примерный возраст 5 лет.
            </p>
          </div>
        </div>
        <div className='buttons'>
          <button onClick={openModal}>Изменить</button>
          <button>Удалить</button>
        </div>
      </div>
      <AnimalApplication isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </div>
  )
}
