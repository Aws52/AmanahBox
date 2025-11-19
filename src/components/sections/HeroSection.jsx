import React from "react";

function HeroSection() {
  return (
    <section
      id="hero"
      className="section"
      style={{
        background:
          "linear-gradient(135deg, rgba(72,86,150,0.04), rgba(249,199,132,0.15))",
      }}
    >
      <div className="container">
        <div className="two-col">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.9rem",
                borderRadius: 999,
                backgroundColor: "rgba(72,86,150,0.08)",
                color: "var(--color-primary)",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Self Storage · Secure · Flexible
            </span>

            <h1 style={{ fontSize: "2.4rem", lineHeight: 1.1 }}>
              Self storage made simple and secure.
            </h1>

            <p style={{ fontSize: "1rem", maxWidth: "32rem" }}>
              Store your belongings in a secure, monitored facility. Reserve
              online in a few steps and access your items when you need them.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#reserve" className="btn btn--primary">
                Reserve a storage unit
              </a>
              <a href="#features" className="btn btn--outline">
                Learn more
              </a>
            </div>
          </div>

          <div
            style={{
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-surface)",
              boxShadow: "var(--shadow-soft)",
              height: "260px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
