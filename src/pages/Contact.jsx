import { IoMailOutline, IoCallOutline, IoLocationOutline, IoShieldCheckmarkOutline, IoRibbonOutline, IoHeartOutline } from 'react-icons/io5';
import './Contact.css';

const InstagramIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Contact = () => {
  const specialties = [
    { name: "CUSTOM T-SHIRTS", desc: "Made to Wear. Made to Represent." },
    { name: "CUSTOM GIFTS", desc: "Unique prints for your loved ones." },
    { name: "BULK ORDERS", desc: "Special pricing for companies & institutions." },
    { name: "EVENT & COLLEGE MERCHANDISE", desc: "Fest, club & batch t-shirts." },
    { name: "CORPORATE & BRAND MERCHANDISE", desc: "Uniforms, branding, and promotional items." },
    { name: "PREMIUM QUALITY PRINTS", desc: "Crafted with Creativity. Printed with Precision." }
  ];

  return (
    <div className="contact-page container">
      <div className="contact-hero">
        <h1 className="contact-title">CONTACT <span className="text-yellow">US</span></h1>
        <p className="contact-tagline">"Your Idea. Our Print. Your Identity."</p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Contact Cards */}
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <p className="section-desc">Have a custom order, bulk inquiry, or general question? We truly appreciate your support and would love to hear from you!</p>

          <div className="contact-cards-container">
            <div className="contact-detail-card">
              <div className="card-icon-wrapper">
                <IoCallOutline size={24} />
              </div>
              <div className="card-text-wrapper">
                <h3>Phone Number</h3>
                <a href="tel:8296437764" className="card-link">+91 8296437764</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="card-icon-wrapper">
                <IoMailOutline size={24} />
              </div>
              <div className="card-text-wrapper">
                <h3>Email Address</h3>
                <a href="mailto:nammaprinthouse2k26@gmail.com" className="card-link">nammaprinthouse2k26@gmail.com</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="card-icon-wrapper">
                <InstagramIcon size={24} />
              </div>
              <div className="card-text-wrapper">
                <h3>Instagram Handle</h3>
                <a href="https://www.instagram.com/namma_print_house2k26" target="_blank" rel="noopener noreferrer" className="card-link">@namma_print_house2k26</a>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="card-icon-wrapper">
                <IoLocationOutline size={24} />
              </div>
              <div className="card-text-wrapper">
                <h3>Location</h3>
                <span className="card-val">Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div className="founder-section">
            <div className="founder-avatar">NPH</div>
            <div className="founder-details">
              <h4>Raghavendra Pujar</h4>
              <p className="founder-title">Founder, Namma Print House</p>
              <p className="founder-quote">"Crafted with Creativity. Printed with Precision."</p>
            </div>
          </div>
        </div>

        {/* Right Column: Specialties & Inquiry */}
        <div className="contact-specialties-section">
          <h2>We Specialize In</h2>
          
          <div className="specialties-list">
            {specialties.map((spec, idx) => (
              <div key={idx} className="specialty-card">
                <div className="specialty-bullet"></div>
                <div className="specialty-info">
                  <h4>{spec.name}</h4>
                  <p>{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="trust-values">
            <div className="value-item">
              <IoRibbonOutline size={20} className="text-yellow" />
              <span>Premium Quality</span>
            </div>
            <div className="value-item">
              <IoHeartOutline size={20} className="text-yellow" fill="currentColor" />
              <span>Made For You</span>
            </div>
            <div className="value-item">
              <IoShieldCheckmarkOutline size={20} className="text-yellow" />
              <span>Printed with Passion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
