import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShelterInfoComponent from '../components/ShelterInfoComponent';
import SearchComponent from '../components/SearchComponent';
import ShelterProfileComponent from '../components/ShelterProfileComponent';
import shelterAPI from '../http/shelterAPI';

export default function ShelterSearch() {
  const [shelters, setShelters] = useState([]);
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


  console.log(shelters);
  return (
    <div className='shelters-search'>
        <Header />
            {selectedShelter ? 
            <ShelterInfoComponent shelter={selectedShelter} onBackClick={handleBackClick}/> 
            :
            <div className="volunteer-shelter-block">
                <SearchComponent onSearch={handleSearch} text="Название приюта"/>
                <h2>Результаты поиска:</h2>
                {shelters.map((shelter, index) => (
                <ShelterProfileComponent key={index} shelter={shelter} onSelect={handleShelterSelect}/>
                ))}
          </div>
        }
        <Footer />
    </div>
  )
}
