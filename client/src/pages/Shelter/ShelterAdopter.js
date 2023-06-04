import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileMenu from '../../components/ProfileMenu';
import Footer from '../../components/Footer';
import "../../styles/ShelterAdopter.css";
import DialogComponent from '../../components/DialogComponent';
import AllMessages from '../../components/AllMessages';
import AllApplications from '../../components/AllApplications';
import { useSelector } from 'react-redux';

export default function ShelterAdopter() {
  const location = useLocation();
  const [shelter, setShelter] = useState({});

  useEffect(() => {
    setShelter(JSON.parse(localStorage.getItem('shelter')))
  }, []);

  const renderComponent = () => {
    const { pathname } = location;

    if (pathname === `/shelter/${shelter.id}/adopter/chat`) {
      return <AllMessages />;
    } else if (pathname.startsWith(`/shelter/${shelter.id}/adopter/chat`)) {
      return <DialogComponent />;
    } else if (pathname === `/shelter/${shelter.id}/adopter/application`) {
      return <AllApplications shelter_id={shelter.id}/>;
    } else {
      return null;
    }
  };

  return (
    <div className='shelter-volunteer'>
      <Header />
      <ProfileHeader
        name={shelter.name}
        image={shelter.image}
      />
      <ProfileMenu />
      <div className='adopter-page'>
        <div className='sidebar'>
          <NavLink activeClassName="active" to={`/shelter/${shelter.id}/adopter/chat`}>
            Чаты
          </NavLink>
          <NavLink activeClassName="active" to={`/shelter/${shelter.id}/adopter/application`}>
            Заявки
          </NavLink>
        </div>
        <div className='components'>
          {renderComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}