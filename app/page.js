import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import DevelopmentProcess from './components/DevelopmentProcess';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProductGrid />
      <DevelopmentProcess />
      <Newsletter />
      <Footer />
    </main>
  );
}
