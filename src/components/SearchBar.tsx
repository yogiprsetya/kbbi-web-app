import { useState, useEffect, useRef } from 'react';
import { searchWords } from '../utils/kbbi';
import { cn } from '../utils/css';
import { BookmarkX, Search } from 'lucide-react';
import { If } from './ui/if';

interface SearchBarProps {
  onWordSelect?: (word: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  onWordSelect,
  placeholder = 'Cari kata...',
  className,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const searchResults = await searchWords(query);
          setResults(searchResults);
          setShowResults(true);
          setSelectedIndex(-1);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
        setSelectedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleWordSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleWordSelect = (word: string) => {
    setQuery(word);
    setShowResults(false);
    setSelectedIndex(-1);
    onWordSelect?.(word);
  };

  return (
    <div ref={searchRef} className={cn('relative', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="size-5 text-gray-400" />
        </div>

        <If condition={isLoading}>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        </If>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
          {results.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordSelect(word)}
              className={cn(
                'w-full px-4 py-3 text-left transition-colors duration-150',
                index === selectedIndex
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50 text-gray-900',
              )}
            >
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="font-medium">{word}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <If condition={showResults && results.length === 0 && query.trim().length >= 2 && !isLoading}>
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl">
          <div className="px-4 py-6 text-center">
            <BookmarkX className="size-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Tidak ada kata yang ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci yang berbeda</p>
          </div>
        </div>
      </If>
    </div>
  );
};
