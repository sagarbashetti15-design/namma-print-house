import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, User, X, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import LoginModal from './LoginModal';
import UserProfileModal from './UserProfileModal';
import CartDrawer from './CartDrawer';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('nph_is_logged_in') === 'true';
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('nph_user_profile');
      return stored ? JSON.parse(stored) : { name: '', email: '', mobile: '' };
    } catch (e) {
      return { name: '', email: '', mobile: '' };
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { totalItems, openCartDrawer } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Read active marketing config from localStorage
  const [marketingConfig, setMarketingConfig] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('nph_marketing');
    if (stored) {
      setMarketingConfig(JSON.parse(stored));
    }
  }, []);

  // Build dynamic promo messages (inject active promo code if deployed)
  const basePromoMessages = [
    { text: "🚀 WELCOME OFFER: Flat ₹100 OFF on orders above ₹500! Use Code:", code: "WELCOME100" },
    { text: "🔥 SPECIAL DISCOUNT: Get 10% OFF on all Streetwear Tees! Use Code:", code: "NAMMAPRINT10" },
    { text: "💳 PREPAID BONUS: Pay via UPI/Card to get Extra 5% OFF! Use Code:", code: "PREPAID5" },
    { text: "📦 FREE SHIPPING: Free delivery PAN India on orders above ₹999!", code: null }
  ];

  const promoMessages = React.useMemo(() => {
    const msgs = [...basePromoMessages];
    if (marketingConfig?.promoData?.code) {
      msgs.unshift({
        text: `🏷️ EXCLUSIVE: ${marketingConfig.promoData.description}! Use Code:`,
        code: marketingConfig.promoData.code
      });
    }
    if (marketingConfig?.discountData?.type === 'percent' && marketingConfig.discountData.value > 0) {
      msgs.unshift({
        text: `💥 STORE-WIDE SALE: ${marketingConfig.discountData.value}% OFF on EVERYTHING! Limited Time!`,
        code: null
      });
    } else if (marketingConfig?.discountData?.type === 'flat' && marketingConfig.discountData.value > 0) {
      msgs.unshift({
        text: `💥 STORE-WIDE SALE: Flat ₹${marketingConfig.discountData.value} OFF on EVERYTHING! Limited Time!`,
        code: null
      });
    }
    return msgs;
  }, [marketingConfig]);

  const [currentPromoIdx, setCurrentPromoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIdx(prev => (prev + 1) % promoMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [promoMessages.length]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => showToast(`📋 Code "${code}" copied to clipboard!`, "success"))
      .catch(() => showToast(`Failed to copy code`, "error"));
  };

  // Handle dark mode toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = (profile) => {
    setIsLoggedIn(true);
    localStorage.setItem('nph_is_logged_in', 'true');
    setUserProfile(profile);
    localStorage.setItem('nph_user_profile', JSON.stringify(profile));
    setIsLoginModalOpen(false);
    showToast(`Welcome back, ${profile.name}!`, 'success');
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('nph_user_profile', JSON.stringify(updatedProfile));
    setIsProfileModalOpen(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('nph_is_logged_in', 'false');
    setIsProfileModalOpen(false);
    localStorage.removeItem('nph_user_profile');
    localStorage.removeItem('nph_token');
    setUserProfile({ name: '', email: '', mobile: '' });
    showToast('Logged out successfully', 'info');
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      setIsProfileModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        {/* Campaign Banner (if active) */}
        {marketingConfig?.campaignData?.label && (
          <div className="campaign-banner">
            <div className="campaign-banner-text">
              {marketingConfig.campaignData.label}
            </div>
          </div>
        )}
        <div className="header-top-bar">
          <div className="container top-bar-content">
            <div className="promo-ticker-message" key={currentPromoIdx}>
              <span>{promoMessages[currentPromoIdx].text}</span>
              {promoMessages[currentPromoIdx].code && (
                <button 
                  type="button"
                  className="promo-code-badge" 
                  onClick={() => copyToClipboard(promoMessages[currentPromoIdx].code)}
                  title="Click to copy promo code"
                  style={{ border: 'none', background: 'linear-gradient(135deg, #FFB400, #ff8c00)' }}
                >
                  {promoMessages[currentPromoIdx].code}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="header-main">
          <div className="container header-container">
            <div className="header-left">
              <button className="mobile-menu-btn" aria-label="Open mobile menu" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} aria-hidden="true" />
              </button>
              <Link to="/" className="logo">
                <span className="logo-text text-primary">Namma</span>
                <span className="logo-sub">Print House</span>
              </Link>
              
              <nav className="desktop-nav">
                <Link to="/category/men" className="nav-link">MEN</Link>
                <Link to="/category/women" className="nav-link">WOMEN</Link>
                <Link to="/category/couples" className="nav-link">COUPLES</Link>
                <Link to="/category/custom" className="nav-link">CUSTOM PRINT</Link>
              </nav>
            </div>

            <div className="header-right">
              <form className="search-bar" onSubmit={handleSearchSubmit} role="search">
                <Search size={18} className="search-icon" aria-hidden="true" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <div className="header-actions">
                <button className="action-btn theme-toggle-btn" onClick={toggleTheme} title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="action-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
                </button>
                <button className="action-btn" onClick={handleUserClick}>
                  <User size={22} />
                  <span className="action-label">{isLoggedIn ? 'Profile' : 'Login'}</span>
                </button>
                <Link to="/wishlist" className="action-btn" aria-label="View Wishlist"><Heart size={22} aria-hidden="true" /></Link>
                <button className="action-btn cart-btn" aria-label="View Cart" onClick={openCartDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <ShoppingBag size={22} aria-hidden="true" />
                  {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="mobile-sidebar-header">
            <div className="logo">
              <span className="logo-text text-primary">Namma</span>
              <span className="logo-sub">Print House</span>
            </div>
            <button className="close-btn" aria-label="Close mobile menu" onClick={() => setIsMobileMenuOpen(false)}><X size={24} aria-hidden="true" /></button>
          </div>
          <nav className="mobile-nav">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
            <Link to="/category/men" onClick={() => setIsMobileMenuOpen(false)}>MEN</Link>
            <Link to="/category/women" onClick={() => setIsMobileMenuOpen(false)}>WOMEN</Link>
            <Link to="/category/couples" onClick={() => setIsMobileMenuOpen(false)}>COUPLES</Link>
            <Link to="/category/custom" onClick={() => setIsMobileMenuOpen(false)}>CUSTOM PRINT</Link>
            <hr />
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>MY WISHLIST</Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>MY BAG</Link>
          </nav>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSave={handleSaveProfile}
        onLogout={handleLogout}
      />
      <CartDrawer />
    </>
  );
};

export default Header;
