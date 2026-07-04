import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import SEO from '../components/SEO';

// Lazy load below-the-fold components
const ProductGrid = lazy(() => import('../components/ProductGrid'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const BestSellers = lazy(() => import('../components/BestSellers'));
const CustomPrintBanner = lazy(() => import('../components/CustomPrintBanner'));

const Home = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Namma Print House",
    "url": "https://nammaprinthouse.com",
    "logo": "https://nammaprinthouse.com/logo.png"
  };
  return (
    <main>
      <SEO 
        title="Namma Print House | Premium Custom T-Shirts & Apparel"
        description="Shop premium oversized t-shirts, custom graphics, and matching couples apparel at Namma Print House. Fast delivery across India."
        type="website"
        schema={orgSchema}
      />
      <Hero />
      <CategoryCards />
      <Suspense fallback={<div style={{ minHeight: '400px' }}></div>}>
        <ProductGrid />
        <WhyChooseUs />
        <BestSellers />
        <CustomPrintBanner />
      </Suspense>
    </main>
  );
};

export default Home;
