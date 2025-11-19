import React from "react";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        marginTop: "3rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem 1rem",
          fontSize: "0.85rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>
            © {new Date().getFullYear()} AmanahBox. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <HashLink smooth to="/#hero" style={{ color: "var(--color-text-muted)" }}>
              Home
            </HashLink>

            <HashLink smooth to="/#reserve" style={{ color: "var(--color-text-muted)" }}>
              Storage
            </HashLink>

            <HashLink smooth to="/#contact" style={{ color: "var(--color-text-muted)" }}>
              Contact
            </HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
