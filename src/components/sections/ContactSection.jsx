import React from "react";

function ContactSection() {
  return (
    <section
      id="contact"
      className="section"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="container">
        <div className="two-col">
          <div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
              Contact
            </h2>
            <p style={{ maxWidth: "26rem" }}>
              If you have any questions about storage, access, or reservations,
              you can send a message using this form.
            </p>
          </div>

          <form
            className="card"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Form submission is not wired to a backend yet. This will be connected later."
              );
            }}
          >
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <div>
                <label
                  htmlFor="name"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: "0.85rem" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  style={{
                    width: "100%",
                    marginTop: "0.25rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>

              <button className="btn btn--primary" type="submit">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
