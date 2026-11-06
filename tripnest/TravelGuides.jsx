import { motion } from "motion/react";
import {
  Sun, Backpack, Compass, Camera,
  Mountain, ShieldCheck, ArrowUpRight
} from "lucide-react";

const guides = [
  {
    category: "BEST SEASONS",
    title: "When to visit the mountains",
    description: "Discover the perfect seasons for mountain escapes, scenic views and unforgettable hikes.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900",
    icon: Mountain,
    read: "5 min read",
  },
  {
    category: "TRAVEL ESSENTIALS",
    title: "Pack smarter, travel lighter",
    description: "A practical packing guide to help you carry everything you need without overpacking.",
    image: "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=900",
    icon: Backpack,
    read: "4 min read",
  },
  {
    category: "TRAVEL PLANNING",
    title: "Plan your first international trip",
    description: "From documents to budgets, learn how to prepare for your first overseas adventure.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900",
    icon: Compass,
    read: "7 min read",
  },
  {
    category: "PHOTOGRAPHY",
    title: "Capture beautiful travel memories",
    description: "Simple photography tips to make your travel moments look extraordinary.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900",
    icon: Camera,
    read: "3 min read",
  },
];

const tips = [
  {
    icon: Sun,
    title: "Check the season",
    text: "Research local weather and seasonal conditions before booking.",
  },
  {
    icon: ShieldCheck,
    title: "Travel prepared",
    text: "Keep important documents and emergency contacts accessible.",
  },
  {
    icon: Backpack,
    title: "Pack essentials",
    text: "Carry versatile clothing, medicines and useful travel accessories.",
  },
];

function TravelGuides() {
  return (
    <main className="guides-page">
      <section className="guides-hero">
        <div className="guides-hero-content">
          <span className="eyebrow">THE TRIPNEST TRAVEL JOURNAL</span>
          <h1>Travel better.<br /><em>Experience more.</em></h1>
          <p>
            Thoughtful guides, useful tips and inspiration to make
            every journey more meaningful.
          </p>
        </div>
      </section>

      <section className="guides-intro">
        <span className="eyebrow">EXPLORE THE JOURNAL</span>
        <h2>A little knowledge goes a long way.</h2>
        <p>
          Get inspired, prepare confidently and discover new ways
          to experience the world.
        </p>
      </section>

      <section className="guides-grid">
        {guides.map((guide, index) => {
          const Icon = guide.icon;

          return (
            <motion.article
              className="guide-card"
              key={guide.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="guide-image">
                <img src={guide.image} alt={guide.title} />
                <span>{guide.category}</span>
              </div>

              <div className="guide-info">
                <div className="guide-icon"><Icon size={20} /></div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>

                <div className="guide-bottom">
                  <span>{guide.read}</span>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      <section className="travel-tips-section">
        <span className="eyebrow">TRAVEL WISELY</span>
        <h2>Little tips. Better journeys.</h2>

        <div className="travel-tips-grid">
          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <div className="travel-tip-card" key={tip.title}>
                <Icon size={27} />
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default TravelGuides;