import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, CalendarDays, Plus, Plane, Trash2 } from "lucide-react";

function MyTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: "Manali Escape",
      location: "Himachal Pradesh, India",
      date: "December 2026",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Bali Adventure",
      location: "Bali, Indonesia",
      date: "March 2027",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900",
      status: "Dream Trip",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const addTrip = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !date) return;

    setTrips((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        location,
        date,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900",
        status: "Dream Trip",
      },
    ]);

    setName("");
    setLocation("");
    setDate("");
    setShowForm(false);
  };

  const removeTrip = (id) => {
    setTrips((previous) => previous.filter((trip) => trip.id !== id));
  };

  return (
    <main className="mytrips-page">
      <section className="mytrips-heading">
        <span className="eyebrow">YOUR PERSONAL TRAVEL COLLECTION</span>
        <h1>Every journey tells <em>a story.</em></h1>
        <p>Keep your travel dreams, plans and memories in one place.</p>

        <button
          className="add-trip-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} /> Add a trip
        </button>
      </section>

      {showForm && (
        <form className="trip-form" onSubmit={addTrip}>
          <h2>Add your next adventure</h2>

          <label>Trip name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Goa getaway"
            required
          />

          <label>Destination</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Goa, India"
            required
          />

          <label>Travel date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Save trip</button>
        </form>
      )}

      <section className="mytrips-content">
        <div className="mytrips-section-title">
          <div>
            <span className="eyebrow">YOUR COLLECTION</span>
            <h2>Adventures & dreams</h2>
          </div>
          <span>{trips.length} trips saved</span>
        </div>

        {trips.length > 0 ? (
          <div className="mytrips-grid">
            {trips.map((trip, index) => (
              <motion.article
                className="mytrip-card"
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mytrip-image">
                  <img src={trip.image} alt={trip.name} />
                  <span>{trip.status}</span>
                </div>

                <div className="mytrip-info">
                  <h3>{trip.name}</h3>

                  <p><MapPin size={15} /> {trip.location}</p>
                  <p><CalendarDays size={15} /> {trip.date}</p>

                  <button
                    className="remove-trip"
                    onClick={() => removeTrip(trip.id)}
                  >
                    <Trash2 size={15} /> Remove trip
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="empty-trips">
            <Plane size={35} />
            <h3>Your next adventure starts here.</h3>
            <p>Add a trip to begin your personal travel collection.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyTrips;