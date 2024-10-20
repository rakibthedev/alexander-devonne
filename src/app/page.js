import OurPicks from "./components/homepage/OurPicks";
import ProductSet from "./components/homepage/ProductSet";

export default function Home() {
  return (
   <main>
      <ProductSet setId="brb"/>
      <ProductSet setId="the-jitney"/>
      <ProductSet setId="the-vulc"/>
      <OurPicks />
   </main>
  );
}
