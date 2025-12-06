import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

/**
 * Reserve section.
 * Shows a small preview of available units.
 */
function ReserveSection() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/units?limit=3`);
        if (!res.ok) return; // fail silently, UI still works
        const data = await res.json();
        setUnits(data);
      } catch (err) {
        console.error("Failed to load units preview:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, []);

  return (
    <section
      id="reserve"
      className="section"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "1.75rem",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.8rem",
                marginBottom: "0.75rem",
              }}
            >
              Reserve your storage unit
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-muted)",
                marginBottom: "1rem",
              }}
            >
              Browse available units by location, size and budget.
            </p>

            <Link to="/units" className="btn btn--primary">
              Browse all storage units
            </Link>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.6rem",
              }}
            >
              Quick preview
            </h3>

            {loading && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Loading units...
              </p>
            )}

            {!loading && units.length === 0 && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                No units available yet. Once added, they will
                appear here.
              </p>
            )}

            {!loading && units.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "0.75rem",
                }}
              >
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    className="card"
                    style={{
                      border: "1px solid var(--color-border)",
                      padding: "0.8rem 0.9rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: "0.95rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {unit.label}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {unit.location}
                        </p>
                        <p
                          style={{
                            fontSize: "0.8rem",
                          }}
                        >
                          Size:{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {unit.size_category}
                          </span>
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                          }}
                        >
                          {unit.price_per_month} JOD
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          / month
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReserveSection;
