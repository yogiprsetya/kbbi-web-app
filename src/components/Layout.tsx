import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ReactNode } from 'react';
import { If } from './ui/if';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleWordSelect = (word: string) => {
    navigate(`/${word.charAt(0)}/${word}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">K</span>
              </div>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">KBBI Web</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Kamus Besar Bahasa Indonesia - Akses mudah dan cepat
            </p>
            <p className="text-gray-500 text-xs">
              Data dari{' '}
              <a
                href="http://kbbi.kemdikbud.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                KBBI Kemendikbud
              </a>{' '}
              • © 2024 KBBI Web App
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
