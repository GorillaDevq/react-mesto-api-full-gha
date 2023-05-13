import closePath from "../images/button/Close-Icon.svg"

export default function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__button-close" type="button">
          <img className="popup__close-image" src={closePath} alt="Закрыть" onClick={props.onClose}/>
        </button>
        <img src={props.objectCard.link} alt={props.objectCard.name} className="popup__image" />
        <h2 className="popup__location">{props.objectCard.name}</h2>
      </div>
    </section>
  )
}