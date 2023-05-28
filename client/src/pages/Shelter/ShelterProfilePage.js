import React, { useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import '../../styles/ShelterProfilePage.css'
import Footer from '../../components/Footer'

export default function ShelterProfilePage() {

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className='shelter-profile'>
      <Header />
      <ProfileHeader name="Сострадание-НН" />
      <ProfileMenu />
      <div className='profile-info'>
        <div className={`phone-number ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Контакты:</h3>
          {isEditMode ? 
            <input type='tel' placeholder='Номер телефона' pattern="^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$" required/> 
            : 
            <p>+789234234</p>}
        </div>
        <div className={`email ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Email:</h3>
          {isEditMode ?
            <input type='email' placeholder='Email' pattern=".+@globex\.com" required/> 
            : 
            <p>sostradanie@dekom-nn.ru</p>
          }
        </div>
        <div className={`address ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Адрес:</h3>
          {isEditMode ?
            <input type='text' placeholder='Адрес' required/> 
            : 
          <p>г. Нижний Новгород, ул. Бурнаковский проезд, д.16</p>
          }
        </div>
        <div className={`schedule ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>График работы:</h3>
          {isEditMode ?
            <input type='text' placeholder='График работы' required/> 
            : 
            <p>Вторник - Пятница: с 11:00 до 18:00 <br/>
              Суббота: с 9:00 до 15:00 <br/>
              Воскресенье, Понедельник - выходные дни
            </p>
          }
        </div>
        <div className={`socials ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Социальные сети:</h3>
          {isEditMode ?
            <input type='text' placeholder='Социальные сети' required/> 
            : 
            <p>
              VK:  https://vk.com/bfsostradanie <br/>
              Instagram:  https://vk.com/bfsostradanie
            </p>
          }
        </div>
        <div className={`about ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>О нас:</h3>
          {isEditMode ?
            <input type='text' placeholder='Расскажите о приюте' required/> 
            : 
            <p>
              Нижегородский Благотворительный Фонд Защиты Животных «Сострадание НН» — организация, 
              чья деятельность направлена на помощь бездомным животным и лошадям в Нижнем Новгороде. 
              Фонд содержит приют на 200 собак и 50 кошек и опекает 10 спасённых с бойни лошадей.
            </p>
          }
        </div>
        <div className={`additional_info ${isEditMode ? 'edit-mode' : ''}`}>
          <h3>Дополнитеная информация:</h3>
          {isEditMode ?
            <input type='text' placeholder='Дополнительная информация' required/> 
            : 
            <p>
              Реквизиты и документация
              Переводом через карту Сбербанка: 5469 9801 4101 2902
              СМС сообщение на номер 7715
              Для этого нужно отправить СМС со словом питомец и цифрой пожертвования, написанной через пробел на номер 7715
              ПРИМЕР СМС : питомец 100где 100 - цифра пожертвований (может быть любой), написана через пробел.
              Ящики для пожертвований расположены:- в магазинах "Дирижабль" (ул.Б.Покровская д.46, ул.Белинского д.118, ул.Щербакова д.2, ул.Советская д.19/2)- в приюте (ул.Коминтерна 29 "А"),- в офисе ГК"Деком" (ул. Б. Печерская д.28/7)- в сети магазинов "Зоосфера"- в сети магазинов "Лапушки"
              вование. НДС не облагается"
            </p>
          }
        </div>
        {isEditMode ?
          <button onClick={toggleEditMode}>Сохранить</button>
          :
          <button onClick={toggleEditMode}>Изменить</button>
        }
      </div>
      <Footer />
    </div>
  )
}
