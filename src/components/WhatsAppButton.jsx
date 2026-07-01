import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '918296437764';
  const message = encodeURIComponent("Hi! I am browsing the Namma Print House store and have a query regarding custom printing/merchandise.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float-btn"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-ripple"></div>
      <svg 
        viewBox="0 0 24 24" 
        width="30" 
        height="30" 
        fill="#ffffff"
        className="whatsapp-svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.025 14.114.999 11.487 1c-5.444 0-9.866 4.372-9.87 9.802 0 1.698.455 3.355 1.32 4.822L1.87 20.27l4.777-1.116zM17.41 14.53c-.3-.15-1.77-.875-2.04-.975-.27-.1-.47-.15-.67.15-.2.3-.77.975-.94 1.175-.17.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.62-.92-2.2-.24-.58-.485-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.494 1.7.63.717.227 1.37.195 1.885.118.57-.085 1.77-.724 2.02-1.39.25-.665.25-1.23.175-1.348-.075-.118-.275-.193-.575-.343z"/>
      </svg>
      <span className="whatsapp-tooltip">Chat with Raghavendra</span>
    </a>
  );
};

export default WhatsAppButton;
