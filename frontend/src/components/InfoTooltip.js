import closePath from "../images/button/Close-Icon.svg";
import aprovePath from "../images/infoToolTip/Aprove.png";
import rejectPath from "../images/infoToolTip/Reject.png";

export default function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_info ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_info`}>
          <button className="popup__button-close" type="button">
            <img className="popup__close-image" src={closePath} alt="Закрыть" onClick={props.onClose}/>
          </button>
          <img src={props.access ? aprovePath : rejectPath} className="popup__image-info" alt="Информация"/>
          <p className="popup__pharagraph">{props.access ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </section>
  )
}