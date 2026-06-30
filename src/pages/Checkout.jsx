import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Read active marketing promo code from localStorage
  const [activePromoData, setActivePromoData] = useState(null);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('nph_marketing');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.promoData && parsed.promoData.code) {
          setActivePromoData(parsed.promoData);
        }
      }
    } catch (e) {
      console.error("Failed to parse nph_marketing inside Checkout", e);
    }
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    
    setCouponError('');
    
    // Check custom active promo code deployed from admin panel
    if (activePromoData && code === activePromoData.code.toUpperCase()) {
      // Find items eligible for this specific promo code
      const applicableItems = cartItems.filter(item => 
        activePromoData.applicableCategory === 'all' || item.product.category === activePromoData.applicableCategory
      );
      
      if (applicableItems.length === 0) {
        setCouponError(`This code is only applicable to products in the ${activePromoData.applicableCategory.toUpperCase()} category.`);
        showToast("Coupon not applicable to items in bag", "warning");
        return;
      }

      const applicableSubtotal = applicableItems.reduce((acc, item) => {
        const price = item.customPrice !== null ? item.customPrice : item.product.price;
        return acc + (price * item.quantity);
      }, 0);

      let amt = 0;
      if (activePromoData.code === 'VIP20') {
        amt = Math.round(applicableSubtotal * 0.2);
        showToast('20% VIP Discount Applied on Men\'s collection!', 'success');
      } else if (activePromoData.code === 'STREET500') {
        amt = applicableSubtotal >= 1500 ? 500 : 0;
        if (amt === 0) {
          setCouponError('Minimum order value of ₹1500 on Women\'s collection required.');
          showToast('Min order value not met', 'warning');
          return;
        } else {
          showToast('₹500 Discount Applied on Women\'s collection!', 'success');
        }
      } else if (activePromoData.code === 'NEWFAM') {
        amt = Math.round(applicableSubtotal * 0.15);
        showToast('15% Off Couples Matching Applied!', 'success');
      } else if (activePromoData.code === 'FREESHIP') {
        amt = 0;
        showToast('Free Express Shipping Applied!', 'success');
      } else if (activePromoData.code === 'BOGO') {
        const totalKannadaQty = applicableItems.reduce((acc, i) => acc + i.quantity, 0);
        if (totalKannadaQty < 2) {
          setCouponError('Add at least 2 Kannada Hub items to apply BOGO.');
          showToast('Add 2+ Kannada items', 'warning');
          return;
        } else {
          // BOGO halves the price of the applicable items
          amt = Math.round(applicableSubtotal * 0.5);
          showToast('BOGO 50% Off Applied on Kannada Hub!', 'success');
        }
      }
      setDiscountAmount(amt);
      setAppliedCoupon(activePromoData.code);
      setCouponInput('');
      return;
    }

    // Default promo codes
    if (code === 'NAMMAPRINT10') {
      const amt = Math.round(totalPrice * 0.1);
      setDiscountAmount(amt);
      setAppliedCoupon('NAMMAPRINT10');
      setCouponInput('');
      showToast('10% Discount Applied!', 'success');
    } else if (code === 'PREPAID5') {
      const amt = Math.round(totalPrice * 0.05);
      setDiscountAmount(amt);
      setAppliedCoupon('PREPAID5');
      setCouponInput('');
      showToast('5% Prepaid Discount Applied!', 'success');
    } else if (code === 'WELCOME100') {
      const amt = totalPrice > 500 ? 100 : 0;
      if (amt === 0) {
        setCouponError('Valid on orders above ₹500');
        showToast('Min order value not met', 'warning');
      } else {
        setDiscountAmount(amt);
        setAppliedCoupon('WELCOME100');
        setCouponInput('');
        showToast('₹100 Discount Applied!', 'success');
      }
    } else {
      setCouponError('Invalid Coupon Code');
      showToast('Invalid Coupon Code', 'warning');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
    showToast('Promo code removed', 'info');
  };

  const grandTotal = Math.max(0, totalPrice - discountAmount);
  
  // Confetti effect on success
  useEffect(() => {
    if (step === 3) {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      const colors = ['#f8b400', '#0d2850', '#51cccc', '#ff3333', '#eaff00'];
      const particles = [];
      
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 4,
          d: Math.random() * canvas.height,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 5,
          tiltAngleIncremental: Math.random() * 0.07 + 0.02,
          tiltAngle: 0
        });
      }
      
      let animationFrameId;
      
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, idx) => {
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += (Math.cos(p.tiltAngle) + 3 + p.r / 2) / 2;
          p.x += Math.sin(p.tiltAngle);
          p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
          
          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();
        });
        
        update();
        animationFrameId = requestAnimationFrame(draw);
      };
      
      const update = () => {
        particles.forEach((p, index) => {
          if (p.y > canvas.height) {
            particles[index] = {
              ...p,
              x: Math.random() * canvas.width,
              y: -20,
              tilt: Math.random() * 10 - 5
            };
          }
        });
      };
      
      draw();
      
      const timeoutId = setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 7000);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeoutId);
      };
    }
  }, [step]);

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="container empty-checkout">
        <h2>Your Bag is Empty</h2>
        <button onClick={() => navigate('/')}>RETURN TO SHOP</button>
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate Indian mobile number (exactly 10 digits starting with 6, 7, 8, 9)
      const phoneClean = formData.phone.trim().replace(/\D/g, '');
      const isPhoneValid = /^[6-9]\d{9}$/.test(phoneClean);
      if (!isPhoneValid) {
        showToast("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)", "warning");
        return;
      }
      
      // Validate Indian Pincode (exactly 6 digits)
      const zipClean = formData.zipCode.trim().replace(/\D/g, '');
      const isZipValid = /^\d{6}$/.test(zipClean);
      if (!isZipValid) {
        showToast("Please enter a valid 6-digit Indian Pin Code (e.g. 560076)", "warning");
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      setIsProcessingPayment(true);
      const duration = 3000;
      
      setTimeout(() => {
        setIsProcessingPayment(false);
        const orderId = `NPH-${Math.floor(Math.random() * 899999) + 100000}`;
        
        const newOrder = {
          id: orderId,
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          items: cartItems.map(item => {
            let sizeValue = item.size;
            let colorValue = '';
            
            if (item.size.includes('Color:')) {
              const parts = item.size.split('Color:');
              colorValue = parts[1].trim();
              sizeValue = parts[0].replace('|', '').trim();
            }
            
            let selectedColorImage = item.product.image;
            if (colorValue && item.product.colorImages && item.product.colorImages[colorValue]) {
              selectedColorImage = item.product.colorImages[colorValue];
            }
            
            return {
              title: item.product.title,
              size: sizeValue,
              color: colorValue,
              quantity: item.quantity,
              price: item.customPrice !== null ? item.customPrice : item.product.price,
              image: selectedColorImage
            };
          }),
          total: grandTotal,
          paymentMethod: selectedPaymentMethod.toUpperCase(),
          status: 'Order Confirmed',
          timestamp: Date.now()
        };
        
        // Cache order details for WhatsApp link generation before clearing
        setLastPlacedOrder(newOrder);

        // Save order details to localStorage
        const savedOrders = JSON.parse(localStorage.getItem('nph_orders') || '[]');
        savedOrders.push(newOrder);
        localStorage.setItem('nph_orders', JSON.stringify(savedOrders));
        
        setPlacedOrderId(orderId);
        setStep(3);
        clearCart();
      }, duration);
    }
  };

  const generateWhatsAppLink = () => {
    if (!lastPlacedOrder) return '#';
    const phoneNumber = "918296437764"; // Client WhatsApp: +91 82964 37764
    
    let itemsText = "";
    lastPlacedOrder.items.forEach((item, index) => {
      // Map base URL to include hosting server origin (e.g. localtunnel address)
      const imageUrl = item.image.startsWith('data:') 
        ? `(Local Uploaded Image - Preview in Admin Catalog)` 
        : `${window.location.origin}${item.image}`;
      itemsText += `\n📦 *Item ${index + 1}:* ${item.title}
   - Size: ${item.size}
   - Qty: ${item.quantity} | Price: ₹${item.price * item.quantity}
   - 🖼️ Product Design Preview: ${imageUrl}\n`;
    });

    const msg = `🚀 *NAMMA PRINT HOUSE - NEW ORDER*

📌 *Order ID:* #${lastPlacedOrder.id}
📅 *Date:* ${lastPlacedOrder.date}
💰 *Total Amount Paid:* ₹${lastPlacedOrder.total} via *${lastPlacedOrder.paymentMethod}*

👤 *CUSTOMER DETAILS:*
   - *Name:* ${formData.firstName} ${formData.lastName}
   - *Phone:* ${formData.phone}
   - *Email:* ${formData.email}
   - *Shipping Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}

🛒 *ORDER ITEMS & PICTURE LINKS:*
${itemsText}
👉 _Please review customer details and click on the product design link to view the high-quality product picture print graphics._`;

    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="container checkout-container">
      {step < 3 && (
        <div className="checkout-main">
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
          </div>
          
          {step === 1 && (
            <form onSubmit={handleNext} className="checkout-form">
              <h3>Shipping Details</h3>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  required 
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  required 
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input 
                type="tel" 
                placeholder="Mobile Number (10-digit)" 
                required 
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                title="Please enter a valid 10-digit mobile number starting with 6-9"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                required 
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="City" 
                  required 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="State/Province" 
                  required 
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="Pin Code" 
                  required 
                  maxLength={6}
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit pin code"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
                />
              </div>
              <button type="submit" className="primary-btn">CONTINUE TO PAYMENT</button>
            </form>
          )}

          {step === 2 && !isProcessingPayment && (
            <form onSubmit={handleNext} className="checkout-form">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${selectedPaymentMethod === 'card' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    required 
                    checked={selectedPaymentMethod === 'card'} 
                    onChange={() => setSelectedPaymentMethod('card')} 
                  />
                  Credit / Debit Card
                </label>
                <label className={`payment-option ${selectedPaymentMethod === 'upi' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    required 
                    checked={selectedPaymentMethod === 'upi'} 
                    onChange={() => setSelectedPaymentMethod('upi')} 
                  />
                  UPI / QR Scan Code
                </label>
              </div>
              
              {selectedPaymentMethod === 'card' && (
                <div className="card-details">
                  <input type="text" placeholder="Card Number" maxLength={19} required />
                  <div className="form-row">
                    <input type="text" placeholder="MM/YY" maxLength={5} required />
                    <input type="password" placeholder="CVV" maxLength={4} required />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'upi' && (
                <div className="upi-details" style={{ padding: '15px', backgroundColor: 'rgba(81, 204, 204, 0.05)', border: '1px dashed #51cccc', borderRadius: '6px', marginBottom: '20px', textAlign: 'left' }}>
                  <p style={{ fontSize: '0.85rem', color: '#0d2850', margin: 0 }}>
                    ⚡ <strong>Instant Checkout:</strong> A simulated secure dynamic QR Code will be generated for your order of <strong>₹{grandTotal}</strong> upon clicking place order.
                  </p>
                </div>
              )}
              
              <button type="submit" className="primary-btn">PLACE ORDER (₹{grandTotal})</button>
              <button type="button" className="secondary-btn" onClick={() => setStep(1)}>BACK TO SHIPPING</button>
            </form>
          )}

          {step === 2 && isProcessingPayment && (
            <div className="payment-processing-screen" style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
              {selectedPaymentMethod === 'upi' ? (
                <div className="upi-processing-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div className="mock-qr-code" style={{ border: '2px solid #0d2850', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <svg width="150" height="150" viewBox="0 0 100 100" style={{ display: 'block' }}>
                      <rect width="100" height="100" fill="#fff" />
                      <rect x="5" y="5" width="25" height="25" fill="#0d2850" />
                      <rect x="10" y="10" width="15" height="15" fill="#fff" />
                      <rect x="12" y="12" width="11" height="11" fill="#0d2850" />
                      
                      <rect x="70" y="5" width="25" height="25" fill="#0d2850" />
                      <rect x="75" y="10" width="15" height="15" fill="#fff" />
                      <rect x="77" y="12" width="11" height="11" fill="#0d2850" />
                      
                      <rect x="5" y="70" width="25" height="25" fill="#0d2850" />
                      <rect x="10" y="75" width="15" height="15" fill="#fff" />
                      <rect x="12" y="77" width="11" height="11" fill="#0d2850" />
                      
                      <rect x="40" y="10" width="10" height="15" fill="#0d2850" />
                      <rect x="55" y="15" width="10" height="5" fill="#0d2850" />
                      <rect x="45" y="35" width="20" height="20" fill="#0d2850" />
                      <rect x="15" y="45" width="15" height="10" fill="#0d2850" />
                      <rect x="75" y="45" width="15" height="20" fill="#0d2850" />
                      <rect x="40" y="75" width="20" height="15" fill="#0d2850" />
                      <rect x="70" y="75" width="10" height="10" fill="#0d2850" />
                    </svg>
                  </div>
                  <h3 style={{ color: '#0d2850', fontFamily: 'Outfit', margin: 0 }}>Scan & Pay ₹{grandTotal}</h3>
                  <p style={{ color: '#737373', fontSize: '0.85rem' }}>Open GPay, PhonePe, or BHIM UPI App to complete payment.</p>
                  <div className="payment-status-loader" style={{ width: '250px', height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                    <div className="payment-loader-bar" style={{ height: '100%', backgroundColor: '#51cccc', width: '0%', animation: 'fill-loader 3s linear forwards' }}></div>
                  </div>
                  <span className="verifying-text" style={{ fontSize: '0.85rem', color: '#51cccc', fontWeight: 'bold' }}>🕒 Verifying transaction signature...</span>
                </div>
              ) : (
                <div className="card-processing-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div className="card-spinner" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '4px solid #f3f3f3', borderTop: '4px solid #ffd000', animation: 'spin 1s linear infinite' }}></div>
                  <h3 style={{ color: '#0d2850', fontFamily: 'Outfit', margin: 0 }}>Authorizing Card Payment</h3>
                  <p style={{ color: '#737373', fontSize: '0.85rem', maxWidth: '300px' }}>Communicating secure token with your merchant bank. Please do not close or refresh this page.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="checkout-success" style={{ backgroundColor: '#faf7f2', border: '1px solid rgba(13, 40, 80, 0.08)' }}>
          <canvas id="confetti-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}></canvas>
          <div className="success-icon" style={{ backgroundColor: '#51cccc' }}>✓</div>
          <h2 style={{ fontFamily: 'Outfit', color: '#0d2850', fontWeight: 800 }}>Payment Received!</h2>
          <p style={{ color: '#525252' }}>Thank you for shopping at Namma Print House.</p>
          <p style={{ color: '#0d2850', fontSize: '1.2rem' }}>Your order number is: <strong style={{ color: '#f8b400' }}>#{placedOrderId || '#NPH-123456'}</strong></p>
          
          {/* WhatsApp Direct Action Button */}
          <div className="success-details-card" style={{ maxWidth: '500px', margin: '30px auto', padding: '25px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid rgba(13, 40, 80, 0.05)', textAlign: 'left', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0d2850', fontFamily: 'Outfit', fontWeight: 700, borderBottom: '1px solid rgba(13, 40, 80, 0.08)', paddingBottom: '8px', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.5px' }}>🚀 Start Custom Printing</h4>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
              Your order payment has been successfully authorized. To initiate custom printing immediately, click below to send your structured order specifications and design images directly to the print house on WhatsApp.
            </p>
            <a 
              href={generateWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px',
                borderRadius: '6px',
                fontWeight: 700,
                textAlign: 'center',
                fontSize: '1rem',
                border: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                transition: 'transform 0.2s'
              }}
            >
              💬 SEND DETAILS TO WHATSAPP
            </a>
          </div>

          <div className="success-details-card" style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid rgba(13, 40, 80, 0.05)', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0d2850', fontFamily: 'Outfit', fontWeight: 700, borderBottom: '1px solid rgba(13, 40, 80, 0.08)', paddingBottom: '8px' }}>Estimated Delivery</h4>
            <p style={{ fontSize: '0.95rem', margin: '0 0 15px 0', color: '#525252' }}>
              Your premium oversized streetwear will arrive between: <br />
              <strong>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</strong> and <strong>{new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</strong>.
            </p>
          </div>

          <button className="primary-btn" onClick={() => {
            navigate('/');
          }} style={{ backgroundColor: '#0d2850', color: '#faf7f2', maxWidth: '300px', margin: '20px auto 0' }}>CONTINUE SHOPPING</button>
        </div>
      )}

      {step < 3 && (
        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p className="summary-items">{totalItems} Items</p>
            
            <div className="summary-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <img src={item.product.image} alt={item.product.title} />
                  <div>
                    <p className="item-title">{item.product.title}</p>
                    <p className="item-meta">Size: {item.size} | Qty: {item.quantity}</p>
                    <p className="item-price">₹{(item.customPrice !== null ? item.customPrice : item.product.price) * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Input Form */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="coupon-form" style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
                <input 
                  type="text" 
                  placeholder="PROMO CODE" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{ textTransform: 'uppercase', marginBottom: 0, padding: '10px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="primary-btn" style={{ marginTop: 0, width: 'auto', padding: '10px 15px', fontSize: '0.85rem', whiteSpace: 'nowrap', backgroundColor: '#0d2850' }}>APPLY</button>
              </form>
            ) : (
              <div className="applied-coupon-box" style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(81, 204, 204, 0.1)', border: '1px dashed #51cccc', borderRadius: '4px', padding: '8px 12px', margin: '20px 0' }}>
                <span style={{ fontSize: '0.85rem', color: '#0d2850', fontWeight: 'bold' }}>⚡ Code {appliedCoupon} Applied!</span>
                <button onClick={handleRemoveCoupon} style={{ color: '#ff3333', fontSize: '0.85rem', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>REMOVE</button>
              </div>
            )}
            {couponError && <p style={{ color: '#ff3333', fontSize: '0.8rem', marginTop: '-15px', marginBottom: '15px' }}>{couponError}</p>}

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              {discountAmount > 0 && (
                <div className="total-row" style={{ color: '#51cccc', fontWeight: 'bold' }}>
                  <span>Discount ({appliedCoupon})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="total-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
