import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function DeleteConfirmPopup(props) {

  function handleDelete(evt) {
    evt.preventDefault()
    props.onConfirmDelete(props.objectCard)
  }

  return (
    <PopupWithForm 
      name="confirm" 
      title="Вы уверены?" 
      textSubmit={props.isLoading ? 'Удаление...' : 'Да'} 
      onSubmit={handleDelete} 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    />
  )
}