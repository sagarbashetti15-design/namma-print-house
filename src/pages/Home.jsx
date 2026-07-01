import React from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import ProductGrid from '../components/ProductGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import BestSellers from '../components/BestSellers';
import CustomerReviews from '../components/CustomerReviews';
import CustomPrintBanner from '../components/CustomPrintBanner';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Home');
  return (
    <main>
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
