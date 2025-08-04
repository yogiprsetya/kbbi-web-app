import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWordsForLetter } from 'src/utils/kbbi';
import {
  BookmarkX,
  ChevronLeft,
  ChevronRight,
  Funnel,
  RefreshCw,
  TriangleAlert,
  X,
} from 'lucide-react';
import { If } from 'src/components/ui/if';
import { WordCard } from 'src/components/ui/word-card';
import { cn } from 'src/utils/css';

export default function Letter() {
  const { letter } = useParams<{ letter: string }>();
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 20;

  useEffect(() => {
    const fetchWords = async () => {
      if (!letter) return;

      try {
        setIsLoading(true);
        const wordsForLetter = await getWordsForLetter(letter);
        setWords(wordsForLetter);
        setCurrentPage(1); // Reset ke halaman pertama saat huruf berubah
      } catch (error) {
        console.error(`Error fetching words for letter ${letter}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, [letter]);

  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  const startIndex = (currentPage - 1) * wordsPerPage;
  const endIndex = startIndex + wordsPerPage;
  const currentWords = filteredWords.slice(startIndex, endIndex);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat kata untuk huruf {letter?.toUpperCase()}...</p>
        </div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <TriangleAlert className="size-16 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Huruf tidak ditemukan</h1>

        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Beranda
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Huruf {letter.toUpperCase()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Kata Berawalan Huruf "{letter.toUpperCase()}"
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ditemukan <span className="font-semibold text-blue-600">{words.length}</span> kata yang
            berawalan huruf {letter.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <Funnel className="w-5 h-5 text-gray-400" />

            <label htmlFor="search" className="text-sm font-medium text-gray-700">
              Filter kata:
            </label>
          </div>

          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ketik untuk memfilter kata..."
            autoFocus
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredWords.length} dari {words.length} kata
            </span>

            <If condition={searchQuery}>
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="size-4" />
              </button>
            </If>
          </div>
        </div>
      </div>

      {/* Words Grid */}
      {filteredWords.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentWords.map((word) => (
              <WordCard key={word} letter={letter} word={word} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={cn(
                            'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50',
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-3">
                  <span className="text-sm text-gray-600">
                    Halaman {currentPage} dari {totalPages}({startIndex + 1}-
                    {Math.min(endIndex, filteredWords.length)} dari {filteredWords.length} kata)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <BookmarkX className="size-20 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak ada kata yang ditemukan
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Coba ubah kata kunci pencarian Anda atau gunakan kata kunci yang lebih umum
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className="size-4 mr-2" />
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
