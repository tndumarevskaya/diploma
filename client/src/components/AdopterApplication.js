import React, { useEffect, useState } from 'react';
import '../styles/VolunteerApplication.css';
import adopterApplicationAPI from '../http/adopterApplicationAPI';
import "../styles/AdopterApplication.css"

export default function AdopterApplication({ isOpen, onClose, shelterId, adopterId=1 }) {
  const [answersData, setAnswersData] = useState({
    name: '',
    age: '',
    city: '',
    contacts: '',
    members: '',
    home: '',
    animal_home: '',
    allergy: '',
    reason: '',
    shelter_id: null,
    reason: '',
    adopter_id: adopterId
  });

  const handleChange = (event) => {
    setAnswersData({
      ...answersData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setAnswersData(prevAnswersData => ({
      ...prevAnswersData,
      shelter_id: shelterId
    }));
  }, [shelterId]);

  const onSave = async (e) => {
    e.stopPropagation();
    setAnswersData({...answersData,
      adopter_id: adopterId});
    console.log(answersData);
    adopterApplicationAPI.createApplication(answersData);
    onClose();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) {
    return null;
  }
    console.log("ss" + shelterId)
  return (
    <div className="adopter-application" onClick={(e) => e.stopPropagation()}>
         <div className="modal">
            <h2>Заявка на усыновление:</h2>
                <div className="question">
                    <h3>Имя: </h3>
                    <input name="name" value={answersData.name} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Возраст: </h3>
                    <input type="number" name="age" value={answersData.age} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Город проживания: </h3>
                    <input name="city" value={answersData.city} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Контакты: </h3>
                    <input name="contacts" value={answersData.contacts} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Сколько у Вас членов семьи? Укажите, пожалуйста, их возраст:</h3>
                    <input name="members" value={answersData.members} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Условия проживая (квартира/дом/съемное жилье)?</h3>
                    <input name="home" value={answersData.home} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Где будет жить собака (утепленная будка с цепью, вольер с будкой, внутри дома/квартиры)?</h3>
                    <input name="animal_home" value={answersData.animal_home} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Есть ли аллергия на собак у членов семьи?</h3>
                    <input name="allergy" value={answersData.allergy} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Почему вы решили взять собаку?</h3>
                    <input name="reason" value={answersData.reason} onChange={handleChange} />
                </div>
               <div className='buttons'>
                    <button className="save-button" onClick={onSave}>Отправить</button>
                    <button className="cancel-button" onClick={handleClose}>Отменить</button>
                </div>
            </div>
        </div>
    )
}