import closePath from "../images/button/Close-Icon.svg"

export default function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_${props.name}`}>
          <button className="popup__button-close" type="button">
            <img className="popup__close-image" src={closePath} alt="Закрыть" onClick={props.onClose}/>
          </button>
          <h2 className="popup__heading">{props.title}</h2>
          <form action="submit" className="popup__form popup__form_type_edit" name={props.name} onSubmit={props.onSubmit}>
            <fieldset className="popup__fieldset">
              {props.children}
              <button className="popup__submit popup__submit_type_edit" type="submit">{props.textSubmit}</button>
            </fieldset>
          </form>
        </div>
      </section>
  )

}