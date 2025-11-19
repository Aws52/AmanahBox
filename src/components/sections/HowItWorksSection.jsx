import React from "react";

const STEPS = [
  {
    title: "Create an account",
    text: "Sign up with your basic details so you can manage your reservations.",
  },
  {
    title: "Choose a unit",
    text: "Select a storage unit that matches the size and location you need.",
  },
  {
    title: "Confirm reservation",
    text: "Review your details and confirm your booking online.",
  },
  {
    title: "Move in your items",
    text: "Bring your belongings to the facility and store them securely.",
  },
];

function HowItWorksSection() {
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
            How it works
          </h2>
          <p>Four straightforward steps from creating an account to moving in.</p>
        </div>

        <div className="grid four-col">
          {STEPS.map((step, index) => (
            <div key={step.title} className="card">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  backgroundColor: "var(--color-accent-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                {index + 1}
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.4rem",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "0.9rem" }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
