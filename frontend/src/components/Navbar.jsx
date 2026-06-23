import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">miniBlog</Link>

      <div className="space-x-5">
        <Link to="/">Home</Link>

        <Link to="/profile">Profile</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;