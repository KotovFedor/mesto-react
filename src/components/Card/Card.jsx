import likeBtn from "../../images/element__icon.svg";

export default function Card({ card, onCardClick }) {
  return (
    <>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <button className="button element__trash-button" />
      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <div className="like">
          <button className="button element__button" type="button">
            <img className="element__icon" src={likeBtn} alt="Кнопка лайка" />
          </button>
          <p className="like-count">0</p>
        </div>
      </div>
    </>
  );
}
