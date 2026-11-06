
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Search, ArrowUpRight, Wallet } from "lucide-react";


const destinations = [
  // CULTURE
  {
    name: "Hampi",
    country: "India",
    category: "Culture",
    estimatedCost: 3500,
    price: "₹3,500",
    image: "https://images.unsplash.com/photo-1600100397608-f010b1a5e0d8?w=900",
    description: "Explore the ancient Vijayanagara ruins and remarkable stone architecture.",
  },
  {
    name: "Jaipur",
    country: "India",
    category: "Culture",
    estimatedCost: 6000,
    price: "₹6,000",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900",
    description: "Discover royal palaces, colourful markets and Rajasthan's rich heritage.",
  },
  {
    name: "Mysuru",
    country: "India",
    category: "Culture",
    estimatedCost: 2500,
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=900",
    description: "Experience royal history, grand architecture and vibrant local traditions.",
  },
  {
    name: "Madurai",
    country: "India",
    category: "Culture",
    estimatedCost: 4500,
    price: "₹4,500",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=900",
    description: "Discover historic temples, colourful streets and Tamil heritage.",
  },
  {
    name: "Varanasi",
    country: "India",
    category: "Culture",
    estimatedCost: 6500,
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1561361513-3243a5e5e1b9?w=900",
    description: "Experience the historic ghats, riverfront and spiritual traditions.",
  },
  {
    name: "Jodhpur",
    country: "India",
    category: "Culture",
    estimatedCost: 6500,
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900",
    description: "Explore blue streets, magnificent forts and royal Rajasthani culture.",
  },
  {
    name: "Udaipur",
    country: "India",
    category: "Culture",
    estimatedCost: 7000,
    price: "₹7,000",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=900",
    description: "Discover lakeside palaces, historic architecture and beautiful old streets.",
  },

  // MUSEUMS & HERITAGE
  {
    name: "Khajuraho",
    country: "India",
    category: "Museums & Heritage",
    estimatedCost: 7000,
    price: "₹7,000",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=900",
    description: "Explore extraordinary temple architecture and UNESCO heritage.",
  },
  {
    name: "Mahabalipuram",
    country: "India",
    category: "Museums & Heritage",
    estimatedCost: 3500,
    price: "₹3,500",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900",
    description: "Discover ancient rock-cut temples and historic coastal monuments.",
  },
  {
    name: "Delhi",
    country: "India",
    category: "Museums & Heritage",
    estimatedCost: 5500,
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900",
    description: "Visit historic monuments, museums and centuries-old landmarks.",
  },

  // BEACHES
  {
    name: "Gokarna",
    country: "India",
    category: "Beaches",
    estimatedCost: 3000,
    price: "₹3,000",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900",
    description: "Relax on peaceful beaches and enjoy coastal sunsets.",
  },
  {
    name: "Goa",
    country: "India",
    category: "Beaches",
    estimatedCost: 5500,
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900",
    description: "Enjoy golden beaches, coastal food and lively seaside experiences.",
  },
  {
    name: "Varkala",
    country: "India",
    category: "Beaches",
    estimatedCost: 6500,
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900",
    description: "Discover dramatic coastal cliffs and beautiful Arabian Sea views.",
  },

  // MOUNTAINS
  {
    name: "Coorg",
    country: "India",
    category: "Mountains",
    estimatedCost: 4500,
    price: "₹4,500",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=900",
    description: "Explore coffee plantations, misty hills and refreshing nature escapes.",
  },
  {
    name: "Ooty",
    country: "India",
    category: "Mountains",
    estimatedCost: 5500,
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900",
    description: "Enjoy green valleys, tea gardens and cool mountain weather.",
  },
  {
    name: "Munnar",
    country: "India",
    category: "Mountains",
    estimatedCost: 6500,
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900",
    description: "Experience rolling tea gardens and spectacular mountain scenery.",
  },

  // ADVENTURE
  {
    name: "Rishikesh",
    country: "India",
    category: "Adventure",
    estimatedCost: 5000,
    price: "₹5,000",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=900",
    description: "Try river rafting, mountain adventures and peaceful riverside escapes.",
  },
  {
    name: "Bir Billing",
    country: "India",
    category: "Adventure",
    estimatedCost: 8500,
    price: "₹8,500",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900",
    description: "Discover paragliding, mountain trails and Himalayan views.",
  },
];

const nearbyExperiences = [
  {
    name: "Street Food Trail",
    country: "Local Experience",
    category: "Food & Dining",
    estimatedCost: 150,
    price: "₹150 onwards",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900",
    description: "Discover local street food and delicious hidden gems.",
  },
  {
    name: "Cafe Hopping",
    country: "Local Experience",
    category: "Food & Dining",
    estimatedCost: 300,
    price: "₹300 onwards",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900",
    description: "Spend a relaxed afternoon exploring cosy cafes.",
  },
  {
    name: "Park & Lakeside Escape",
    country: "Local Experience",
    category: "Parks & Outdoors",
    estimatedCost: 100,
    price: "₹100 onwards",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    description: "Enjoy greenery, fresh air and a peaceful walk.",
  },
  {
    name: "Bowling & Games",
    country: "Local Experience",
    category: "Fun & Activities",
    estimatedCost: 400,
    price: "₹400 onwards",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900",
    description: "Make your weekend fun with games and friendly competition.",
  },
  {
    name: "Local Market Exploration",
    country: "Local Experience",
    category: "Shopping",
    estimatedCost: 200,
    price: "₹200 onwards",
    image: "https://images.unsplash.com/photo-1481437156560-320f252d02b5?w=900",
    description: "Explore local markets, street shopping and unique finds.",
  },
  {
    name: "Museum & Heritage Day",
    country: "Local Experience",
    category: "Parks & Outdoors",
    estimatedCost: 250,
    price: "₹250 onwards",
    image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=900",
    description: "Discover local history, art and culture.",
  },
];

function DestinationPhoto({ place }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    let active = true;

    const loadImage = async () => {
      try {
        const params = new URLSearchParams({
          action: "query",
          generator: "search",
          gsrsearch: `${place.name} ${place.country || "India"}`,
          gsrnamespace: "6",
          gsrlimit: "5",
          prop: "imageinfo",
          iiprop: "url",
          iiurlwidth: "900",
          format: "json",
          origin: "*",
        });

        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?${params}`
        );

        const data = await response.json();
        const results = Object.values(data.query?.pages || {});
        const photo = results[0]?.imageinfo?.[0]?.thumburl;

        if (active && photo) setImage(photo);
      } catch (error) {
        console.error("Destination image failed:", error);
      }
    };

    loadImage();

    return () => {
      active = false;
    };
  }, [place.name, place.country]);

  return (
    image ? (
      <img src={image} alt={place.name} />
    ) : place.image ? (
      <img src={place.image} alt={place.name} />
    ) : (
      <div className="destination-image-placeholder">
        <MapPin size={35} />
        <span>{place.name}</span>
      </div>
    )
  );
}

function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const savedWalletBalance = Number(
  localStorage.getItem("tripnestWalletBalance") || 0
);

const budget = location.state?.budget ?? savedWalletBalance;
  const startingCity = localStorage.getItem("tripnestCity") || "";
  const [userCoordinates, setUserCoordinates] = useState(null);
const [locationStatus, setLocationStatus] = useState("loading");
const [nearbyPlaces, setNearbyPlaces] = useState([]);
const [placesLoading, setPlacesLoading] = useState(false);
const [placesError, setPlacesError] = useState("");

useEffect(() => {
  if (!navigator.geolocation) {
    setLocationStatus("unavailable");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationStatus("success");
    },
    async () => {
  if (!startingCity) {
    setLocationStatus("denied");
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(startingCity)}`
    );

    if (!response.ok) {
      throw new Error("City lookup failed");
    }

    const results = await response.json();

    if (!results.length) {
      throw new Error("City not found");
    }

    setUserCoordinates({
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    });

    setLocationStatus("success");
  } catch {
    setLocationStatus("denied");
  }
},
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    }
  );
}, []);
useEffect(() => {
  if (!userCoordinates) return;

  const fetchNearbyPlaces = async () => {
    setPlacesLoading(true);
    setPlacesError("");

    const { latitude, longitude } = userCoordinates;

    const query = `
      [out:json][timeout:25];
      (
        nwr(around:5000,${latitude},${longitude})[name][amenity~"^(cafe|restaurant|fast_food|pub|bar|ice_cream)$"];
        nwr(around:5000,${latitude},${longitude})[name][tourism~"^(museum|attraction|gallery|zoo|aquarium)$"];
        nwr(around:5000,${latitude},${longitude})[name][historic];
        nwr(around:5000,${latitude},${longitude})[name][leisure~"^(park|garden|sports_centre|water_park)$"];
        nwr(around:5000,${latitude},${longitude})[name][shop~"^(mall|market|department_store)$"];
      );
      out center tags 80;
    `;

    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      if (!response.ok) {
        throw new Error("Could not load nearby places.");
      }

      const data = await response.json();

      const places = data.elements
        .map((item) => {
          const tags = item.tags || {};
          const lat = item.lat ?? item.center?.lat;
          const lon = item.lon ?? item.center?.lon;

          let category = "Fun & Activities";

if (tags.amenity) {
  if (
    ["cafe", "restaurant", "fast_food", "ice_cream", "food_court"].includes(tags.amenity)
  ) {
    category = "Food & Dining";
  }
} 

if (tags.tourism) {
  if (["museum", "gallery"].includes(tags.tourism)) {
    category = "Museums & Heritage";
  } else {
    category = "Fun & Activities";
  }
}

if (tags.historic) {
  category = "Museums & Heritage";
}

if (tags.leisure) {
  if (["park", "garden"].includes(tags.leisure)) {
    category = "Parks & Outdoors";
  } else {
    category = "Fun & Activities";
  }
}

if (tags.shop) {
  category = "Shopping";
}

          const distance = Math.acos(
            Math.sin(latitude * Math.PI / 180) *
            Math.sin(lat * Math.PI / 180) +
            Math.cos(latitude * Math.PI / 180) *
            Math.cos(lat * Math.PI / 180) *
            Math.cos((lon - longitude) * Math.PI / 180)
          ) * 6371;

          return {
            id: `${item.type}-${item.id}`,
            type: "nearby",
            name: tags.name,
            category,
            country: `${distance.toFixed(1)} km away`,
            distance,
            estimatedCost: 0,
            price: "Check local prices",
            image: "",
            description: `Explore ${tags.name}, a nearby ${category.toLowerCase()} spot.`,
            latitude: lat,
            longitude: lon,
          };
        })
        .filter((place) => place.latitude && place.longitude)
        .sort((a, b) => a.distance - b.distance);

      setNearbyPlaces(places);
    } catch (error) {
      setPlacesError("Nearby places could not be loaded. Please try again.");
    } finally {
      setPlacesLoading(false);
    }
  };

  fetchNearbyPlaces();
}, [userCoordinates]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visitedNames, setVisitedNames] = useState(() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("tripnestVisitedExperiences") || "[]"
    );
    return saved.map((item) => item.name);
  } catch {
    return [];
  }
});

  
    const categories = [
  "All",
  "Food & Dining",
  "Parks & Outdoors",
  "Fun & Activities",
  "Events",
  "Shopping",
  "Mountains",
  "Beaches",
  "Culture",
  "Museums & Heritage",
  "Adventure",
];
  
    
const matchingDestinations = [...nearbyPlaces, ...destinations]
  .filter((place) => !visitedNames.includes(place.name))
  .filter((place) => {
  const matchesSearch =
    place.name.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || place.category === category;

  return matchesSearch && matchesCategory;
});

const affordableDestinations = matchingDestinations.filter(
  (place) => place.type === "nearby" || place.estimatedCost <= budget
);

const filteredDestinations = affordableDestinations;

const hasAffordableDestinations = affordableDestinations.length > 0;
const handleExperienceChoice = (place, status) => {
  const storageKey =
    status === "accepted"
      ? "tripnestSavedExperiences"
      : "tripnestVisitedExperiences";

  const existing = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );

  const alreadyAdded = existing.some(
    (item) => item.name === place.name
  );

  if (alreadyAdded) {
    alert(`${place.name} is already in your list!`);
    return;
  }

  const updated = [
    ...existing,
    {
      ...place,
      status,
      addedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(storageKey, JSON.stringify(updated));
  if (status === "visited") {
  setVisitedNames((current) => [...current, place.name]);
}

  alert(
    status === "accepted"
      ? `${place.name} added to your planned experiences!`
      : `${place.name} marked as visited!`
  );
};

const nextDestination = [...destinations]
  .filter((place) => place.estimatedCost > budget)
  .sort((a, b) => a.estimatedCost - b.estimatedCost)[0];

const isNearbyCategory = [
  "Food & Dining",
  "Parks & Outdoors",
  "Fun & Activities",
  "Events",
  "Shopping",
  "Museums & Heritage",
].includes(category);
  

  return (
    <main className="explore-page">
      <section className="explore-heading">
        <span className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>
        <h1>Discover places you can afford.</h1>
        <p>
          Explore beautiful Indian destinations that fit your travel savings.
        </p>

       <div className="explore-budget">
  <Wallet size={20} />
  <div>
    <small>Your available travel savings</small>
    <strong>₹{budget.toLocaleString("en-IN")}</strong>
  </div>
</div>
{locationStatus === "loading" && (
  <p className="budget-message">
    📍 Detecting your current location...
  </p>
)}

{locationStatus === "success" && placesLoading && (
  <p className="budget-message">
    📍 Finding real places near you...
  </p>
)}

{locationStatus === "success" && !placesLoading && nearbyPlaces.length > 0 && (
  <p className="budget-message">
    📍 Showing real places near you
  </p>
)}

{locationStatus === "denied" && (
  <p className="budget-message">
    📍 Location permission denied. We'll use your signup city for now.
  </p>
)}

{placesLoading && (
  <p className="budget-message">
    Discovering nearby experiences...
  </p>
)}

{placesError && (
  <p className="budget-message">
    {placesError}
  </p>
)}

{startingCity && (
  <p className="budget-message">
    <MapPin size={15} /> Exploring trips starting from {startingCity}
  </p>
)}

        {budget > 0 && (
          <p className="budget-message">
            Showing destinations within your current savings.
          </p>
        )}

        {budget <= 0 && (
          <p className="budget-message">
            Add money to your Travel Wallet to discover trips within your budget.
          </p>
        )}

        <div className="explore-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search Indian destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="explore-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "filter-active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="destination-grid">
        {filteredDestinations.map((place, index) => (
          <motion.article
            className="destination-card"
            key={place.name}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="destination-image">
           <DestinationPhoto place={place} />
              <span className="destination-category">
                {place.category}
              </span>
            </div>

            <div className="destination-info">
              <span className="destination-country">
                <MapPin size={13} /> {place.country}
              </span>

              <h2>{place.name}</h2>
              <p>{place.description}</p>

              <div className="destination-bottom">
                <div className="experience-actions">
  <button
    className="accept-experience"
    onClick={() => handleExperienceChoice(place, "accepted")}
  >
    + Let's go!
  </button>

  <button
    className="visited-experience"
    onClick={() => handleExperienceChoice(place, "visited")}
  >
    ✓ Already visited
  </button>
</div>
                <div>
                  <small>Estimated starting budget / person</small>
                  <strong>{place.price}</strong>
                </div>

                <button
  aria-label={`View ${place.name} details`}
  onClick={() =>
    navigate(`/experience/${encodeURIComponent(place.name)}`, {
      state: { place },
    })
  }
>
  <ArrowUpRight size={20} />
</button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
      {filteredDestinations.length === 0 && (
  <div className="no-results">
    {["Food & Dining", "Parks & Outdoors", "Fun & Activities", "Events", "Shopping"].includes(category) ? (
      <>
        <h2>No nearby places found in this category.</h2>
        <p>
          Try another category or expand your search to discover more experiences.
        </p>
      </>
    ) : !isNearbyCategory && budget > 0 && nextDestination ? (
      <>
        <h2>Keep saving. Your next trip is getting closer!</h2>
        <p>
          Your next travel destination is {nextDestination.name},
          starting at ₹{nextDestination.estimatedCost.toLocaleString("en-IN")}.
        </p>
        <p>
          You need ₹
          {(nextDestination.estimatedCost - budget).toLocaleString("en-IN")}
          {" "}more to reach that starting budget.
        </p>
      </>
    ) : (
      <p>No places found. Try another search or category.</p>
    )}
  </div>
)}

      
      
    </main>
  );
}

export default Explore;
