import logo from "../../images/header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a className="link" href="#" target="_blank">
        <img className="header__logo" src={logo} alt='Логотип "Место"' />
      </a>
    </header>
  );
}
