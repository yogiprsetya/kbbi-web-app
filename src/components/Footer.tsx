export const Footer = () => (
  <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <img src="/logo.svg" alt="logo kbbi app" className="w-8" />
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
          • © 2025 KBBI Web App
        </p>
      </div>
    </div>
  </footer>
);
