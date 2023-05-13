import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup(props) {
  // Реф
  const avatarRef = React.useRef()

  React.useEffect(() => {
    if (!props.isOpen) {
      avatarRef.current.value = ''
    }
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар"
      textSubmit={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        type="url" 
        className="popup__input popup__input_type_url-avatar" 
        id="url-avatar-input" 
        name="link" 
        placeholder="Название" 
        required 
        ref={avatarRef}
      />
      <span className="popup__input-error url-avatar-input-error"></span>
    </PopupWithForm>
  )
}