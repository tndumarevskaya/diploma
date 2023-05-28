import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import SearchComponent from '../../components/SearchComponent'
import ShelterProfileComponent from '../../components/ShelterProfileComponent'

export default function VolunteerShelterPage() {
  return (
    <div className='volunteer-shelter'>
        <Header />
        <ProfileHeader name={"Татьяна Думаревская"}/>
        <ProfileMenu />
        <SearchComponent />
        <h2>Результаты поиска</h2>
        <ShelterProfileComponent />
        <Footer />
    </div>
  )
}
