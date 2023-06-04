import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import '../../styles/ShelterDonation.css'
import { useSelector } from 'react-redux'
import donationAPI from '../../http/donationAPI'

export default function ShelterDonation() {
  const [shelter, setShelter] = useState({});
  const [donations, setDonations] = useState([]);
 
  const getDonations = async () => {
    try {
      const response = await donationAPI.getDonations();
      setDonations(response);
    } catch (error) {
      const _content = error.response;
      console.log(_content);
    }
  };

  useEffect(() => {
    setShelter(JSON.parse(localStorage.getItem('shelter')));
    getDonations();
  }, []);

  console.log(donations)
  return (
    <div className='shelter-donation'>
        <Header />
        <ProfileHeader
            name={shelter.name}
            image={shelter.image}
        />
        <ProfileMenu />
        <div className='donation'>
            <table className='table-donation'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Имя</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Цель</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation) => {
                        const dateTime = donation.createdAt.split("T");
                        const date = dateTime[0];
                        return (
                        <tr>
                            <td>{donation.donation_id}</td>
                            <td>{donation.name}</td>
                            <td>{date}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.aim}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <Footer />
    </div>
  )
}
