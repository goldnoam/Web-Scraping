
import React from 'react';
import { ToolDifficulty, ScraperTool } from '../types';

const TOOLS: ScraperTool[] = [
  {
    id: 'beautiful-soup-lesson',
    name: 'BeautifulSoup (Lesson)',
    description: 'Learn the basics of parsing static HTML with Python. Ideal for simple websites and data extraction tasks.',
    difficulty: ToolDifficulty.BEGINNER,
    priceModel: 'Free (Open Source)',
    url: 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
    features: ['Simple Tag Search', 'CSS Selector Support', 'Fast Execution', 'Handles Messy HTML']
  },
  {
    id: 'puppeteer-lesson',
    name: 'Puppeteer (Lesson)',
    description: 'Master dynamic website scraping with Node.js. Learn to control a headless browser and handle JS-rendered content.',
    difficulty: ToolDifficulty.ADVANCED,
    priceModel: 'Free (Open Source)',
    url: 'https://pptr.dev/',
    features: ['Browser Automation', 'JS Rendering', 'Screenshot/PDF', 'Full DOM Access']
  },
  {
    id: 'apify-lesson',
    name: 'Apify SDK (Lesson)',
    description: 'Scale your scrapers to millions of pages. Learn how to handle proxies, retries, and high-concurrency crawling.',
    difficulty: ToolDifficulty.INTERMEDIATE,
    priceModel: 'Free tier + Paid',
    url: 'https://sdk.apify.com/',
    features: ['Automatic Proxies', 'Smart Retries', 'Scalable Actors', 'Cloud Storage']
  },
  {
    id: 'octoparse',
    name: 'Octoparse',
    description: 'Visual web scraping tool. Scrape web data without writing a single line of code.',
    difficulty: ToolDifficulty.BEGINNER,
    priceModel: 'Free tier + Paid',
    url: 'https://octoparse.com',
    features: ['Point-and-click', 'Cloud extraction', 'IP rotation', 'Export to Excel/SQL']
  }
];

export const ToolExplorer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {TOOLS.map((tool) => (
        <div key={tool.id} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all ${tool.id.includes('lesson') ? 'border-indigo-200 dark:border-indigo-900/50 ring-1 ring-indigo-50 dark:ring-indigo-900/10 shadow-indigo-100/50 dark:shadow-none' : 'border-slate-200 dark:border-slate-700'}`}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                {tool.id.includes('lesson') && (
                  <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] uppercase font-black px-1.5 py-0.5 rounded">Tutorial</span>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                tool.difficulty === ToolDifficulty.BEGINNER ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                tool.difficulty === ToolDifficulty.INTERMEDIATE ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              }`}>
                {tool.difficulty}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">{tool.description}</p>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-500 mb-4">
              <span className="font-semibold mr-2 dark:text-slate-300">Pricing:</span> {tool.priceModel}
            </div>
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-2 uppercase tracking-wider">Highlights</h4>
              <ul className="grid grid-cols-2 gap-2">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                    <svg className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => {
                if (tool.id.includes('lesson')) {
                  // Direct navigation to lessons tab
                  window.dispatchEvent(new CustomEvent('tabChange', { detail: 'lessons' }));
                  // Optional: Smooth scroll to the specific lesson
                  setTimeout(() => {
                    document.getElementById(tool.id.replace('-lesson', '-basics'))?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  window.open(tool.url, '_blank');
                }
              }}
              className={`inline-block w-full text-center font-semibold py-2 px-4 rounded-lg transition-colors ${tool.id.includes('lesson') ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50'}`}
            >
              {tool.id.includes('lesson') ? 'Start Lesson' : 'Explore Tool'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
