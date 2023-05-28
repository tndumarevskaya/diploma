import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import '../../styles/ShelterDonation.css'

export default function ShelterDonation() {
  return (
    <div className='shelter-donation'>
        <Header />
        <ProfileHeader name="Сострадание-НН"/>
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
                    <tr>
                        <td>1</td>
                        <td>Татьяна Думаревская</td>
                        <td>12/03/2023</td>
                        <td>12000</td>
                        <td>На корм</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Footer />
    </div>
  )
}
