//::================================>>Core library<<================================::
import { useContext, useEffect, useRef } from "react";
//::================================================================================::

//::================================>>Third party<<=================================::
import {
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlineSettings,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
//::================================================================================::

//::===============================>>Custom library<<===============================::
import { ThemeContext } from "../../../context/ThemeContext";
import { SidebarContext } from "../../../context/SidebarContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import { logout } from "../../../utils/help/help";
import LogoBlue from "../../../assets/images/logo_blue.svg";
import LogoWhite from "../../../assets/images/logo_white.svg";
import "./Sidebar.scss";
import { SYSTEM_NAME } from "../../../config/config";
//::================================================================================::

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">{SYSTEM_NAME}</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/"
                className={`menu-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/user"
                className={`menu-link ${
                  location.pathname === "/user" ? "active" : ""
                }`}
              >
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">User</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" onClick={() => logout()}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
