import fs from 'fs';
import path from 'path';

const KBBI_PATH = path.join(process.cwd(), 'public', 'kbbi');

async function generateWordMapping() {
  console.log('Generating word mapping from KBBI data...');

  const wordMapping = {};
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  for (const letter of letters) {
    const letterPath = path.join(KBBI_PATH, letter);

    if (fs.existsSync(letterPath)) {
      try {
        const files = fs.readdirSync(letterPath);
        const jsonFiles = files.filter((file) => file.endsWith('.json'));
        const words = jsonFiles.map((file) => file.replace('.json', ''));

        wordMapping[letter] = words.sort();
        console.log(`Letter ${letter}: ${words.length} words`);
      } catch (error) {
        console.error(`Error reading letter ${letter}:`, error);
        wordMapping[letter] = [];
      }
    } else {
      console.log(`Letter ${letter}: folder not found`);
      wordMapping[letter] = [];
    }
  }

  // Write mapping to file
  const mappingPath = path.join(process.cwd(), 'public', 'word-mapping.json');
  const mappingDir = path.dirname(mappingPath);

  if (!fs.existsSync(mappingDir)) {
    fs.mkdirSync(mappingDir, { recursive: true });
  }

  fs.writeFileSync(mappingPath, JSON.stringify(wordMapping, null, 2));
  console.log(`Word mapping saved to: ${mappingPath}`);

  // Generate summary
  const totalWords = Object.values(wordMapping).reduce((sum, words) => sum + words.length, 0);
  console.log(`Total words: ${totalWords}`);

  return wordMapping;
}

generateWordMapping().catch(console.error);
