/**
 * [ architectural concept ]: System Gateway Landing Page Matrix.
 * [ purpose ]: Serves as the primary public interface wrapper. 
 * Orchestrates ambient background telemetry, handles access vector branching (Individuals vs. Corporate), 
 * and anchors peripheral feature status indicators within a uniform viewport canvas.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundGrid from '../../Components/LandingPage/BackgroundGrid.jsx';
import HeroSection from '../../Components/LandingPage/HeroSection.jsx';
import InitializeButton from '../../Components/LandingPage/InitializeButton.jsx';
import FeatureIndicators from '../../Components/LandingPage/FeatureIndicators.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  // 1. ROUTING VECTOR (B2C): Redirects personal tier operators to the IAM authorization loop
  const handleLogin = () => {
    navigate('/auth'); 
  };

  // 2. ROUTING VECTOR (B2B): Routes corporate/enterprise requests to the dedicated holding container
  const handleGuest = () => {
  navigate('/Corporate/CoomingSoon');
};

  return (
    // 3. BASE VISUAL CANVAS: Enforces global responsive bounding boxes and prevents runtime overflow leaks
    <div
      className="relative min-h-screen w-full bg-[#0f131d] text-white
font-sans overflow-x-hidden flex flex-col justify-between px-4 py-6 md:p-8"
    >
      {/* AMBIENT LAYERING: Digital background telemetry layout node */}
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