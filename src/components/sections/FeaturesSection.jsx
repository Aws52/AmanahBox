import React from "react";

const FEATURES = [
  {
    title: "Secure access",
    description:
      "Controlled access and monitored entry points help keep your stored items protected.",
  },
  {
    title: "Flexible storage",
    description:
      "Different unit sizes so you can store a few boxes or full household items.",
  },
  {
    title: "Convenient booking",
    description:
      "Reserve and manage your storage unit online without long processes.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            maxWidth: "32rem",
            marginInline: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>
            Why use AmanahBox?
          </h2>
          <p>
            A simple self-storage experience designed to be clear, predictable,
            and easy to use.
          </p>
        </div>

        <div className="grid three-col">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="card">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "0.9rem" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
