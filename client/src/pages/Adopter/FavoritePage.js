import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import favoriteAPI from '../../http/favoriteAPI';
import AnimalCard from '../../components/AnimalCard';

export default function FavoritePage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {
          const response = await favoriteAPI.getFavorites(user.id);
          setFavorites(response);
        } catch (error) {
          const _content = error.response;
          console.log(_content);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);
    

    return (
        <div className='favorite-page'>
            <Header />
            <h1>Мои понравившиеся:</h1>
            <div className='animals'>
            {favorites.map((favorite) => (
                <>
                <AnimalCard animal={favorite.animal} key={favorite.favorite_id} />
                </>
            ))}
            </div>
        </div>
    )
}
