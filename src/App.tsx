/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryChips } from './components/CategoryChips';
import { FuelBanner } from './components/FuelBanner';
import { BrowseDeals } from './components/BrowseDeals';
import { ElectricTrending } from './components/ElectricTrending';
import { TrustpilotReviews } from './components/TrustpilotReviews';
import { EditorialDarkSection } from './components/EditorialDarkSection';
import { ElectricRevolution } from './components/ElectricRevolution';
import { ExploreCars } from './components/ExploreCars';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BottomStickyBanner } from './components/BottomStickyBanner';
import { BuyACarPage } from './pages/BuyACarPage';
import { SellACarPage } from './pages/SellACarPage';
import { ShowroomPage } from './pages/ShowroomPage';
import { CarDetailPage } from './pages/CarDetailPage';

type ActivePage = 'home' | 'buy' | 'sell' | 'showroom' | 'detail';

export default function App() {
  const detectDealId = (): string => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/deal/')) {
      return path.split('/deal/')[1]?.split('?')[0] || '';
    }
    if (hash.includes('deal=')) {
      return hash.split('deal=')[1]?.split('&')[0] || '';
    }
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('deal') || urlParams.get('id') || '';
    } catch {
      return '';
    }
  };

  const detectPage = (): ActivePage => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/deal') || hash.includes('deal=') || window.location.search.includes('deal=')) {
      return 'detail';
    }
    if (path.includes('showroom') || hash.includes('showroom')) {
      return 'showroom';
    }
    if (path.includes('buyacar') || path.includes('buy-a-car') || hash.includes('buyacar')) {
      return 'buy';
    }
    if (path.includes('sellacar') || path.includes('sell-a-car') || hash.includes('sellacar') || hash.includes('sell')) {
      return 'sell';
    }
    return 'home';
  };

  const detectVehicleQuery = (): string => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('car') || urlParams.get('vehicle') || urlParams.get('q') || '';
    } catch {
      return '';
    }
  };

  const [activePage, setActivePage] = useState<ActivePage>(detectPage());
  const [sellingCarPhrase, setSellingCarPhrase] = useState<string>(detectVehicleQuery());
  const [selectedDealId, setSelectedDealId] = useState<string>(detectDealId() || 'audi-a3-sportback');

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(detectPage());
      setSellingCarPhrase(detectVehicleQuery());
      const dealId = detectDealId();
      if (dealId) {
        setSelectedDealId(dealId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToBuy = () => {
    window.history.pushState({}, '', '/buyacar');
    setActivePage('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSell = (carPhrase?: string) => {
    const phrase = carPhrase?.trim() || '';
    setSellingCarPhrase(phrase);
    const targetUrl = phrase ? `/sellacar?vehicle=${encodeURIComponent(phrase)}` : '/sellacar';
    window.history.pushState({}, '', targetUrl);
    setActivePage('sell');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShowroom = () => {
    window.history.pushState({}, '', '/showroom');
    setActivePage('showroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDeal = (dealId: string) => {
    setSelectedDealId(dealId);
    window.history.pushState({}, '', `/deal/${dealId}`);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activePage === 'detail') {
    return (
      <CarDetailPage
        carId={selectedDealId}
        onBack={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            navigateToShowroom();
          }
        }}
        onNavigateToHome={navigateToHome}
        onNavigateToBuy={navigateToBuy}
        onNavigateToSell={navigateToSell}
        onNavigateToShowroom={navigateToShowroom}
        onNavigateToDeal={navigateToDeal}
      />
    );
  }

  if (activePage === 'buy') {
    return <BuyACarPage onBackToHome={navigateToHome} />;
  }

  if (activePage === 'sell') {
    return <SellACarPage onBackToHome={navigateToHome} initialCarPhrase={sellingCarPhrase} />;
  }

  if (activePage === 'showroom') {
    return (
      <ShowroomPage
        onBackToHome={navigateToHome}
        onNavigateToBuy={navigateToBuy}
        onNavigateToSell={navigateToSell}
        onNavigateToDeal={navigateToDeal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-[#8574ff] selection:text-neutral-950">
      {/* 1. Header with Top Nav */}
      <Header
        onNavigateToHome={navigateToHome}
        onNavigateToBuy={navigateToBuy}
        onNavigateToSell={navigateToSell}
        onNavigateToShowroom={navigateToShowroom}
      />

      <main className="flex-grow">
        {/* 2. Hero Section: EV Grant & Car Valuer/Finder */}
        <HeroBanner onNavigateToBuy={navigateToBuy} onNavigateToSell={navigateToSell} />

        {/* 3. Category Filter Chips */}
        <CategoryChips onNavigateToShowroom={navigateToShowroom} />

        {/* 4. "I PITY THE FUEL!" Featured EV Banner */}
        <FuelBanner />

        {/* 5. Browse Deals 6-Grid */}
        <BrowseDeals />

        {/* 6. Just Listed Trending Carousel */}
        <ElectricTrending
          onNavigateToShowroom={navigateToShowroom}
          onNavigateToDeal={navigateToDeal}
        />

        {/* 7. Trustpilot Reviews & Partners We Trust */}
        <TrustpilotReviews />

        {/* 8. Editorial Dark Section: Mat Watson, Reviews, News & Videos */}
        <EditorialDarkSection />

        {/* 9. Join the Electric Revolution (Charging Map, Delivery, Costs) */}
        <ElectricRevolution />

        {/* 10. Explore Cars (Types, Manufacturers, Popular Used Models) */}
        <ExploreCars />

        {/* 11. FAQ Accordion & Regulatory Savings Note */}
        <FaqSection />
      </main>

      {/* 12. Full Comprehensive Footer */}
      <Footer onNavigateToHome={navigateToHome} />

      {/* 13. Sticky Bottom Promotional Bar */}
      <BottomStickyBanner />
    </div>
  );
}
