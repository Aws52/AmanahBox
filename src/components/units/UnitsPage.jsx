// src/components/units/UnitsPage.jsx
import React from "react";

/**
 * UnitsPage
 *
 * Page that will eventually list all storage units with filters.
 * For now:
 * - Filter bar UI
 * - Empty grid placeholder
 */
function UnitsPage() {
  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
            Storage units
          </h2>
          <p style={{ maxWidth: "36rem" }}>
            Here you will be able to see all available storage units once the
            admin dashboard and backend are connected.
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="card"
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "flex-end",
          }}
        >
          <div style={{ minWidth: "160px" }}>
            <label
              htmlFor="filter-location"
              style={{ display: "block", fontSize: "0.8rem" }}
            >
              Location
            </label>
            <input
              id="filter-location"
              type="text"
              placeholder="e.g. Amman"
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

          <div style={{ minWidth: "160px" }}>
            <label
              htmlFor="filter-size"
              style={{ display: "block", fontSize: "0.8rem" }}
            >
              Size
            </label>
            <select
              id="filter-size"
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.55rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            >
              <option value="">Any size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div style={{ minWidth: "160px" }}>
            <label
              htmlFor="filter-price"
              style={{ display: "block", fontSize: "0.8rem" }}
            >
              Max monthly price
            </label>
            <input
              id="filter-price"
              type="number"
              placeholder="e.g. 100"
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

          <button
            type="button"
            className="btn btn--primary"
            style={{ marginLeft: "auto" }}
          >
            Apply filters
          </button>
        </div>

        {/* Units grid placeholder */}
        <div className="card">
          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.6rem",
            }}
          >
            Available units
          </h3>

          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            There are no units to display yet.
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              marginBottom: "0.9rem",
            }}
          >
            Once your backend is ready, this section will show a list of units
            based on the filters above. The admin dashboard will control what
            appears here.
          </p>

          <div
            style={{
              marginTop: "0.5rem",
              padding: "1rem",
              borderRadius: "10px",
              border: "1px dashed var(--color-border)",
              backgroundColor: "rgba(255,255,255,0.7)",
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
            }}
          >
            Units grid will be rendered here in the future
            (cards with size, location, price, status).
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnitsPage;
