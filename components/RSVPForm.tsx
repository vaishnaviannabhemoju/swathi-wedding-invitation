"use client";

import { FormEvent, useState } from "react";

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

export default function RSVPForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    attending: true,
    guest_count: 1,
    events: [] as string[],
    message: "",
  });

  const updateField = (field: string, value: string | number | boolean) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleEvent = (event: string) => {
    setForm((previous) => {
      const exists = previous.events.includes(event);

      return {
        ...previous,
        events: exists
          ? previous.events.filter((item) => item !== event)
          : [...previous.events, event],
      };
    });
  };

  const setGuestCount = (value: number) => {
    const next = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, value));
    updateField("guest_count", next);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_name: form.guest_name,
          email: form.email || null,
          attending: form.attending,
          guest_count: form.attending ? form.guest_count : 0,
          guest_names: null,
          events: form.attending ? form.events : [],
          meal_preference: null,
          dietary_restrictions: null,
          message: form.message || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit RSVP.");
      }

      setSuccess(true);

      setForm({
        guest_name: "",
        email: "",
        attending: true,
        guest_count: 1,
        events: [],
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rsvp-success">
        <div className="success-icon">✓</div>

        <h3>Thank You!</h3>

        <p>
          Your RSVP has been received.
          <br />
          We can&apos;t wait to celebrate with you!
        </p>

        <button className="submit-button" onClick={() => setSuccess(false)}>
          Submit Another RSVP
        </button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="guest_name">Your Name *</label>

        <input
          id="guest_name"
          type="text"
          required
          placeholder="Enter your name"
          value={form.guest_name}
          onChange={(e) => updateField("guest_name", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email Address <span className="optional-label">(optional)</span>
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Will you be joining us?</label>

        <div className="attendance-options">
          <button
            type="button"
            className={
              form.attending ? "attendance-option active" : "attendance-option"
            }
            onClick={() => updateField("attending", true)}
          >
            Joyfully Accept
          </button>

          <button
            type="button"
            className={
              !form.attending ? "attendance-option active" : "attendance-option"
            }
            onClick={() => updateField("attending", false)}
          >
            Regretfully Decline
          </button>
        </div>
      </div>

      {form.attending && (
        <>
          <div className="form-group">
            <label htmlFor="guest_count">Number of Guests</label>

            <div className="guest-count-stepper">
              <button
                type="button"
                className="guest-count-step"
                aria-label="Decrease guests"
                disabled={form.guest_count <= MIN_GUESTS}
                onClick={() => setGuestCount(form.guest_count - 1)}
              >
                −
              </button>

              <input
                id="guest_count"
                type="number"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                inputMode="numeric"
                className="guest-count-input"
                value={form.guest_count}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (Number.isNaN(value)) return;
                  setGuestCount(value);
                }}
              />

              <button
                type="button"
                className="guest-count-step"
                aria-label="Increase guests"
                disabled={form.guest_count >= MAX_GUESTS}
                onClick={() => setGuestCount(form.guest_count + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Which celebrations will you attend?</label>

            <div className="event-checkboxes">
              {["Wedding", "Reception"].map((event) => (
                <label key={event} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={form.events.includes(event)}
                    onChange={() => toggleEvent(event)}
                  />

                  <span>{event}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="message">
          Message for the Couple{" "}
          <span className="optional-label">(optional)</span>
        </label>

        <textarea
          id="message"
          rows={4}
          placeholder="Leave us a little note..."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}
