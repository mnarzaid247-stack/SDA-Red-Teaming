import React from 'react';

const WizardHeader = ({ title, description }) => {
  return (
    <section className="mb-section-gap relative overflow-hidden rounded-xl border 
    border-outline-variant bg-surface-container-low p-10">

      {/* Aesthetic Background Element */}
      <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent"></div>

        <img
          className="h-full w-full object-cover"
          alt="A futuristic digital grid represented as a shimmering mesh of emerald green 
          light against a deep obsidian background. The composition features sharp geometric 
          lines and data nodes pulsing with soft luminescence, creating a sense of a vast, 
          high-tech network architecture. The overall mood is cold, professional, and technically 
          precise, echoing an advanced AI security environment."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaOPurmIXYdi2nsBMRiQ-kNsaJDYgQfbMdsbv_SDFJE_uqeJdQu-pWdf0A5yWirsLslChfeqmsX0O-NSvCIa0fR-9WA3iE6Lz6zhQCldTkyk4ElhbwrnShl59TSVZOe2X7V9830YsJb6ky_1y-cXIl8Wd2jWwSxt5KgN9Iaf4z-f1kggpshfi2xQ4cCEHRWV8INvVKyv-5z_WCJVzgl85H26WE0Y-f6Fv3syXd4oSAHvOjnTkNZPqbvB0Zxm6D_LYej921SuGlLVRU"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-2xl">

        {/* Title */}
        <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
          {title}
        </h2>

        {/* Description */}
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          {description}
        </p>

      </div>

    </section>
  );
};

export default WizardHeader;