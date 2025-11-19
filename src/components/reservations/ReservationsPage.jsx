// src/components/reservations/ReservationsPage.jsx
import React from "react";

/**
 * ReservationsPage
 *
 * UI-only page that shows a placeholder for reservations.
 * No redirect, always shows content for now.
 */
function ReservationsPage({ isLoggedIn, user }) {
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          My reservations
        </h2>

        <p style={{ maxWidth: "600px", marginBottom: "1.5rem" }}>
          This page will show your storage reservations once the system is
          connected to a backend. For now, it’s just a UI placeholder.
        </p>

        <div className="card" style={{ padding: "1.2rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.6rem" }}>
            Reservations overview
          </h3>

          <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            There are no reservations to display yet.
          </p>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px dashed var(--color-border)",
              backgroundColor: "rgba(255,255,255,0.7)",
              color: "var(--color-text-muted)",
              fontSize: "0.85rem",
            }}
          >
            What Are you waiting for ? Make your reservation now!
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationsPage;
