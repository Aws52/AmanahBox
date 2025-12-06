// src/components/units/UnitsPage.jsx
import React, { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const UNIT_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const UNIT_LOCATIONS = [
  "Amman",
  "AzZarqa",
  "Irbid",
  "Aqaba",
];

const SIZE_ORDER = {
  small: 1,
  medium: 2,
  large: 3,
};

function UnitsPage() {
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [climateOnly, setClimateOnly] = useState(false);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("price"); // 'alpha' | 'size' | 'price'
  const [sortDirection, setSortDirection] = useState("asc");


  // Reservation popup
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [resFullName, setResFullName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resStartDate, setResStartDate] = useState("");
  const [resEndDate, setResEndDate] = useState("");
  const [resSubmitting, setResSubmitting] = useState(false);

  const fetchUnits = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.location) params.set("location", filters.location);
      if (filters.size) params.set("size", filters.size);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
      if (filters.climateOnly) params.set("climateControlled", "true");

      const query = params.toString();
      const url = `${API_BASE_URL}/units${query ? `?${query}` : ""}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      setUnits(data);
    } catch (err) {
      console.error("Failed to load units:", err);
      setError("Could not load units. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load all available units on first load
  useEffect(() => {
    fetchUnits({});
  }, []);

  const handleApplyFilters = () => {
    fetchUnits({ location, size, maxPrice, climateOnly });
  };

  const handleResetFilters = () => {
    setLocation("");
    setSize("");
    setMaxPrice("");
    setClimateOnly(false);
    fetchUnits({});
  };

  const sortedUnits = [...units].sort((a, b) => {
    if (sortBy === "alpha") {
      const la = a.label.toLowerCase();
      const lb = b.label.toLowerCase();
      if (la < lb) return sortDirection === "asc" ? -1 : 1;
      if (la > lb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    if (sortBy === "size") {
      const sa = SIZE_ORDER[a.size_category] || 0;
      const sb = SIZE_ORDER[b.size_category] || 0;
      if (sa < sb) return sortDirection === "asc" ? -1 : 1;
      if (sa > sb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    // price
    if (a.price_per_month < b.price_per_month)
      return sortDirection === "asc" ? -1 : 1;
    if (a.price_per_month > b.price_per_month)
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container">
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              marginBottom: "0.5rem",
            }}
          >
            Browse storage units
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-text-muted)",
              maxWidth: "40rem",
            }}
          >
            Use the filters below to find a suitable storage unit.
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
            <select
              id="filter-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.55rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            >
              {UNIT_LOCATIONS.map((loc) => (
                <option key={loc || "any"} value={loc}>
                  {loc || "Any location"}
                </option>
              ))}
            </select>
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
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.55rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            >
              {UNIT_SIZES.map((s) => (
                <option key={s.value || "any"} value={s.value}>
                  {s.label}
                </option>
              ))}
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
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
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

          <div style={{ minWidth: "160px", marginTop: "0.8rem" }}>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
              }}
            >
              <input
                type="checkbox"
                checked={climateOnly}
                onChange={(e) => setClimateOnly(e.target.checked)}
              />
              Climate controlled only
            </label>
          </div>

          <button
            type="button"
            onClick={handleApplyFilters}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Apply filters
          </button>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.8rem" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                fontSize: "0.8rem",
                padding: "0.25rem 0.45rem",
                borderRadius: "999px",
                border: "1px solid var(--color-border)",
              }}
            >
              <option value="alpha">Alphabetical (label)</option>
              <option value="size">Size</option>
              <option value="price">Price</option>
            </select>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              style={{
                fontSize: "0.8rem",
                padding: "0.25rem 0.45rem",
                borderRadius: "999px",
                border: "1px solid var(--color-border)",
              }}
            >
              <option value="asc">
                {sortBy === "size" ? "Small → Large" : "Ascending"}
              </option>
              <option value="desc">
                {sortBy === "size" ? "Large → Small" : "Descending"}
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "999px",
              border: "1px solid var(--color-border)",
              backgroundColor: "transparent",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>


        {/* Units grid */}
        <div className="card">
          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.6rem",
            }}
          >
            Available units
          </h3>

          {loading && (
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Loading units...
            </p>
          )}

          {error && !loading && (
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
                color: "var(--color-error, #c0392b)",
              }}
            >
              {error}
            </p>
          )}

          {!loading && !error && units.length === 0 && (
            <>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                There are no units to display with the current filters.
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Try removing some filters or check back later once new units
                are added by the admin.
              </p>
            </>
          )}

          {!loading && !error && units.length > 0 && (
            <div
              style={{
                marginTop: "0.75rem",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.9rem",
              }}
            >
              {sortedUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="card"
                  style={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {unit.label}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginBottom: "0.25rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {unit.location}
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Size:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {unit.size_category}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {unit.price_per_month} JOD / month
                  </p>

                  <p
                    style={{
                      fontSize: "0.8rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Climate controlled:{" "}
                    <strong>{unit.climate_controlled ? "Yes" : "No"}</strong>
                  </p>

                  {unit.details && (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        marginBottom: "0.5rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {unit.details.length > 120
                        ? unit.details.slice(0, 120) + "..."
                        : unit.details}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.4rem",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        textTransform: "capitalize",
                        backgroundColor:
                          unit.status === "available"
                            ? "rgba(46, 204, 113, 0.1)"
                            : "rgba(149, 165, 166, 0.1)",
                        color: unit.status === "available" ? "#27ae60" : "#7f8c8d",
                      }}
                    >
                      {unit.status}
                    </span>

                    <button
                      type="button"
                      disabled={unit.status !== "available"}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setResFullName("");
                        setResEmail("");
                        setResPhone("");
                        setResStartDate("");
                        setResEndDate("");
                      }}
                      style={{
                        padding: "0.4rem 0.8rem",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "0.8rem",
                        cursor: unit.status === "available" ? "pointer" : "not-allowed",
                        backgroundColor:
                          unit.status === "available"
                            ? "var(--color-primary)"
                            : "var(--color-border)",
                        color: "#ffffff",
                      }}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedUnit && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "420px",
              width: "100%",
              padding: "1.25rem 1.4rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.4rem",
              }}
            >
              Reserve {selectedUnit.label}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                marginBottom: "0.8rem",
              }}
            >
              {selectedUnit.location} &middot;{" "}
              <span style={{ textTransform: "capitalize" }}>
                {selectedUnit.size_category}
              </span>{" "}
              &middot; {selectedUnit.price_per_month} JOD / month
            </p>

            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                marginBottom: "0.8rem",
              }}
            >
              <label style={{ fontSize: "0.8rem" }}>
                Full name
                <input
                  type="text"
                  value={resFullName}
                  onChange={(e) => setResFullName(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.45rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </label>

              <label style={{ fontSize: "0.8rem" }}>
                Email
                <input
                  type="email"
                  value={resEmail}
                  onChange={(e) => setResEmail(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.45rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </label>

              <label style={{ fontSize: "0.8rem" }}>
                Phone (optional)
                <input
                  type="tel"
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.45rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "0.5rem",
                }}
              >
                <label style={{ fontSize: "0.8rem" }}>
                  Start date
                  <input
                    type="date"
                    value={resStartDate}
                    onChange={(e) => setResStartDate(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "0.25rem",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                    }}
                  />
                </label>
                <label style={{ fontSize: "0.8rem" }}>
                  End date
                  <input
                    type="date"
                    value={resEndDate}
                    onChange={(e) => setResEndDate(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "0.25rem",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                    }}
                  />
                </label>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedUnit(null)}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "999px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "transparent",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={resSubmitting}
                onClick={async () => {
                  if (
                    !resFullName ||
                    !resEmail ||
                    !resStartDate ||
                    !resEndDate
                  ) {
                    alert("Please fill in all required fields.");
                    return;
                  }
                  try {
                    setResSubmitting(true);
                    const res = await fetch(`${API_BASE_URL}/reservations`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        unitId: selectedUnit.id,
                        fullName: resFullName,
                        email: resEmail,
                        phone: resPhone,
                        startDate: resStartDate,
                        endDate: resEndDate,
                      }),
                    });
                    if (!res.ok) {
                      const body = await res.json().catch(() => ({}));
                      const msg =
                        body.error || `Reservation failed (${res.status})`;
                      throw new Error(msg);
                    }
                    await res.json();
                    alert(
                      "Reservation request sent successfully. Our team will contact you."
                    );
                    setSelectedUnit(null);
                    fetchUnits({ location, size, maxPrice, climateOnly });
                  } catch (err) {
                    console.error("Error creating reservation:", err);
                    alert(err.message || "Could not create reservation.");
                  } finally {
                    setResSubmitting(false);
                  }
                }}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {resSubmitting ? "Submitting..." : "Confirm reservation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UnitsPage;
