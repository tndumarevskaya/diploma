import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ShelterProfileComponent() {
  return (
    <div className='shelter-profile-component'>
        <img/>
        <h3>Сострадание-НН</h3>
        <p>Бурнаковский съезд 2</p>
        <NavLink>Узнать больше</NavLink>
        <button>Отправить заявку</button>
    </div>
  )
}
