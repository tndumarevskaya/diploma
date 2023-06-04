import React, { useState } from 'react'
import "../styles/DonationApplication.css"
import donationAPI from '../http/donationAPI';

export default function DonationApplication({isOpen, onClose, shelter_id}) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [aim, setAim] = useState("");

    const [donationData, setDonationData] = useState({
        name: null,
        shelter_id: shelter_id,
        amount: null,
        aim: null
    });

    const onSave = (e) => {
        e.stopPropagation();
        const requiredFields = ["name", "amount", "shelter_id", "aim"];

        for (let field of requiredFields) {
            if (!donationData[field]) {
                alert(`Пожалуйста заполните поле: ${field}.`);
                return;
            }
        }
        setName("");
        setAim("");
        setAmount("");
        console.log(donationData);
        donationAPI.createDonation(donationData);
        onClose();
    }

    const handleClose = (e) => {
        setName("");
        setAim("");
        setAmount("");
        e.stopPropagation();
        onClose();
    }

    if (!isOpen) return null; 

    return (
        <div className='donation-application' onClick={(e) => e.stopPropagation()}>
            <div className='modal'>
                <h2>Помочь приюту!</h2>
                <div className='name'>
                    <h3>Имя:</h3>
                    <input 
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={e => {setName(e.target.value); 
                                        setDonationData(prev => ({ ...prev, name: e.target.value }))}}
                    />
                </div>
                <div className='amount'>
                    <h3>Сумма пожертвования:</h3>
                    <input 
                        placeholder="1200 рублей"
                        value={amount}
                        type='number'
                        onChange={e => {setAmount(e.target.value); 
                                        setDonationData(prev => ({ ...prev, amount: e.target.value }))}}
                    />
                </div>
                <div className='aim'>
                    <h3>Цель:</h3>
                    <input 
                        placeholder="На корм"
                        value={aim}
                        onChange={e => {setAim(e.target.value); 
                                        setDonationData(prev => ({ ...prev, aim: e.target.value }))}}
                    />
                </div>
                <div className='buttons'>
                    <button className="save-button" onClick={onSave}>Отправить</button>
                    <button className="cancel-button" onClick={handleClose}>Отменить</button>
                </div>
            </div>
        </div>
    )
}