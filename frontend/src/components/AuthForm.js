import React from "react";

export default function AuthForm(props) {

  const [userData, setUserData] = React.useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    props.onSubmit(userData)
  }

  return (
    <section className="login">
      <form className="form" onSubmit={submitForm}>
        <h2 className="form__title">{props.title}</h2>
        <input type="email" className="form__input form__input_type_email" id="email" name="email" placeholder="Email" required onChange={handleChange} value={userData.email || ''}/>
        <input type="password" className="form__input form__input_type_password" id="password" name="password" placeholder="Пароль" required onChange={handleChange} value={userData.password || ''} autoComplete="on"/>
        <button type="submit" className="form__sumbit">{props.textSubmit}</button>
      </form>
      {props.children}
    </section>
  )
}