import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout();
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">URL Shortener</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/shorten">Shorten</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleSignout}>Signout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
