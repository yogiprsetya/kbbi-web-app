import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWordData } from '../utils/kbbi';
import { SearchBar } from '../components/SearchBar';
import type { KBBIFile } from '../utils/kbbi';
import {
  ArrowLeft,
  BookMarked,
  House,
  Info,
  LinkIcon,
  MessageCircle,
  Speech,
  TriangleAlert,
} from 'lucide-react';

export default function Word() {
  const { letter, word } = useParams<{ letter: string; word: string }>();
  const [wordData, setWordData] = useState<KBBIFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWordData = async () => {
      if (!word) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await getWordData(word);
        if (data) {
          setWordData(data);
        } else {
          setError('Kata tidak ditemukan');
        }
      } catch (error) {
        console.error(`Error fetching word data for ${word}:`, error);
        setError('Terjadi kesalahan saat memuat data kata');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWordData();
  }, [word]);

  const handleWordSelect = (selectedWord: string) => {
    window.location.href = `/${selectedWord.charAt(0)}/${selectedWord}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data kata "{word}"...</p>
        </div>
      </div>
    );
  }

  if (error || !wordData) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-6">
          <TriangleAlert className="size-20 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Kata tidak ditemukan'}</h1>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Kata "{word}" tidak ditemukan dalam KBBI. Pastikan kata yang Anda cari sudah benar.
        </p>

        <div className="space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Kembali ke Beranda
          </Link>

          <Link
            to={`/${letter}`}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Lihat Kata Lain
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-3 text-sm">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Beranda
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to={`/${letter}`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Huruf {letter?.toUpperCase()}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">{word}</span>
          </div>

          {/* Word Title */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{word}</h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                KBBI
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Kamus Besar Bahasa Indonesia</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchBar onWordSelect={handleWordSelect} placeholder="Cari kata lain..." />
        </div>
      </div>

      {/* Word Details */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
        {wordData.entri.map((entry, index) => (
          <div key={index} className="p-8 border-b border-gray-100 last:border-b-0">
            {/* Entry Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold text-gray-900">{entry.nama}</h2>
                {entry.nomor && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    {entry.nomor}
                  </span>
                )}
              </div>
            </div>

            {/* Pronunciation */}
            {entry.pelafalan && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Speech className="size-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Pelafalan:</span>
                </div>
                <span className="text-lg text-gray-900 font-mono">{entry.pelafalan}</span>
              </div>
            )}

            {/* Non-standard Forms */}
            {entry.bentuk_tidak_baku && entry.bentuk_tidak_baku.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <TriangleAlert className="size-5 text-red-500" />
                  <span>Bentuk tidak baku:</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {entry.bentuk_tidak_baku.map((bentuk, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg border border-red-200"
                    >
                      {bentuk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {entry.varian && entry.varian.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <BookMarked className="size-5 text-blue-500" />
                  <span>Varian:</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {entry.varian.map((varian, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg border border-blue-200"
                    >
                      {varian}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meanings */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Arti Kata</h3>
              {entry.makna.map((meaning, meaningIndex) => (
                <div
                  key={meaningIndex}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500"
                >
                  {/* Word Classes */}
                  {meaning.kelas && meaning.kelas.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {meaning.kelas.map((kelas, kelasIndex) => (
                          <span
                            key={kelasIndex}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-200"
                          >
                            {kelas.nama}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meanings */}
                  <div className="space-y-3">
                    {meaning.submakna.map((submakna, submaknaIndex) => (
                      <div key={submaknaIndex} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                          {submaknaIndex + 1}
                        </span>
                        <span className="text-gray-900 leading-relaxed">{submakna}</span>
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  {meaning.info && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-yellow-800 italic">{meaning.info}</span>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  {meaning.contoh && meaning.contoh.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                        <MessageCircle className="size-4 text-gray-500" />
                        <span>Contoh Penggunaan:</span>
                      </h4>

                      <div className="space-y-2">
                        {meaning.contoh.map((contoh, contohIndex) => (
                          <div
                            key={contohIndex}
                            className="bg-white rounded-lg p-3 border border-gray-200"
                          >
                            <span className="text-gray-700 italic">"{contoh}"</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Source Link */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <LinkIcon className="size-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sumber:</span>
            </div>
            <a
              href={wordData.pranala}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium transition-colors"
            >
              KBBI Kemendikbud
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/${letter}`}
          className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="size-5 mr-2" />
          Kembali ke Huruf {letter?.toUpperCase()}
        </Link>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <House className="size-5 mr-2" />
          Beranda
        </Link>
      </div>
    </div>
  );
}
