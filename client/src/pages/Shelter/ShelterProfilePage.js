import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileMenu from '../../components/ProfileMenu';
import '../../styles/ShelterProfilePage.css';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import shelterAPI from '../../http/shelterAPI';
import { useDispatch } from 'react-redux';
import { getShelter, updateShelter } from '../../actions/shelter';

export default function ShelterProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [schedule, setSchedule] = useState('');
  const [socials, setSocials] = useState('');
  const [about, setAbout] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [shelter, setShelter] = useState({});
  const dispatch = useDispatch();

  const fetchShelterInfo = async () => {
    try {
      const response = await shelterAPI.getShelterInfo(id);
      setShelter(response);
    } catch (error) {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setShelter(_content);
    }
  };

  useEffect(() => {
    fetchShelterInfo();
    dispatch(getShelter(id));
    setPhoneNumber(shelter.phoneNumber);
    setEmail(shelter.email);
    setAddress(shelter.address);
    setSchedule(shelter.schedule);
    setName(shelter.name);
    setImage(shelter.image);
    setAdditionalInfo(shelter.additionalInfo);
  }, [dispatch, id]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    setIsEditMode(!isEditMode);
    const shelterData = {
      "phoneNumber": phoneNumber,
      "name": name,
      "email": email,
      "address": address,
      "schedule": schedule,
      "additionalInfo": additionalInfo,
    };
    console.log(image);
    dispatch(updateShelter(id, shelterData, image))
    .then(() => window.location.reload());
  };

  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleScheduleChange = (event) => setSchedule(event.target.value);
  const handleSocialsChange = (event) => setSocials(event.target.value);
  const handleAboutChange = (event) => setAbout(event.target.value);
  const handleAdditionalInfoChange = (event) => setAdditionalInfo(event.target.value);

  return (
    <div className='shelter-profile'>
      <Header />
      <ProfileHeader
        name={shelter.name}
        image={shelter.image}
        editMode={isEditMode}
        setName={setName}
        setImage={setImage}
      />
      <ProfileMenu />
      <div className='profile-info'>
        <div className={`phone-number ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Номер телефона:</h3>
          {isEditMode ? (
            <input
              type='tel'
              placeholder='+79102345523'
              pattern='^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          ) : (
            <p style={{ color: shelter.phoneNumber ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
              {shelter.phoneNumber || '+79102345523'}
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
            <p style={{ color: shelter.email ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
              {shelter.email || 'example@email.com'}
            </p>
          )}
        </div>
        <div className={`address ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Адрес:</h3>
          {isEditMode ? (
            <input
              type='text'
              placeholder='г. Нижний Новгород, ул. Бурнаковский проезд, д.16'
              value={address}
              onChange={handleAddressChange}
            />
          ) : (
            <p style={{ color: shelter.address ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
              {shelter.address || 'г. Нижний Новгород, ул. Бурнаковский проезд, д.16'}
            </p>
          )}
        </div>
        <div className={`schedule ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>График работы:</h3>
          {isEditMode ? (
            <input
              type='text'
              placeholder='Вторник - Пятница: с 11:00 до 18:00 Суббота: с 9:00 до 15:00 Воскресенье, Понедельник - выходные дни'
              value={schedule}
              onChange={handleScheduleChange}
            />
          ) : (
            <p style={{ color: shelter.schedule ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
              {shelter.schedule || 'Вторник - Пятница: с 11:00 до 18:00\nСуббота: с 9:00 до 15:00\nВоскресенье, Понедельник - выходные дни'}
            </p>
          )}
        </div>
        <div className={`socials ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Социальные сети:</h3>
          {isEditMode ? (
            <input type='text' placeholder='Социальные сети'/>
          ) : (
            <p style={{ color: 'rgba(0, 0, 0, 0.3)' }}>
              VK: https://vk.com/bfsostradanie
              <br />
              Instagram: https://vk.com/bfsostradanie
            </p>
          )}
        </div>
        <div className={`about ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>О нас:</h3>
          {isEditMode ? (
            <input type='text' placeholder='Расскажите о приюте'/>
          ) : (
            <p>
              Нижегородский Благотворительный Фонд Защиты Животных «Сострадание НН» — организация,
              чья деятельность направлена на помощь бездомным животным и лошадям в Нижнем Новгороде.
              Фонд содержит приют на 200 собак и 50 кошек и опекает 10 спасённых с бойни лошадей.
            </p>
          )}
        </div>
        <div className={`additional_info ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Дополнитеная информация:</h3>
          {isEditMode ? (
            <input
              type='text'
              placeholder='Дополнительная информация'
              value={additionalInfo}
              onChange={handleAdditionalInfoChange}
            />
          ) : (
            <p style={{ color: shelter.additionalInfo ? 'black' : 'rgba(0, 0, 0, 0.3)' }}>
              {shelter.additionalInfo || 'Реквизиты и документаци Переводом через карту Сбербанка: 5469 9801 4101 2902'}
            </p>
          )}
        </div>
        {isEditMode ? (
          <button onClick={handleSave}>Сохранить</button>
        ) : (
          <button onClick={toggleEditMode}>Изменить</button>
        )}
      </div>
      <Footer />
    </div>
  );
}