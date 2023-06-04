import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'
import educationAPI from '../../http/educationAPI'
import "../../styles/VolunteerEducationPage.css"
import ArticleComponent from '../../components/ArticleComponent'

export default function VolunteerEducationPage() {
  const [volunteer, setVolunteer] = useState({});
  const [educations, setEducations] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
 
  const getEducation = async () => {
    try {
      const response = await educationAPI.getEducation();
      setEducations(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  useEffect(() => {
    getEducation();
    setVolunteer(JSON.parse(localStorage.getItem('volunteer')))
  }, [])

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  return (
    <div className='volunteer-education-page'>
      <Header />
      <ProfileHeader
        firstName={volunteer.firstName}
        lastName={volunteer.lastName}
        image={volunteer.image}
      />
      <ProfileMenu />
      {selectedArticle ? (
        <ArticleComponent onBackClick={handleBackClick} article={selectedArticle} />
      ) : (
        <div className='educations'>
          {educations.map((education, index) => (
            <div
              className='education'
              style={{
                backgroundImage: `url(${education.image})`,
                backgroundSize: '600px 270px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
              }}
              onClick={() => setSelectedArticle(education)}
            >
              <h3>{education.title}</h3>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
