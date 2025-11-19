import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";
import FeaturesSection from "./components/sections/FeaturesSection.jsx";
import HowItWorksSection from "./components/sections/HowItWorksSection.jsx";
import ReserveSection from "./components/sections/ReserveSection.jsx";
import ContactSection from "./components/sections/ContactSection.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import ReservationsPage from "./components/reservations/ReservationsPage.jsx";
import AuthModal from "./components/auth/AuthModal.jsx";
import UnitsPage from "./components/units/UnitsPage.jsx";

/**
 * Root application component.
 * - Holds auth state
 * - Controls auth modal
 * - Defines routes for Home and Profile page
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // { name, email, phone }
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | register

  const navigate = useNavigate();

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthOpen(true);
  };

  const handleAuthSubmit = (data) => {
    // Front-end only for now.
    setIsLoggedIn(true);
    setUser({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
    });
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleProfileSave = (updatedUser) => {
    // This updates the shared user data in the app.
    setUser(updatedUser);
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
        onLogoutClick={handleLogout}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <ReserveSection />
                <ContactSection />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                isLoggedIn={isLoggedIn}
                user={user}
                onSaveProfile={handleProfileSave}
              />
            }
          />
          <Route
            path="/reservations"
            element={
              <ReservationsPage isLoggedIn={isLoggedIn} user={user}/>
            }
          />
          <Route path="/units"
            element=
              {<UnitsPage />}/>
        </Routes>
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
}

export default App;
