
import React from 'react';

export const Hero: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Master Web Scraping</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Ethically & Efficiently</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-500 dark:text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A curated guide to the best free tools for data extraction. From simple libraries like BeautifulSoup to powerful cloud platforms like Apify.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20"
            >
              Explore Tools
            </button>
            <button className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 md:py-4 md:text-lg md:px-10">
              Quick Start
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Code or No-Code</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Whether you're a Python wizard or prefer visual point-and-click tools.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 3.423 9.3 8.618 11.034a11.955 11.955 0 018.618-11.034" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ethics First</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Learn to respect robots.txt and handle rate limits to scrape responsibly.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Scalability</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Discover how to move from local scripts to high-performance cloud automation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
