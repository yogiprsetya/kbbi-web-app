import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { If } from './ui/if';
import { Menu } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleWordSelect = (word: string) => {
    navigate(`/${word.charAt(0)}/${word}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/logo.svg" alt="logo kbbi app" className="w-8" />

            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KBBI Web
              </span>

              <p className="text-xs text-gray-500 -mt-1">Kamus Besar Bahasa Indonesia</p>
            </div>
          </Link>

          {/* Search Bar - Centered on desktop */}
          <If condition={location.pathname !== '/'}>
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <SearchBar
                placeholder="Cari kata dalam KBBI..."
                className="w-full"
                onWordSelect={handleWordSelect}
              />
            </div>
          </If>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <If condition={location.pathname !== '/'}>
          <div className="md:hidden pb-4">
            <SearchBar
              placeholder="Cari kata dalam KBBI..."
              className="w-full"
              onWordSelect={handleWordSelect}
            />
          </div>
        </If>
      </div>
    </header>
  );
};
