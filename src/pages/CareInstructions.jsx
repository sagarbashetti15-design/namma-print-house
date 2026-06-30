import React from 'react';
import './InfoPage.css';

const CareInstructions = () => {
  const instructions = [
    {
      icon: "🧼",
      title: "WASH INSIDE OUT IN COLD WATER",
      desc: "Turn your t-shirt inside out before putting it in the machine. Use cold water (preferably 30°C or below) and a gentle cycle to protect the print fibers and prevent shrinkage."
    },
    {
      icon: "🚫",
      title: "DO NOT BLEACH",
      desc: "Bleach can chemically break down print pigments and weaken fabric fibers. Avoid chlorine bleach or strong detergents containing optical brighteners."
    },
    {
      icon: "👕",
      title: "HANG DRY FOR LONGER LIFE",
      desc: "Avoid tumble dryers! The high heat inside a dryer can warp and crack print graphics. Hang dry your shirts inside out in a shaded area away from direct sunlight."
    },
    {
      icon: "💨",
      title: "IRON INSIDE OUT, DO NOT IRON ON PRINT",
      desc: "Never run a hot iron directly over the graphic print. Turn the garment inside out and use a low heat setting to iron. Alternatively, use a hand steamer on low."
    },
    {
      icon: "❌",
      title: "DO NOT DRY CLEAN",
      desc: "Dry cleaning solvents can dissolve the adhesives used in apparel printing. Always stick to standard hand washing or gentle machine washing."
    }
  ];

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">CARE INSTRUCTIONS</h1>
        <p className="info-subtitle">Keep Your Streetwear Looking Fresh & Brand New</p>
      </div>

      <div className="info-section">
        <h2>Fabric & Print Longevity Guidelines</h2>
        <p>All Namma Print House apparel is manufactured using premium dense 240 GSM cotton and printed with passion. To keep your prints vibrant and protect the heavy-knit structure of the fabric, please follow these care guidelines:</p>
        
        <div className="care-grid">
          {instructions.map((item, idx) => (
            <div key={idx} className="care-card">
              <div className="care-icon">{item.icon}</div>
              <div className="care-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section" style={{ marginTop: '40px' }}>
        <h2>A Note on Premium dense Cotton</h2>
        <p>Premium 100% heavy cotton fabrics will naturally soften and adapt to your body structure over time. Following these simple steps ensures that the print remains crisp and vibrant for years, without any cracking, peeling, or fading.</p>
      </div>
    </div>
  );
};

export default CareInstructions;
