import React, { useEffect, useState } from 'react'
import pic from '../assets/user.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/ArticleComponent.css"

export default function ArticleComponent({article, onBackClick}) {
  const title = article.title || 'Заголовок не указано';
  const text = article.text || 'Undefined';
  const image = article.image || pic;

  return (
    <div className='article-component'>
      <button className='second-button' onClick={onBackClick}><ArrowBackIcon/>Назад</button>
      <div className='article-content'>
        <h2>{title}</h2>
        <img src={image}/>
        <p>{text}</p>
      </div>
    </div>
  )
}
