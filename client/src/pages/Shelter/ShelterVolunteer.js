import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileMenu from '../../components/ProfileMenu';
import Footer from '../../components/Footer';
import "../../styles/ShelterVolunteer.css";
import DialogComponent from '../../components/DialogComponent';
import AllMessages from '../../components/AllMessages';
import Application from '../../components/Application';
import AllApplications from '../../components/AllApplications';
import { useSelector } from 'react-redux';

export default function ShelterVolunteer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [shelter, setShelter] = useState({});
 

  useEffect(() => {
    setShelter(JSON.parse(localStorage.getItem('shelter')))
  }, []);

  const renderComponent = () => {
    const { pathname } = location;

    if (pathname === `/shelter/${shelter.id}/volunteer/chat`) {
      return <AllMessages userId={shelter.id}/>;
    } else if (pathname.startsWith( `/shelter/${shelter.id}/volunteer/chat`)) {
      return <DialogComponent />;
    } else if (pathname ===  `/shelter/${shelter.id}/volunteer/application`) {
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
      <div className='volunteer-page'>
        <div className='sidebar'>
          <NavLink activeClassName="active" to={`/shelter/${shelter.id}/volunteer/chat`}>
            Чаты
          </NavLink>
          <NavLink activeClassName="active" to={`/shelter/${shelter.id}/volunteer/application`}>
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