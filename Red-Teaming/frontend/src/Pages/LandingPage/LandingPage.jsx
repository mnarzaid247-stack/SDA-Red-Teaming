import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundGrid from '../../Components/LandingPage/BackgroundGrid.jsx';
import HeroSection from '../../Components/LandingPage/HeroSection.jsx';
import InitializeButton from '../../Components/LandingPage/InitializeButton.jsx';
import FeatureIndicators from '../../Components/LandingPage/FeatureIndicators.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth'); // أو صفحة تسجيل الدخول عندك
  };

  const handleGuest = () => {
  navigate('/corporate/dashboard');
};

  return (
    <div
      className="relative h-screen w-full bg-[#0f131d] text-white
      font-sans overflow-hidden flex flex-col justify-between p-6 md:p-8"
    >
      <BackgroundGrid />

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center -mt-12">

          <HeroSection />

          <div className="relative z-10 flex flex-col items-center">
            <InitializeButton
              onLogin={handleLogin}
              onGuest={handleGuest}
              isLoading={false}
              isComplete={false}
            />
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="relative z-10 w-full flex justify-center
        items-end pointer-events-none mt-auto"
      >
        <div className="pointer-events-auto">
          <FeatureIndicators />
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;