import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className='nav'>
      <Link className='nav__link' to='/'>
        Currency Converter
      </Link>
      <Link className='nav__link' to='/exchangerates'>
        Exchange Rates
      </Link>
    </div>
  );
}

export default Navbar;
