import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { ProductList } from '../components/sections/ProductList';
import { CollectionList } from '../components/sections/CollectionList';
import { Marquee } from '../components/sections/Marquee';
import { MediaWithContent } from '../components/sections/MediaWithContent';

export function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero
        heading="Welcome to Our Store"
        subheading="Discover quality products curated just for you at affordable prices."
        buttonLabel="Shop Now"
        buttonLink="/products"
        secondaryButtonLabel="View Collections"
        secondaryButtonLink="/collections"
        sectionHeight="large"
        horizontalAlignment="center"
        colorScheme="dark"
      />

      {/* Announcement */}
      <Marquee
        text="Free shipping on orders over ฿1,500 • New arrivals weekly • 30-day returns"
        colorScheme="dark"
        paddingTop={12}
        paddingBottom={12}
      />

      {/* Featured Products */}
      <ProductList
        title="Featured Products"
        columns={4}
        paddingTop={48}
        paddingBottom={48}
      />

      {/* Featured Collections */}
      <CollectionList
        title="Shop by Category"
        columns={3}
        cardStyle="overlay"
        paddingTop={48}
        paddingBottom={48}
      />

      {/* About Section */}
      <MediaWithContent
        heading="Our Story"
        subheading="About Us"
        description="We believe in quality craftsmanship and sustainable practices. Every product in our store is carefully selected to bring you the best value."
        buttonLabel="Learn More"
        buttonLink="/about"
        mediaPosition="left"
        paddingTop={48}
        paddingBottom={48}
      />
    </Layout>
  );
}

export default HomePage;
