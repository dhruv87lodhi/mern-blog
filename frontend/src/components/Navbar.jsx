import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="flex justify-between items-center p-4 border-b">

      <Link to="/">
        BlogNest
      </Link>

      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/create-post">
              Create Post
            </Link>

            <Link to="/profile">
              {user.name}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;