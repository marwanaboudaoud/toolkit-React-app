import Logo from "../../assets/images/logo.svg"
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand navbar-light bg-light align-items-start">
            <div className="container align-items-start mt-4 d-block d-md-flex" id="navbarNav">
                <div>
                    <img src={Logo} alt="logo" />
                </div>
                <ul className="navbar-nav mt-3 mt-md-0">
                    <li className="nav-item active me-4">
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                            Blog
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;