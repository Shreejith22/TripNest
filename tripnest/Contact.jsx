
import { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-eyebrow">LET'S PLAN SOMETHING BEAUTIFUL</p>
        <h1>Your next adventure starts here.</h1>
        <p>Tell us where you dream of going. We'll help you plan the journey.</p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Have a question or a trip idea? Send us an enquiry.</p>

          <div className="contact-detail">
            <MapPin />
            <span>Explore destinations across India and beyond</span>
          </div>
          <div className="contact-detail">
            <Mail />
            <span>hello@tripnest.demo</span>
          </div>
          <div className="contact-detail">
            <Phone />
            <span>Contact details coming soon</span>
          </div>

          <p className="contact-note">
            TripNest is a demonstration project. Enquiries are not sent to a
            real travel agency and no bookings or payments are made.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Booking enquiry</h2>

          <label>Your name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label>Dream destination</label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Where would you like to go?"
            required
          />

          <label>Preferred travel date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Tell us about your trip</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Number of travellers, interests, budget..."
            rows="4"
          />

          <button type="submit">
            Send enquiry <Send size={16} />
          </button>

          {submitted && (
            <p className="contact-success">
              Thank you, {form.name}! Your demo enquiry has been recorded on
              this screen.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
