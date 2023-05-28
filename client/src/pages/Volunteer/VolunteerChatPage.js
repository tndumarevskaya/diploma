import React from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import { useLocation } from 'react-router-dom'
import AllMessages from '../../components/AllMessages'
import DialogComponent from '../../components/DialogComponent'

export default function VolunteerChatPage() {
    const location = useLocation();

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
            <ProfileHeader name={"Татьяна Думаревская"}/>
            <ProfileMenu />
            <div className='components'>
                {renderComponent()}
            </div>
            <Footer />
        </div>
    )
}
