import React from "react";
import { Link } from "react-router-dom";

/**
 * Reserve section.
 * No hard-coded units yet; admin dashboard will manage units later.
 */
function ReserveSection() {
  return (
    <section
      id="reserve"
      className="section"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container">
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          <h2 style={{ fontSize: "1.7rem" }}>Reserve a storage unit</h2>
          <p>
            When admin dashboard is ready, this section will show available
            storage units from backend.
          </p>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.7rem",
              fontSize: "0.95rem",
            }}
          >
            There are no storage units listed yet.
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              marginBottom: "1rem",
            }}
          >
            Once the admin dashboard is implemented, new units will appear here
            automatically.
          </p>
          <Link to="/units" className="btn btn--primary">
            Browse all storage units
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ReserveSection;
