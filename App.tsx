
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ToolExplorer } from './components/ToolExplorer';
import { LessonSection } from './components/LessonSection';

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

  // Handle custom tab change events from components
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
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Explore the best free and open-source tools for your next project.</p>
            </div>
            <ToolExplorer />
          </div>
        )}

        {activeTab === 'lessons' && (
          <LessonSection />
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-slate-900 dark:text-white font-bold">ScrapeMaster Academy</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
            (C) Noam Gold AI 2026 | Remember to always scrape responsibly.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">Documentation</a>
              <a href="mailto:goldnoamai@gmail.com" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">Send Feedback</a>
            </div>
            <span className="text-xs text-slate-400">goldnoamai@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
