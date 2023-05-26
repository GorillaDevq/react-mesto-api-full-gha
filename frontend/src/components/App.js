import React from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteConfirmPopup from "./DeleteConfirmPopup.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { auth } from "../utils/auth.js";
// Контекст
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// Авторизация
import AuthForm from "./AuthForm.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
function App() {
  // Стейты 
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isLoadingState, setLoadingState] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [access, setAccess] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({
    isOpenDelete: false,
    isOpenImage: false,
    card: {}
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  // Навигация
  const navigate = useNavigate()

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  const handleCardClick = (card) =>{
    setSelectedCard({
      ...selectedCard,
      isOpenImage: true,
      card: card
    })
  }

  const handleDeleteClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      isOpenDelete: true,
      card: card
    })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({
      ...selectedCard, 
      isOpenImage: false,
      isOpenDelete: false
    })
    setInfoTooltipOpen(false)
  }

  const handleUpdateUser = ({name, about}) => {
    setLoadingState(true)
    api.setUserInfo({name, about})
      .then((res) => { 
        setCurrentUser(res) 
        closeAllPopups();
      })
      .finally(() => { 
        setLoadingState(false)
      })
      .catch((err) => { console.log('Ошибка' + err.status) })
  }

  const handleUpdateAvatar = ({avatar}) => {
    setLoadingState(true)
    api.setAvatar({avatar})
      .then((res) => { 
        setCurrentUser(res) 
        closeAllPopups();
      })
      .finally(() => { 
        setLoadingState(false)
      })
      .catch((err) => { console.log('Ошибка' + err.status) })
  }

  const handleAddPlace = ({name, link}) => {
    setLoadingState(true)
    api.postNewCard({name, link})
      .then((newCard) => { 
        setCards([newCard, ...cards]) 
        closeAllPopups();
      })
      .finally(() => { 
        setLoadingState(false)
      })
  }
  const handleCardDelete = () => {
    setLoadingState(true)
    api.deleteCard(selectedCard.card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== selectedCard.card._id ))
        closeAllPopups()
      })
      .finally(() => {
        setLoadingState(false)
      })
  }

  const handleCardLike = (card, checkStatus) => {
    api.changeLikeCardStatus(card._id, checkStatus)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => { console.log('Ошибка' + err.status) })
  }

  const handleSingUp = ({email, password}) => {
    auth.singUp({email, password})
      .then(res => {
        setAccess(true);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        err === 400 ? console.log('400 - некорректно заполнено одно из полей ') : console.log(`Ошибка - ${err}`)
        setAccess(false);
      })
      .finally(() => setInfoTooltipOpen(true))
  }
  
  const handleLogOut = () => {
    api.logout()
      .then(() => {
        setLoggedIn(false)
        setEmail('')
        navigate('/sign-in', {replace: true});
      })
      .catch(err => console.log(err))
  }

  const handleSingIn = ({email, password}) => {
    auth.singIn({email, password})
      .then(res => { 
        setEmail(email)
        setLoggedIn(true)
        localStorage.setItem('jwt', res.token);
        navigate('/', { replace: true })
      })
      .catch((err) => {
        setAccess(false);
        switch(err) {
          case 400: 
            console.log('400 - не передано одно из полей')
            break
          case 401: 
            console.log('401 - пользователь с email не найден')
            break
          default: 
            console.log(`Ошибка ${err}`)
            break
        }
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardList, userInfo]) => {
        setCards(cardList);
        setCurrentUser(userInfo)
      })
      .catch((err) => { console.log('Ошибка' + err) })
    }
  }, [loggedIn])


  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/sign-in') 
    }
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" 
            element={<ProtectedRoute isLoggedIn={loggedIn} element={
              <>
                <Header textLink="Выйти" email={email} isLoggedIn={loggedIn} link={"/sign-in"} onLogOut={handleLogOut}/>
                <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onDeleteClick={handleDeleteClick} 
                onCardClick={handleCardClick} 
                cards={cards} 
                onCardLike={handleCardLike} 
                onCardDelete={handleCardDelete}
                isLoggedIn={loggedIn}
                />
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoadingState}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleAddPlace} isLoading={isLoadingState}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoadingState}/>
                <DeleteConfirmPopup 
                  isOpen={selectedCard.isOpenDelete} 
                  onClose={closeAllPopups} 
                  onConfirmDelete={handleCardDelete} 
                  objectCard={selectedCard.card} 
                  isLoading={isLoadingState}
                /> 
                <ImagePopup onClose={closeAllPopups} isOpen={selectedCard.isOpenImage} objectCard={selectedCard.card} />
              </>} 
            />}
          />
          <Route path="/sign-in" element={
            <>
              <Header textLink="Зарегистрироваться" link={"/sign-up"} isLoggedIn={loggedIn}/>
              <AuthForm onSubmit={handleSingIn} title={'Вход'} textSubmit={'Войти'}/>
            </>}
          />
          <Route path="/sign-up" element={
            <>
              <Header textLink="Войти" link={"/sign-in"} isLoggedIn={loggedIn}/>
              <AuthForm onSubmit={handleSingUp} title={'Регистрация'} textSubmit={'Зарегистрироваться'}>
                <p className="register__paragraph">Уже зарегистрированы?  <Link className="register__link" to={"/sign-in"}>Войти</Link></p>
              </AuthForm>
            </>
          }/>
        </Routes>
        <InfoTooltip isOpen={isInfoTooltipOpen} access={access} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
