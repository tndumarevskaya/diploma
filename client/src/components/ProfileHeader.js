import React, { useEffect, useState } from 'react';
import '../styles/ProfileHeader.css';
import pic from '../assets/user.jpg';

export default function ProfileHeader({ name, firstName, lastName, image, editMode, setImage, setName, setFirstName, setLastName }) {
  const [inputName, setInputName] = useState(name);
  const [inputFirstName, setInputFirstName] = useState(firstName);
  const [inputLastName, setInputLastName] = useState(lastName);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    setInputName(name);
    setInputFirstName(firstName);
    setInputLastName(lastName);
  }, [name, firstName, lastName]);
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setPreviewImage(URL.createObjectURL(img));
    }
  };

  const handleNameChange = (event) => {
    setInputName(event.target.value);
    setName(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setInputFirstName(event.target.value);
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setInputLastName(event.target.value);
    setLastName(event.target.value);
  };

  return (
    <div className='profile-header'>
      {editMode ? (
        <>
          <input
            id='myImage'
            className='profile-picture-input'
            type='file'
            name='myImage'
            accept='image/*'
            onChange={onImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor='myImage' className='profile-picture-label'>
            {previewImage ? (
              <img className='profile-picture' src={previewImage} alt='profile' />
            ) : (
              'Выберите файл'
            )}
          </label>
          {name ?
            <input
              type='text'
              value={inputName}
              onChange={handleNameChange}
              className='name-input'
              style={{ width: '200px' }}
            />
            : <></>
          }
          {lastName ?
            <input
              type='text'
              value={inputFirstName}
              onChange={handleFirstNameChange}
              className='name-input'
              style={{ width: '200px' }}
            />
            : <></>
          }
          {lastName ? 
            <input
              type='text'
              value={inputLastName}
              onChange={handleLastNameChange}
              className='name-input'
              style={{ width: '200px' }}
            />
            : <></>
          }
        </>
      ) : (
        <>
          <img className='profile-picture' src={image || pic} alt='profile' />
          {name ? <h1 className='name'>{name}</h1> : <></>}
          {firstName ?<h1 className='firstName'>{firstName}</h1> : <></>}
          {lastName ? <h1 className='lastName'>{lastName}</h1> : <></>}
        </>
      )}
    </div>
  );
}