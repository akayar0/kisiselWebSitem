import React from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certificates } from './components/Certificates';
import { GoalsInterests } from './components/GoalsInterests';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Fixed Navbar with clean dropdown to prevent clutter */}
      <Navbar personal={portfolioData.personal} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Hero personal={portfolioData.personal} />
        <About about={portfolioData.about} personal={portfolioData.personal} />
        <Experience experiences={portfolioData.experiences} />
        <Projects projects={portfolioData.projects} />
        <Skills skills={portfolioData.skills} />
        <Certificates certificates={portfolioData.certificates} />
        <GoalsInterests goals={portfolioData.goals} interests={portfolioData.interests} />
      </main>

      {/* Footer & Contact CTA */}
      <Footer personal={portfolioData.personal} />
    </div>
  );
}

export default App;
