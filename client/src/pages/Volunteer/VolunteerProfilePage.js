import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import volunteerAPI from '../../http/volunteerAPI'
import { useParams } from 'react-router-dom'
import { getVolunteer, updateVolunteer } from '../../actions/volunteer'
import { useDispatch } from 'react-redux'

export default function VolunteerProfilePage() {
    const {id} = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [volunteer, setVolunteer] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [work, setWork] = useState('');
    const [education, setEducation] = useState('');
    const [socials, setSocials] = useState('');
    const [about, setAbout] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const dispatch = useDispatch();

    const fetchVolunteerInfo = async () => {
        try {
          const response = await volunteerAPI.getVolunteerInfo(id);
          setVolunteer(response);
        } catch (error) {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setVolunteer(_content);
        }
    };
    
    useEffect(() => {
        fetchVolunteerInfo();
        dispatch(getVolunteer(id));
        setPhoneNumber(volunteer.phoneNumber);
        setEmail(volunteer.email);
        setAddress(volunteer.address);
        setEducation(volunteer.education);
        setWork(volunteer.work);
        setLastName(volunteer.lastName);
        setFirstName(volunteer.firstName);
        setImage(volunteer.image);
        setAdditionalInfo(volunteer.additionalInfo);
    }, [dispatch, id]);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSave = () => {
        setIsEditMode(!isEditMode);
        const volunteerData = {
          "phoneNumber": phoneNumber,
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "address": address,
          "schedule": education,
          "additionalInfo": additionalInfo,
        };
        console.log(image);
        dispatch(updateVolunteer(id, volunteerData, image))
          .then(() => window.location.reload());
    };

    const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleAddressChange = (event) => setAddress(event.target.value);
    const handleEducationChange = (event) => setEducation(event.target.value);
    const handleWorkChange = (event) => setWork(event.target.value);
    const handleAboutChange = (event) => setAbout(event.target.value);
    const handleAdditionalInfoChange = (event) => setAdditionalInfo(event.target.value);


    return (
        <div className='volunteer-profile'>
            <Header />
            <ProfileHeader
                firstName={volunteer.firstName}
                lastName={volunteer.lastName}
                image={volunteer.image}
                editMode={isEditMode}
                setLastName={setLastName}
                setFirstName={setFirstName}
                setImage={setImage}
            />
            <ProfileMenu />
            <div className='profile-info'>
                <div className={`phone-number ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Номер телефона:</h3>
                    {isEditMode ? (
                        <input
                        type='tel'
                        placeholder='+7 910 234 55 23'
                        pattern='^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$'
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        />
                    ) : (
                        <p style={{ color: volunteer.phoneNumber ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                        {volunteer.phoneNumber || '+7 910 234 55 23'}
                        </p>
                    )}
                </div>
                <div className={`email ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Email:</h3>
                    {isEditMode ? (
                        <input
                        type='email'
                        placeholder='example@email.com'
                        pattern='.+@globex\.com'
                        value={email}
                        onChange={handleEmailChange}
                        />
                    ) : (
                        <p style={{ color: volunteer.email ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                        {volunteer.email || 'example@email.com'}
                        </p>
                    )}
                </div>
                <div className={`city ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Город:</h3>
                    {isEditMode ?
                        <input 
                            type='text' 
                            placeholder='Нижний Новгород' 
                            value={address}
                            onChange={handleAddressChange}
                        /> 
                        : 
                        <p style={{ color: volunteer.сity ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                            {volunteer.city || 'Нижний Новгород'}
                        </p>
                    }
                </div>
                <div className={`education ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Образование:</h3>
                    {isEditMode ?
                        <input 
                            type='text' 
                            placeholder='Школа №1' 
                            value={education}
                            onChange={handleEducationChange}
                        /> 
                        : 
                        <p style={{ color: volunteer.education ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                            {volunteer.education || 'Школа №1'}
                        </p>
                    }
                </div>
                <div className={`work ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Работа:</h3>
                    {isEditMode ?
                        <input 
                            type='text' 
                            placeholder='ООО Сбербанк' 
                            value={work}
                            onChange={handleWorkChange}
                        /> 
                        : 
                        <p style={{ color: volunteer.work ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                            {volunteer.work || 'ООО Сбербанк'}
                        </p>
                    }
                </div>
                <div className={`socials ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Социальные сети:</h3>
                    {isEditMode ? (
                        <input type='text' placeholder='VK: https://vk.com'/>
                    ) : (
                        <p style={{ color: 'rgba(0, 0, 0, 0.3)' }}>
                        VK: https://vk.com
                        </p>
                    )}
                </div>
                <div className={`additional_info ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Обо мне:</h3>
                    {isEditMode ? (
                        <input
                        type='text'
                        placeholder='Расскажи о себе'
                        value={additionalInfo}
                        onChange={handleAdditionalInfoChange}
                        />
                    ) : (
                        <p style={{ color: volunteer.additionalInfo ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
                        {volunteer.additionalInfo || 'Я люблю животных'}
                        </p>
                    )}
                </div>
                {isEditMode ?
                    <button onClick={handleSave}>Сохранить</button>
                    :
                    <button onClick={toggleEditMode}>Изменить</button>
                }
            </div>
        <Footer />
        </div>
    )
}
