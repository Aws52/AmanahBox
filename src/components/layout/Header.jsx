// src/components/layout/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

/**
 * Top navigation bar.
 * Shows login/sign up or user avatar depending on auth state.
 */
function Header({
  isLoggedIn,
  user,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const getInitials = () => {
    if (user?.name) {
      const parts = user.name.trim().split(" ");
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const isProfilePage = location.pathname === "/profile";
  const isReservationsPage = location.pathname === "/reservations";

  const handleLogout = () => {
    setMenuOpen(false);
    onLogoutClick();
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.9rem 1rem",
          gap: "1rem",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent-soft))",
            }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--color-primary)",
            }}
          >
            AmanahBox
          </span>
        </Link>

        {/* Nav links on desktop */}
        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
          }}
          className="header__nav-desktop"
        >
          <HashLink smooth to="/#hero" className="nav-link">
            Home
          </HashLink>

          <HashLink smooth to="/#features" className="nav-link">
            Features
          </HashLink>

          <HashLink smooth to="/#reserve" className="nav-link">
            Storage
          </HashLink>

          <HashLink smooth to="/#contact" className="nav-link">
            Contact
          </HashLink>
          {isLoggedIn && (
            <Link
              to="/profile"
              className="nav-link"
              style={{
                fontWeight: isProfilePage ? 600 : 400,
                color: isProfilePage
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              Profile
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/reservations"
              className="nav-link"
              style={{
                fontWeight: isReservationsPage ? 600 : 400,
                color: isReservationsPage
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              My reservations
            </Link>
          )}
        </nav>

        {/* Right side: auth area */}
        <div style={{ position: "relative" }}>
          {!isLoggedIn ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={onLoginClick}
              >
                Login
              </button>
              <button
                className="btn btn--primary"
                type="button"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div>
              {/* Avatar button */}
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setMenuOpen((open) => !open)}
                style={{
                  borderRadius: 999,
                  padding: "0.25rem 0.5rem 0.25rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    backgroundColor: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {getInitials()}
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {user?.name || user?.email || "Account"}
                </span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "0.4rem",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    minWidth: "180px",
                    padding: "0.4rem 0",
                    zIndex: 30,
                  }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.45rem 0.9rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    Profile
                  </Link>

                  {/* 👇 This is the "My reservations" button */}
                  <Link
                    to="/reservations"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.45rem 0.9rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    My reservations
                  </Link>

                  <hr
                    style={{
                      margin: "0.3rem 0",
                      borderColor: "var(--color-border)",
                    }}
                  />

                  <button
                    type="button"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.45rem 0.9rem",
                      background: "none",
                      border: "none",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      color: "var(--color-accent-strong)",
                    }}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;