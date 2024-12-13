// app/page.js
import { unstable_noStore as noStore } from 'next/cache';
import ProductSet from './components/homepage/ProductSet';

export default async function Home() {

  //noStore();

  return (
    <main>
      <ProductSet />
    </main>
  );
}
