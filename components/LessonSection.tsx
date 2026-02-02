
import React, { useState, useMemo } from 'react';
import { Lesson } from '../types';

const LESSONS: Lesson[] = [
  {
    id: 'bs4-basics',
    title: 'BeautifulSoup: Static HTML Parsing',
    summary: 'The simplest way to extract data from static HTML pages using Python\'s most popular parsing library.',
    content: 'BeautifulSoup is a Python library for pulling data out of HTML and XML files. It is the gold standard for scraping static sites because it is lightweight and handles "messy" HTML exceptionally well. \n\n**Installation:** Run `pip install beautifulsoup4 requests` to get started.',
    codeSnippet: `# Python Example
import requests
from bs4 import BeautifulSoup

# 1. Fetch the page
url = "https://example.com"
response = requests.get(url)

# 2. Parse HTML
soup = BeautifulSoup(response.text, 'html.parser')

# 3. Extract Data
print(f"Page Title: {soup.title.string}")
for link in soup.find_all('a'):
    print(link.get('href'))`
  },
  {
    id: 'puppeteer-basics',
    title: 'Puppeteer: Basic Navigation & Interaction',
    summary: 'Master the art of scraping dynamic, JavaScript-heavy websites by automating a real headless browser.',
    content: 'Puppeteer is a Node.js library that provides a high-level API to control headless Chrome or Chromium. It is particularly useful for scraping dynamic websites (SPAs) where content is rendered via JavaScript. Unlike static parsers, Puppeteer waits for the script execution, allowing you to scrape data exactly as a user would see it.',
    codeSnippet: `// Node.js Example
const puppeteer = require('puppeteer');

(async () => {
  // 1. Launch a headless browser
  const browser = await puppeteer.launch();
  
  // 2. Open a new page
  const page = await browser.newPage();
  
  // 3. Navigate to a URL
  console.log('Navigating to example.com...');
  await page.goto('https://example.com', {
    waitUntil: 'networkidle2', // Wait until network is idle
  });

  // 4. Extract data using page.evaluate
  const title = await page.title();
  console.log(\`Page Title: \${title}\`);

  // 5. Close the browser
  await browser.close();
})();`
  },
  {
    id: 'apify-sdk',
    title: 'Apify SDK: Scaling & Reliability',
    summary: 'Learn how to build resilient, industrial-scale scrapers that handle proxies and retries automatically.',
    content: 'The Apify SDK (and the underlying Crawlee library) is designed for professional-grade scraping at scale. It natively solves the most common scraping headaches:\n\n1. **IP Rotation:** Automatically integrates with proxy pools to prevent blocks.\n2. **Autoscaled Concurrency:** Adjusts the number of parallel pages based on system CPU/Memory.\n3. **Request Retries:** Automatically retries failed requests with exponential backoff.\n4. **Storage:** Saves data to structured datasets (JSON/CSV) effortlessly.\n\nIt is the premier choice for projects requiring thousands of requests per hour.',
    codeSnippet: `// Node.js Example using Crawlee + Apify SDK
const { Actor } = require('apify');
const { PuppeteerCrawler } = require('crawlee');

await Actor.init();

// The crawler handles concurrency and retries automatically
const crawler = new PuppeteerCrawler({
    // Automatically handle proxies and browser launch
    async requestHandler({ page, request, log }) {
        const title = await page.title();
        log.info(\`Processed \${request.url}: \${title}\`);
        
        // Push data to the default dataset
        await Actor.pushData({
            url: request.url,
            title,
        });
    },
    // This function is called if the page fails even after retries
    failedRequestHandler({ request, log }) {
        log.error(\`Request \${request.url} failed permanently.\`);
    },
});

await crawler.run(['https://apify.com', 'https://crawlee.dev']);

await Actor.exit();`
  }
];

export const LessonSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLessons = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    if (!lowerSearch) return LESSONS;
    
    return LESSONS.filter(lesson => 
      lesson.title.toLowerCase().includes(lowerSearch) || 
      lesson.summary.toLowerCase().includes(lowerSearch) ||
      lesson.content.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Academy Lessons</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Deep dives into the most popular scraping technologies.</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search lessons (e.g. 'Apify', 'Python', 'scale')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-12">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <section 
              key={lesson.id} 
              id={lesson.id} 
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{lesson.title}</h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6 italic">
                  {lesson.summary}
                </p>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-8 whitespace-pre-wrap">
                  {lesson.content}
                </div>
                
                {lesson.codeSnippet && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Example Code</span>
                    </div>
                    <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed border border-slate-700 shadow-inner">
                      <code>{lesson.codeSnippet}</code>
                    </pre>
                  </div>
                )}
                
                <div className="mt-8 flex gap-4">
                  <a 
                    href={
                      lesson.id === 'bs4-basics' ? 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/' : 
                      lesson.id === 'puppeteer-basics' ? 'https://pptr.dev/' : 
                      'https://sdk.apify.com/'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                  >
                    View Official Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No lessons found</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search terms to find what you're looking for.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};