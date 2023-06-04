import React from 'react'
import { useLocation } from 'react-router-dom';
import volunteerApplicationAPI from '../http/volunteerApplicationAPI';
import adopterApplicationAPI from '../http/adopterApplicationAPI';

export default function Application({ application, isOpen, onClose, shelter_id }) {
    const location = useLocation();
    
    if (!isOpen) return null; 
    
    const handleVolunteerClick = (status_id) => async (e) => {
        e.stopPropagation();
        onClose();
        await volunteerApplicationAPI.updateApplication(application.application_id, status_id)
        .then(() => window.location.reload());
    };

    const handleAdopterClick = (status_id) => async (e) => {
        e.stopPropagation();
        onClose();
        await adopterApplicationAPI.updateApplication(application.application_id, status_id)
        .then(() => window.location.reload());
    };

    if (location.pathname.startsWith(`/shelter/${shelter_id}/volunteer`)) {
        return (
        <div className='application'>
            <div className="modal">
                <div className="modal-content">
                    <h2>Заявка волонтера:</h2>
                    <div className="question">
                        <h3>Имя: </h3>
                        <p>{application.name}</p>
                    </div>
                    <div className="question">
                        <h3>Возраст: </h3>
                        <p>{application.age}</p>
                    </div>
                    <div className="question">
                        <h3>Контакты: </h3>
                        <p>{application.contacts}</p>
                    </div>
                    <div className="question">
                        <h3>Почему Вы решили стать волонтером? </h3>
                        <p>{application.reason}</p>
                    </div>
                    <div className="question">
                        <h3>Посещали ли вы ранее наш приют? </h3>
                        <p>{application.visited}</p>
                    </div>
                    <div className="question">
                        <h3>Сколько раз в неделю вы можете посещать приют?</h3>
                        <p>{application.frequency}</p>
                    </div>
                    <div className="question">
                        <h3>Есть ли у вас собака?</h3>
                        <p>{application.hasDog}</p>
                    </div>
                    <div className="question">
                        <h3>Есть ли у вас опыт работы с собаками?</h3>
                        <p>{application.experience}</p>
                    </div>
                    {application.status_id === 1 ? (
                        <div className='buttons'>
                            <button className="save-button" onClick={handleVolunteerClick(2)}>Принять</button>
                            <button className="cancel-button" onClick={handleVolunteerClick(3)}>Отклонить</button>
                        </div>
                    )
                    :
                    <div className='buttons'>
                        <button onClick={onClose}>Закрыть</button>
                    </div>}
                    
                </div>
            </div>
        </div>
        );
    }

    if (location.pathname.startsWith(`/shelter/${shelter_id}/adopter`)) {
        return (
        <div className='application'>
            <div className="modal">
                <div className="modal-content">
                    <h2>Заявка на усыновление:</h2>
                    <div className="question">
                        <h3>Имя: </h3>
                        <p>{application.name}</p>
                    </div>
                    <div className="question">
                        <h3>Возраст: </h3>
                        <p>{application.age}</p>
                    </div>
                    <div className="question">
                        <h3>Город проживания: </h3>
                        <p>{application.city}</p>
                    </div>
                    <div className="question">
                        <h3>Контакты: </h3>
                        <p>{application.contacts}</p>
                    </div>
                    <div className="question">
                        <h3>Сколько у Вас членов семьи? Укажите, пожалуйста, их возраст:</h3>
                        <p>{application.members}</p>
                    </div>
                    <div className="question">
                        <h3>Условия проживая (квартира/дом/съемное жилье)?</h3>
                        <p>{application.home}</p>
                    </div>
                    <div className="question">
                        <h3>Где будет жить собака (утепленная будка с цепью, вольер с будкой, внутри дома/квартиры)?</h3>
                        <p>{application.animal_home}</p>
                    </div>
                    <div className="question">
                        <h3>Есть ли аллергия на собак у членов семьи?</h3>
                        <p>{application.allergy}</p>
                    </div>
                    <div className="question">
                        <h3>Почему вы решили взять собаку?</h3>
                        <p>{application.reason}</p>
                    </div>
                    <div className='buttons'>
                        <button className="save-button" onClick={handleAdopterClick(2)}>Принять</button>
                        <button className="cancel-button" onClick={handleAdopterClick(3)}>Отклонить</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
