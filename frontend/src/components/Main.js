import React from "react";
import Card from "./Card.js";
import featherPath from "../images/button/feather.svg";
import plusPath from "../images/button/plus.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        <div className="profile__info">
          <div className="profile__user">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="button button_type_edit" type="button" aria-label="edit" onClick={props.onEditProfile}>
              <img className="button__image-edit" src={featherPath} alt="перо" />
            </button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="button button_type_add" type="button" aria-label="add" onClick={props.onAddPlace}>
          <img className="button__image-add" src={plusPath} alt="плюс" />
        </button>
      </section>
      <ul className="elements">
        {props.cards.map((card) => {
          return (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onDeleteClick={props.onDeleteClick}/> 
          )
        })}
      </ul>
    </main>
  )
}