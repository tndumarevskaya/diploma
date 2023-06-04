import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import { storage } from '../firebase';
import '../styles/VolunteerApplication.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import volunteerApplicationAPI from '../http/volunteerApplicationAPI';

export default function VolunteerApplication({ isOpen, onClose, shelter_id, volunteerId }) {
  const [answersData, setAnswersData] = useState({
    name: '',
    age: '',
    contacts: '',
    reason: '',
    visited: '',
    frequency: '',
    hasDog: '',
    experience: '',
    shelter_id: '',
    volunteer_id: '',
  });

  const handleChange = (event) => {
    setAnswersData({
      ...answersData,
      [event.target.name]: event.target.value,
    });
  };

  const onSave = async (e) => {
    e.stopPropagation();
    setAnswersData({...answersData,
      shelter_id: shelter_id});
    setAnswersData({...answersData,
      volunteer_id: volunteerId});
    console.log(answersData);
    volunteerApplicationAPI.createApplication(answersData);
    onClose();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="volunteer-application" onClick={(e) => e.stopPropagation()}>
         <div className="modal">
            <h2>Заявка волонтера:</h2>
                <div className="question">
                    <h3>Имя: </h3>
                    <input name="name" value={answersData.name} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Возраст: </h3>
                    <input type="number" name="age" value={answersData.age} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Контакты: </h3>
                    <input name="contacts" value={answersData.contacts} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Почему Вы решили стать волонтером? </h3>
                    <input name="reason" value={answersData.reason} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Посещали ли вы ранее наш приют? </h3>
                    <input name="visited" value={answersData.visited} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Сколько раз в неделю вы можете посещать приют?</h3>
                    <input name="frequency" value={answersData.frequency} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Есть ли у вас собака?</h3>
                    <input name="hasDog" value={answersData.hasDog} onChange={handleChange} />
                </div>
                <div className="question">
                    <h3>Есть ли у вас опыт работы с собаками?</h3>
                    <input name="experience" value={answersData.experience} onChange={handleChange} />
                </div>
               <div className='buttons'>
                    <button className="save-button" onClick={onSave}>Отправить</button>
                    <button className="cancel-button" onClick={handleClose}>Отменить</button>
                </div>
            </div>
        </div>
    )
}