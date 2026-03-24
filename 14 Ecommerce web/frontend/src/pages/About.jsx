// ============================================================
// pages/About.jsx
// ============================================================
// A simple informational page describing the store.
// ============================================================

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About <span className="gradient-text">AeroSports</span></h1>
        <p className="about-tagline">Empowering athletes since 2020</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <div className="about-icon">🏸</div>
          <h3>Our Mission</h3>
          <p>
            We believe every player deserves access to professional-grade
            equipment. AeroSports was founded to bridge the gap between
            affordable and premium sports gear, making competition-ready
            equipment accessible to players at every level.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">🌍</div>
          <h3>Global Reach</h3>
          <p>
            From our warehouse in the heart of the city, we ship to over 30
            countries worldwide. Our partnerships with brands like Yonex,
            Li-Ning, and Victor ensure you get authentic products, every time.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">⚡</div>
          <h3>Why Choose Us?</h3>
          <p>
            Fast shipping, hassle-free returns, and a passionate support team
            that plays the game just like you. We don't just sell gear — we
            live and breathe the sport. Every product is tested and approved
            by our in-house team of players.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
