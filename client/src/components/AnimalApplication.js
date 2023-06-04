import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DropdownMenu from './DropdownMenu';
import { useParams } from 'react-router-dom';
import animalAPI from '../http/animalAPI';

export default function AnimalApplication({ shelter_id, types, colors, statuses, genders, communicattions, furs, behaviors, isOpen, onClose }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");

    const [animalData, setAnimalData] = useState({
        name: null,
        size: null,
        age: null,
        type_id: null,
        status_id: null,
        gender_id: null,
        color_id: null,
        communication_id: null,
        behavior_id: null,
        fur_id: null,
        shelter_id: null,
        about: null,
      });

    if (!isOpen) return null; 

    const onImageUpload = (event) => {
        setAnimalData(prev => ({ ...prev, shelter_id: shelter_id }));
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          setImage(img);
        }
    };

    const onSave = () => {
        const requiredFields = ["name", "age", "color_id", "gender_id", "communication_id", "behavior_id", "type_id", "status_id", "size", "fur_id"];

        for (let field of requiredFields) {
            if (!animalData[field]) {
                alert(`Пожалуйста заполните поле: ${field}.`);
                return;
            }
        }
        console.log(animalData);
        animalAPI.createAnimal(animalData, image);
        console.log(animalData);
        onClose();
    }

    return (
        <div className="animal-application">
        <div className="modal">
            <h2>Новое животное</h2>
            <div className="modal-content">
                <div className='first-column'>
                    <div className='name'>
                        <h3>Имя:</h3>
                        <input 
                            placeholder="Шарик"
                            value={name}
                            onChange={e => {setName(e.target.value); 
                                            setAnimalData(prev => ({ ...prev, name: e.target.value }))}}
                        />
                    </div>
                    <div className='age'>
                        <h3>Возраст:</h3>
                        <input 
                            placeholder="2 года"
                            value={age}
                            type="number"
                            onChange={e => {setAge(e.target.value);
                                            setAnimalData(prev => ({ ...prev, age: e.target.value }))}}
                        />
                    </div>
                    <div className='color'>
                        <h3>Цвет:</h3>
                        <DropdownMenu header={'Выбрать'} options={colors} onChange={(id) => setAnimalData(prev => ({ ...prev, color_id: id }))}/>
                    </div>
                    <div className='gender'>
                        <h3>Гендер:</h3>
                        <DropdownMenu header={'Выбрать'} options={genders} onChange={(id) => setAnimalData(prev => ({ ...prev, gender_id: id }))}/>
                    </div>
                    <div className='communication'>
                        <h3>Коммуникация с другими:</h3>
                        <DropdownMenu header={'Выбрать'} options={communicattions} onChange={(id) => setAnimalData(prev => ({ ...prev, communication_id: id }))}/>
                    </div>
                    <div className='behavior'>
                        <h3>Характер:</h3>
                        <DropdownMenu header={'Выбрать'} options={behaviors} onChange={(id) => setAnimalData(prev => ({ ...prev, behavior_id: id }))}/>
                    </div>
                </div>
                <div className='second-column'>
                    <div className='picture'>
                        <h3>Фото:</h3>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={onImageUpload}
                        />
                    </div>
                    <div className='type'>
                        <h3>Тип:</h3>
                        <DropdownMenu header={'Выбрать'} options={types} onChange={(id) => setAnimalData(prev => ({ ...prev, type_id: id }))}/>
                    </div>
                
                    <div className='status'>
                        <h3>Статус:</h3>
                        <DropdownMenu header={'Выбрать'} options={statuses} onChange={(id) => setAnimalData(prev => ({ ...prev, status_id: id }))}/>
                    </div>
                    <div className='size'>
                        <h3>Размер:</h3>
                        <input 
                            placeholder="23 см"
                            value={size}
                            type="number"
                            onChange={e => {setSize(e.target.value)
                                            setAnimalData(prev => ({ ...prev, size: e.target.value }))}}
                        />
                    </div>
                    <div className='fur'>
                        <h3>Шерсть:</h3>
                        <DropdownMenu header={'Выбрать'} options={furs} onChange={(id) => setAnimalData(prev => ({ ...prev, fur_id: id }))}/>
                    </div>
                </div>
            </div>
            <div className='animal-description'>
                <h3>Расскажите о животном:</h3>
                <textarea 
                    onChange={e => {
                        setAnimalData(prev => ({ ...prev, about: e.target.value }))
                    }}/>
            </div>
            <div className='buttons'>
                <button className="save-button" onClick={onSave}>Сохранить</button>
                <button className="cancel-button" onClick={onClose}>Отменить</button>
            </div>
        </div>
        </div>
    );
}
