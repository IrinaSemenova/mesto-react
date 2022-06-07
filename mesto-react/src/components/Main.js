import {useEffect, useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    // create Error Api
    function errorApi(err){
        console.log(`Ошибка: ${err}`);
    }

    useEffect(() => {
        api.getUserInfo().then((userInfo) => {
            setUserName(userInfo.name);
            setUserDescription(userInfo.about);
            setUserAvatar(userInfo.avatar);
        })
        .catch((err) => {
            errorApi(err);
        });

        api.getInitialCards().then((initialCards) => {
            setCards(initialCards);
        })
        .catch((err) => {
            errorApi(err);
        });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__author">
                    <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}></button>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button" type="button"  onClick={onEditProfile}></button>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />
                    )
                    )}
                </ul>
            </section>
        </main>
    )             
}

export default Main;
