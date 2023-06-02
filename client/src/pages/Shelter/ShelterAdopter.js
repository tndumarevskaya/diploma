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
  const shelter = useSelector(state => state.shelter);

  const renderComponent = () => {
    const { pathname } = location;

    if (pathname === '/shelter/adopter/chat') {
      return <AllMessages />;
    } else if (pathname.startsWith('/shelter/adopter/chat/')) {
      return <DialogComponent />;
    } else if (pathname === '/shelter/adopter/application') {
      return <AllApplications />;
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
          <NavLink activeClassName="active" to='/shelter/adopter/chat'>
            Чаты
          </NavLink>
          <NavLink activeClassName="active" to='/shelter/adopter/application'>
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