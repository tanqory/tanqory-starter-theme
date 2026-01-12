// =============================================================================
// Home Screen (Draftbit pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useGlobalVariable, useSetGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { AnnouncementBarSection } from '../components/sections/AnnouncementBarSection';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedCollectionSection } from '../components/sections/FeaturedCollectionSection';
import { CollectionListSection } from '../components/sections/CollectionListSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { LogoListSection } from '../components/sections/LogoListSection';
import { useStoreGET } from '../apis';

// =============================================================================
// Types
// =============================================================================

export interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
  route?: {
    params?: Record<string, unknown>;
  };
}

// =============================================================================
// Screen
// =============================================================================

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { STORE_CONFIG, ANNOUNCEMENT_BAR } = useGlobalVariable();
  const setGlobalVariable = useSetGlobalVariable();

  const logoUrl = getLogoUrl(STORE_CONFIG);

  // Fetch store config on mount
  const { data: storeData } = useStoreGET({});

  useEffect(() => {
    if (storeData) {
      setGlobalVariable('STORE_CONFIG', storeData);
    }
  }, [storeData, setGlobalVariable]);

  // Sample menu items - in real app, these come from store settings
  const menuItems = [
    { id: '1', label: 'Shop', href: '/collections/all' },
    { id: '2', label: 'New Arrivals', href: '/collections/new-arrivals' },
    { id: '3', label: 'Sale', href: '/collections/sale' },
    { id: '4', label: 'About', href: '/pages/about' },
    { id: '5', label: 'Contact', href: '/pages/contact' },
  ];

  // Sample announcements
  const announcements = (ANNOUNCEMENT_BAR as { announcements?: { message: string; link?: string; linkText?: string }[] })?.announcements || [
    { message: 'Free shipping on orders over $50', link: '/shipping' },
    { message: 'New collection just dropped!', link: '/collections/new' },
  ];

  // Sample collections for CollectionListSection
  const collections = [
    {
      id: '1',
      handle: 'womens',
      title: "Women's",
      image: { src: '/images/collections/womens.jpg', altText: "Women's Collection" },
      productsCount: 42,
    },
    {
      id: '2',
      handle: 'mens',
      title: "Men's",
      image: { src: '/images/collections/mens.jpg', altText: "Men's Collection" },
      productsCount: 38,
    },
    {
      id: '3',
      handle: 'accessories',
      title: 'Accessories',
      image: { src: '/images/collections/accessories.jpg', altText: 'Accessories Collection' },
      productsCount: 24,
    },
    {
      id: '4',
      handle: 'sale',
      title: 'Sale',
      image: { src: '/images/collections/sale.jpg', altText: 'Sale Collection' },
      productsCount: 15,
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: '1',
      content: 'Amazing quality and fast shipping! Will definitely order again.',
      author: 'Sarah M.',
      title: 'Verified Buyer',
      rating: 5,
    },
    {
      id: '2',
      content: 'The best online shopping experience I have ever had.',
      author: 'John D.',
      title: 'Verified Buyer',
      rating: 5,
    },
    {
      id: '3',
      content: 'Great customer service and beautiful products.',
      author: 'Emily R.',
      title: 'Verified Buyer',
      rating: 5,
    },
  ];

  // Sample logos
  const logos = [
    { id: '1', image: '/images/logos/logo1.svg', alt: 'Partner 1' },
    { id: '2', image: '/images/logos/logo2.svg', alt: 'Partner 2' },
    { id: '3', image: '/images/logos/logo3.svg', alt: 'Partner 3' },
    { id: '4', image: '/images/logos/logo4.svg', alt: 'Partner 4' },
    { id: '5', image: '/images/logos/logo5.svg', alt: 'Partner 5' },
    { id: '6', image: '/images/logos/logo6.svg', alt: 'Partner 6' },
  ];

  // Footer columns
  const footerColumns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', url: '/collections/all' },
        { label: 'New Arrivals', url: '/collections/new-arrivals' },
        { label: 'Best Sellers', url: '/collections/best-sellers' },
        { label: 'Sale', url: '/collections/sale' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', url: '/pages/contact' },
        { label: 'FAQs', url: '/pages/faq' },
        { label: 'Shipping', url: '/pages/shipping' },
        { label: 'Returns', url: '/pages/returns' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', url: '/pages/about' },
        { label: 'Sustainability', url: '/pages/sustainability' },
        { label: 'Careers', url: '/pages/careers' },
        { label: 'Press', url: '/pages/press' },
      ],
    },
  ];

  // Social links
  const socialLinks = [
    { platform: 'facebook' as const, url: 'https://facebook.com' },
    { platform: 'instagram' as const, url: 'https://instagram.com' },
    { platform: 'twitter' as const, url: 'https://twitter.com' },
  ];

  const handleNavigate = (href: string) => {
    // Parse href and navigate
    if (href.startsWith('/products/')) {
      navigation?.navigate('Product', { handle: href.replace('/products/', '') });
    } else if (href.startsWith('/collections/')) {
      navigation?.navigate('Collection', { handle: href.replace('/collections/', '') });
    } else if (href.startsWith('/pages/')) {
      navigation?.navigate('Page', { handle: href.replace('/pages/', '') });
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    } else if (href === '/search') {
      navigation?.navigate('Search');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Announcement Bar */}
      <AnnouncementBarSection
        announcements={announcements}
        style="carousel"
        autoRotate
        dismissible
      />

      {/* Header */}
      <HeaderSection
        logo={{
          src: logoUrl,
          alt: STORE_CONFIG?.name || 'Store',
        }}
        showSearch
        showCart
        sticky
        onCartClick={() => handleNavigate('/cart')}
        onSearchSubmit={(query) => navigation?.navigate('Search', { query })}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSection
          heading="New Season, New Style"
          subheading="Discover our latest collection"
          description="Explore the latest trends and find your perfect look."
          backgroundImage="/images/hero-bg.jpg"
          height="full"
          layout="center"
          textColor="light"
          overlay
          overlayOpacity={40}
          primaryButton={{
            label: 'Shop Now',
            link: '/collections/new-arrivals',
          }}
          secondaryButton={{
            label: 'Learn More',
            link: '/pages/about',
          }}
        />

        {/* Featured Collection */}
        <FeaturedCollectionSection
          title="Best Sellers"
          description="Our most popular products, loved by customers"
          collectionHandle="best-sellers"
          limit={8}
          columns={4}
          layout="grid"
          showViewAll
          viewAllLink="/collections/best-sellers"
        />

        {/* Collection List */}
        <CollectionListSection
          title="Shop by Category"
          collections={collections}
          columns={4}
          layout="grid"
          imageRatio="portrait"
          showProductCount
        />

        {/* Featured Collection - New Arrivals */}
        <FeaturedCollectionSection
          title="New Arrivals"
          description="Fresh styles just in"
          collectionHandle="new-arrivals"
          limit={4}
          columns={4}
          layout="carousel"
          showViewAll
          viewAllLink="/collections/new-arrivals"
        />

        {/* Testimonials */}
        <TestimonialsSection
          title="What Our Customers Say"
          testimonials={testimonials}
          layout="carousel"
          columns={3}
          showRating
          showAvatar
        />

        {/* Logo List */}
        <LogoListSection
          title="As Featured In"
          logos={logos}
          layout="marquee"
          grayscale
          showOnHover
        />

        {/* Newsletter */}
        <NewsletterSection
          title="Join Our Newsletter"
          description="Subscribe to get special offers, free giveaways, and exclusive deals."
          placeholder="Enter your email"
          buttonText="Subscribe"
          successMessage="Thanks for subscribing!"
          alignment="center"
          maxWidth="medium"
          backgroundColor="#1a1a1a"
          textColor="light"
        />
      </main>

      {/* Footer */}
      <FooterSection
        logo={{
          src: logoUrl,
          alt: STORE_CONFIG?.name || 'Store',
        }}
        columns={footerColumns}
        showNewsletter={false}
        socialLinks={socialLinks}
        copyrightText={`© ${new Date().getFullYear()} ${STORE_CONFIG?.name || 'Store'}. All rights reserved.`}
      />
    </div>
  );
}

export default HomeScreen;
