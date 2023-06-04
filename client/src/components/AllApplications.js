import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import DropdownMenu from './DropdownMenu';
import Application from './Application';
import '../styles/AllApplications.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import volunteerApplicationAPI from '../http/volunteerApplicationAPI';
import adopterApplicationAPI from '../http/adopterApplicationAPI';
import applicationStatuseAPI from '../http/applicationStatuseAPI';

export default function AllApplications({shelter_id}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const [applications, setApplication] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    shelter_id: shelter_id,
    status_id: null,
    name: ''
  })

  const getVolunteerApplications = async () => {
    try {
      const response = await volunteerApplicationAPI.getApplications(selectedFilters);
      setApplication(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };
  
  const getAdopterApplications = async () => {
    console.log(selectedFilters);
    try {
      const response = await adopterApplicationAPI.getApplications(selectedFilters);
      setApplication(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  const getStatuses = async () => {
    try {
      const response = await applicationStatuseAPI.getStatuses();
      setStatuses(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  useEffect(() => {
    getStatuses();
  }, [])

  useEffect(() => {
    if (location.pathname.startsWith(`/shelter/${shelter_id}/volunteer`)) {
      getVolunteerApplications(selectedFilters);
    }
    if (location.pathname.startsWith(`/shelter/${shelter_id}/adopter`)) {
      getAdopterApplications(selectedFilters);
    }
  }, [selectedFilters]);


  const handleClick = (application) => {
    setSelectedApplication(application);
    setModalOpen(!isModalOpen);
  };

  console.log(shelter_id)

  const handleDelete = async (applicationId) => {
    if (location.pathname.startsWith(`/shelter/${shelter_id}/volunteer`)) {
      try {
        await volunteerApplicationAPI.deleteApplication(applicationId)
        .then(() => window.location.reload());
      } catch (error) {
        console.log(error.response);
      }
    }
    if (location.pathname.startsWith(`/shelter/${shelter_id}/adopter`)) {
      try {
        await adopterApplicationAPI.deleteApplication(applicationId)
        .then(() => window.location.reload());
      } catch (error) {
        console.log(error.response);
      }
    }
    
  };

  const handleSearch = async (searchTerm) => {
    setSelectedFilters(prev => ({ ...prev, name: searchTerm }));
  };

  return (
    <div className='all-applications'>
      <div className='top'>
        <SearchComponent onSearch={handleSearch} text="Иван Иванов"/>
        <DropdownMenu header={'Все статусы'} options={statuses} onChange={(id) => setSelectedFilters(prev => ({ ...prev, status_id: id }))}/>
      </div>
        <table className='table-application'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Контакты</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {applications.map((application, index) => {
          const dateTime = application.createdAt.split("T")
          const date = dateTime[0];
          return (
          <tr key={application.application_id} onClick={() => handleClick(application)}>
            <td>{application.application_id}</td>
            <td>{application.name}</td>
            <td>{date}</td>
            <td>{application.status.value}</td>
            <td>{application.contacts}</td>
            <td onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Вы уверены, что хотите удалить заявку?')) {
                      handleDelete(application.application_id);
                    }
                  }} >
              <DeleteIcon/>
            </td>
            {isModalOpen && <Application shelter_id={shelter_id} application={selectedApplication} isOpen={isModalOpen} onClose={handleClick}/>}
          </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}