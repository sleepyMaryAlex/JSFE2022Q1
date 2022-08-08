import './Header.css';

function Header(props: { displayGarageView: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="header">
      <div className="header__menu">
        <button type="button" className="header__button-garage button" onClick={() => props.displayGarageView(true)}>◄ GARAGE</button>
        <button type="button" className="header__button-winners button" onClick={() => props.displayGarageView(false)}>WINNERS ►</button>
      </div>
    </div>
  );
}

export default Header;
