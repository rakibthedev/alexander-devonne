// app/page.js
import { unstable_noStore as noStore } from 'next/cache';
import ProductSet from './components/homepage/ProductSet';
import ScrollToTop from './components/ScrollToTop';


export default async function Home() {

  // noStore();

  return (
    <main>
      <ScrollToTop />
      <ProductSet />
    </main>
  );
}
