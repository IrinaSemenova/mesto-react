import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({isOpen, onClose, onDeleteCard, card,onSubmit}){

    function handleSubmit(e){
        e.preventDefault();
        onDeleteCard(card);
    }

    return(
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            submit="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
      >
      </PopupWithForm>
    )
}
export default DeleteCardPopup;