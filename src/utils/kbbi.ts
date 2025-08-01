export interface KBBIEntry {
  nama: string;
  nomor: string;
  kata_dasar: string[];
  pelafalan: string;
  bentuk_tidak_baku: string[];
  varian: string[];
  makna: {
    kelas: {
      kode: string;
      nama: string;
      deskripsi: string;
    }[];
    submakna: string[];
    info: string;
    contoh: string[];
  }[];
}

export interface KBBIFile {
  pranala: string;
  entri: KBBIEntry[];
}

// Daftar huruf yang tersedia
const AVAILABLE_LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Cache untuk word mapping
let wordMappingCache: { [key: string]: string[] } | null = null;

// Load word mapping dari file JSON
const loadWordMapping = async (): Promise<{ [key: string]: string[] }> => {
  if (wordMappingCache) {
    return wordMappingCache;
  }

  try {
    const response = await fetch('/word-mapping.json');
    if (response.ok) {
      const data = await response.json();
      wordMappingCache = data;
      return data;
    }
  } catch (error) {
    console.error('Error loading word mapping:', error);
  }

  // Fallback ke empty mapping jika file tidak ditemukan
  return {};
};

// Mendapatkan semua huruf yang tersedia
export const getAvailableLetters = async (): Promise<string[]> => {
  try {
    return AVAILABLE_LETTERS;
  } catch (error) {
    console.error('Error fetching letters:', error);
    return [];
  }
};

// Mendapatkan daftar kata untuk huruf tertentu
export const getWordsForLetter = async (letter: string): Promise<string[]> => {
  try {
    const wordMapping = await loadWordMapping();
    return wordMapping[letter] || [];
  } catch (error) {
    console.error(`Error fetching words for letter ${letter}:`, error);
    return [];
  }
};

// Mendapatkan data kata dari file JSON
export const getWordData = async (word: string): Promise<KBBIFile | null> => {
  try {
    // Coba ambil dari file JSON yang ada
    const response = await fetch(`/kbbi/${word.charAt(0)}/${word}.json`);
    if (response.ok) {
      const data: KBBIFile = await response.json();
      return data;
    }
    
    // Jika file tidak ada, buat data dummy untuk demo
    return {
      pranala: `http://kbbi.kemdikbud.go.id/entri/${word}`,
      entri: [
        {
          nama: word,
          nomor: "1",
          kata_dasar: [],
          pelafalan: `/${word}/`,
          bentuk_tidak_baku: [],
          varian: [],
          makna: [
            {
              kelas: [
                {
                  kode: "n",
                  nama: "Nomina",
                  deskripsi: "kata benda"
                }
              ],
              submakna: [`Arti dari kata "${word}" dalam bahasa Indonesia`],
              info: "",
              contoh: [`Contoh penggunaan kata "${word}" dalam kalimat.`]
            }
          ]
        }
      ]
    };
  } catch (error) {
    console.error(`Error fetching word data for ${word}:`, error);
    return null;
  }
};

// Mencari kata berdasarkan query
export const searchWords = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase().trim();
  const results: string[] = [];
  
  // Cari di semua huruf
  const letters = await getAvailableLetters();
  
  for (const letter of letters) {
    const words = await getWordsForLetter(letter);
    const matchingWords = words.filter(word => 
      word.toLowerCase().includes(queryLower)
    );
    results.push(...matchingWords);
  }
  
  return results.slice(0, 50); // Batasi hasil pencarian
}; 