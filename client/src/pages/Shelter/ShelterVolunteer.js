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

export default function ShelterVolunteer() {
  const navigate = useNavigate();
  const location = useLocation();

  const renderComponent = () => {
    const { pathname } = location;

    if (pathname === '/shelter/volunteer/chat') {
      return <AllMessages />;
    } else if (pathname.startsWith('/shelter/volunteer/chat/')) {
      return <DialogComponent />;
    } else if (pathname === '/shelter/volunteer/application') {
      return <AllApplications />;
    } else {
      return null;
    }
  };

  return (
    <div className='shelter-volunteer'>
      <Header />
      <ProfileHeader name="Сострадание-НН" />
      <ProfileMenu />
      <div className='volunteer-page'>
        <div className='sidebar'>
          <NavLink activeClassName="active" to='/shelter/volunteer/chat'>
            Чаты
          </NavLink>
          <NavLink activeClassName="active" to='/shelter/volunteer/application'>
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