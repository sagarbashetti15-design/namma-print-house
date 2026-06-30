import React from 'react';
import { Cloud, PenTool, Truck, Users } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
  {
    id: 1,
    icon: <Cloud size={40} className="wcu-icon" />,
    title: 'PREMIUM QUALITY',
    desc: '240 GSM Premium Cotton\nSuper Soft & Durable'
  },
  {
    id: 2,
    icon: <PenTool size={40} className="wcu-icon" />,
    title: 'CUSTOM PRINTING',
    desc: 'Print Anything You Want\nNo Minimum Order'
  },
  {
    id: 3,
    icon: <Truck size={40} className="wcu-icon" />,
    title: 'FAST DELIVERY',
    desc: 'Pan India Delivery\n2-5 Working Days'
  },
  {
    id: 4,
    icon: <Users size={40} className="wcu-icon" />,
    title: 'BULK ORDERS',
    desc: 'Best for Schools, Events,\nCompanies & More'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="wcu-section">
      <div className="container">
        <div className="wcu-banner">
          <h2 className="wcu-heading">
            WHY CHOOSE <span className="text-yellow">NAMMA</span> PRINT HOUSE?
          </h2>
          <div className="wcu-grid">
            {features.map(f => (
              <div key={f.id} className="wcu-item">
                <div className="wcu-icon-wrapper">
                  {f.icon}
                </div>
                <h3 className="wcu-title">{f.title}</h3>
                <p className="wcu-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
