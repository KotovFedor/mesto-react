import closeIcon from "../../images/popup__close-icon.svg";

export default function PopupWithForm({
  name,
  title,
  titleBtn,
  children,
  isOpen,
  onClose,
}) {
  return (
    <section
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      aria-label="Форма редактирования профиля"
    >
      <div className="popup__container popup__container-edit-profile-form">
        <button
          className="button popup__close-button"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="Кнопка закрытия формы"
          />
        </button>
        <h2 className="popup__text">{title}</h2>
        <form
          className="popup__form"
          name="edit-profile-form"
          id="edit-profile-form"
        >
          {children}
          <button
            className="button popup__submit-btn"
            type="submit"
            form="edit-profile-form"
          >
            {titleBtn || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}
