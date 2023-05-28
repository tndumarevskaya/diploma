import React from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'

export default function VolunteerEducationPage() {
  return (
    <div className='volunteer-education-page'>
        <Header />
        <ProfileHeader name={"Татьяна Думаревская"}/>
        <ProfileMenu />
        <Footer />
    </div>
  )
}
