import React from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import ProductGrid from '../components/ProductGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import BestSellers from '../components/BestSellers';
import CustomerReviews from '../components/CustomerReviews';
import CustomPrintBanner from '../components/CustomPrintBanner';
import SEO from '../components/SEO';

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
      <ProductGrid />
      <WhyChooseUs />
      <BestSellers />
      <CustomerReviews />
      <CustomPrintBanner />
    </main>
  );
};

export default Home;
