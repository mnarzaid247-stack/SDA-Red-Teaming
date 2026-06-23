import React from 'react';
import MainLayout from '../../../Layouts/MainLayout/MainLayout.jsx';
import AttackHero from '../../../Components/Individuals/AttacksLibrary/AttackHero.jsx';
import AttackCard from '../../../Components/Individuals/AttacksLibrary/AttackCard.jsx';
import AttackGrid from '../../../Components/Individuals/AttacksLibrary/AttackGrid.jsx';
const AttackLibraryPage = () => {
  return (
      <div className="flex flex-col gap-12 max-w-[1400px] mx-auto">
        
        <AttackHero
          title="Attack Coverage Library"
          description="Understanding attack vectors and their impact is the first step toward security. 
          This library serves as your scientific guide to mastering the complexities of AI model vulnerabilities."/>

        <AttackGrid />

      </div>
  );
};

export default AttackLibraryPage;