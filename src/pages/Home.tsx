import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableLetters } from '../utils/kbbi';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [letters, setLetters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const availableLetters = await getAvailableLetters();
        setLetters(availableLetters);
      } catch (error) {
        console.error('Error fetching letters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, []);

  const handleWordSelect = (word: string) => {
    window.location.href = `/${word.charAt(0)}/${word}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data KBBI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Kamus Besar Bahasa Indonesia
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan arti kata dalam bahasa Indonesia dengan mudah dan cepat. 
            Akses ribuan kata dengan pencarian yang cerdas.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onWordSelect={handleWordSelect}
            placeholder="Ketik kata yang ingin dicari..."
          />
          <p className="text-sm text-gray-500 mt-3">
            Tekan Enter untuk mencari • Gunakan arrow keys untuk navigasi
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{letters.length}</div>
          <div className="text-gray-600">Huruf Tersedia</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
          <div className="text-gray-600">Gratis</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-gray-600">Tersedia</div>
        </div>
      </div>

      {/* Letters Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Pilih Huruf
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Telusuri kata berdasarkan huruf awalnya. Setiap huruf berisi ribuan kata yang dapat Anda eksplorasi.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {letters.map((letter) => (
            <Link
              key={letter}
              to={`/${letter}`}
              className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {letter.toUpperCase()}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                Huruf {letter.toUpperCase()}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Mengapa Memilih KBBI Web?
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Pencarian Cepat</h4>
            <p className="text-gray-600 text-sm">Temukan kata dengan mudah menggunakan fitur pencarian yang cerdas</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Data Lengkap</h4>
            <p className="text-gray-600 text-sm">Informasi lengkap termasuk arti, kelas kata, dan contoh penggunaan</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Responsif</h4>
            <p className="text-gray-600 text-sm">Akses dari mana saja dengan tampilan yang optimal di semua perangkat</p>
          </div>
        </div>
      </div>
    </div>
  );
} 