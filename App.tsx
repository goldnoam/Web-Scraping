import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ToolExplorer } from './components/ToolExplorer';
import { LessonSection } from './components/LessonSection';
import { ScrapingChallenge } from './components/ScrapingChallenge';

const AdPlaceholder: React.FC<{ label: string }> = ({ label }) => {
  const [isBlocked, setIsBlocked] = useState((window as any).adsBlocked || false);

  useEffect(() => {
    const handleBlocked = () => setIsBlocked(true);
    document.addEventListener('adsBlocked', handleBlocked);
    return () => document.removeEventListener('adsBlocked', handleBlocked);
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8 ads-placeholder flex flex-col items-center justify-center p-6 text-center">
      {isBlocked ? (
        <>
          <svg className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <span className="text-slate-400 dark:text-slate-500 font-medium italic">Ad Support Disabled</span>
          <p className="text-[10px] text-slate-400/60 mt-1 max-w-xs">Consider disabling your ad-blocker to support ScrapeMaster Academy.</p>
        </>
      ) : (
        <span className="text-slate-400/50">{label}</span>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark flex flex-col transition-colors duration-300">
      <Navigation 
        currentTab={activeTab} 
        onTabChange={setActiveTab} 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
      />
      
      <main className="flex-1">
        {activeTab === 'overview' && (
          <Hero onGetStarted={() => setActiveTab('tools')} />
        )}

        {activeTab === 'tools' && (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Scraping Tool Stack</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Explore the best tools for your next project.</p>
            </div>
            
            <AdPlaceholder label="Ad Placement - Tools" />
            <ToolExplorer />
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="max-w-7xl mx-auto">
            <AdPlaceholder label="Ad Placement - Academy Header" />
            <LessonSection />
          </div>
        )}

        {activeTab === 'challenge' && (
          <ScrapingChallenge />
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-bold leading-none">ScrapeMaster Academy</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Professional Education</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              (C) Noam Gold AI 2026
            </p>
            <div className="flex gap-4 text-xs">
              <button onClick={() => setActiveTab('challenge')} className="text-indigo-500 font-bold hover:underline">Play Scrape Arena</button>
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-3">
              <a 
                href="mailto:goldnoamai@gmail.com" 
                className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                Send Feedback goldnoamai@gmail.com
              </a>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Contact: goldnoamai@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;