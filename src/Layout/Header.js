import React, { useState } from "react";
import "../Css/Header.css";
import { useCart } from "react-use-cart";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ setShow, size }) => {
  const { user } = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="head">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
             Ecomm Shop
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  🏠Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  ☕Products
                </NavLink>
              </li>

              {!user || user.role !== 'admin' ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      <div className="cart">
                        <span>🛒cart</span>
                        <span>{size}</span>
                      </div>
                    </NavLink>
                  </li>
                </>
              ) : null}

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  {user ? (
                    <>
                      {user.role === 'admin' && (
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            🛠️Add Product
                          </NavLink>
                        </li>
                      )}
                      <NavDropdown title={user.name} id="basic-nav-dropdown">
                        {!user || user.role !== 'admin' ? (
                          <LinkContainer to="/my_orders">
                            <NavDropdown.Item>😎My Orders</NavDropdown.Item>
                          </LinkContainer>
                        ) : null}
                        <LinkContainer to="/users">
                          <NavDropdown.Item>🤵My Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={handleLogout}>
                          📴Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login🙄Register
                      </NavLink>
                    </li>
                  )}
                </Nav>
              </Navbar.Collapse>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
