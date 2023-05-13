import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      link: ''
    };
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        name: '',
        link: ''
      })
    }
  }

  handleAddPlaceSubmit(evt) {
    evt.preventDefault()
    this.props.onUpdateCard({
      name: this.state.name,
      link: this.state.link
    })
  }

  render() {
    return (
      <PopupWithForm 
        name="add" 
        title="Новое Место" 
        textSubmit={this.props.isLoading ? 'Создание...' : 'Создать'} 
        isOpen={this.props.isOpen} 
        onClose={this.props.onClose} 
        onSubmit={this.handleAddPlaceSubmit}
      >
        <input 
          type="text" 
          className="popup__input popup__input_type_location" 
          value={this.state.name} 
          id="location-input" 
          name="name" 
          placeholder="Название" 
          required 
          minLength={2} 
          maxLength={30} 
          onChange={this.handleChange}
        />
        <span className="popup__input-error location-input-error"></span>
        <input 
          type="url" 
          className="popup__input popup__input_type_link" 
          value={this.state.link} 
          id="link-input" 
          name="link" 
          placeholder="Ссылка на картинку" 
          required 
          onChange={this.handleChange}
        />
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>
    )
  }
}