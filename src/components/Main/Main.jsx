// import profileAvatar from "../../images/profile__avatar.jpg";
import editImage from "../../images/edit-image.svg";
import addImage from "../../images/add-image.svg";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../utils/api";
import Card from "../Card/Card.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        dataCards.forEach((data) => (data.id = dataUser._id));
        setCards(dataCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar-container">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар профиля"
          />
          <button className="avatar-edit-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-image"
                src={editImage}
                alt="Кнопка редактирования"
              />
            </button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-image"
            src={addImage}
            alt="Кнопка добавления карточки"
          />
        </button>
      </section>
      <template id="card-tempalte" />
      <section className="elements">
        <ul className="element-grid">
          {cards
            .map((data) => {
              return (
                <li className="element" key={data._id}>
                  <Card card={data} onCardClick={onCardClick}></Card>
                </li>
              );
            })
            .reverse()}
        </ul>
      </section>
    </main>
  );
}
