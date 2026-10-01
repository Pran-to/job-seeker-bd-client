import { Link, NavLink } from "react-router";
import Logo from "../logo/Logo";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const{ user,logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink className='rounded-full' to="/">Home</NavLink>
      </li>
      
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
           {
            links
           }
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {
            links
         }
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {
          user ? <button onClick={handleLogOut} className="btn btn-primary rounded-full font-bold">Logout</button> : <>
           <Link to="/register">Register</Link>
        <Link to="/login" className="btn btn-primary rounded-full font-bold">Login</Link>
        </>
        }
       
      </div>
    </div>
  );
};

export default Navbar;
