import Image from "next/image";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";

const events = [
  {
    emoji: "🪔",
    title: "Wedding",
    date: "Saturday, November 21, 2026",
    time: "Muhurtam · 9:55 AM",
    venue: "Bella Terra Venue",
    address: "1384 Kerfoot Dr\nGunter, TX 75058",
    description:
      "Join us as we celebrate the sacred beginning of our new journey together.",
    dressCode: "Traditional Indian Attire 🪷",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bella+Terra+Venue+1384+Kerfoot+Dr+Gunter+TX+75058",
    theme: "wedding",
  },
  {
    emoji: "🥂",
    title: "Reception",
    date: "Sunday, November 22, 2026",
    time: "6:30 PM onwards",
    venue: "The Bliss at Aubrey",
    address: "4381 US-377\nAubrey, TX 76227",
    description:
      "Dinner, dancing and one more evening of celebrating with everyone we love.",
    dressCode: "Formal / Indian Formal",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Bliss+at+Aubrey+4381+US-377+Aubrey+TX+76227",
    theme: "reception",
  },
];

export default function WeddingInvitation() {
  return (
    <main className="invite-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          {/* Photo: public/images/background.jpg */}
          <Image
            src="/images/background.jpg"
            alt=""
            fill
            priority
            className="hero-photo"
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="monogram animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <span>S</span>
            <span className="monogram-amp">&</span>
            <span>S</span>
          </div>

          <p className="eyebrow animate-fade-in" style={{ animationDelay: "0.12s" }}>
            You Are Cordially Invited to Celebrate
          </p>

          <h1 className="name-bride animate-fade-in" style={{ animationDelay: "0.22s" }}>
            Swathi
          </h1>
          <p className="name-amp animate-fade-in" style={{ animationDelay: "0.32s" }}>
            &amp;
          </p>
          <h1 className="name-groom animate-fade-in" style={{ animationDelay: "0.42s" }}>
            Shiva Prasad Reddy
          </h1>

          <p className="hero-tagline animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Two hearts, one journey · A lifetime of togetherness
          </p>

          <div className="hero-event-details animate-fade-in" style={{ animationDelay: "0.58s" }}>
            <p className="hero-event-date">Saturday, November 21, 2026</p>
            <p className="hero-event-muhurtam">Muhurtam · 9:55 AM</p>
            <p className="hero-event-venue">Bella Terra Venue · Gunter, TX</p>
          </div>

          <div
            className="pill pill-burgundy animate-fade-in"
            style={{ animationDelay: "0.66s" }}
          >
            🎉 Wedding &amp; Reception
          </div>

          <div
            className="pill pill-gold animate-fade-in"
            style={{ animationDelay: "0.72s" }}
          >
            📅 RSVP by November 1, 2026
          </div>

          <div className="hero-actions animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <a href="#events" className="btn-primary">
              View My Events
            </a>
            <a href="#rsvp" className="btn-outline">
              RSVP Now
            </a>
          </div>
        </div>
      </section>

      {/* Families section hidden for now */}

      {/* EVENTS */}
      <section id="events" className="section events-section">
        <div className="section-header">
          <p className="section-label">Gather With Love</p>
          <h2>A Day to Cherish</h2>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <article
              key={event.title}
              className={`event-card event-card--${event.theme}`}
            >
              <div className="event-accent" />

              <div className="event-body">
                <div className="event-icon">{event.emoji}</div>

                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-time">{event.time}</p>

                <div className="event-rule" />

                <p className="event-venue">{event.venue}</p>
                <p className="event-address">{event.address}</p>

                <div className="dress-code">
                  <span className="dress-icon">👗</span>
                  <p>
                    <span className="dress-label">Dress Code</span>
                    {event.dressCode}
                  </p>
                </div>

                <p className="event-description">{event.description}</p>

                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-button"
                >
                  📍 Open in Maps ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="countdown-section">
        <div className="countdown-content">
          <p className="section-label section-label-light">Counting Down to Forever</p>
          <h2>Where Two Souls Become One ✨</h2>
          <p className="countdown-date">November 21, 2026 · 9:55 AM</p>

          <Countdown targetDate="2026-11-21T09:55:00" />
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section rsvp-section">
        <h2>
          Kindly <span>RSVP</span>
        </h2>
        <p className="rsvp-deadline">Please respond by November 1, 2026</p>
        <p className="rsvp-note">
          Let us know so we can celebrate with you properly 🌸
        </p>

        <div className="rsvp-container">
          <RSVPForm />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-monogram">
          <span>S</span>
          <span>&</span>
          <span>S</span>
        </div>
        <p className="footer-names">Swathi &amp; Shiva Prasad Reddy</p>
        <p className="footer-date">21 · 11 · 2026</p>
        <p className="footer-message">
          With love and gratitude,
          <br />
          we can&apos;t wait to celebrate with you.
        </p>
      </footer>
    </main>
  );
}
