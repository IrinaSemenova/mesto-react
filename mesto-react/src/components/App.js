import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';

function App({}) {  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removedCardId, setRemovedCardId] = useState('');


  // create Error Api
  function errorApi(err){
    console.log(`Ошибка: ${err}`);
  }

  useEffect(() =>{
    api.getUserInfo()
      .then((userInfo)=>{
        setCurrentUser(userInfo)
      })
      .catch(errorApi)
    }
      ,[])

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
        setCards(initialCards);
    })
    .catch(errorApi)
    }
  ,[]);

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
  function handleCardDeleteClick (cardId) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setRemovedCardId(cardId);
  };

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
        .catch(errorApi);
}

function handleCardDelete(cardId){
    setIsLoading("Удаление...");
    api.deleteCard(cardId)
        .then(() => {
            setCards((cards) => cards.filter((card) => card._id !== cardId));
            closeAllPopups();
          })
        .catch(errorApi)
        .finally(() => setIsLoading(false));
      };

  function handleUpdateUser (newUserInfo){
    setIsLoading("Сохранение...");
    api.editUserInfo(newUserInfo.name, newUserInfo.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar (newAvatar){
    setIsLoading("Сохранение...");
    api.editUserAvatar(newAvatar.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading("Создание...");
    api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }
  
  function closeAllPopups () {
    console.log("close"); 
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
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
          onCardDelete={handleCardDeleteClick}
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
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          deleteCard={handleCardDelete}
          card={removedCardId}
        />
	
	    </div>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
