import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Plane, Hotel, Utensils, MapPin } from "lucide-react";

function Planner() {
  const [destination, setDestination] = useState("Manali");
  const [days, setDays] = useState(5);
  const [people, setPeople] = useState(2);
  const [style, setStyle] = useState("Balanced");

  const baseCosts = {
    Manali: 2500,
    Bali: 6500,
    Goa: 3000,
    Jaipur: 2200,
    Switzerland: 12000,
  };

  const multipliers = {
    Budget: 0.7,
    Balanced: 1,
    Comfort: 1.6,
  };

  const total = Math.round(
    baseCosts[destination] * days * people * multipliers[style]
  );

  return (
    <main className="planner-page">
      <section className="planner-heading">
        <span className="eyebrow">PLAN WITHOUT THE STRESS</span>
        <h1>Your journey, <em>your budget.</em></h1>
        <p>Build a trip that fits your dreams and your wallet.</p>
      </section>

      <section className="planner-layout">
        <motion.div
          className="planner-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Customize your trip</h2>

          <label>Where do you want to go?</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            {Object.keys(baseCosts).map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>

          <label>How many days?</label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
          />

          <label>Number of travellers</label>
          <input
            type="number"
            min="1"
            max="20"
            value={people}
            onChange={(e) => setPeople(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
          />

          <label>Choose your travel style</label>
          <div className="travel-styles">
            {Object.keys(multipliers).map((item) => (
              <button
                key={item}
                className={style === item ? "style-active" : ""}
                onClick={() => setStyle(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="planner-result"
          key={total}
          initial={{ opacity: 0.6, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="result-icon">
            <Calculator size={25} />
          </div>
          <span>YOUR ESTIMATED TRIP BUDGET</span>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
          <p>Estimated total for {people} traveller(s) over {days} days.</p>

          <div className="budget-breakdown">
            <div><Plane /> <span>Transport</span><strong>30%</strong></div>
            <div><Hotel /> <span>Accommodation</span><strong>35%</strong></div>
            <div><Utensils /> <span>Food</span><strong>20%</strong></div>
            <div><MapPin /> <span>Activities & extras</span><strong>15%</strong></div>
          </div>

          <small>Illustrative estimate only. Actual costs may vary.</small>
        </motion.div>
      </section>
    </main>
  );
}

export default Planner;