import React from 'react'
import logo from "../assets/dog_cat.jpg"
import "../styles/ProfileHeader.css"

export default function ProfileHeader({ name }) {
  return (
    <div className='profile-header'>
        <img className='profile-picture' src={logo}/>
        <h1 className='name'>{name}</h1>
    </div>
  )
}