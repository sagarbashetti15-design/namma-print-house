import React, { useState } from 'react';
import './InfoPage.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    const queryId = orderId.trim().toUpperCase();
    if (!queryId) return;
    
    // Look up in localStorage
    const savedOrders = JSON.parse(localStorage.getItem('nph_orders') || '[]');
    const matchingOrder = savedOrders.find(o => o.id.toUpperCase() === queryId);
    
    if (matchingOrder) {
      // Calculate real status based on order placement timestamp
      const elapsed = Date.now() - matchingOrder.timestamp;
      let currentStatus = 'Order Confirmed';
      let steps = [
        { name: 'Order Confirmed', date: matchingOrder.date, completed: true, current: true },
        { name: 'Printing & Packaging', date: 'Pending', completed: false },
        { name: 'Dispatched from Bengaluru', date: 'Pending', completed: false },
        { name: 'Out for Delivery', date: 'Pending', completed: false }
      ];

      // After 30 seconds, it's printing
      if (elapsed > 30000) {
        currentStatus = 'Printing & Packaging';
        steps[0].current = false;
        steps[1] = { name: 'Printing & Packaging', date: 'In Progress (NPH Studio)', completed: true, current: true };
      }
      // After 2 minutes, it's dispatched
      if (elapsed > 120000) {
        currentStatus = 'Dispatched from Bengaluru';
        steps[1].current = false;
        steps[1].date = 'Completed (NPH Studio)';
        steps[2] = { name: 'Dispatched from Bengaluru', date: 'In Transit', completed: true, current: true };
      }
      
      setTrackingResult({
        id: matchingOrder.id,
        status: currentStatus,
        estDelivery: 'Within 2-4 business days',
        courier: 'Delhivery Express',
        items: matchingOrder.items,
        total: matchingOrder.total,
        steps: steps
      });
    } else {
      // Fallback to random tracking if not found in localStorage (so demo remains fully functional for random IDs)
      setTrackingResult({
        id: queryId,
        status: 'Printing',
        estDelivery: 'Within 2-3 business days',
        courier: 'Delhivery',
        steps: [
          { name: 'Order Confirmed', date: 'Yesterday', completed: true },
          { name: 'Printing & Packaging', date: 'In Progress (NPH Studio)', completed: true, current: true },
          { name: 'Dispatched', date: 'Pending Courier Pickup', completed: false },
          { name: 'Out for Delivery', date: 'Pending', completed: false }
        ]
      });
    }
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">TRACK YOUR ORDER</h1>
        <p className="info-subtitle">Check Your Package Delivery Status</p>
      </div>

      <div className="info-section">
        {trackingResult ? (
          <div>
            <div className="track-card" style={{ maxWidth: '600px', textAlign: 'left' }}>
              <h3 style={{ color: '#0d2850', fontSize: '1.2rem', marginBottom: '15px' }}>Order: #{trackingResult.id}</h3>
              <p><strong>Current Status:</strong> <span style={{ color: '#F8B400', fontWeight: '700' }}>{trackingResult.status}</span></p>
              <p><strong>Estimated Delivery:</strong> {trackingResult.estDelivery}</p>
              <p><strong>Shipping Partner:</strong> {trackingResult.courier}</p>

              {/* Render items if they exist on the tracking result */}
              {trackingResult.items && trackingResult.items.length > 0 && (
                <div className="track-order-items" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#0d2850', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items in Shipment:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {trackingResult.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, fontSize: '0.85rem' }}>
                          <span style={{ fontWeight: '600', display: 'block', color: 'var(--color-text-primary)' }}>{item.title}</span>
                          <span style={{ color: '#737373' }}>Size: {item.size} | Qty: {item.quantity}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="tracking-timeline" style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #eee' }}>
                {trackingResult.steps.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-27px',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: step.completed ? (step.current ? '#F8B400' : '#0d2850') : '#ccc',
                      border: step.current ? '3px solid #fff' : 'none',
                      boxShadow: step.current ? '0 0 0 2px #F8B400' : 'none'
                    }}></div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: step.completed ? 'var(--color-text-primary)' : '#888', margin: 0 }}>{step.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#737373', margin: '2px 0 0 0' }}>{step.date}</p>
                  </div>
                ))}
              </div>

              <button className="track-btn" style={{ marginTop: '30px', width: '100%' }} onClick={() => setTrackingResult(null)}>TRACK ANOTHER ORDER</button>
            </div>
          </div>
        ) : (
          <div className="track-card">
            <h3>Enter Order Details</h3>
            <p>Please enter your 8-digit Order ID or your registered phone number to track your Namma Print House package.</p>
            <form onSubmit={handleTrack}>
              <div className="track-input-group">
                <input 
                  type="text" 
                  placeholder="Order ID (e.g., NPH12345)" 
                  value={orderId} 
                  onChange={(e) => setOrderId(e.target.value)} 
                  required 
                  style={{
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />
              </div>
              <button type="submit" className="track-btn" style={{ width: '100%' }}>TRACK SHIPMENT</button>
            </form>
          </div>
        )}
      </div>

      <div className="info-section" style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>If you face any issues with tracking or have questions, contact Raghavendra Pujar:</p>
        <p>✉️ <strong>nammaprinthouse2k26@gmail.com</strong> | 📞 <strong>+91 8296437764</strong></p>
      </div>
    </div>
  );
};

export default TrackOrder;
