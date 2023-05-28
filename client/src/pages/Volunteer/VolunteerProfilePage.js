import React, { useState } from 'react'
import Header from '../../components/Header'
import ProfileHeader from '../../components/ProfileHeader'
import ProfileMenu from '../../components/ProfileMenu'
import Footer from '../../components/Footer'

export default function VolunteerProfilePage() {
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    return (
        <div className='volunteer-profile'>
            <Header />
            <ProfileHeader name={"Татьяна Думаревская"}/>
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
                <div className={`city ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Город:</h3>
                    {isEditMode ?
                        <input type='text' placeholder='Город' required/> 
                        : 
                        <p>Нижний Новгород
                        </p>
                    }
                </div>
                <div className={`education ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Образование:</h3>
                    {isEditMode ?
                        <input type='text' placeholder='Образование' required/> 
                        : 
                        <p>Лицей 40
                        </p>
                    }
                </div>
                <div className={`work ${isEditMode ? 'edit-mode' : ''}`}>
                <h3>Работа:</h3>
                    {isEditMode ?
                        <input type='text' placeholder='Работа' required/> 
                        : 
                        <p>Сбербанк
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
                <h3>Обо мне:</h3>
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
