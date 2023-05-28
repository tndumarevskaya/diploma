import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DropdownMenu from './DropdownMenu';

export default function AnimalApplication({ isOpen, onClose }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [size, setSize] = useState("");

    if (!isOpen) return null; 

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
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='age'>
                        <h3>Возраст:</h3>
                        <input 
                            placeholder="2 года"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                    </div>
                    <div className='color'>
                        <h3>Цвет:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                    <div className='gender'>
                        <h3>Гендер:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                    <div className='communication'>
                        <h3>Коммуникация с другими:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                    <div className='behavior'>
                        <h3>Характер:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                </div>
                <div className='second-column'>
                    <div className=''>
                        <h3>Фото:</h3>
                        <div className='picture'>
                            <button>
                                <AttachFileIcon style={{ fontSize: '24px' }}/>
                            </button>
                            <p>прикрепите фото животного</p>
                        </div>
                    </div>
                    <div className='type'>
                        <h3>Тип:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                
                    <div className='status'>
                        <h3>Статус:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                    <div className='size'>
                        <h3>Размер:</h3>
                        <input 
                            placeholder="23 см"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                    </div>
                    <div className='fur'>
                        <h3>Шерсть:</h3>
                        <DropdownMenu header={'Выбрать'} options={["кот", "собака"]}/>
                    </div>
                </div>
            </div>
            <div className='animal-description'>
                <h3>Расскажите о животном:</h3>
                <textarea/>
            </div>
            <div className='buttons'>
                <button className="save-button" onClick={onClose}>Сохранить</button>
                <button className="cancel-button" onClick={onClose}>Отменить</button>
            </div>
        </div>
        </div>
    );
}