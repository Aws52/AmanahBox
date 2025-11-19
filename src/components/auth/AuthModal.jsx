import React, { useState, useEffect } from "react";

/**
 * AuthModal
 * UI-only login/register component.
 */
function AuthModal({ open, mode, onClose, onSubmit }) {
  const [authMode, setAuthMode] = useState(mode || "login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (mode) setAuthMode(mode);
  }, [mode]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }
    if (authMode === "register") {
      if (!name.trim()) {
        alert("Please enter your name.");
        return;
      }
      if (!phone.trim()) {
        alert("Please enter your phone number.");
        return;
      }
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      mode: authMode,
    });

    setPassword("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "0.1rem" }}>
              {authMode === "login" ? "Login" : "Create an account"}
            </h2>
            <p
              style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}
            >
              {authMode === "login"
                ? "Sign in to manage your storage reservations."
                : "Register so you can reserve and manage storage units."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn--ghost"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              padding: 0,
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.85rem",
          }}
        >
          <button
            type="button"
            className="btn btn--ghost"
            style={{
              flex: 1,
              borderRadius: "999px",
              backgroundColor:
                authMode === "login"
                  ? "rgba(72,86,150,0.08)"
                  : "transparent",
            }}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            style={{
              flex: 1,
              borderRadius: "999px",
              backgroundColor:
                authMode === "register"
                  ? "rgba(72,86,150,0.08)"
                  : "transparent",
            }}
            onClick={() => setAuthMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.8rem" }}>
          {authMode === "register" && (
            <>
              <div>
                <label
                  htmlFor="auth-name"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="auth-phone"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Phone number
                </label>
                <input
                  id="auth-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="auth-email"
              style={{ display: "block", fontSize: "0.85rem" }}
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.55rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="auth-password"
              style={{ display: "block", fontSize: "0.85rem" }}
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.55rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>

          <button type="submit" className="btn btn--primary">
            {authMode === "login" ? "Login" : "Create account"}
          </button>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              marginTop: "0.2rem",
            }}
          >
            This is a front-end draft only. The form is not yet connected to a
            real backend authentication system.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
