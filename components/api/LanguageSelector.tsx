import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const languages = [
  { id: 'js', name: 'JavaScript / TypeScript', available: true },
  { id: 'rust', name: 'Rust', available: false },
  { id: 'python', name: 'Python', available: false },
  { id: 'swift', name: 'Swift', available: false },
];

export default function LanguageSelector() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('js');

  useEffect(() => {
    // Get language from URL query or localStorage
    const urlLang = router.query.lang as string;
    const storedLang = localStorage.getItem('loro-api-lang');
    
    if (urlLang && languages.find(l => l.id === urlLang)) {
      setSelectedLang(urlLang);
      localStorage.setItem('loro-api-lang', urlLang);
    } else if (storedLang && languages.find(l => l.id === storedLang)) {
      setSelectedLang(storedLang);
    }
  }, [router.query.lang]);

  const handleLanguageChange = (langId: string) => {
    const lang = languages.find(l => l.id === langId);
    if (lang && lang.available) {
      setSelectedLang(langId);
      localStorage.setItem('loro-api-lang', langId);
      
      // Update URL without navigation
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('lang', langId);
      window.history.pushState({}, '', newUrl.toString());
    }
  };

  return (
    <div className="language-selector mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Select Language/Binding:
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageChange(lang.id)}
            disabled={!lang.available}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${selectedLang === lang.id
                ? 'bg-blue-500 text-white shadow-md'
                : lang.available
                  ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60'
              }
            `}
          >
            {lang.name}
            {!lang.available && <span className="ml-1 text-xs">(Coming Soon)</span>}
          </button>
        ))}
      </div>
      {selectedLang !== 'js' && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          <p>API documentation for {languages.find(l => l.id === selectedLang)?.name} is coming soon.</p>
          <p>Currently showing JavaScript/TypeScript API reference.</p>
        </div>
      )}
    </div>
  );
}