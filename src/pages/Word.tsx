import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWordData } from '../utils/kbbi';
import SearchBar from '../components/SearchBar';
import type { KBBIFile } from '../utils/kbbi';

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
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error || 'Kata tidak ditemukan'}
        </h1>
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
          <SearchBar 
            onWordSelect={handleWordSelect}
            placeholder="Cari kata lain..."
          />
        </div>
      </div>

      {/* Word Details */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
        {wordData.entri.map((entry, index) => (
          <div key={index} className="p-8 border-b border-gray-100 last:border-b-0">
            {/* Entry Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  {entry.nama}
                </h2>
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
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Pelafalan:</span>
                </div>
                <span className="text-lg text-gray-900 font-mono">{entry.pelafalan}</span>
              </div>
            )}

            {/* Non-standard Forms */}
            {entry.bentuk_tidak_baku && entry.bentuk_tidak_baku.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
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
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
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
                <div key={meaningIndex} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500">
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
                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-yellow-800 italic">{meaning.info}</span>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  {meaning.contoh && meaning.contoh.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Contoh Penggunaan:</span>
                      </h4>
                      <div className="space-y-2">
                        {meaning.contoh.map((contoh, contohIndex) => (
                          <div key={contohIndex} className="bg-white rounded-lg p-3 border border-gray-200">
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
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
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
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Huruf {letter?.toUpperCase()}
        </Link>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Beranda
        </Link>
      </div>
    </div>
  );
} 