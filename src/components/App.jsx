import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");

  const setStatestoClosePopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setDeletePopupOpen(false);
  }, []);

  const closePopupByEscape = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setStatestoClosePopups();
        document.removeEventListener("keydown", closePopupByEscape);
      }
    },
    [setStatestoClosePopups]
  );

  const closeAllPopups = useCallback(() => {
    setStatestoClosePopups();
    document.removeEventListener("keydown", closePopupByEscape);
  }, [setStatestoClosePopups, closePopupByEscape]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }

  // function closeAllPopups() {
  //   setIsEditAvatarPopupOpen(false);
  //   setIsEditProfilePopupOpen(false);
  //   setIsAddPlacePopupOpen(false);
  //   setIsImagePopup(false);
  //   setDeletePopupOpen(false);
  // }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListenerForDocument();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
    setEventListenerForDocument();
  }

  // function closeAllPopupsByOverLay(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     closeAllPopups();
  //     document.removeEventListener("keydown", closePopupByEscape);
  //   }
  // }

  function setEventListenerForDocument() {
    document.addEventListener("keydown", closePopupByEscape);
  }

  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsLoadingCards(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDeleteClick(evt) {
    evt.preventDefault();
    setIsSend(true);
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true);
    api
      .sendUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true);
    api
      .sendUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  function handleAddPlaceSubmit(dataCards, reset) {
    setIsSend(true);
    api
      .addCard(dataCards)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="wrapper">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onDelete={handleDeletePopupClick}
            cards={cards}
            isLoading={isLoadingCards}
          />
        </div>
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        ></EditProfilePopup>

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        ></AddPlacePopup>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        ></EditAvatarPopup>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          titleBtn="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteClick}
          isSend={isSend}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
