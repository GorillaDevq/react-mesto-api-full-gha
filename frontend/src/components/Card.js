import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card(props) {
  // Контекст
  const currentUser = React.useContext(CurrentUserContext)

  // Проверка действий пользователя
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // console.log(isOwn)
  // console.log(isLiked)
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  )

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  return (
    <li className="element">
      {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
      <div className="element__descriprion">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like-section">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}