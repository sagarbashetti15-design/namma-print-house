import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import SEO from '../components/SEO';

import { motion } from 'framer-motion';

// Lazy load below-the-fold components
const FeaturedVideos = lazy(() => import('../components/FeaturedVideos'));
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="Namma Print House | Premium Custom T-Shirts & Apparel"
        description="Shop premium oversized t-shirts, custom graphics, and matching couples apparel at Namma Print House. Fast delivery across India."
        keywords="oversized t-shirt, oversized t-shirt men, oversized t-shirt women, oversized t-shirt under 500, oversized t-shirt for gym, oversized t-shirt for girls, oversized t-shirt cotton, oversized t-shirt full sleeve, oversized t-shirt combo, custom t-shirts, printed oversized tees india"
        type="website"
        schema={orgSchema}
      />
      <Hero />
      <CategoryCards />
      <Suspense fallback={<div style={{ minHeight: '400px' }}></div>}>
        <FeaturedVideos />
        <ProductGrid />
        <WhyChooseUs />
        <BestSellers />
        <CustomPrintBanner />
      </Suspense>
    </motion.main>
  );
};

export default Home;
