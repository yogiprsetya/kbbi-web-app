import { useState, useEffect } from 'react';
import { getAvailableLetters } from 'src/utils/kbbi';
import { SearchBar } from 'src/components/common/SearchBar';
import { BookOpen, Monitor, Search } from 'lucide-react';
import { LetterCard } from 'src/components/ui/letter-card';

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
      <div className="text-center space-y-6 contain-layout min-h-[260px]">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl min-h-[60px] font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Kamus Besar Bahasa Indonesia
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan arti kata dalam bahasa Indonesia dengan mudah dan cepat. Akses ribuan kata
            dengan pencarian yang cerdas.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pilih Huruf</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Telusuri kata berdasarkan huruf awalnya. Setiap huruf berisi ribuan kata yang dapat Anda
            eksplorasi.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {letters.map((letter) => (
            <LetterCard key={letter} letter={letter} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Memilih KBBI Web?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <Search className="size-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Pencarian Cepat</h4>
            <p className="text-gray-600 text-sm">
              Temukan kata dengan mudah menggunakan fitur pencarian yang cerdas
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="size-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="size-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Data Lengkap</h4>
            <p className="text-gray-600 text-sm">
              Informasi lengkap termasuk arti, kelas kata, dan contoh penggunaan
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
              <Monitor className="size-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Responsif</h4>
            <p className="text-gray-600 text-sm">
              Akses dari mana saja dengan tampilan yang optimal di semua perangkat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
