import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App({isOpen}) {  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick () {
    console.log("Avavtar");  
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
  
  function closeAllPopups () {
    console.log("close"); 
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <div className="root">
	    <div className="page">
	      <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
         />
	      <Footer />

        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
	
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          submit="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
             <fieldset className="popup__fieldset">
              <section className="popup__section">
                <input className="popup__input popup__input_type_name" id="username" type="text" placeholder="Имя" name="username" minLength="2" maxLength="40" required/>
                <span className="popup__input-error name-input-error" id="username-error"></span>
              </section>
              <section className="popup__section">
                <input className="popup__input popup__input_type_job" id="userjob" type="text" placeholder="Профессия" name="userjob" minLength="2" maxLength="200" required/>
                <span className="popup__input-error job-input-error" id="userjob-error"></span>
              </section>
	          </fieldset>
        </PopupWithForm>

	      <PopupWithForm
          name="card"
          title="Новое место"
          submit="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
            <fieldset className="popup__fieldset">
              <section className="popup__section">
                <input className="popup__input popup__input_type_img-name" id="name" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required/>
                <span className="popup__input-error img-input-error" id="name-error"></span>
              </section>        
              <section className="popup__section">
                <input className="popup__input popup__input_type_img-link" id="link" type="url" placeholder="Ссылка на картинку" name="link" required/>
                <span className="popup__input-error url-input-error" id="link-error"></span>
              </section>	
	          </fieldset>
        </PopupWithForm>
 
        <PopupWithForm
          name="editAvatar"
          title="Обновить аватар"
          submit="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          >
            <fieldset className="popup__fieldset">
                <section className="popup__section">
                  <input className="popup__input popup__input_type_editAvatar" id="editAvatar" type="url" placeholder="Ссылка на картинку" name="editAvatar" required/>
                  <span className="popup__input-error ava-input-error" id="editAvatar-error"></span>
                </section>
            </fieldset>
        </PopupWithForm>
  
        <PopupWithForm
          name=""
          title="Вы уверены?"
          submit="Да"
          isOpen={isOpen}
        >
        </PopupWithForm>
	
	    </div>
    </div>

  );
}

export default App;
