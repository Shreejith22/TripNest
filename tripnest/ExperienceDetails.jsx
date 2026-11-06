
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Wallet,
  Heart,
  CheckCircle,
  Camera,
} from "lucide-react";

function ExperienceDetails() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const experience = location.state?.place;
  
const [gallery, setGallery] = useState([]);

useEffect(() => {
  if (!experience?.name) return;

  const loadImages = async () => {
    try {
      const params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: `${experience.name} ${experience.country || "India"}`,
        gsrnamespace: "6",
        gsrlimit: "6",
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: "1200",
        format: "json",
        origin: "*",
      });

      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?${params}`
      );

      const data = await response.json();

      const images = Object.values(data.query?.pages || {})
        .map((page) => page.imageinfo?.[0]?.thumburl)
        .filter(Boolean);

      setGallery(
        images.length > 0
          ? images.slice(0, 5)
          : experience.image
            ? [experience.image]
            : []
      );
    } catch (error) {
      console.error("Image loading failed:", error);
      setGallery(experience.image ? [experience.image] : []);
    }
  };

  loadImages();
}, [experience?.name]);


  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!experience) {
    return (
      <main className="experience-details-page">
        <button onClick={() => navigate("/explore")}>
          <ArrowLeft size={18} /> Back to Explore
        </button>
        <h1>Experience details unavailable</h1>
        <p>Please return to Explore and select an experience again.</p>
      </main>
    );
  }

  


  const addToTrips = () => {
    const existing = JSON.parse(
      localStorage.getItem("tripnestSavedExperiences") || "[]"
    );

    if (!existing.some((item) => item.name === experience.name)) {
      existing.push({
        ...experience,
        status: "accepted",
        addedAt: new Date().toISOString(),
      });

      localStorage.setItem(
        "tripnestSavedExperiences",
        JSON.stringify(existing)
      );
    }

    setSaved(true);
  };

  return (
    <main className="experience-details-page">
      <button
        className="details-back"
        onClick={() => navigate("/explore")}
      >
        <ArrowLeft size={18} /> Back to Explore
      </button>

      <section className="details-hero">
        <img
  src={gallery[activeImage] || experience.image}
  alt={`${experience.name} destination`}
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>
        <div className="details-hero-overlay">
          <span>{experience.category}</span>
          <h1>{experience.name}</h1>
          <p>{experience.description}</p>
        </div>
      </section>

      <div className="details-gallery">
        {gallery.map((image, index) => (
          <button
            key={index}
            className={activeImage === index ? "gallery-active" : ""}
            onClick={() => setActiveImage(index)}
          >
            <img src={image} alt={`${experience.name} view ${index + 1}`} />
          </button>
        ))}
      </div>

      <section className="details-content">
        <div className="details-main">
          <span className="eyebrow">DISCOVER SOMETHING NEW</span>
          <h2>Make this experience yours.</h2>
          <p>{experience.description}</p>

          <div className="details-highlights">
            <div>
              <Wallet />
              <span>Estimated budget</span>
              <strong>{experience.price}</strong>
            </div>

            <div>
              <MapPin />
              <span>Experience type</span>
              <strong>{experience.country}</strong>
            </div>

            <div>
              <Clock />
              <span>Suggested duration</span>
              <strong>2–4 hours</strong>
            </div>
          </div>
        </div>

        <aside className="details-action-card">
          <Camera size={25} />
          <h3>Ready for your next experience?</h3>
          <p>Save this idea and find it easily in your TripNest plans.</p>

          <button
            className="accept-experience"
            onClick={addToTrips}
          >
            {saved ? (
              <><CheckCircle size={17} /> Added to My Trips</>
            ) : (
              <><Heart size={17} /> Add to My Trips</>
            )}
          </button>
        </aside>
      </section>
    </main>
  );
}

export default ExperienceDetails;
