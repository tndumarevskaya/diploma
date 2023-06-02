import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'

export default function VolunteerEducationPage() {
  const [volunteer, setVolunteer] = useState({});

  useEffect(() => {
    setVolunteer(JSON.parse(localStorage.getItem('volunteer')))
  }, [])

  return (
    <div className='volunteer-education-page'>
        <Header />
        <ProfileHeader
          firstName={volunteer.firstName}
          lastName={volunteer.lastName}
          image={volunteer.image}
        />
        <ProfileMenu />
        <Footer />
    </div>
  )
}
