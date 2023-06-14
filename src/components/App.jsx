import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  return (
    <>
      <div className="wrapper">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
      </div>
      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {" "}
        <div className="popup__set popup__set-top">
          <input
            className="popup__input popup__input_user_name"
            defaultValue="Жак-Ив Кусто"
            name="name"
            type="text"
            minLength={2}
            maxLength={40}
            required=""
            noValidate=""
            id="name-input"
          />
          <span className="name-input-error popup__input-error" />
        </div>
        <div className="popup__set popup__set-bottom">
          <input
            className="popup__input popup__input_user_profession"
            defaultValue="Исследователь океана"
            name="profession"
            type="text"
            minLength={2}
            maxLength={200}
            required=""
            noValidate=""
            id="profession-input"
          />
          <span className="profession-input-error popup__input-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        titleBtn="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__set popup__set-top">
          <input
            className="popup__input popup__input_card_name"
            name="name"
            placeholder="Название"
            defaultValue=""
            type="text"
            minLength={2}
            maxLength={30}
            required=""
            noValidate=""
            id="place-name-input"
          />
          <span className="place-name-input-error popup__input-error" />
        </div>
        <div className="popup__set popup__set-bottom">
          <input
            className="popup__input popup__input_card_link"
            name="link"
            placeholder="Ссылка на картинку"
            defaultValue=""
            type="url"
            required=""
            noValidate=""
            id="place-link-input"
          />
          <span className="place-link-input-error popup__input-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar-profile"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__set popup__set-bottom">
          <input
            className="popup__input popup__input_card_link"
            name="link"
            placeholder="Ссылка на картинку"
            defaultValue=""
            type="url"
            required=""
            noValidate=""
            id="place-avatar-link-input"
          />
          <span className="place-avatar-link-input-error popup__input-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" titleBtn="Да" />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
