import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import SearchComponent from '../../components/SearchComponent'
import ShelterProfileComponent from '../../components/ShelterProfileComponent'
import "../../styles/VolunteerShelterPage.css"
import volunteerAPI from '../../http/volunteerAPI'
import { useParams } from 'react-router-dom'
import shelterAPI from '../../http/shelterAPI'
import ShelterInfoComponent from '../../components/ShelterInfoComponent'

export default function VolunteerShelterPage() {
  const [shelters, setShelters] = useState([]);
  const [volunteer, setVolunteer] = useState({});
  const [selectedShelter, setSelectedShelter] = useState(null);

  const getShelters = async () => {
    try {
      const response = await shelterAPI.getAllShelters();
      setShelters(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  useEffect(() => {
    setVolunteer(JSON.parse(localStorage.getItem('volunteer')))
    getShelters();
  }, [])

  const handleSearch = async (searchTerm) => {
    try {
      const response = await shelterAPI.getShelters(searchTerm);
      setShelters(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShelterSelect = (shelter) => {
    setSelectedShelter(shelter);
  };

  const handleBackClick = () => {
    setSelectedShelter(null);
  };

  return (
    <div className='volunteer-shelter'>
        <Header />
        <ProfileHeader
          firstName={volunteer.firstName}
          lastName={volunteer.lastName}
          image={volunteer.image}
        />
        <ProfileMenu />
        {selectedShelter ? 
          <ShelterInfoComponent shelter={selectedShelter} onBackClick={handleBackClick} volunteerId={volunteer.id}/> 
          :
          <div className="volunteer-shelter-block">
            <SearchComponent onSearch={handleSearch} text="Название приюта"/>
            <h2>Результаты поиска:</h2>
            {shelters.map((shelter, index) => (
              <ShelterProfileComponent key={index} shelter={shelter} onSelect={handleShelterSelect} volunteerId={volunteer.id} />
            ))}
          </div>
        }
        <Footer />
    </div>
  )
}
