
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Globe2,
  MapPin,
  Sparkles,
  Wallet,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

function GlobeModel() {
  const globe = useRef();

  useFrame((state, delta) => {
    if (globe.current) {
      globe.current.rotation.y += delta * 0.12;
      globe.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[1.65, 64, 64]} />
        <meshStandardMaterial
          color="#1d6651"
          metalness={0.55}
          roughness={0.4}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.61, 48, 48]} />
        <meshStandardMaterial
          color="#123d32"
          metalness={0.7}
          roughness={0.65}
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.008, 16, 120]} />
        <meshBasicMaterial color="#d6ad65" />
      </mesh>

      <mesh rotation={[0.8, 0.3, 0.4]}>
        <torusGeometry args={[2.2, 0.005, 16, 120]} />
        <meshBasicMaterial color="#a8b9a0" transparent opacity={0.7} />
      </mesh>

      {[
        [0.4, 0.6, 1.48],
        [-0.8, 0.3, 1.4],
        [0.9, -0.6, 1.25],
        [-0.4, -0.8, 1.4],
      ].map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#e8c889" />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 4, 5]} intensity={2} color="#f5dfb1" />
      <pointLight position={[-4, -2, -3]} intensity={2} color="#398e71" />
      <Stars radius={70} depth={45} count={1800} factor={3} fade />
      <GlobeModel />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <nav className="app-navbar">
        <Link to="/" className="app-brand">
          <span className="app-brand-icon"><Compass size={22} /></span>
          <span>tripnest<span className="gold-dot">.</span></span>
        </Link>

        <div className="app-nav-links">
          <Link to="/" className="nav-active">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/planner">Trip Planner</Link>
          <Link to="/wallet">Travel Wallet</Link>
          <Link to="/my-trips">My Trips</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Link to="/explore" className="nav-explore">
          Start exploring <ArrowUpRight size={16} />
        </Link>

        <button className="mobile-menu" aria-label="Open menu">
          <Menu size={23} />
        </button>
      </nav>

      <section className="home-hero">
        <div className="hero-background" />

        <div className="hero-copy">
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={14} /> A NEW WAY TO SEE THE WORLD
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Your world.
            <br />
            Your <span>next story.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            Discover extraordinary places, plan unforgettable journeys,
            and make every rupee take you further.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link to="/explore" className="gold-button">
              Explore the world <ArrowUpRight size={18} />
            </Link>

            <Link to="/planner" className="outline-button">
              Plan a journey <ArrowRight size={17} />
            </Link>
          </motion.div>

          <div className="hero-trust">
            <div className="trust-icon"><Wallet size={18} /></div>
            <span>Dream freely. Save smartly. Travel more.</span>
          </div>
        </div>

        <motion.div
          className="globe-container"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3 }}
        >
          <GlobeScene />

          <div className="globe-caption">
            <span className="globe-caption-icon"><Globe2 size={17} /></span>
            <div>
              <strong>One world. Endless possibilities.</strong>
              <span>Where will you go next?</span>
            </div>
          </div>

          <div className="globe-location location-one">
            <MapPin size={14} /> ASIA
          </div>
          <div className="globe-location location-two">
            <MapPin size={14} /> EUROPE
          </div>
        </motion.div>

        <div className="hero-bottom-line">
          <span>01 / DISCOVER YOUR WORLD</span>
          <span>MADE FOR THE CURIOUS</span>
        </div>
      </section>

      <section className="home-welcome">
        <span className="eyebrow">WELCOME TO TRIPNEST</span>
        <h2>Travel more.<br /><span>Worry less.</span></h2>
        <p>
          Your travel companion for discovering destinations, making smarter
          budgets and turning someday into your next adventure.
        </p>

        <div className="welcome-actions">
          <Link to="/explore" className="welcome-link">
            Find your destination <ArrowUpRight size={17} />
          </Link>
          <Link to="/wallet" className="welcome-link">
            Start your travel savings <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="app-footer">
        <Link to="/" className="app-brand">
          <span className="app-brand-icon"><Compass size={20} /></span>
          <span>tripnest<span className="gold-dot">.</span></span>
        </Link>
        <span>Save smart. Travel more. © 2026 TripNest.</span>
      </footer>
    </div>
  );
}
