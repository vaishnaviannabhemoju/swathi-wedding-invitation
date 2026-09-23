"use client";

import { FormEvent, useState } from "react";

export default function RSVPForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    attending: true,
    guest_count: 1,
    guest_names: "",
    events: [] as string[],
    meal_preference: "",
    dietary_restrictions: "",
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
        body: JSON.stringify(form),
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
        guest_names: "",
        events: [],
        meal_preference: "",
        dietary_restrictions: "",
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
          We can't wait to celebrate with you!
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
        <label htmlFor="email">Email Address</label>

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

            <select
              id="guest_count"
              value={form.guest_count}
              onChange={(e) =>
                updateField("guest_count", Number(e.target.value))
              }
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="guest_names">Names of Other Guests</label>

            <input
              id="guest_names"
              type="text"
              placeholder="e.g. Priya, Anil"
              value={form.guest_names}
              onChange={(e) => updateField("guest_names", e.target.value)}
            />
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

          <div className="form-group">
            <label htmlFor="meal_preference">Meal Preference</label>

            <select
              id="meal_preference"
              value={form.meal_preference}
              onChange={(e) => updateField("meal_preference", e.target.value)}
            >
              <option value="">Select preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dietary_restrictions">Dietary Restrictions</label>

            <input
              id="dietary_restrictions"
              type="text"
              placeholder="Please let us know"
              value={form.dietary_restrictions}
              onChange={(e) =>
                updateField("dietary_restrictions", e.target.value)
              }
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="message">Message for the Couple</label>

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
