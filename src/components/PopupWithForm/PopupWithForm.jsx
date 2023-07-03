import closeIcon from "../../images/popup__close-icon.svg";

export default function PopupWithForm({
  name,
  title,
  titleBtn,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSend,
  isValid = true,
}) {
  return (
    <section
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      aria-label="Форма редактирования профиля"
      onClick={onClose}
    >
      <div
        className="popup__container popup__container-edit-profile-form"
        onClick={(evt) => evt.stopPropagation()}
      >
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
            className={`button popup__submit-btn ${
              isSend ? "popup__submit-btn_loading" : ""
            } ${isValid ? "" : "popup__submit-btn_inactive"}`}
            type="submit"
            form="edit-profile-form"
            disabled={isSend}
            onClick={onSubmit}
          >
            {isSend ? "Сохранение..." : titleBtn || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}
