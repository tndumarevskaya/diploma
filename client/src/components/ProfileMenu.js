import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "../styles/ProfileMenu.css";
import { ADOPTER_ROUTE, ANIMAL_ROUTE, CHAT_ROUTE, DONATION_ROUTE, EDUCATION_ROUTE, SHELTER_ROUTE, VOLUNTEER_ROUTE } from '../utils/const';

export default function ProfileMenu() {
    const location = useLocation();
    const underlineRef = useRef();
    const [activeLink, setActiveLink] = useState(null);

    const shelter_links = [
        { path: SHELTER_ROUTE, ref: useRef(), label: 'Профиль' },
        { path: SHELTER_ROUTE + ANIMAL_ROUTE, ref: useRef(), label: 'Животные' }, 
        { path: SHELTER_ROUTE + VOLUNTEER_ROUTE + CHAT_ROUTE, ref: useRef(), label: 'Волонтеры' },
        { path: SHELTER_ROUTE + ADOPTER_ROUTE + CHAT_ROUTE, ref: useRef(), label: 'Усыновители' },
        { path: SHELTER_ROUTE + DONATION_ROUTE, ref: useRef(), label: 'Пожертвования' },
    ];

    const volunteer_links = [
        { path: VOLUNTEER_ROUTE, ref: useRef(), label: 'Профиль' },
        { path: VOLUNTEER_ROUTE + SHELTER_ROUTE, ref: useRef(), label: 'Поиск приюта' }, 
        { path: VOLUNTEER_ROUTE + CHAT_ROUTE, ref: useRef(), label: 'Чаты' },
        { path: VOLUNTEER_ROUTE + EDUCATION_ROUTE, ref: useRef(), label: 'Образование' },
    ]

    useEffect(() => {
        if (location.pathname.startsWith("/shelter")) {
            const activeLink = shelter_links.find(link => link.path === location.pathname);
            if (activeLink !== undefined) {
                setActiveLink(activeLink);
            } else {
                if (location.pathname.startsWith(ANIMAL_ROUTE)) {
                    setActiveLink(shelter_links[1]);
                }
            }
        } else if (location.pathname.startsWith("/volunteer")) {
            const activeLink = volunteer_links.find(link => link.path === location.pathname);
            setActiveLink(activeLink);
        }
    }, [location, shelter_links, volunteer_links]); 

    useEffect(() => {
        if (activeLink && underlineRef.current && activeLink.ref.current) {
        const rect = activeLink.ref.current.getBoundingClientRect();
        underlineRef.current.style.transform = `translateX(${rect.left}px)`;
        underlineRef.current.style.width = `${rect.width}px`;
        }
    }, [activeLink]);

    const links = location.pathname.startsWith("/shelter") ? shelter_links : volunteer_links;

    return (
        <div className='profile-menu'>
        <div className='menu'>
            {links.map((link, i) => (
            <NavLink
                key={i}
                ref={link.ref}
                exact
                activeClassName="active"
                className="menu-item"
                to={link.path}
                onClick={() => setActiveLink(link)}
            >
                {link.label}
            </NavLink>
            ))}
        </div>
        <div ref={underlineRef} className="menu-underline" />
        </div>
    );
}



