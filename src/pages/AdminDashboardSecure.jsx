import React, { useState, useEffect, useRef } from 'react';
import { Settings, X, Send, Database, Eye, EyeOff, Lock, LogOut } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { db } from '../firebase';
import { doc, updateDoc, setDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './AdminDashboardSecure.css';

const STANDARD_COLORS = ['Red', 'White', 'Black', 'Cream', 'Brown'];

const AdminDashboardSecure = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  const { products: localCatalog, marketing: marketingConfig, updateMarketingStore, deleteProduct } = useCatalog();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'log',
      text: '[System Log] Webhook receiver listening on /api/webhooks/whatsapp... Verify token: nph_meta_sync_token_2026',
      time: '11:00 AM'
    },
    {
      id: 2,
      sender: 'system',
      text: '🤖 *NPH Meta Webhook Simulator*\n\nSend a message to simulate your WhatsApp Business stock & new arrival updates! \n\n*Try these commands:*\n• `m7 out of stock` (Buddha Tee)\n• `m7 in stock` (Buddha Tee)',
      time: '11:01 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('orders'); // 'catalog', 'marketing', or 'orders'
  const [orders, setOrders] = useState([]);
    
    // Fetch orders from Firestore
    useEffect(() => {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ docId: doc.id, ...doc.data() });
        });
        setOrders(fetchedOrders);
      });
      return () => unsubscribe();
    }, []);
  
  // Marketing State
  const [activeCampaign, setActiveCampaign] = useState('none');
  const [activePromo, setActivePromo] = useState('none');
  const [activeDiscount, setActiveDiscount] = useState('none');
  
  const CAMPAIGNS = [
    { id: 'none', name: 'None (Disable)', label: null },
    { id: 'c1', name: 'Summer Mega Sale', label: '🔥 LIVE NOW: SUMMER MEGA SALE - HUGE DISCOUNTS ACROSS THE STORE!' },
    { id: 'c2', name: 'Diwali Bash', label: '🪔 DIWALI BASH: LIGHT UP YOUR WARDROBE WITH OUR FESTIVE DROP' },
    { id: 'c3', name: 'Flash Sale Friday', label: '⚡ FLASH SALE FRIDAY: 24 HOURS ONLY - GRAB YOUR FAVORITES NOW!' },
    { id: 'c4', name: 'Clearance Drop', label: '🚨 CLEARANCE DROP: EVERYTHING MUST GO! LAST CHANCE TO BUY' },
    { id: 'c5', name: 'Weekend Steals', label: '🎉 WEEKEND STEALS: PREMIUM STREETWEAR AT UNBEATABLE PRICES' }
  ];

  const PROMO_CODES = [
    { id: 'none', code: null, description: 'None (Disable)', applicableCategory: 'all' },
    { id: 'p1', code: 'VIP20', description: 'Flat 20% Off on Men\'s Streetwear', applicableCategory: 'men' },
    { id: 'p2', code: 'STREET500', description: 'Flat ₹500 Off on Women\'s Streetwear (Min ₹1500)', applicableCategory: 'women' },
    { id: 'p3', code: 'NEWFAM', description: '15% Off Couples Matching Tees', applicableCategory: 'couples' },
    { id: 'p4', code: 'FREESHIP', description: 'Free Express Shipping (All Orders)', applicableCategory: 'all' },
    { id: 'p5', code: 'BOGO', description: 'Buy 1 Get 1 Free on Kannada Hub', applicableCategory: 'kannada' }
  ];

  const DISCOUNTS = [
    { id: 'none', value: 0, type: 'none', label: 'None (Disable)', applicableCategory: 'all' },
    { id: 'd1', value: 10, type: 'percent', label: '10% OFF Men\'s Collection Only', applicableCategory: 'men' },
    { id: 'd2', value: 20, type: 'percent', label: '20% OFF Women\'s Collection Only', applicableCategory: 'women' },
    { id: 'd3', value: 30, type: 'percent', label: '30% OFF Couples Matching Only', applicableCategory: 'couples' },
    { id: 'd4', value: 150, type: 'flat', label: 'Flat ₹150 OFF Custom Print Only', applicableCategory: 'custom' },
    { id: 'd5', value: 50, type: 'percent', label: '50% OFF Kannada Hub Only', applicableCategory: 'kannada' }
  ];

  // Add new product form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '699',
    category: 'men',
    description: ''
  });
  const [uploadedImages, setUploadedImages] = useState({});
  const messagesEndRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'nammaprinthouse2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
  };

  const handleClose = () => {
    window.location.href = '/';
  };

  // Handle product image file upload for a specific color (converts to base64 for localStorage)
  const handleImageUpload = (e, color) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    
    // Compress image to 600px max dimension using Canvas to stay well under localStorage quota limits
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Output highly compressed JPEG at 0.48 quality (reduces size to ~7KB - 12KB)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.48);
        
        setUploadedImages(prev => ({
          ...prev,
          [color]: {
            dataUrl: compressedDataUrl,
            fileName: file.name
          }
        }));
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Sync marketing state on mount from context
  useEffect(() => {
    if (marketingConfig) {
      if (marketingConfig.activeCampaign) setActiveCampaign(marketingConfig.activeCampaign);
      if (marketingConfig.activePromo) setActivePromo(marketingConfig.activePromo);
      if (marketingConfig.activeDiscount) setActiveDiscount(marketingConfig.activeDiscount);
    }
  }, [marketingConfig]);

  const deployMarketingSettings = async () => {
    try {
      const newMarketingConfig = {
        activeCampaign,
        activePromo,
        activeDiscount,
        campaignData: CAMPAIGNS.find(c => c.id === activeCampaign),
        promoData: PROMO_CODES.find(p => p.id === activePromo),
        discountData: DISCOUNTS.find(d => d.id === activeDiscount)
      };
      
      await updateMarketingStore(newMarketingConfig);
      
      addMessage('system', '🚀 *Marketing Settings Deployed!*\nGlobal campaigns, promos, and discounts have been synced to the live storefront database.\n\n✅ Storefront updated behind the scenes!');
      
    } catch (err) {
      addMessage('system', '❌ *Error:* Failed to deploy marketing settings to the live database.');
      console.error(err);
    }
  };

  // Scroll message thread
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Process WhatsApp Chat webhook
  const processSimulatedMessage = (text) => {
    if (!text.trim()) return;
    const cleanText = text.trim().toLowerCase();
    
    // 1. Post owner's message bubble
    addMessage('owner', text);
    setInputText('');

    // 2. Post Meta API webhook trigger logs
    setTimeout(() => {
      addMessage('log', `📬 [Webhook Triggered] POST /webhooks/whatsapp\nPayload: {\n  "from": "+918296437764",\n  "message": "${text}"\n}`);
    }, 400);

    // 3. Parser execution
    setTimeout(async () => {
      if (cleanText.includes('out of stock') || cleanText.includes('sold out')) {
        const targetWord = cleanText
          .replace('out of stock', '')
          .replace('sold out', '')
          .replace('t shirt', '')
          .replace('tshirt', '')
          .replace('tee', '')
          .trim();
          
        const matchedProduct = localCatalog.find(p => p.id.toLowerCase() === targetWord || p.title.toLowerCase().includes(targetWord));

        if (matchedProduct) {
            try {
              await updateDoc(doc(db, 'catalog', matchedProduct.id), { outOfStock: true });
              addMessage('system', `✅ *WhatsApp Sync Successful!*\nProduct *"${matchedProduct.title}"* has been set to *OUT OF STOCK* on the live database.\n\n🔄 Storefront updated behind the scenes!`);
            } catch (err) {
              addMessage('system', `❌ *Sync Error:*\nFailed to update live database.`);
              console.error(err);
            }
        } else {
          addMessage('system', `❌ *Sync Error:*\nNo products found in Meta Catalog matching "${targetWord}". Try typing: *"m7 out of stock"*`);
        }
      } 
      else if (cleanText.includes('in stock') || cleanText.includes('restock') || cleanText.includes('available')) {
        const targetWord = cleanText
          .replace('in stock', '')
          .replace('restock', '')
          .replace('available', '')
          .replace('t shirt', '')
          .replace('tshirt', '')
          .replace('tee', '')
          .trim();
          
        const matchedProduct = localCatalog.find(p => p.id.toLowerCase() === targetWord || p.title.toLowerCase().includes(targetWord));

        if (matchedProduct) {
            try {
              await updateDoc(doc(db, 'catalog', matchedProduct.id), { outOfStock: false });
              addMessage('system', `✅ *WhatsApp Sync Successful!*\nProduct *"${matchedProduct.title}"* has been marked *IN STOCK* on the live database.\n\n🔄 Storefront updated behind the scenes!`);
            } catch (err) {
              addMessage('system', `❌ *Sync Error:*\nFailed to update live database.`);
              console.error(err);
            }
        } else {
          addMessage('system', `❌ *Sync Error:*\nNo products found in Meta Catalog matching "${targetWord}". Try typing: *"m7 in stock"*`);
        }
      } 
      else {
        addMessage('system', `🤖 *NPH WhatsApp Catalog Assistant*\n\nAvailable commands:\n• *"[ProductID] out of stock"* (e.g. \`m7 out of stock\`)\n• *"[ProductID] in stock"* (e.g. \`m7 in stock\`)\n\nOr click the stock controls in the WhatsApp Catalog Panel on the right!`);
      }
    }, 1200);
  };

  // Simulated click stock toggle inside the catalog list
  const handleCatalogStockToggle = (productId, newStatus) => {
    const prod = localCatalog.find(p => p.id === productId);
    if (!prod) return;

    addMessage('owner', `${prod.title} stock toggle: ${newStatus ? 'OUT OF STOCK' : 'IN STOCK'}`);
    
    setTimeout(() => {
      addMessage('log', `📬 [Catalog Event] Meta Webhook Sync\nUpdated ID: ${productId} | outOfStock: ${newStatus}`);
    }, 300);

    setTimeout(() => {
        new Promise(r => setTimeout(r, 500))
          .then(async () => {
            await updateDoc(doc(db, 'catalog', productId), { outOfStock: newStatus });
            addMessage('system', `🚀 Live Database Updated!\nProduct is now ${newStatus ? 'OUT OF STOCK' : 'IN STOCK'}.\n\n✅ Storefront updated behind the scenes!`);
            
          })
          .catch(err => {
          addMessage('system', `❌ *Sync Error:*\nFailed to update live database.`);
          console.error(err);
        });
    }, 1000);
  };

  // Add new arrival
  const handleAddNewArrival = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    
    const colorKeys = Object.keys(uploadedImages);
    if (colorKeys.length === 0) {
      alert('Please upload at least one color mockup image.');
      return;
    }
    
    const categoryPrefix = newProduct.category === 'men' ? 'm' : 
                           newProduct.category === 'women' ? 'w' : 
                           newProduct.category === 'couples' ? 'c' : 'k';
    
    const categoryCount = localCatalog.filter(p => p.category === newProduct.category).length;
    const newId = `${categoryPrefix}${categoryCount + 10}` + Date.now().toString().slice(-3);

    const colorImages = {};
    const imagesList = [];
    colorKeys.forEach(col => {
      colorImages[col] = uploadedImages[col].dataUrl;
      imagesList.push(uploadedImages[col].dataUrl);
    });

    const addedItem = {
      id: newId,
      category: newProduct.category,
      title: newProduct.title,
      price: parseInt(newProduct.price),
      originalPrice: Math.round(parseInt(newProduct.price) * 1.8),
      tag: 'NEW ARRIVAL',
      image: imagesList[0],
      images: imagesList,
      colorImages: colorImages,
      colors: colorKeys,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: newProduct.description || 'Premium custom oversized graphic print tee. 100% Cotton.'
    };

    addMessage('owner', `➕ *Add New Catalog Product:* \nTitle: ${newProduct.title}\nPrice: ₹${newProduct.price}\nCategory: ${newProduct.category.toUpperCase()}\nColors: ${colorKeys.join(', ')}`);
    
    setTimeout(() => {
      addMessage('log', `📬 [Webhook Event] Product Created.\nID: ${newId} | Title: ${addedItem.title} | Category: ${addedItem.category} | Colors: ${colorKeys.join(', ')}`);
    }, 400);

    setTimeout(async () => {
      try {
        await new Promise(r => setTimeout(r, 500));
        await setDoc(doc(db, 'catalog', addedItem.id), addedItem);
        
        addMessage('system', `🚀 *Live Database Sync Successful:*\n"${newProduct.title}" added to storefront with colors: ${colorKeys.join(', ')}!\n\n✅ Storefront updated behind the scenes!`);
        setIsAddFormOpen(false);
        setUploadedImages({});
        setNewProduct({ title: '', price: '699', category: 'men', description: '' });
      } catch (error) {
        console.error("API/Storage error:", error);
        addMessage('system', `❌ *Sync Error:*\nFailed to add product to live database.`);
        alert("⚠️ Failed to process product.");
      }
    }, 1200);
  };

  return (
    <div className="admin-secure-page" style={{ padding: '0', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f6f8' }}>
      <div className="sync-modal-container" style={{ position: 'relative', width: '100%', maxWidth: '100%', margin: '0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Auth / Dashboard view */}
        <div className="sync-modal-content" style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {
            !isAuthenticated ? (
              <div className="admin-lock-screen">
                <div className="admin-lock-card">
                  <div className="admin-lock-icon-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <img src="/nph-logo.png" alt="Namma Print House Logo" style={{ height: '60px', width: 'auto', mixBlendMode: 'multiply', filter: 'invert(1)', objectFit: 'contain' }} />
                  </div>
                  <h2 className="admin-lock-title">Owner Admin Panel</h2>
                  <p className="admin-lock-subtitle">Enter the master password to access the dashboard.</p>
                  
                  <form onSubmit={handleLogin} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                      type="password" 
                      placeholder="Enter Admin Password" 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="admin-pw-input"
                      style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="admin-unlock-btn" 
                    >
                      Unlock Dashboard
                    </button>
                    <button type="button" className="admin-cancel-btn" onClick={handleClose}>Cancel</button>
                  </form>
                  {authError && <p className="admin-auth-error">{authError}</p>}
                  <p className="admin-pw-hint">🔒 For owner use only. Unauthorized access is strictly prohibited.</p>
                </div>
              </div>
            ) : (
              <div className="sync-dashboard-layout" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="sync-modal-header">
                  <div>
                    <h3><Database size={20} /> Meta WhatsApp Catalog Sync Dashboard</h3>
                    <p>🟢 Authenticated as Admin • Simulates webhook data sync with the React storefront.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button className="admin-logout-btn" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', color: 'white' }}>
                      <LogOut size={16} /> Sign out
                    </button>
                    <a href="/" className="close-sync-modal" style={{ textDecoration: 'none' }}>
                      <X size={24} />
                    </a>
                  </div>
                </div>

            {/* Split Pane Layout */}
            <div className="sync-modal-body" style={{ flex: 1, display: 'flex' }}>
              
              {/* Left Pane: WhatsApp Chat Simulator */}
              <div className="chat-pane" style={{ flex: 1 }}>
                <div className="chat-log-banner">
                  💬 Chatting with **Namma Print House Webhook Receiver** (+91 82964 37764)<br />
                  _Sent messages are parsed by the Meta App and trigger immediate storefront data updates._
                </div>
                
                <div className="chat-messages-container">
                  {messages.map(msg => (
                    <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </div>
                      <span className="chat-time">{msg.time}</span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Commands */}
                <div className="chat-quick-commands">
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', width: '100%', marginBottom: '4px' }}>⚡ Quick Webhook Triggers:</span>
                  <button className="command-btn" onClick={() => processSimulatedMessage('m7 out of stock')}>🔴 Mark Buddha Tee Out of Stock</button>
                  <button className="command-btn" onClick={() => processSimulatedMessage('m7 in stock')}>🟢 Restock Buddha Tee</button>
                  <button className="command-btn" onClick={() => {
                    setIsAddFormOpen(true);
                    addMessage('system', '📝 Fill in the form on the right panel to simulate uploading a new arrival through WhatsApp.');
                  }}>🆕 Add New Streetwear Arrival</button>
                </div>

                {/* Input Area */}
                <form className="chat-input-area" onSubmit={(e) => {
                  e.preventDefault();
                  processSimulatedMessage(inputText);
                }}>
                  <input 
                    type="text" 
                    placeholder="Type e.g., 'm7 out of stock'..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn">
                    <Send size={18} />
                  </button>
                </form>
              </div>

              {/* Right Pane: Tabbed Interface */}
              <div className="catalog-pane">
                
                {/* Tab Navigation */}
                <div className="admin-tab-nav">
                  <button 
                    className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >📦 Orders</button>
                  <button 
                    className={`admin-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
                    onClick={() => setActiveTab('catalog')}
                  >🔄 Catalog Sync</button>
                  <button 
                    className={`admin-tab-btn ${activeTab === 'marketing' ? 'active' : ''}`}
                    onClick={() => setActiveTab('marketing')}
                  >🚀 Marketing</button>
                </div>

                {/* ========== TAB: ORDERS ========== */}
                {activeTab === 'orders' && (
                    <div className="orders-tab-content" style={{ padding: '20px' }}>
                      <div className="marketing-section-header">
                        <h4>📦 Recent Orders</h4>
                        <p style={{ fontSize: '0.78rem', color: '#888', margin: '4px 0 0' }}>Manage customer orders synced directly from Checkout.</p>
                      </div>

                      {orders.length === 0 ? (
                        <p style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No orders found.</p>
                      ) : (
                        <div className="orders-list">
                          {orders.map((order) => (
                            <div key={order.id} className="order-card" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                <div>
                                  <strong>Order #{order.id}</strong>
                                  <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: '#666' }}>Date: {order.date} | UTR: {order.utrNumber}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ display: 'inline-block', backgroundColor: order.status === 'Pending' ? '#fff3cd' : '#d4edda', color: order.status === 'Pending' ? '#856404' : '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{order.status || 'Pending'}</span>
                                  <p style={{ margin: '3px 0 0', fontSize: '0.9rem', fontWeight: 'bold' }}>₹{order.total}</p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <div style={{ flex: '1', minWidth: '250px' }}>
                                  <h5 style={{ margin: '0 0 5px' }}>Customer Details</h5>
                                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#444' }}>
                                    <strong>Name:</strong> {order.customer?.firstName} {order.customer?.lastName}<br />
                                    <strong>Phone:</strong> {order.customer?.phone}<br />
                                    <strong>Email:</strong> {order.customer?.email}<br />
                                    <strong>Address:</strong> {order.customer?.address}, {order.customer?.city}, {order.customer?.state} {order.customer?.zipCode}
                                  </p>
                                </div>

                                <div style={{ flex: '2', minWidth: '300px' }}>
                                  <h5 style={{ margin: '0 0 5px' }}>Items</h5>
                                  {order.items && order.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '4px' }}>
                                      {item.image && <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                      <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>{item.title}</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Size: {item.size} | Qty: {item.quantity}</p>
                                      </div>
                                      {(item.customUrls?.front || item.customUrls?.back) && (
                                        <div style={{ fontSize: '0.75rem' }}>
                                          {item.customUrls.front && <a href={item.customUrls.front} target="_blank" rel="noreferrer" style={{ display: 'block', color: '#0d2850' }}>[Front Print]</a>}
                                          {item.customUrls.back && <a href={item.customUrls.back} target="_blank" rel="noreferrer" style={{ display: 'block', color: '#0d2850' }}>[Back Print]</a>}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                                <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', fontWeight: 'bold', color: '#666' }}>Update Tracking Status:</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  {['Order Confirmed', 'Printing & Packaging', 'Dispatched', 'Out for Delivery'].map(step => (
                                    <button
                                      key={step}
                                      onClick={async () => {
                                        try {
                                          await updateDoc(doc(db, 'orders', order.docId), { status: step });
                                        } catch (error) {
                                          console.error("Error updating status:", error);
                                          alert("Failed to update status. See console.");
                                        }
                                      }}
                                      style={{
                                        padding: '6px 10px',
                                        fontSize: '0.75rem',
                                        backgroundColor: (order.status || 'Order Confirmed') === step ? '#0d2850' : '#f0f0f0',
                                        color: (order.status || 'Order Confirmed') === step ? '#fff' : '#333',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: (order.status || 'Order Confirmed') === step ? 'bold' : 'normal'
                                      }}
                                    >
                                      {step}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                {/* ========== TAB: CATALOG ========== */}
                {activeTab === 'catalog' && (
                  <>
                {/* Form to Add Product */}
                {isAddFormOpen ? (
                  <form onSubmit={handleAddNewArrival} className="add-product-form-container">
                    <h5>🆕 Add New Arrival</h5>
                    <input 
                      type="text" 
                      placeholder="Product Title *" 
                      required 
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                    <div className="form-group-row">
                      <input 
                        type="number" 
                        placeholder="Price (INR) *" 
                        required 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="men">Men's Streetwear</option>
                        <option value="women">Women's Streetwear</option>
                        <option value="couples">Couples Matching</option>
                        <option value="kannada">Kannada Hub</option>
                        <option value="movie">Movie Collection</option>
                        <option value="anime">Anime Collection</option>
                        <option value="cultural">Cultural Collection</option>
                        <option value="bike">Bike Collection</option>
                        <option value="pets">Cat & Dogs</option>
                      </select>
                    </div>

                    {/* Multi-Image Upload Area */}
                    <div className="multi-image-upload-section">
                      <label className="multi-upload-title">📸 Upload Mockup Images (Max 5 colors, Min 1) *</label>
                      <div className="color-uploads-grid">
                        {STANDARD_COLORS.map(color => {
                          const uploaded = uploadedImages[color];
                          return (
                            <div key={color} className="color-upload-item">
                              <span className="color-tag-label">{color}:</span>
                              {uploaded ? (
                                <div className="color-preview-box">
                                  <img src={uploaded.dataUrl} alt={color} className="color-preview-thumb" />
                                  <div className="color-preview-details">
                                    <span className="color-preview-name" title={uploaded.fileName}>{uploaded.fileName}</span>
                                    <button 
                                      type="button" 
                                      className="color-remove-btn"
                                      onClick={() => {
                                        const next = { ...uploadedImages };
                                        delete next[color];
                                        setUploadedImages(next);
                                      }}
                                    >✕ Remove</button>
                                  </div>
                                </div>
                              ) : (
                                <label className="color-upload-button">
                                  <span>📁 Upload Image</span>
                                  <input 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => handleImageUpload(e, color)}
                                    style={{ display: 'none' }}
                                  />
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <textarea 
                      placeholder="Product Description (optional)"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <p style={{ margin: '0', fontSize: '0.72rem', color: '#888' }}>🎨 Only the uploaded colors above will be shown as available swatches in the storefront. Sizes S/M/L/XL will be auto-applied.</p>
                    <div className="form-actions-row">
                      <button type="button" className="form-cancel-btn" onClick={() => { setIsAddFormOpen(false); setUploadedImages({}); }}>Cancel</button>
                      <button type="submit" className="form-submit-btn">🚀 Add to Store</button>
                    </div>
                  </form>
                ) : (
                  <div className="catalog-pane-header">
                    <h4>📦 WhatsApp Business Catalogue</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        type="button"
                        className="reset-catalog-btn" 
                        onClick={() => {
                          if (window.confirm("🧹 Are you sure you want to reset the store catalog? This will delete all custom uploaded products from this session and restore the original items.")) {
                            localStorage.removeItem('nph_catalog');
                            window.location.reload();
                          }
                        }}
                        style={{
                          background: '#fee2e2',
                          color: '#ef4444',
                          border: '1px solid #fecaca',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        title="Delete all uploads and restore default products"
                      >
                        🧹 Reset
                      </button>
                      <button className="add-arrival-trigger-btn" onClick={() => setIsAddFormOpen(true)}>
                        ➕ Add Product
                      </button>
                    </div>
                  </div>
                )}

                {/* Catalogue Product List */}
                <div className="catalog-items-list">
                  {(() => {
                    const categories = [...new Set(localCatalog.map(p => p.category))];
                    return categories.map(category => (
                      <div key={category} className="catalog-category-group" style={{ marginBottom: '40px' }}>
                        <h4 style={{ 
                          padding: '12px 15px', 
                          backgroundColor: '#0d2850', 
                          color: '#fff', 
                          borderRadius: '8px',
                          marginBottom: '20px',
                          textTransform: 'uppercase',
                          fontWeight: '700',
                          letterSpacing: '1px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          📦 {category}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {localCatalog.filter(p => p.category === category).map(p => (
                            <div key={p.id} className="catalog-item-row">
                              <img src={p.image} alt={p.title} />
                              <div className="catalog-item-details">
                                <h5>{p.title}</h5>
                                <p>ID: `{p.id}` | Price: ₹{p.price}</p>
                                <span className={`stock-badge-pill ${p.outOfStock ? 'out-of-stock' : 'in-stock'}`}>
                                  {p.outOfStock ? 'Out of Stock' : 'In Stock'}
                                </span>
                              </div>
                              <div className="catalog-item-actions">
                                <button 
                                  className={`stock-toggle-btn ${p.outOfStock ? 'out-of-stock' : 'in-stock'}`}
                                  onClick={() => handleCatalogStockToggle(p.id, !p.outOfStock)}
                                >
                                  {p.outOfStock ? 'Restock 🟢' : 'Sold Out 🔴'}
                                </button>
                                <button 
                                  onClick={async () => {
                                    if (window.confirm(`Are you sure you want to permanently delete "${p.title}"?`)) {
                                      const success = await deleteProduct(p.id);
                                      if (success) {
                                        addMessage('system', `🗑️ Product "${p.title}" was deleted successfully.`);
                                      } else {
                                        addMessage('system', `❌ Failed to delete product "${p.title}".`);
                                      }
                                    }
                                  }}
                                  style={{
                                    marginLeft: '10px',
                                    padding: '8px 12px',
                                    backgroundColor: '#fee2e2',
                                    color: '#ef4444',
                                    border: '1px solid #fecaca',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Delete 🗑️
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                  </>
                )}

                {/* ========== TAB: MARKETING & CAMPAIGNS ========== */}
                {activeTab === 'marketing' && (
                  <div className="marketing-tab-content">
                    <div className="marketing-section-header">
                      <h4>📣 Marketing Command Center</h4>
                      <p style={{ fontSize: '0.78rem', color: '#888', margin: '4px 0 0' }}>Select a campaign, promo code, and global discount, then deploy to instantly update the entire storefront.</p>
                    </div>

                    {/* Ad Campaigns */}
                    <div className="marketing-group">
                      <label className="marketing-group-label">🔥 Ad Campaigns</label>
                      <div className="marketing-options-grid">
                        {CAMPAIGNS.map(c => (
                          <button
                            key={c.id}
                            type="button"
                            className={`marketing-option-card ${activeCampaign === c.id ? 'selected' : ''} ${c.id === 'none' ? 'none-option' : ''}`}
                            onClick={() => setActiveCampaign(c.id)}
                          >
                            <span className="marketing-option-radio">{activeCampaign === c.id ? '◉' : '○'}</span>
                            <span className="marketing-option-name">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Promo Codes */}
                    <div className="marketing-group">
                      <label className="marketing-group-label">🏷️ Promo Codes</label>
                      <div className="marketing-options-grid">
                        {PROMO_CODES.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            className={`marketing-option-card ${activePromo === p.id ? 'selected' : ''} ${p.id === 'none' ? 'none-option' : ''}`}
                            onClick={() => setActivePromo(p.id)}
                          >
                            <span className="marketing-option-radio">{activePromo === p.id ? '◉' : '○'}</span>
                            <div className="marketing-option-info">
                              <span className="marketing-option-name">{p.code || 'Disable'}</span>
                              {p.code && <span className="marketing-option-desc">{p.description}</span>}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Discounts */}
                    <div className="marketing-group">
                      <label className="marketing-group-label">💰 Global Discount</label>
                      <div className="marketing-options-grid">
                        {DISCOUNTS.map(d => (
                          <button
                            key={d.id}
                            type="button"
                            className={`marketing-option-card ${activeDiscount === d.id ? 'selected' : ''} ${d.id === 'none' ? 'none-option' : ''}`}
                            onClick={() => setActiveDiscount(d.id)}
                          >
                            <span className="marketing-option-radio">{activeDiscount === d.id ? '◉' : '○'}</span>
                            <span className="marketing-option-name">{d.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Summary */}
                    <div className="marketing-summary-box">
                      <h5>📋 Active Configuration</h5>
                      <div className="summary-row">
                        <span>Campaign:</span>
                        <span className={activeCampaign !== 'none' ? 'active-badge' : 'inactive-badge'}>
                          {CAMPAIGNS.find(c => c.id === activeCampaign)?.name || 'None'}
                        </span>
                      </div>
                      <div className="summary-row">
                        <span>Promo Code:</span>
                        <span className={activePromo !== 'none' ? 'active-badge' : 'inactive-badge'}>
                          {PROMO_CODES.find(p => p.id === activePromo)?.code || 'None'}
                        </span>
                      </div>
                      <div className="summary-row">
                        <span>Discount:</span>
                        <span className={activeDiscount !== 'none' ? 'active-badge' : 'inactive-badge'}>
                          {DISCOUNTS.find(d => d.id === activeDiscount)?.label || 'None'}
                        </span>
                      </div>
                    </div>

                    {/* Deploy Button */}
                    <button 
                      type="button"
                      className="deploy-marketing-btn"
                      onClick={deployMarketingSettings}
                    >
                      🚀 Deploy to Website
                    </button>

                    {/* Kill All Button */}
                    <button
                      type="button"
                      className="kill-marketing-btn"
                      onClick={async () => {
                        setActiveCampaign('none');
                        setActivePromo('none');
                        setActiveDiscount('none');
                        await updateMarketingStore({
                          activeCampaign: 'none',
                          activePromo: 'none',
                          activeDiscount: 'none',
                          campaignData: null,
                          promoData: null,
                          discountData: null
                        });
                        addMessage('system', '🛑 *All Marketing Campaigns Deactivated.*\nThe storefront has been reset to default state.\n\n✅ Storefront updated behind the scenes!');
                        
                      }}
                    >
                      🛑 Deactivate All Campaigns
                    </button>
                  </div>
                )}

                </div>

            </div>
          </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSecure;
