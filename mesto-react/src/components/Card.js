function Card ({card, onCardClick}) {
  
    function handleClick() {
      onCardClick(card);
    } 

    return (
        <li className="elements__items">
            <img className="elements__img" 
                src={card.link} 
                alt={card.name} 
                onClick={handleClick}/>

            <button className="elements__trash" type="button"></button>
            <div className="elements__block">
              <h2 className="elements__title">{card.name}</h2>
              <div className="elements__button">
                <button className="elements__like" type="button"></button>
                <span className="elements__count">{card.likes.length}</span>
              </div>
            </div>
	    </li>
    )
}
export default Card;