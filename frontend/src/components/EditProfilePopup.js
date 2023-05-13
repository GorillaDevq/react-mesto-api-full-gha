import React from "react"
import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

export default function EditProfilePopup(props) {
  // Контекст
  const currentUser = React.useContext(CurrentUserContext)
  // Стейты
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm 
      name="edit" 
      title="Редактировать профиль" 
      textSubmit={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        className="popup__input popup__input_type_name" 
        id="name-input" 
        name="name" 
        required 
        minLength={2} 
        maxLength={40} 
        placeholder="Имя" 
        value={name || ''} 
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error"></span>
      <input 
        type="text" 
        className="popup__input popup__input_type_profession" 
        id="profession-input" 
        name="about" 
        required 
        minLength={2} 
        maxLength={200} 
        placeholder="Занятие" 
        value={description || ''} 
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error profession-input-error"></span>      
    </PopupWithForm>  
  )
}