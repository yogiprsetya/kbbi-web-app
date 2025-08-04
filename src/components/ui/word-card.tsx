import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  letter: string;
  word: string;
};

export const WordCard: FC<Props> = ({ letter, word }) => (
  <Link
    role="button"
    to={`/${letter}/${word}`}
    className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
  >
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-blue-600 font-semibold text-sm">{letter.toUpperCase()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
          {word}
        </div>
        <div className="text-sm text-gray-500">Klik untuk melihat arti</div>
      </div>
    </div>
  </Link>
);
