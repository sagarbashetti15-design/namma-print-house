import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import { CatalogProvider } from './context/CatalogContext'

import Home from './pages/Home'

// Lazy loaded pages for performance
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'))
const ReturnRefundPolicy = lazy(() => import('./pages/ReturnRefundPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const BulkOrders = lazy(() => import('./pages/BulkOrders'))
const FAQs = lazy(() => import('./pages/FAQs'))
const SizeGuide = lazy(() => import('./pages/SizeGuide'))
const CareInstructions = lazy(() => import('./pages/CareInstructions'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const AdminDashboardSecure = lazy(() => import('./pages/AdminDashboardSecure'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
import axios from 'axios'

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdmin && <Header />}
      <main style={{ minHeight: isAdmin ? '100vh' : '60vh' }}>
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
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
};

function App() {
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
      }
    };
    fetchGlobalData();
  }, []);

  return (
    <ToastProvider>
      <CatalogProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <ScrollToTop />
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>Loading Namma Print House...</div>}>
                <AppContent />
              </Suspense>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </CatalogProvider>
    </ToastProvider>
  )
}

export default App
