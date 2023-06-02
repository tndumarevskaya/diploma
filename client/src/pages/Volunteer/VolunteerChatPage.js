import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import { useLocation } from 'react-router-dom'
import AllMessages from '../../components/AllMessages'
import DialogComponent from '../../components/DialogComponent'

export default function VolunteerChatPage() {
    const location = useLocation();
    const [volunteer, setVolunteer] = useState({});

    useEffect(() => {
      setVolunteer(JSON.parse(localStorage.getItem('volunteer')))
    }, [])

    const renderComponent = () => {
        const { pathname } = location;

        if (pathname === '/volunteer/chat') {
            return <AllMessages />;
        } else if (pathname.startsWith('/volunteer/chat/')) {
            return <DialogComponent />;
        } else {
            return null;
        }
    };

    return (
        <div className='volunteer-chat-page'>
            <Header />
            <ProfileHeader
                firstName={volunteer.firstName}
                lastName={volunteer.lastName}
                image={volunteer.image}
            />
            <ProfileMenu />
            <div className='components'>
                {renderComponent()}
            </div>
            <Footer />
        </div>
    )
}
