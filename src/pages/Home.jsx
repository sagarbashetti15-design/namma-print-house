import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

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
    <main>
      <SEO 
        title="Oversized T-Shirts & Custom Printed Tees Online in India | Namma Print House"
        description="Buy premium oversized t-shirts, custom graphics, and personalized couple outfits online. Best quality customized t-shirts with fast delivery across India."
        keywords="t shirts, oversize t shirts, oversized t-shirt, custom t-shirt, customized t shirt, printed oversized tees india, buy tshirts online, custom print shop bengaluru, couple matching t-shirts, anime oversized t-shirts"
        type="website"
        schema={orgSchema}
      />
      <Hero />
      <Suspense fallback={<div style={{ minHeight: '400px' }}></div>}>
        <ProductGrid />
        <FeaturedVideos />
        <WhyChooseUs />
        <BestSellers />
        <CustomPrintBanner />
      </Suspense>
    </main>
  );
};

export default Home;
