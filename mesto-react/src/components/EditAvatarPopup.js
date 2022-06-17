import {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
      }
    
    return (
        <PopupWithForm
          name="editAvatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          >
            <fieldset className="popup__fieldset">
                <section className="popup__section">
                  <input className="popup__input popup__input_type_editAvatar" id="editAvatar" type="url" ref={avatarRef} placeholder="Ссылка на картинку" name="editAvatar" required/>
                  <span className="popup__input-error ava-input-error" id="editAvatar-error"></span>
                </section>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;