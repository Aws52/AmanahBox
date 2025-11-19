import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProfilePage
 *
 * Separate full page for viewing and editing basic profile info.
 * - name, email, phone
 * - change password UI (no backend yet)
 */
function ProfilePage({ isLoggedIn, user, onSaveProfile }) {
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      // Simple guard: redirect to home if not logged in.
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
  }, [user]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in name, email, and phone.");
      return;
    }
    onSaveProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    alert("Profile saved (front-end only).");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // UI-only placeholder
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password change UI only. Backend integration will be added later.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setChangingPassword(false);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container">
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.7rem", marginBottom: "0.4rem" }}>
            Profile
          </h2>
          <p style={{ maxWidth: "30rem" }}>
            View and update your personal information. Changes to your profile
            will be used for your reservations and contact details.
          </p>
        </div>

        <div
          className="grid"
          style={{
            gap: "1.5rem",
          }}
        >
          {/* Profile info card */}
          <div className="card">
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.8rem",
              }}
            >
              Personal details
            </h3>

            <form
              onSubmit={handleProfileSubmit}
              style={{ display: "grid", gap: "0.9rem" }}
            >
              <div>
                <label
                  htmlFor="profile-name"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  This email will be used for reservation confirmations.
                </p>
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Phone number
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                  marginTop: "0.4rem",
                }}
              >
                <button type="submit" className="btn btn--primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>

          {/* Password card (UI only) */}
          <div className="card">
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.8rem",
              }}
            >
              Password
            </h3>

            {!changingPassword ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <p style={{ fontSize: "0.9rem" }}>
                  You can change your password at any time. For security
                  reasons, we never show your current password.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setChangingPassword(true)}
                >
                  Change password
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePasswordSubmit}
                style={{ display: "grid", gap: "0.8rem" }}
              >
                <div>
                  <label
                    htmlFor="current-password"
                    style={{ display: "block", fontSize: "0.85rem" }}
                  >
                    Current password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "0.25rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-password"
                    style={{ display: "block", fontSize: "0.85rem" }}
                  >
                    New password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "0.25rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-new-password"
                    style={{ display: "block", fontSize: "0.85rem" }}
                  >
                    Confirm new password
                  </label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) =>
                      setConfirmNewPassword(e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginTop: "0.25rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    flexWrap: "wrap",
                    marginTop: "0.3rem",
                  }}
                >
                  <button type="submit" className="btn btn--primary">
                    Save new password
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => {
                      setChangingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginTop: "0.15rem",
                  }}
                >
                  This is only the visual layout. Real password changes will be
                  handled by your backend later.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
