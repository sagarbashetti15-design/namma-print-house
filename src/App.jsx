import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SearchPage from './pages/SearchPage'
import WishlistPage from './pages/WishlistPage'
import Contact from './pages/Contact'
import About from './pages/About'
import ShippingPolicy from './pages/ShippingPolicy'
import ReturnRefundPolicy from './pages/ReturnRefundPolicy'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BulkOrders from './pages/BulkOrders'
import FAQs from './pages/FAQs'
import SizeGuide from './pages/SizeGuide'
import CareInstructions from './pages/CareInstructions'
import TrackOrder from './pages/TrackOrder'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import WhatsAppButton from './components/WhatsAppButton'
import AdminDashboardSecure from './pages/AdminDashboardSecure'
import ScrollToTop from './components/ScrollToTop'
import AdminDashboard from './pages/AdminDashboard'
import axios from 'axios'

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [catalogRes, marketingRes] = await Promise.all([
          axios.get('/api/catalog'),
          axios.get('/api/marketing')
        ]);
        
        if (catalogRes.data && catalogRes.data.length > 0) {
          localStorage.setItem('nph_catalog', JSON.stringify(catalogRes.data));
        }
        
        if (marketingRes.data) {
          localStorage.setItem('nph_marketing', JSON.stringify(marketingRes.data));
        }
      } catch (err) {
        console.error('Failed to sync global store data from server', err);
      } finally {
        setIsDataLoaded(true);
      }
    };
    fetchGlobalData();
  }, []);

  if (!isDataLoaded) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>Loading Namma Print House...</div>;
  }

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="app-container">

            <Header />
            <main style={{ minHeight: '60vh' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnRefundPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/bulk" element={<BulkOrders />} />
                <Route path="/faq" element={<FAQs />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/care" element={<CareInstructions />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin-secure-portal" element={<AdminDashboardSecure />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
    </ToastProvider>
  )
}

export default App
