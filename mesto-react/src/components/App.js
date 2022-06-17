import {useEffect, useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App({isOpen}) {  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // create Error Api
  function errorApi(err){
    console.log(`Ошибка: ${err}`);
  }

  useEffect(() =>{
    api.getUserInfo()
      .then((userInfo)=>{
        setCurrentUser(userInfo)
      })
      .catch((err) => {
        errorApi(err);
      });
  },[])

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
        setCards(initialCards);
    })
    .catch((err) => {
        errorApi(err);
    });
}, []);

  function handleEditAvatarClick () {
    console.log("Avatar");  
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick () {
    console.log("Profile");  
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick () {
    console.log("Place");  
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => 
                state.map((c) => 
                    c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            errorApi(err);
        });
}

function handleCardDelete(cardId){
    api.deleteCard(cardId)
        .then(() => {
            setCards((cards) => cards.filter((card) => card._id !== cardId));
          })
        .catch((err) => {
            errorApi(err);
        });
      };

  function handleUpdateUser (newUserInfo){
    api.editUserInfo(newUserInfo.name, newUserInfo.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        errorApi(err);
      });
  }

  function handleUpdateAvatar (newAvatar){
    api.editUserAvatar(newAvatar.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        errorApi(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        errorApi(err);
      });
  }
  
  function closeAllPopups () {
    console.log("close"); 
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
	    <div className="page">
	      <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
         />
	      <Footer />

        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name=""
          title="Вы уверены?"
          submit="Да"
          isOpen={isOpen}
        >
        </PopupWithForm>
	
	    </div>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
