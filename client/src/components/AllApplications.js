import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import DropdownMenu from './DropdownMenu';
import Application from './Application';
import '../styles/AllApplications.css';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AllApplications() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className='all-applications'>
      <SearchComponent />
      <DropdownMenu header={'Все статусы'} options={["Все статусы", "Отклонены", "Приняты", "Не рассмотрены"]}/>
      <table className='table-application'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Дата</th>
            <th>Имя</th>
            <th>Статус</th>
            <th>Контакты</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleClick}>
            <td>12</td>
            <td>12/03/2023</td>
            <td>Татьяна Думаревская</td>
            <td>Не рассмотрены</td>
            <td>791033976531</td>
            <td><DeleteIcon /></td>
          </tr>
          <tr onClick={handleClick}>
            <td>12</td>
            <td>12/03/2023</td>
            <td>Татьяна Думаревская</td>
            <td>Не рассмотрены</td>
            <td>791033976531</td>
            <td><DeleteIcon /></td>
          </tr>
        </tbody>
      </table>
      {isModalOpen && <Application isOpen={isModalOpen} onClose={handleClick}/>}
    </div>
  )
}